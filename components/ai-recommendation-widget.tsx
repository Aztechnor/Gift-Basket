"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AIRecommendationEngine, type RecommendationItem } from "@/lib/ai-recommendations"
import { formatCurrency } from "@/lib/utils"

export function AIRecommendationWidget() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPersonalizedSuggestions = async () => {
      const aiEngine = AIRecommendationEngine.getInstance()
      try {
        const suggestions = await aiEngine.getPersonalizedSuggestions("user-123")
        setRecommendations(suggestions)
      } catch (error) {
        console.error("Failed to load AI suggestions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPersonalizedSuggestions()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-zinc-300 mx-auto mb-4 animate-pulse" />
            <p className="text-zinc-500 font-medium">Curating thoughtful suggestions...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-zinc-900" />
            <span className="text-sm font-medium text-zinc-900 uppercase tracking-widest">Personalized For You</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-4">Thoughtful Suggestions</h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-6">
            We've noticed what you like. Here are some ideas we think you—or someone you love—will appreciate.
          </p>
          <Link href="/ai-recommendations">
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Help Me Find a Gift
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((item, index) => (
            <Card
              key={item.id}
              className="group hover:shadow-lg transition-all duration-300 border border-zinc-200/50 shadow-sm overflow-hidden hover:border-zinc-300"
            >
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <Badge className="absolute top-4 left-4 bg-zinc-900 text-white border-0 shadow-sm px-3 py-1 font-medium">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  Top Match
                </Badge>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm flex items-center space-x-1.5" aria-label={`Rating: ${item.rating} stars`}>
                  <Star className="w-3 h-3 fill-zinc-900 text-zinc-900" aria-hidden="true" />
                  <span className="text-xs font-semibold text-zinc-900">{item.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-3">
                  <Badge variant="secondary" className="text-xs font-medium bg-zinc-100 text-zinc-700 border-0">
                    {item.category}
                  </Badge>
                </div>

                <h3 className="font-bold text-lg text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors line-clamp-2 leading-snug">
                  <Link href={`/products/${item.id}`} className="focus:outline-none focus-visible:underline">
                    {item.name}
                  </Link>
                </h3>

                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-zinc-700 leading-relaxed italic">
                    "{item.aiReason}"
                  </p>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-bold text-zinc-900">{formatCurrency(item.price)}</span>
                  <Badge className="bg-zinc-100 text-zinc-700 text-xs border border-zinc-200 font-medium">
                    {Math.round(item.confidence * 100)}% Match
                  </Badge>
                </div>

                <Button asChild className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 shadow-sm font-medium">
                  <Link href={`/products/${item.id}`}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Gift
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16 px-2">
          <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 lg:p-16 text-white max-w-4xl mx-auto shadow-sm">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-zinc-300" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Not quite what you're looking for?</h3>
            <p className="text-lg md:text-xl mb-8 text-zinc-300 max-w-2xl mx-auto">
              Tell us a little about the person you're shopping for, and we'll help you find something they'll love.
            </p>
            <Link href="/ai-recommendations" className="block w-full sm:inline-block sm:w-auto">
              <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-8 h-14 text-base font-medium w-full shadow-sm">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Gift Finder
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
