"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, ShoppingCart, Sparkles, Filter } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock product data - in real app, this would come from API
const generateProducts = (occasionSlug: string) => {
  const occasionNames = {
    valentines: "Valentine's",
    "get-well-soon": "Recovery",
    sympathy: "Condolence",
    "self-care": "Wellness",
    "thinking-of-you": "Surprise",
    birthday: "Birthday",
    anniversary: "Anniversary",
  }

  const occasionName = occasionNames[occasionSlug as keyof typeof occasionNames] || "Special"

  const baseProducts = [
    {
      id: 1,
      name: "Chocolate Covered Strawberry Bouquet",
      price: 6500,
      originalPrice: 8000,
      rating: 4.9,
      reviews: 324,
      image: "/placeholder.svg?height=300&width=300",
      isAiRecommended: true,
      tags: ["Edible", "Popular"],
      description: "Fresh strawberries dipped in premium Belgian chocolate",
    },
    {
      id: 2,
      name: "Ultimate Relaxation Spa Box",
      price: 12500,
      originalPrice: 15000,
      rating: 4.8,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=300",
      isAiRecommended: true,
      tags: ["Wellness", "Luxury"],
      description: "Bath bombs, essential oils, silk mask, and scented candles",
    },
    {
      id: 3,
      name: "Classic Red Rose Bouquet",
      price: 5800,
      originalPrice: 6500,
      rating: 4.7,
      reviews: 456,
      image: "/placeholder.svg?height=300&width=300",
      isAiRecommended: false,
      tags: ["Flowers", "Classic"],
      description: "Two dozen premium long-stem red roses",
    },
    {
      id: 4,
      name: "Menstrual Comfort Kit",
      price: 7200,
      originalPrice: 8500,
      rating: 4.9,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=300",
      isAiRecommended: true,
      tags: ["Care", "Essentials"],
      description: "Heating pad, herbal teas, dark chocolate, and cozy socks",
    },
    {
      id: 5,
      name: "Gourmet Fruit & Cheese Gift",
      price: 9500,
      originalPrice: 11000,
      rating: 4.8,
      reviews: 178,
      image: "/placeholder.svg?height=300&width=300",
      isAiRecommended: false,
      tags: ["Food", "Fresh"],
      description: "Artisan cheeses, seasonal fruits, and savory crackers",
    },
    {
      id: 6,
      name: "Cozy Night In Box",
      price: 8400,
      originalPrice: 9500,
      rating: 4.6,
      reviews: 92,
      image: "/placeholder.svg?height=300&width=300",
      isAiRecommended: false,
      tags: ["Comfort", "Snacks"],
      description: "Gourmet popcorn, hot cocoa, and a soft blanket",
    },
  ]

  // Customize product names based on occasion
  return baseProducts.map((product) => ({
    ...product,
    name: `${occasionName} ${product.name}`,
  }))
}

interface OccasionProductGridProps {
  occasionSlug: string
}

export function OccasionProductGrid({ occasionSlug }: OccasionProductGridProps) {
  const [products] = useState(generateProducts(occasionSlug))
  const [favorites, setFavorites] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [filterBy, setFilterBy] = useState("all")

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const filteredProducts = products.filter((product) => {
    if (filterBy === "ai-recommended") return product.isAiRecommended
    if (filterBy === "premium") return product.tags.includes("Premium") || product.tags.includes("Luxury")
    if (filterBy === "under-100") return product.price < 13000 // Under KSh 13,000
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "popular":
        return b.reviews - a.reviews
      default:
        return b.isAiRecommended ? 1 : -1
    }
  })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {occasionSlug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Gift Collections
            </h2>
            <p className="text-gray-600">{sortedProducts.length} products available</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="ai-recommended">AI Recommended</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="under-100">Under KSh 13,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {product.isAiRecommended && (
                  <Badge className="absolute top-3 left-3 bg-zinc-900 text-white border-0 shadow-sm">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    AI Pick
                  </Badge>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full shadow-sm"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-zinc-900 text-zinc-900" : "text-zinc-400"}`}
                  />
                </Button>

                {product.originalPrice > product.price && (
                  <Badge className="absolute bottom-3 left-3 bg-white text-zinc-900 border-0 shadow-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-zinc-900 mb-2 group-hover:text-zinc-600 transition-colors">
                  {product.name}
                </h3>

                <p className="text-zinc-500 mb-4 text-sm leading-relaxed">{product.description}</p>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-zinc-900 text-zinc-900" : "text-zinc-200"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-zinc-600 font-medium">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-zinc-900">{formatCurrency(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-zinc-400 line-through font-medium">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 shadow-sm">
                    <a href={`/products/${product.id}`}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Gift</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12 md:mt-16">
        </div>
      </div>
    </section>
  )
}
