"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { readCart, type CartProduct } from "@/lib/cart"
import { ChevronRight } from "lucide-react"

export function OrderSummary({ isCart = false }: { isCart?: boolean }) {
  const [cartItems, setCartItems] = useState<CartProduct[]>([])

  useEffect(() => {
    setCartItems(readCart())
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0)
  const shipping = 1170
  const tax = Math.round(subtotal * 0.16) // 16% VAT
  const total = subtotal + shipping + tax

  return (
    <Card className="sticky top-24 border-zinc-200">
      <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
        <CardTitle className="flex items-center justify-between">
          <span>Order Summary</span>
          <Badge variant="secondary" className="bg-white">{cartItems.length} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <div className="shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-md border border-zinc-200"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 line-clamp-2">{item.name}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-zinc-500">
                    Qty: {item.quantity ?? 1}
                  </p>
                  <p className="text-sm font-medium text-zinc-900">{formatCurrency(item.price * (item.quantity ?? 1))}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-100 pt-4 space-y-3">
          <div className="flex justify-between text-sm text-zinc-600">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-600">
            <span>Shipping:</span>
            <span>{formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-600">
            <span>VAT (16%):</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-zinc-900 border-t border-zinc-100 pt-3">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {isCart && (
          <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl shadow-md h-12">
            <Link href="/checkout">
              Proceed to Checkout
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        )}

        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
          <p className="text-sm text-emerald-800 flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
            Free delivery for orders over {formatCurrency(10000)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
