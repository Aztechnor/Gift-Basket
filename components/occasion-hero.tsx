import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Filter, CheckCircle2 } from "lucide-react"

interface OccasionHeroProps {
  occasion: {
    name: string
    description: string
    heroImage: string
    color: string
    bgColor: string
  }
  slug: string
}

export function OccasionHero({ occasion, slug }: OccasionHeroProps) {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-zinc-200/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-200/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-zinc-900" />
              <span className="text-sm font-semibold text-zinc-900 uppercase tracking-widest">Curated Collection</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
              {occasion.name}
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 max-w-lg leading-relaxed">
              {occasion.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 h-14 rounded-full text-base font-medium shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Find the Perfect Gift
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 px-8 h-14 rounded-full text-base font-medium transition-all"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter Options
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-4 text-sm font-medium text-zinc-600">
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-zinc-400" />
                <span>Free shipping over KSh 5,000</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-zinc-400" />
                <span>Same-day delivery available</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-zinc-50 rounded-[2.5rem] p-8 lg:p-12 overflow-hidden border border-zinc-200/50">
              <Image
                src={occasion.heroImage || "/placeholder.svg"}
                alt=""
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-2xl shadow-sm mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
