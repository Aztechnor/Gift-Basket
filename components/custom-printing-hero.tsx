import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Palette, Upload, Eye, Download } from "lucide-react"

export function CustomPrintingHero() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-pink-500" />
                <Badge className="bg-pink-50 text-pink-700">Custom Printing Services</Badge>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Personalize Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Perfect Gift
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Transform ordinary items into extraordinary personalized gifts. Upload your designs or choose from our
                templates to create custom t-shirts, mugs, hoodies, and more.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Upload className="w-8 h-8 text-pink-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">Upload Design</h4>
                  <p className="text-sm text-gray-600">Your own artwork</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Eye className="w-8 h-8 text-purple-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">Live Preview</h4>
                  <p className="text-sm text-gray-600">See before you buy</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Palette className="w-4 h-4 mr-2" />
                Start Designing
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Browse Templates
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>✓ High-quality materials</span>
              <span>✓ Fast turnaround</span>
              <span>✓ Satisfaction guaranteed</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl p-8">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Custom Printing Preview"
                width={600}
                height={500}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg">
                <Palette className="w-6 h-6 text-pink-500" />
              </div>

              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full px-4 py-2 shadow-lg">
                <span className="text-sm font-semibold">✨ AI-Enhanced Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
