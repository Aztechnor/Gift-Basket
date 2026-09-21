import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { createSupabaseServerClient } from "@/lib/supabase/server"

const orderSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  recipientName: z.string().min(1).max(120),
  recipientPhone: z.string().max(20).optional(),
  recipientEmail: z.string().email().optional(),
  address: z.string().min(1).max(240),
  city: z.string().min(1).max(80),
  deliveryDate: z.string().date().optional(),
  deliveryInstructions: z.string().max(500).optional(),
  giftMessage: z.string().max(250).optional(),
  isIncognito: z.boolean().default(false),
  isSurprise: z.boolean().default(false),
  items: z.array(z.object({ productId: z.number().int().positive(), quantity: z.number().int().min(1).max(20) })).min(1).max(50),
})

function orderNumber() {
  return `GFT-${crypto.randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`
}

export async function POST(request: NextRequest) {
  try {
    const input = orderSchema.parse(await request.json())
    const admin = createSupabaseAdminClient()
    const serverClient = await createSupabaseServerClient()
    const { data: userData } = await serverClient.auth.getUser()
    let recipientUserId: string | null = null

    if (input.recipientEmail) {
      const { data: recipientProfile, error: recipientError } = await admin
        .from("profiles")
        .select("id")
        .eq("email", input.recipientEmail.toLowerCase())
        .maybeSingle()

      if (recipientError) throw recipientError
      if (!recipientProfile) {
        return NextResponse.json({ error: "No GiftBasket user exists with that recipient email" }, { status: 404 })
      }
      recipientUserId = recipientProfile.id
    }
    const catalogIds = [...new Set(input.items.map((item) => item.productId))]

    const { data: products, error: productsError } = await admin
      .from("products")
      .select("id, catalog_id, name, price_kes")
      .in("catalog_id", catalogIds)
      .eq("is_active", true)

    if (productsError) throw productsError
    if (!products || products.length !== catalogIds.length) {
      return NextResponse.json({ error: "One or more products are unavailable" }, { status: 409 })
    }

    const productByCatalogId = new Map(products.map((product) => [product.catalog_id, product]))
    const productIds = products.map((product) => product.id)
    const { data: inventory, error: inventoryError } = await admin
      .from("inventory")
      .select("product_id, quantity")
      .in("product_id", productIds)

    if (inventoryError) throw inventoryError
    const stockByProductId = new Map((inventory ?? []).map((item) => [item.product_id, item.quantity]))
    const orderItems = input.items.map((item) => {
      const product = productByCatalogId.get(item.productId)
      if (!product) throw new Error("Product lookup failed")
      const stock = stockByProductId.get(product.id) ?? 0
      if (item.quantity > stock) {
        throw new Error(`${product.name} is out of stock`)
      }
      return {
        product_id: product.id,
        product_name: product.name,
        unit_price_kes: product.price_kes,
        quantity: item.quantity,
      }
    })

    const subtotal = orderItems.reduce((total, item) => total + item.unit_price_kes * item.quantity, 0)
    const shipping = subtotal >= 10000 ? 0 : 1170
    const tax = Math.round(subtotal * 0.16)
    const total = subtotal + shipping + tax

    const { data: order, error: orderError } = await admin
      .from("orders")
      .insert({
        order_number: orderNumber(),
        user_id: userData.user?.id ?? null,
        recipient_user_id: recipientUserId,
        email: input.email,
        phone: input.phone,
        recipient_name: input.recipientName,
        recipient_phone: input.recipientPhone || null,
        recipient_email: input.recipientEmail?.toLowerCase() || null,
        gift_message: input.giftMessage || null,
        is_incognito: input.isIncognito,
        delivery_date: input.deliveryDate || null,
        is_surprise: input.isSurprise,
        subtotal_kes: subtotal,
        shipping_kes: shipping,
        tax_kes: tax,
        total_kes: total,
        status: "awaiting_payment",
        payment_status: "pending",
      })
      .select("id, order_number, total_kes, status, payment_status")
      .single()

    if (orderError || !order) throw orderError ?? new Error("Order creation failed")

    const { error: itemsError } = await admin.from("order_items").insert(
      orderItems.map((item) => ({ ...item, order_id: order.id }))
    )
    if (itemsError) throw itemsError

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid order details", issues: error.issues }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : "Unable to create order"
    const status = message.endsWith("is out of stock") ? 409 : 500
    console.error("Order creation error:", error)
    return NextResponse.json({ error: status === 409 ? message : "Unable to create order" }, { status })
  }
}
