import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Baby, Heart, Cake, Briefcase, Gift, Users, Crown, Flower } from "lucide-react"

const occasions = [
  {
    id: "baby-shower",
    name: "Baby Showers",
    description: "Welcome new arrivals with thoughtful, practical gifts that celebrate this precious milestone",
    icon: Baby,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    itemCount: 150,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    priceRange: "$25 - $150",
  },
  {
    id: "ruracio",
    name: "Ruracio",
    description: "Honor traditional Kenyan engagement ceremonies with authentic, culturally significant gifts",
    icon: Heart,
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    itemCount: 80,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    priceRange: "$50 - $300",
  },
  {
    id: "quinceanera",
    name: "Quinceañeras",
    description: "Celebrate the transition to womanhood with elegant, meaningful gifts for this special day",
    icon: Crown,
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-pink-50",
    itemCount: 120,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    priceRange: "$40 - $250",
  },
  {
    id: "birthday",
    name: "Birthdays",
    description: "Make every birthday special with personalized gifts tailored to age and interests",
    icon: Cake,
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    itemCount: 300,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    priceRange: "$15 - $200",
  },
  {
    id: "anniversary",
    name: "Anniversaries",
    description: "Celebrate love and milestones with romantic, thoughtful gifts for couples",
    icon: Users,
    color: "from-rose-400 to-rose-600",
    bgColor: "bg-rose-50",
    itemCount: 180,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    priceRange: "$30 - $400",
  },
  {
    id: "graduation",
    name: "Graduations",
    description: "Honor academic achievements with inspiring gifts for the next chapter",
    icon: Gift,
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    itemCount: 95,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    priceRange: "$20 - $180",
  },
  {
    id: "wedding",
    name: "Weddings",
    description: "Celebrate new unions with elegant gifts that mark this beautiful beginning",
    icon: Flower,
    color: "from-indigo-400 to-indigo-600",
    bgColor: "bg-indigo-50",
    itemCount: 220,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    priceRange: "$35 - $500",
  },
  {
    id: "corporate",
    name: "Corporate Events",
    description: "Professional gifts for business milestones, appreciation, and corporate celebrations",
    icon: Briefcase,
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50",
    itemCount: 200,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    priceRange: "$25 - $300",
  },
]

export function OccasionsGrid() {
  const featuredOccasions = occasions.filter((occasion) => occasion.featured)
  const otherOccasions = occasions.filter((occasion) => !occasion.featured)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Featured Occasions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredOccasions.map((occasion) => {
              const IconComponent = occasion.icon
              return (
                <Link key={occasion.id} href={`/occasions/${occasion.id}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg overflow-hidden h-full">
                    <div className="relative">
                      <Image
                        src={occasion.image || "/placeholder.svg"}
                        alt={occasion.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-white text-gray-900">Featured</Badge>
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-r ${occasion.color} flex items-center justify-center`}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                        {occasion.name}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{occasion.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-pink-600">{occasion.itemCount}+ items</span>
                        <span className="text-sm text-gray-500">{occasion.priceRange}</span>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                        Explore Collection
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Other Occasions */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Occasions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherOccasions.map((occasion) => {
              const IconComponent = occasion.icon
              return (
                <Link key={occasion.id} href={`/occasions/${occasion.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md">
                    <CardContent className="p-6">
                      <div
                        className={`w-16 h-16 rounded-2xl ${occasion.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-r ${occasion.color} flex items-center justify-center`}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                        {occasion.name}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm">{occasion.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-pink-600">{occasion.itemCount}+ items</span>
                        <span className="text-sm text-gray-400 group-hover:text-pink-500 transition-colors">
                          Explore →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
