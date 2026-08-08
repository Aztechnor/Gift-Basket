import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, Building } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "HR Director",
    company: "TechCorp Solutions",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "GiftBasket transformed our employee recognition program. The quality and personalization options are outstanding, and our team loves the thoughtful gifts.",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "Innovation Labs",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Our client appreciation gifts from GiftBasket have strengthened our business relationships significantly. The service is professional and reliable.",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Event Manager",
    company: "Global Events Inc",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "For our corporate events, GiftBasket delivers exceptional quality and service. Their bulk ordering process is seamless and efficient.",
    logo: "/placeholder.svg?height=40&width=120",
  },
]

export function CorporateTestimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Trusted by Leading Companies</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our corporate clients say about our gifting solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-pink-200" />
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-pink-600 font-medium flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
