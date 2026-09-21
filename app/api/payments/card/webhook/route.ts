import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secretKey || !webhookSecret) return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 })

  const signature = request.headers.get("stripe-signature")
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 })

  try {
    const stripe = new Stripe(secretKey)
    const event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret)
    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const orderId = session.metadata?.orderId
      if (orderId) {
        const admin = createSupabaseAdminClient()
        await admin.from("orders").update({ status: "paid", payment_status: "paid" }).eq("id", orderId)
      }
    }
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Stripe webhook error:", error)
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 })
  }
}
