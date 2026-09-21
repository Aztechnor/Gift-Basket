import { CorporateHero } from "@/components/corporate-hero"
import { CorporateServices } from "@/components/corporate-services"
import { CorporateTestimonials } from "@/components/corporate-testimonials"

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main>
        <CorporateHero />
        <CorporateServices />
        <CorporateTestimonials />
      </main>
    </div>
  )
}
