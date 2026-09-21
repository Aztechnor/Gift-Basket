import Link from "next/link"
import { CartItems } from "@/components/cart-items"
import { OrderSummary } from "@/components/order-summary"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100 flex flex-col">
      <main className="py-8 flex-1">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Your Gifts</h1>
              <p className="text-lg text-gray-600">Review your gifts before checking out</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <CartItems />
            </div>
            <div>
              <OrderSummary isCart />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
