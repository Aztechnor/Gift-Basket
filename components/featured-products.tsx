"use client"

import { Sparkles } from "lucide-react"
import { ProductCard, type Product } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Classic Red Rose Bouquet",
    price: 8500,
    originalPrice: 10000,
    rating: 4.9,
    reviews: 245,
    image: "/placeholder.svg?height=300&width=300",
    category: "Flowers",
    isAiRecommended: true,
    tags: ["Romance", "Anniversary"],
    availability: "Same-Day Delivery",
  },
  {
    id: 2,
    name: "Artisan Chocolate Truffle Box",
    price: 4500,
    originalPrice: 4500,
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=300",
    category: "Chocolates",
    isAiRecommended: false,
    tags: ["Sweet", "Birthday"],
  },
  {
    id: 3,
    name: "Self-Care Sunday Retreat",
    price: 12000,
    originalPrice: 15000,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Self-care",
    isAiRecommended: true,
    tags: ["Relaxation", "Get Well Soon"],
  },
  {
    id: 4,
    name: "Gourmet Fruit & Cheese Board",
    price: 9500,
    originalPrice: 11000,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    category: "Edible",
    isAiRecommended: true,
    tags: ["Corporate", "Thank You"],
    availability: "Next-Day Delivery",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 bg-zinc-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-zinc-900" />
            <span className="text-sm font-medium text-zinc-900 uppercase tracking-widest">Trending Now</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-4">Most Loved Gifts</h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Discover what others are sending to make someone's day special.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild
            variant="outline"
            size="lg"
            className="border-zinc-200 text-zinc-700 hover:bg-zinc-50 px-8 h-12 md:h-14 rounded-full text-sm md:text-base font-medium w-full sm:w-auto shadow-sm"
          >
            <Link href="/categories">Explore All Gifts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
