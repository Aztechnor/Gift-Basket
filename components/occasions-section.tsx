import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Activity, Sparkles, Smile, Coffee, Sun, CloudRain, Star, Sunrise } from "lucide-react"

const everydayOccasions = [
  {
    id: "thinking-of-you",
    name: "Thinking of You",
    description: "Send a little sign that they're on your mind",
    icon: Sparkles,
  },
  {
    id: "just-because",
    name: "Just Because",
    description: "The best reason to give a gift is no reason at all",
    icon: Smile,
  },
  {
    id: "self-care",
    name: "Self-Care",
    description: "Comfort items, period care, and relaxation",
    icon: Coffee,
  },
  {
    id: "get-well",
    name: "Get Well Soon",
    description: "Comfort and warm wishes for a speedy recovery",
    icon: Activity,
  },
  {
    id: "cheer-up",
    name: "Cheer Someone Up",
    description: "Bring a little sunshine to a cloudy day",
    icon: Sun,
  },
  {
    id: "im-sorry",
    name: "I'm Sorry",
    description: "Thoughtful ways to make amends",
    icon: CloudRain,
  },
  {
    id: "thank-you",
    name: "Thank You",
    description: "Show your appreciation in a meaningful way",
    icon: Star,
  },
  {
    id: "miss-you",
    name: "Miss You",
    description: "Bridge the distance with something special",
    icon: Heart,
  },
  {
    id: "take-care",
    name: "Take Care",
    description: "A gentle reminder to prioritize themselves",
    icon: Sunrise,
  },
]

export function OccasionsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-4">You don't need an occasion.</h2>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto">
            Life's most meaningful gifts are often the ones we don't expect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {everydayOccasions.map((occasion) => {
            const IconComponent = occasion.icon
            return (
              <Link key={occasion.id} href={`/occasions/${occasion.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-zinc-200/50 shadow-sm bg-zinc-50 hover:bg-white hover:border-zinc-300 h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 leading-tight">
                        {occasion.name}
                      </h3>
                    </div>

                    <p className="text-zinc-600 mb-6 text-base leading-relaxed flex-1">
                      {occasion.description}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-zinc-900 group-hover:text-zinc-500 transition-colors mt-auto pt-4 border-t border-zinc-200/50">
                      Explore Gifts →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
