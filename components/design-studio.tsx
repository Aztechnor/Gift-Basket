"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Type, ImageIcon, Sparkles } from "lucide-react"

export function DesignStudio() {
  const [activeTab, setActiveTab] = useState("upload")

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Design Studio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your perfect design with our easy-to-use tools. Upload your own artwork or use our templates and AI
            assistance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Create Your Design</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="upload" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center space-x-2">
                    <Type className="w-4 h-4" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex items-center space-x-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>Templates</span>
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Design</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-8">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-pink-400 transition-colors">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Design</h3>
                    <p className="text-gray-600 mb-6">Drag and drop your image files here, or click to browse</p>
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                      Choose Files
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">Supports: JPG, PNG, SVG, PDF (Max 10MB)</p>
                  </div>
                </TabsContent>

                <TabsContent value="text" className="mt-8">
                  <div className="space-y-6">
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <Type className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Custom Text</h3>
                      <p className="text-gray-600 mb-6">Create text-based designs with various fonts and styles</p>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                        Start Text Editor
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="templates" className="mt-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((template) => (
                      <Card key={template} className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg h-24 mb-3 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-sm font-medium text-center">Template {template}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="ai" className="mt-8">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-8 text-center text-white">
                    <Sparkles className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Design</h3>
                    <p className="mb-6 opacity-90">
                      Describe your vision and let our AI create the perfect design for you
                    </p>
                    <Button className="bg-white text-pink-600 hover:bg-gray-100">Try AI Designer</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
