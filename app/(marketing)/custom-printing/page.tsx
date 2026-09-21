import { CustomPrintingHero } from "@/components/custom-printing-hero"
import { PrintingServicesGrid } from "@/components/printing-services-grid"
import { DesignStudio } from "@/components/design-studio"

export default function CustomPrintingPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main>
        <CustomPrintingHero />
        <PrintingServicesGrid />
        <DesignStudio />
      </main>
    </div>
  )
}
