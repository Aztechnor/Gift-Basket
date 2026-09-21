import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"

const requestSchema = z.object({ orderId: z.string().uuid(), phone: z.string().regex(/^254\d{9}$/) })

function darajaTimestamp() {
  const now = new Date()
  const parts = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()]
  return parts.map((part) => String(part).padStart(2, "0")).join("")
}

export async function POST(request: NextRequest) {
  try {
    const { orderId, phone } = requestSchema.parse(await request.json())
    const config = {
      consumerKey: process.env.MPESA_CONSUMER_KEY,
      consumerSecret: process.env.MPESA_CONSUMER_SECRET,
      shortcode: process.env.MPESA_SHORTCODE,
      passkey: process.env.MPESA_PASSKEY,
      callbackUrl: process.env.MPESA_CALLBACK_URL,
    }
    if (Object.values(config).some((value) => !value)) {
      return NextResponse.json({ error: "M-Pesa payments are not configured" }, { status: 503 })
    }

    const admin = createSupabaseAdminClient()
    const { data: order, error: orderError } = await admin.from("orders").select("id, order_number, total_kes, payment_status").eq("id", orderId).single()
    if (orderError || !order) return NextResponse.json({ error: "Order not found" }, { status: 404 })
    if (order.payment_status !== "pending") return NextResponse.json({ error: "Order is not payable" }, { status: 409 })

    const auth = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString("base64")
    const tokenResponse = await fetch("https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${auth}` },
    })
    if (!tokenResponse.ok) throw new Error("Unable to authenticate with M-Pesa")
    const { access_token: accessToken } = await tokenResponse.json()
    const timestamp = darajaTimestamp()
    const password = Buffer.from(`${config.shortcode}${config.passkey}${timestamp}`).toString("base64")
    const response = await fetch("https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        BusinessShortCode: config.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: order.total_kes,
        PartyA: phone,
        PartyB: config.shortcode,
        PhoneNumber: phone,
        CallBackURL: config.callbackUrl,
        AccountReference: order.order_number,
        TransactionDesc: "GiftBasket order",
      }),
    })
    const result = await response.json()
    if (!response.ok || result.ResponseCode !== "0") throw new Error(result.errorMessage || "M-Pesa request failed")

    await admin.from("orders").update({ payment_provider: "mpesa", payment_reference: result.CheckoutRequestID }).eq("id", order.id)
    return NextResponse.json({ message: "STK push sent", checkoutRequestId: result.CheckoutRequestID })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid M-Pesa details" }, { status: 400 })
    console.error("M-Pesa payment error:", error)
    return NextResponse.json({ error: "Unable to start M-Pesa payment" }, { status: 502 })
  }
}
