import { OccasionProductGrid } from "@/components/occasion-product-grid"
import { OccasionHero } from "@/components/occasion-hero"
import { notFound } from "next/navigation"

const occasionData = {
  valentines: {
    name: "Valentine's Day Gifts",
    description: "Express your love with romantic gestures, elegant bouquets, and curated selections for that special someone.",
    heroImage: "/placeholder.svg?height=400&width=800",
    color: "from-rose-400 to-rose-600",
    bgColor: "bg-rose-50",
  },
  "get-well-soon": {
    name: "Get Well Soon Packages",
    description: "Send comfort and warm wishes for a speedy recovery with thoughtful, nurturing gifts.",
    heroImage: "/placeholder.svg?height=400&width=800",
    color: "from-teal-400 to-teal-600",
    bgColor: "bg-teal-50",
  },
  "self-care": {
    name: "Self Care & Wellness",
    description: "Comforting care packages for everyday moments, menstrual cycle relief, and much needed spa days.",
    heroImage: "/placeholder.svg?height=400&width=800",
    color: "from-indigo-400 to-indigo-600",
    bgColor: "bg-indigo-50",
  },
  "thinking-of-you": {
    name: "Thinking of You",
    description: "Because every day is an occasion. Show you care with surprise 'just because' gifts.",
    heroImage: "/placeholder.svg?height=400&width=800",
    color: "from-amber-400 to-amber-600",
    bgColor: "bg-amber-50",
  },
  birthday: {
    name: "Birthday Celebrations",
    description: "Make every birthday unforgettable with personalized gifts tailored to their unique personality.",
    heroImage: "/placeholder.svg?height=400&width=800",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
  },
  sympathy: {
    name: "Sympathy & Condolences",
    description: "Express your deepest condolences with tasteful, comforting arrangements.",
    heroImage: "/placeholder.svg?height=400&width=800",
    color: "from-slate-500 to-slate-700",
    bgColor: "bg-slate-50",
  },
  anniversary: {
    name: "Anniversary Gifts",
    description: "Celebrate love, commitment, and beautiful milestones with romantic gifts for couples.",
    heroImage: "/placeholder.svg?height=400&width=800",
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-pink-50",
  },
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function OccasionPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const occasion = occasionData[slug as keyof typeof occasionData]

  if (!occasion) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main>
        <OccasionHero occasion={occasion} slug={slug} />
        <OccasionProductGrid occasionSlug={slug} />
      </main>
    </div>
  )
}
