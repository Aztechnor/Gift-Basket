import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIRecommendationEngine } from "@/components/ai-recommendation-engine"
import { Sparkles, Brain, Target } from "lucide-react"

export default function AIRecommendationsPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Brain className="w-8 h-8 text-pink-500" />
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Gift Recommendations
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience the future of gift-giving with our advanced AI that learns your preferences, understands your
              recipient, and creates personalized recommendations with scientific precision.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <Brain className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Smart Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Our AI analyzes thousands of successful gift combinations to understand what works best
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <Target className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Personalized Matching</h3>
                <p className="text-gray-600 text-sm">
                  Tailored recommendations based on occasion, budget, recipient profile, and cultural context
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <Sparkles className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Confidence Scoring</h3>
                <p className="text-gray-600 text-sm">
                  Each recommendation comes with a confidence score based on similar successful purchases
                </p>
              </div>
            </div>
          </section>

          <AIRecommendationEngine />
        </div>
      </main>
      <Footer />
    </div>
  )
}
