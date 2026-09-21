import { FeaturedProducts } from "@/components/featured-products"
import { Gift } from "lucide-react"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Gift className="w-6 h-6 text-pink-500" />
              <span className="text-sm font-medium text-pink-600 uppercase tracking-wide">All Gifts</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-zinc-900 mb-6">
              Thoughtful Gifts for Everyone
            </h1>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              Browse our complete collection of carefully selected gifts, perfect for any occasion.
            </p>
          </div>
        </section>
        <FeaturedProducts />
      </main>
    </div>
  )
}
