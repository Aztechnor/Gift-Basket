import { ProductCard, type Product } from "@/components/product-card"
import { Gift, SlidersHorizontal, Sparkles } from "lucide-react"

const products: Product[] = [
  { id: 1, name: "Classic Red Rose Bouquet", price: 8500, originalPrice: 10000, rating: 4.9, reviews: 245, image: "/placeholder.svg?height=300&width=300", category: "Flowers", isAiRecommended: true, tags: ["Romance", "Anniversary"], availability: "Same-Day Delivery" },
  { id: 2, name: "Artisan Chocolate Truffle Box", price: 4500, originalPrice: 4500, rating: 4.8, reviews: 189, image: "/placeholder.svg?height=300&width=300", category: "Chocolates", tags: ["Sweet", "Birthday"] },
  { id: 3, name: "Self-Care Sunday Retreat", price: 12000, originalPrice: 15000, rating: 4.9, reviews: 156, image: "/placeholder.svg?height=300&width=300", category: "Self-care", isAiRecommended: true, tags: ["Relaxation", "Get Well Soon"] },
  { id: 4, name: "Gourmet Fruit & Cheese Board", price: 9500, originalPrice: 11000, rating: 4.7, reviews: 203, image: "/placeholder.svg?height=300&width=300", category: "Edible", tags: ["Corporate", "Thank You"], availability: "Next-Day Delivery" },
  { id: 5, name: "Luxury Candle Set", price: 6200, originalPrice: 7800, rating: 4.8, reviews: 132, image: "/placeholder.svg?height=300&width=300", category: "Home", isAiRecommended: true, tags: ["Cozy", "Self-care"] },
  { id: 6, name: "Signature Tea & Biscuit Box", price: 5100, originalPrice: 6100, rating: 4.7, reviews: 118, image: "/placeholder.svg?height=300&width=300", category: "Beverages", tags: ["Tea Time", "Thoughtful"] },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main>
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 flex items-center justify-center space-x-2">
              <Gift className="h-6 w-6 text-pink-500" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-pink-600">All gifts</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 lg:text-6xl">Thoughtful gifts for every moment.</h1>
            <p className="mx-auto max-w-3xl text-xl text-zinc-600">
              Browse the GiftBasket collection for birthdays, anniversaries, corporate appreciation, and everyday surprises.
            </p>
          </div>
        </section>

        <section className="border-y border-zinc-200 bg-zinc-50/80 py-5">
          <div className="container mx-auto flex flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <SlidersHorizontal className="h-4 w-4" />
              Curated for joy, care, and celebration
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Sparkles className="h-4 w-4 text-pink-500" />
              AI recommends the best match for your recipient
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
