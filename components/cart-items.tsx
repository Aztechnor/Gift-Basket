"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Trash2, Heart, Gift, MessageSquare, Edit2, Calendar, User, MapPin } from "lucide-react"

// Mock cart items
const initialCartItems = [
  {
    id: 1,
    name: "Classic Red Rose Bouquet",
    price: 8500,
    quantity: 1,
    image: "/placeholder.svg?height=160&width=160",
    recipient: "Sarah (Partner)",
    occasion: "Anniversary",
    hasMessage: true,
    message: "Happy Anniversary, my love!",
    hasGiftWrap: true,
    deliveryDate: "Oct 12, 2026",
    deliveryLocation: "Nairobi",
  },
  {
    id: 2,
    name: "Artisan Chocolate Truffle Box",
    price: 4500,
    quantity: 2,
    image: "/placeholder.svg?height=160&width=160",
    recipient: "James (Friend)",
    occasion: "Birthday",
    hasMessage: false,
    hasGiftWrap: false,
    deliveryDate: "Oct 15, 2026",
    deliveryLocation: "Mombasa",
  },
]

export function CartItems() {
  const [items, setItems] = useState(initialCartItems)

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  if (items.length === 0) {
    return (
      <Card className="border-dashed border-2 bg-zinc-50/50">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-zinc-400 mb-2">
            <Gift className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900">Your cart is empty</h3>
          <p className="text-zinc-500 max-w-sm">Looks like you haven't added any gifts yet. Find something special for your loved ones.</p>
          <Button asChild className="mt-4 rounded-xl">
            <Link href="/products">Browse Gifts</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 flex flex-col sm:flex-row gap-6">
              {/* Product Image */}
              <div className="shrink-0 w-32 h-32 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200/50 relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="font-bold text-lg text-zinc-900 truncate">
                    <Link href={`/products/${item.id}`} className="hover:underline">{item.name}</Link>
                  </h3>
                  <span className="font-bold text-lg whitespace-nowrap">{formatCurrency(item.price)}</span>
                </div>

                {/* Gift Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4 mt-2">
                  <div className="flex items-center text-sm text-zinc-600">
                    <User className="w-4 h-4 mr-2 text-zinc-400 shrink-0" />
                    <span className="truncate"><span className="text-zinc-400 mr-1">For:</span> {item.recipient}</span>
                  </div>
                  <div className="flex items-center text-sm text-zinc-600">
                    <Calendar className="w-4 h-4 mr-2 text-zinc-400 shrink-0" />
                    <span className="truncate"><span className="text-zinc-400 mr-1">Occasion:</span> {item.occasion}</span>
                  </div>
                  <div className="flex items-center text-sm text-zinc-600">
                    <MapPin className="w-4 h-4 mr-2 text-zinc-400 shrink-0" />
                    <span className="truncate"><span className="text-zinc-400 mr-1">Delivery:</span> {item.deliveryDate} to {item.deliveryLocation}</span>
                  </div>
                  <div className="flex items-center text-sm text-zinc-600">
                    <span className="w-4 h-4 mr-2 text-zinc-400 shrink-0 font-medium">Qty:</span>
                    <span>{item.quantity}</span>
                  </div>
                </div>

                {/* Gift Badges / Add-ons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.hasMessage ? (
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      <MessageSquare className="w-3 h-3 mr-1" /> Message Added
                    </Badge>
                  ) : (
                    <button type="button" className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 border-zinc-200 text-zinc-500 hover:text-zinc-900">
                      <MessageSquare className="w-3 h-3 mr-1" /> Add Message
                    </button>
                  )}
                  {item.hasGiftWrap ? (
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                      <Gift className="w-3 h-3 mr-1" /> Gift Wrapped
                    </Badge>
                  ) : (
                    <button type="button" className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 border-zinc-200 text-zinc-500 hover:text-zinc-900">
                      <Gift className="w-3 h-3 mr-1" /> Add Gift Wrap
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-zinc-100">
                  <button type="button" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 flex items-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded">
                    <Edit2 className="w-4 h-4 mr-1.5" />
                    Edit Gift
                  </button>
                  <div className="w-px h-4 bg-zinc-200"></div>
                  <button type="button" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 flex items-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded">
                    <Heart className="w-4 h-4 mr-1.5" />
                    Save for Later
                  </button>
                  <div className="w-px h-4 bg-zinc-200"></div>
                  <button type="button" onClick={() => removeItem(item.id)} className="text-sm font-medium text-zinc-600 hover:text-red-600 flex items-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded">
                    <Trash2 className="w-4 h-4 mr-1.5" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
