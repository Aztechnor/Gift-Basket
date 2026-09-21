import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OccasionsSection } from "@/components/occasions-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CustomPrintingSection } from "@/components/custom-printing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { AIRecommendationWidget } from "@/components/ai-recommendation-widget"
import { AIChatCTA } from "@/components/ai-chat-cta"
import { Button } from "@/components/ui/button"
import { Gift, Sparkles, ShieldCheck, Truck } from "lucide-react"
import Link from "next/link"

const collectionHighlights = [
  { title: "Birthday Magic", description: "Fun, joyful gifting that feels personal from the very first glance.", href: "/occasions/birthday" },
  { title: "Romance Essentials", description: "Elegant keepsakes and thoughtful details made to impress.", href: "/recipients/partner" },
  { title: "Corporate Thanks", description: "Build stronger relationships with premium appreciation gifting.", href: "/corporate" },
]

const trustPoints = [
  { icon: Truck, title: "Fast delivery", description: "Same-day and next-day courier options across major cities." },
  { icon: ShieldCheck, title: "Trusted quality", description: "Curated partners and gift-ready packaging from our in-house team." },
  { icon: Sparkles, title: "AI-powered picks", description: "Recommendations tuned to the recipient, occasion, and budget." },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <Header />
      <main>
        <HeroSection />
        <OccasionsSection />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                <Gift className="h-4 w-4 text-zinc-900" />
                Explore curated collections
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
                Thoughtful gifting, made beautifully easy.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {collectionHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <p className="mb-3 text-lg font-semibold text-zinc-900">{item.title}</p>
                  <p className="mb-5 text-sm leading-6 text-zinc-600">{item.description}</p>
                  <Button asChild variant="outline" className="rounded-full border-zinc-200 bg-white hover:bg-zinc-100">
                    <Link href={item.href}>Browse collection</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-zinc-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">Why customers choose GiftBasket</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {trustPoints.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-zinc-900">{title}</h3>
                  <p className="text-sm leading-6 text-zinc-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
