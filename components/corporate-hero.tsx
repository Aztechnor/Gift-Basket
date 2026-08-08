import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Award, TrendingUp } from "lucide-react"

export function CorporateHero() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-pink-500" />
                <Badge className="bg-pink-50 text-pink-700">Corporate Solutions</Badge>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Elevate Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Corporate
                </span>{" "}
                Gifting
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Strengthen business relationships and show appreciation with our premium corporate gift solutions. From
                employee recognition to client appreciation, we've got you covered.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-pink-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">Bulk Orders</h4>
                  <p className="text-sm text-gray-600">Volume discounts</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Award className="w-8 h-8 text-purple-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">Custom Branding</h4>
                  <p className="text-sm text-gray-600">Your logo & colors</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
              <Button variant="outline" size="lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>✓ 500+ satisfied companies</span>
              <span>✓ Dedicated account manager</span>
              <span>✓ Fast delivery</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl p-8">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Corporate Gifts"
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
