import { NextRequest, NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const callback = payload?.Body?.stkCallback
    const checkoutRequestId = callback?.CheckoutRequestID
    if (!checkoutRequestId) return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" })

    const admin = createSupabaseAdminClient()
    const successful = callback.ResultCode === 0
    await admin.from("orders").update({
      status: successful ? "paid" : "awaiting_payment",
      payment_status: successful ? "paid" : "failed",
    }).eq("payment_reference", checkoutRequestId)

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" })
  } catch (error) {
    console.error("M-Pesa callback error:", error)
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" })
  }
}
