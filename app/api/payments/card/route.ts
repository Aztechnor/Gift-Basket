import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { z } from "zod"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"

const requestSchema = z.object({ orderId: z.string().uuid() })

export async function POST(request: NextRequest) {
  try {
    const { orderId } = requestSchema.parse(await request.json())
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) return NextResponse.json({ error: "Card payments are not configured" }, { status: 503 })

    const stripe = new Stripe(secretKey)
    const admin = createSupabaseAdminClient()
    const [{ data: order, error: orderError }, { data: items, error: itemsError }] = await Promise.all([
      admin.from("orders").select("id, order_number, total_kes, payment_status").eq("id", orderId).single(),
      admin.from("order_items").select("product_name, unit_price_kes, quantity").eq("order_id", orderId),
    ])

    if (orderError || !order || itemsError || !items?.length) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    if (order.payment_status !== "pending") {
      return NextResponse.json({ error: "Order is not payable" }, { status: 409 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteUrl) return NextResponse.json({ error: "Site URL is not configured" }, { status: 503 })

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "kes",
          unit_amount: item.unit_price_kes,
          product_data: { name: item.product_name },
        },
      })),
      metadata: { orderId: order.id, orderNumber: order.order_number },
      success_url: `${siteUrl}/checkout?payment=success&order=${order.order_number}`,
      cancel_url: `${siteUrl}/checkout?payment=cancelled&order=${order.order_number}`,
    })

    await admin.from("orders").update({ payment_provider: "stripe", payment_reference: session.id }).eq("id", order.id)
    return NextResponse.json({ checkoutUrl: session.url })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid order" }, { status: 400 })
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Unable to start card payment" }, { status: 500 })
  }
}
