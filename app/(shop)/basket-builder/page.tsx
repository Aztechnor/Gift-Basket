"use client"
import { BasketBuilderInterface } from "@/components/basket-builder-interface"

export default function BasketBuilderPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Custom Gift Basket Builder</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create the perfect personalized gift basket with our AI-powered recommendations
            </p>
          </div>
          <BasketBuilderInterface />
        </div>
      </main>
    </div>
  )
}
