"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Sparkles, Eye } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  isAiRecommended?: boolean
  tags: string[]
  availability?: string
}

export function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-zinc-200/50 shadow-sm overflow-hidden bg-white hover:border-zinc-300 h-full flex flex-col relative focus-within:ring-2 focus-within:ring-zinc-900">
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-0" aria-label={`View details for ${product.name}`}>
        <span className="sr-only">View {product.name}</span>
      </Link>
      
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt=""
          width={300}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isAiRecommended && (
            <Badge className="bg-zinc-900 text-white border-0 shadow-sm px-3 py-1 font-medium z-10 w-fit">
              <Sparkles className="w-3 h-3 mr-1.5" />
              AI Pick
            </Badge>
          )}
          {product.availability === "Same-Day Delivery" && (
            <Badge className="bg-emerald-100 text-emerald-800 border-0 shadow-sm px-3 py-1 font-medium z-10 w-fit">
              Same-Day
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-sm focus:ring-2 focus:ring-zinc-900 h-9 w-9"
            onClick={toggleFavorite}
            aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
            aria-pressed={isFavorite}
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-zinc-600"
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-sm focus:ring-2 focus:ring-zinc-900 h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={`Quick preview for ${product.name}`}
          >
            <Eye className="w-4 h-4 text-zinc-600" />
          </Button>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1 relative z-10 pointer-events-none">
        <div className="mb-3 flex justify-between items-start pointer-events-auto">
          <Badge variant="secondary" className="text-xs font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-0">
            {product.category}
          </Badge>
        </div>

        <h3 className="font-bold text-lg text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors line-clamp-2 leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 mb-4" aria-label={`Rating: ${product.rating} out of 5 stars`}>
          <div className="flex" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "fill-zinc-900 text-zinc-900" : "text-zinc-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-zinc-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-zinc-200 text-zinc-600 bg-white">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 mb-6">
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price ? (
              <>
                <span className="text-sm font-medium text-zinc-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="text-xl font-bold text-zinc-900">
                  {formatCurrency(product.price)}
                  <span className="ml-2 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full inline-block align-middle mb-1">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-zinc-900">{formatCurrency(product.price)}</span>
            )}
          </div>
        </div>

        <Button asChild className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 shadow-sm font-medium pointer-events-auto relative z-20">
          <Link href={`/products/${product.id}`}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            View Gift
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
