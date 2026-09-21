import { CollectionsGrid } from "@/components/collections-grid"
import { Gift } from "lucide-react"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Gift className="w-6 h-6 text-pink-500" />
              <span className="text-sm font-medium text-pink-600 uppercase tracking-wide">Curated Collections</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Premium Gift{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Collections
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our handpicked collections featuring the finest gifts, carefully curated by our experts and
              enhanced by AI recommendations
            </p>
          </div>
        </section>

        <CollectionsGrid />
      </main>
    </div>
  )
}
