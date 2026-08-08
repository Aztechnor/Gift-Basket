import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The self-care package was absolutely perfect! Every item was thoughtfully chosen and beautifully presented. My sister said it made her entire week.",
    occasion: "Thinking of You",
  },
  {
    id: 2,
    name: "David Kimani",
    role: "Verified Buyer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "I used the AI recommendation tool to find an anniversary gift and it was spot on. The flowers arrived fresh and the engraved frame was a beautiful touch.",
    occasion: "Anniversary",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Verified Buyer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Sent a comfort package to my best friend when she was going through a tough time. It was delivered the next day and brought her to tears (the good kind!).",
    occasion: "Just Because",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-zinc-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Real stories from real customers who made someone's day special.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-zinc-200/50 shadow-sm hover:shadow-md transition-all duration-300 bg-white h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                  <div className="flex" aria-hidden="true">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-zinc-900 text-zinc-900" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-zinc-200" aria-hidden="true" />
                </div>

                <p className="text-zinc-700 mb-8 leading-relaxed flex-1">"{testimonial.text}"</p>

                <div className="flex items-center space-x-4 mt-auto border-t border-zinc-100 pt-6">
                  <Avatar className="w-12 h-12 border border-zinc-200">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt="" />
                    <AvatarFallback className="bg-zinc-100 text-zinc-900 font-semibold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-zinc-900">{testimonial.name}</h4>
                    <p className="text-sm text-zinc-500">{testimonial.role}</p>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5 px-2 py-0.5 bg-zinc-100 rounded-full inline-block">{testimonial.occasion}</p>
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
