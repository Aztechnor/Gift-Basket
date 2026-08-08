import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OccasionsSection } from "@/components/occasions-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CustomPrintingSection } from "@/components/custom-printing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { AIRecommendationWidget } from "@/components/ai-recommendation-widget"
import { AIChatCTA } from "@/components/ai-chat-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <Header />
      <main>
        <HeroSection />
        <OccasionsSection />
        <FeaturedProducts />
        <AIRecommendationWidget />
        <AIChatCTA />
        <CustomPrintingSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
