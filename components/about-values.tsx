import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Sparkles, Users, Award, Leaf } from "lucide-react"

const values = [
  {
    title: "Quality First",
    description: "We source only the finest products and maintain the highest standards in everything we do",
    icon: Award,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Personal Touch",
    description: "Every gift is carefully curated with love and attention to make it truly special",
    icon: Heart,
    color: "from-pink-400 to-red-500",
  },
  {
    title: "Innovation",
    description: "We leverage AI and technology to enhance the gift-giving experience",
    icon: Sparkles,
    color: "from-purple-400 to-pink-500",
  },
  {
    title: "Customer Focus",
    description: "Our customers are at the heart of everything we do, driving our decisions and improvements",
    icon: Users,
    color: "from-blue-400 to-purple-500",
  },
  {
    title: "Trust & Security",
    description: "We protect your data and ensure secure transactions for peace of mind",
    icon: Shield,
    color: "from-green-400 to-blue-500",
  },
  {
    title: "Sustainability",
    description: "We're committed to eco-friendly practices and sustainable sourcing",
    icon: Leaf,
    color: "from-green-400 to-teal-500",
  },
]

export function AboutValues() {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide us in creating exceptional gift experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
