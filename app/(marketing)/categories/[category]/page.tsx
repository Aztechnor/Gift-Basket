import { FeaturedProducts } from "@/components/featured-products"
import { Gift } from "lucide-react"

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryName = resolvedParams.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Gift className="w-6 h-6 text-pink-500" />
              <span className="text-sm font-medium text-pink-600 uppercase tracking-wide">Category</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-zinc-900 mb-6">
              {categoryName}
            </h1>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              Browse our complete collection of carefully selected gifts for {categoryName.toLowerCase()}, perfect for any occasion.
            </p>
          </div>
        </section>
        <FeaturedProducts />
      </main>
    </div>
  )
}