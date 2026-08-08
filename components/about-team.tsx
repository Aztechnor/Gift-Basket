import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Passionate about creating meaningful connections through thoughtful gifting",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@giftbasket.co.ke",
    },
  },
  {
    name: "Michael Chen",
    role: "Head of AI & Technology",
    bio: "Leading our AI recommendation engine and technical innovation",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "michael@giftbasket.co.ke",
    },
  },
  {
    name: "Emily Rodriguez",
    role: "Creative Director",
    bio: "Curating beautiful gift collections and designing memorable experiences",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "emily@giftbasket.co.ke",
    },
  },
  {
    name: "David Kimani",
    role: "Operations Manager",
    bio: "Ensuring smooth operations and exceptional customer service",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "david@giftbasket.co.ke",
    },
  },
]

export function AboutTeam() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The passionate people behind GiftBasket who make magic happen every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>

                <div className="flex justify-center space-x-3">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Join Our Team</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            We're always looking for passionate people who share our vision of making gift-giving more meaningful
          </p>
          <Button
            size="lg"
            className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold"
          >
            View Open Positions
          </Button>
        </div>
      </div>
    </section>
  )
}
