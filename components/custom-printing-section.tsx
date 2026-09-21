import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Shirt, Coffee, Heart } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const printingServices = [
  {
    id: "engraved-jewelry",
    name: "Engraved Jewelry",
    description: "Custom pieces with meaningful coordinates, dates, or names",
    icon: Heart,
    image: "/placeholder.svg?height=200&width=200",
    startingPrice: 3500,
  },
  {
    id: "photo-frames",
    name: "Custom Framed Prints",
    description: "Your favorite memories, elegantly framed",
    icon: Palette,
    image: "/placeholder.svg?height=200&width=200",
    startingPrice: 2800,
  },
  {
    id: "mugs",
    name: "Personalized Drinkware",
    description: "Coffee mugs and tumblers for their morning routine",
    icon: Coffee,
    image: "/placeholder.svg?height=200&width=200",
    startingPrice: 1500,
  },
  {
    id: "apparel",
    name: "Custom Apparel",
    description: "Cozy wear embroidered with inside jokes or sweet messages",
    icon: Shirt,
    image: "/placeholder.svg?height=200&width=200",
    startingPrice: 2500,
  },
]

export function CustomPrintingSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-4">Personalized Keepsakes</h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Make it uniquely theirs with custom engraving, embroidery, and printing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {printingServices.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-zinc-200/50 shadow-sm hover:border-zinc-300 bg-white"
              >
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="relative mb-6 rounded-xl overflow-hidden bg-zinc-50 aspect-square">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt=""
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center shadow-sm" aria-hidden="true">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-zinc-600 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-zinc-600 mb-6 text-sm leading-relaxed flex-1">{service.description}</p>

                  <div className="flex items-center justify-center pt-4 border-t border-zinc-100 mt-auto">
                    <span className="text-sm font-semibold text-zinc-900">From {formatCurrency(service.startingPrice)}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Make It Uniquely Theirs</h3>
            <p className="text-lg md:text-xl mb-8 md:mb-10 text-zinc-300 max-w-2xl mx-auto">
              Add a personal touch with names, dates, or inside jokes. Get a real-time preview before you order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
              <Button
                asChild
                size="lg"
                className="bg-white text-zinc-900 hover:bg-zinc-100 px-8 h-14 rounded-full text-base font-medium w-full sm:w-auto shadow-sm"
              >
                <Link href="/categories/custom">Start Customizing</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-zinc-700 text-white hover:bg-zinc-800 hover:text-white px-8 h-14 rounded-full text-base font-medium bg-zinc-800/50 w-full sm:w-auto"
              >
                <Link href="/categories/custom">View Inspiration</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
