import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Gift, Award, Calendar, Briefcase, Star } from "lucide-react"

const services = [
  {
    id: "employee-recognition",
    name: "Employee Recognition",
    description: "Celebrate achievements and milestones with meaningful gifts that show appreciation",
    icon: Award,
    features: ["Custom awards", "Service anniversary gifts", "Performance bonuses", "Team celebrations"],
    startingPrice: "$25",
  },
  {
    id: "client-appreciation",
    name: "Client Appreciation",
    description: "Strengthen business relationships with thoughtful gifts for your valued clients",
    icon: Star,
    features: ["Holiday gifts", "Thank you packages", "Welcome gifts", "Milestone celebrations"],
    startingPrice: "$50",
  },
  {
    id: "corporate-events",
    name: "Corporate Events",
    description: "Make your corporate events memorable with branded gifts and welcome packages",
    icon: Calendar,
    features: ["Conference swag", "Welcome bags", "Speaker gifts", "Attendee appreciation"],
    startingPrice: "$15",
  },
  {
    id: "executive-gifts",
    name: "Executive Gifts",
    description: "Premium gifts for executives, board members, and high-value stakeholders",
    icon: Briefcase,
    features: ["Luxury items", "Custom packaging", "Personal touch", "White-glove service"],
    startingPrice: "$100",
  },
  {
    id: "new-hire-welcome",
    name: "New Hire Welcome",
    description: "Welcome new team members with branded gifts that make a great first impression",
    icon: Users,
    features: ["Welcome kits", "Company swag", "Onboarding gifts", "Team integration"],
    startingPrice: "$35",
  },
  {
    id: "holiday-corporate",
    name: "Holiday Gifts",
    description: "Spread holiday cheer with seasonal corporate gifts for employees and clients",
    icon: Gift,
    features: ["Seasonal themes", "Bulk ordering", "Custom cards", "Delivery coordination"],
    startingPrice: "$30",
  },
]

export function CorporateServices() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Corporate Gift Solutions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive corporate gifting services tailored to your business needs and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-pink-500" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">From {service.startingPrice}</span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Elevate Your Corporate Gifting?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let our corporate gift specialists help you create the perfect gifting strategy for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold"
            >
              Schedule Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3 rounded-full text-lg font-semibold"
            >
              Download Catalog
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
