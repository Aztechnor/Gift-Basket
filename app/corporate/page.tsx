import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CorporateHero } from "@/components/corporate-hero"
import { CorporateServices } from "@/components/corporate-services"
import { CorporateTestimonials } from "@/components/corporate-testimonials"

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <Header />
      <main>
        <CorporateHero />
        <CorporateServices />
        <CorporateTestimonials />
      </main>
      <Footer />
    </div>
  )
}
