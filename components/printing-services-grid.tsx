import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shirt, Coffee, Heart, Palette, Gift, Star } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const printingServices = [
  {
    id: "tshirts",
    name: "Custom T-Shirts",
    description: "Premium quality cotton tees with your design. Available in multiple colors and sizes.",
    icon: Shirt,
    image: "/placeholder.svg?height=300&width=300",
    startingPrice: 2600,
    colors: 15,
    sizes: "XS-3XL",
    turnaround: "2-3 days",
    rating: 4.9,
    popular: true,
  },
  {
    id: "mugs",
    name: "Personalized Mugs",
    description: "Ceramic mugs perfect for daily use. Dishwasher and microwave safe.",
    icon: Coffee,
    image: "/placeholder.svg?height=300&width=300",
    startingPrice: 1700,
    colors: 8,
    sizes: "11oz, 15oz",
    turnaround: "1-2 days",
    rating: 4.8,
    popular: true,
  },
  {
    id: "hoodies",
    name: "Custom Hoodies",
    description: "Cozy hoodies with personalized prints. Perfect for gifts and personal use.",
    icon: Heart,
    image: "/placeholder.svg?height=300&width=300",
    startingPrice: 4550,
    colors: 12,
    sizes: "XS-3XL",
    turnaround: "3-4 days",
    rating: 4.7,
    popular: false,
  },
  {
    id: "cushions",
    name: "Photo Cushions",
    description: "Soft cushions with your favorite memories. High-quality fabric printing.",
    icon: Palette,
    image: "/placeholder.svg?height=300&width=300",
    startingPrice: 3250,
    colors: 6,
    sizes: "16x16, 18x18",
    turnaround: "2-3 days",
    rating: 4.6,
    popular: false,
  },
  {
    id: "canvas",
    name: "Canvas Prints",
    description: "Transform your photos into beautiful canvas art pieces.",
    icon: Gift,
    image: "/placeholder.svg?height=300&width=300",
    startingPrice: 3900,
    colors: "Full Color",
    sizes: "Multiple",
    turnaround: "3-5 days",
    rating: 4.8,
    popular: true,
  },
  {
    id: "phone-cases",
    name: "Phone Cases",
    description: "Protect your phone with style. Custom designs on durable cases.",
    icon: Star,
    image: "/placeholder.svg?height=300&width=300",
    startingPrice: 2200,
    colors: "Full Color",
    sizes: "All Models",
    turnaround: "1-2 days",
    rating: 4.5,
    popular: false,
  },
]

export function PrintingServicesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Our Printing Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            High-quality custom printing on a variety of products. Fast turnaround times and satisfaction guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {printingServices.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {service.popular && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                      Popular
                    </Badge>
                  )}

                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-pink-500" />
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/90 rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{service.rating}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Colors:</span>
                      <span className="font-medium">{service.colors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sizes:</span>
                      <span className="font-medium">{service.sizes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Turnaround:</span>
                      <span className="font-medium text-green-600">{service.turnaround}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      From {formatCurrency(service.startingPrice)}
                    </span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    <Palette className="w-4 h-4 mr-2" />
                    Customize Now
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
