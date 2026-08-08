import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Sparkles } from "lucide-react"

export function AboutHero() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <Badge className="bg-pink-50 text-pink-700">Our Story</Badge>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Crafting{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Memorable
                </span>{" "}
                Moments
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                At GiftBasket, we believe every occasion deserves to be celebrated with thoughtful, meaningful gifts.
                Our mission is to help you create unforgettable moments through carefully curated gift experiences.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-pink-500" />
                </div>
                <h4 className="font-bold text-2xl text-gray-900">50K+</h4>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
                <h4 className="font-bold text-2xl text-gray-900">500+</h4>
                <p className="text-sm text-gray-600">Gift Options</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-8 h-8 text-pink-500" />
                </div>
                <h4 className="font-bold text-2xl text-gray-900">4.9</h4>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Heart className="w-4 h-4 mr-2" />
                Our Mission
              </Button>
              <Button variant="outline" size="lg">
                <Users className="w-4 h-4 mr-2" />
                Meet the Team
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl p-8">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="About GiftBasket"
                width={600}
                height={500}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
