import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OccasionsGrid } from "@/components/occasions-grid"
import { Sparkles } from "lucide-react"

export default function OccasionsPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-pink-500" />
              <span className="text-sm font-medium text-pink-600 uppercase tracking-wide">Special Occasions</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Gifts for Every{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Occasion
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From intimate celebrations to grand festivities, discover curated gift collections that make every moment
              unforgettable
            </p>
          </div>
        </section>

        <OccasionsGrid />
      </main>
      <Footer />
    </div>
  )
}
