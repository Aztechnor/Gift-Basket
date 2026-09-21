"use client"

import { useState } from "react"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "">("")

  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete your purchase securely with M-Pesa or card payment
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            </div>
            <div>
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
