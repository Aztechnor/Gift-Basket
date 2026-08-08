import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Heart, Rocket, Globe } from "lucide-react"

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Founded with a simple idea: make gift-giving more meaningful and personal",
    icon: Lightbulb,
    color: "from-yellow-400 to-orange-500",
  },
  {
    year: "2021",
    title: "AI Integration",
    description: "Introduced AI-powered recommendations to help customers find perfect gifts",
    icon: Rocket,
    color: "from-blue-400 to-purple-500",
  },
  {
    year: "2022",
    title: "Custom Printing",
    description: "Launched personalized printing services for truly unique gifts",
    icon: Heart,
    color: "from-pink-400 to-red-500",
  },
  {
    year: "2024",
    title: "Global Reach",
    description: "Expanded to serve customers across multiple countries and cultures",
    icon: Globe,
    color: "from-green-400 to-teal-500",
  },
]

export function AboutStory() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From a small startup to a leading gift curation platform, here's how we've grown
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => {
            const IconComponent = milestone.icon
            return (
              <Card key={milestone.year} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <div className="text-2xl font-bold text-pink-600 mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
