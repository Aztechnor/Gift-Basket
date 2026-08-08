import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles, TrendingUp, Crown, Heart } from "lucide-react"

const collections = [
  {
    id: "luxury-premium",
    name: "Luxury Premium",
    description: "The finest selection of high-end gifts for discerning tastes",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 85,
    priceRange: "$100 - $500",
    rating: 4.9,
    isNew: false,
    isTrending: true,
    color: "from-zinc-500 to-zinc-900",
  },
  {
    id: "artisan-crafted",
    name: "Artisan Crafted",
    description: "Handmade treasures from skilled artisans around the world",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 120,
    priceRange: "$25 - $200",
    rating: 4.8,
    isNew: true,
    isTrending: false,
    color: "from-zinc-500 to-zinc-900",
  },
  {
    id: "eco-friendly",
    name: "Eco-Friendly",
    description: "Sustainable and environmentally conscious gift options",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 95,
    priceRange: "$15 - $150",
    rating: 4.7,
    isNew: false,
    isTrending: true,
    color: "from-zinc-500 to-zinc-900",
  },
  {
    id: "personalized",
    name: "Personalized Gifts",
    description: "Custom gifts that add a personal touch to every occasion",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 200,
    priceRange: "$20 - $300",
    rating: 4.9,
    isNew: false,
    isTrending: false,
    color: "from-zinc-500 to-zinc-900",
  },
  {
    id: "gourmet-treats",
    name: "Gourmet Treats",
    description: "Delicious edible arrangements and gourmet food selections",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 150,
    priceRange: "$30 - $250",
    rating: 4.8,
    isNew: true,
    isTrending: true,
    color: "from-zinc-500 to-zinc-900",
  },
  {
    id: "tech-gadgets",
    name: "Tech & Gadgets",
    description: "Modern technology gifts for the tech-savvy recipient",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 75,
    priceRange: "$25 - $400",
    rating: 4.6,
    isNew: false,
    isTrending: false,
    color: "from-slate-500 to-gray-600",
  },
]

export function CollectionsGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Link key={collection.id} href={`/collections/${collection.id}`}>
              <Card
                className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border border-zinc-200/50 shadow-sm overflow-hidden hover:border-zinc-300 bg-white ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="relative">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {collection.isNew && <Badge className="bg-zinc-900 text-white border-0">New</Badge>}
                    {collection.isTrending && (
                      <Badge className="bg-zinc-100 text-zinc-900 border border-zinc-200/50">
                        <TrendingUp className="w-3 h-3 mr-1.5" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1.5 shadow-sm">
                    <Star className="w-3 h-3 fill-zinc-900 text-zinc-900" />
                    <span className="text-xs font-semibold text-zinc-900">{collection.rating}</span>
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                      {collection.name}
                    </h3>
                    {index === 0 && <Crown className="w-5 h-5 text-zinc-900" />}
                  </div>

                  <p className="text-zinc-500 mb-6 text-sm leading-relaxed">{collection.description}</p>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-zinc-900">{collection.itemCount} items</span>
                    <span className="text-sm font-medium text-zinc-400">{collection.priceRange}</span>
                  </div>

                  <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 group-hover:shadow-md transition-all duration-300">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Explore Collection
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-16 bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 lg:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 tracking-tight">Can't Find What You're Looking For?</h3>
            <p className="text-base md:text-lg mb-8 md:mb-10 text-zinc-400 max-w-2xl mx-auto px-2">
              Let our AI recommendation engine create a custom collection just for you based on your preferences and occasion
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full">
              <Button
                size="lg"
                className="bg-white text-zinc-900 hover:bg-zinc-100 px-6 md:px-8 h-12 md:h-14 rounded-full text-sm md:text-base font-medium w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Get AI Recommendations
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-zinc-700 text-white hover:bg-white hover:text-zinc-900 px-6 md:px-8 h-12 md:h-14 rounded-full text-sm md:text-base font-medium bg-zinc-800 w-full sm:w-auto"
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Create Custom Collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
