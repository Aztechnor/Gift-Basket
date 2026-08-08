"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Brain, Target, Heart, Loader2, Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import type { UserPreferences, AIRecommendationResponse } from "@/lib/ai-recommendations"
import { formatCurrency } from "@/lib/utils"
import { AIRecommendationEngine as AI } from "@/lib/ai-recommendations"

export function AIRecommendationEngine() {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<AIRecommendationResponse | null>(null)
  const [preferences, setPreferences] = useState<UserPreferences>({})
  const [activeTab, setActiveTab] = useState("preferences")

  const aiEngine = AI.getInstance()

  const handleGenerateRecommendations = async () => {
    setIsLoading(true)
    try {
      const result = await aiEngine.generateRecommendations(preferences)
      setRecommendations(result)
      setActiveTab("results")
    } catch (error) {
      console.error("Failed to generate recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updatePreferences = (key: keyof UserPreferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const updateRecipientInfo = (key: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      recipient: { ...prev.recipient, [key]: value },
    }))
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Brain className="w-8 h-8 text-pink-500" />
          <Sparkles className="w-6 h-6 text-purple-500" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">AI Gift Recommendation Engine</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Let our advanced AI analyze your preferences and create personalized gift recommendations tailored
          specifically for your occasion and recipient
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preferences" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="recipient" className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>Recipient</span>
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!recommendations} className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Results</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-pink-500" />
                <span>Gift Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="occasion">Occasion</Label>
                  <Select value={preferences.occasion} onValueChange={(value) => updatePreferences("occasion", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Occasion</SelectItem>
                      <SelectItem value="baby-shower">Baby Shower</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="graduation">Graduation</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="ruracio">Ruracio</SelectItem>
                      <SelectItem value="quinceanera">Quinceañera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select value={preferences.budget} onValueChange={(value) => updatePreferences("budget", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6500-13000">KSh 6,500 - KSh 13,000</SelectItem>
                      <SelectItem value="13000-26000">KSh 13,000 - KSh 26,000</SelectItem>
                      <SelectItem value="26000-39000">KSh 26,000 - KSh 39,000</SelectItem>
                      <SelectItem value="39000+">KSh 39,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-context">Additional Context (Optional)</Label>
                <Textarea
                  id="additional-context"
                  placeholder="Tell us more about the occasion, any specific preferences, or special requirements..."
                  rows={3}
                />
              </div>

              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                onClick={() => setActiveTab("recipient")}
              >
                Continue to Recipient Details
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipient" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <span>Recipient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age Group</Label>
                  <Select
                    value={preferences.recipient?.age}
                    onValueChange={(value) => updateRecipientInfo("age", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="child">Child (0-12)</SelectItem>
                      <SelectItem value="teen">Teen (13-19)</SelectItem>
                      <SelectItem value="young-adult">Young Adult (20-35)</SelectItem>
                      <SelectItem value="adult">Adult (36-55)</SelectItem>
                      <SelectItem value="senior">Senior (55+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={preferences.recipient?.gender}
                    onValueChange={(value) => updateRecipientInfo("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select
                    value={preferences.recipient?.relationship}
                    onValueChange={(value) => updateRecipientInfo("relationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Your relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family Member</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="colleague">Colleague</SelectItem>
                      <SelectItem value="partner">Romantic Partner</SelectItem>
                      <SelectItem value="client">Client/Business</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests & Hobbies</Label>
                <Input
                  id="interests"
                  placeholder="e.g., cooking, reading, sports, music, technology..."
                  onChange={(e) =>
                    updateRecipientInfo(
                      "interests",
                      e.target.value.split(",").map((s) => s.trim()),
                    )
                  }
                />
                <p className="text-xs text-gray-500">Separate multiple interests with commas</p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("preferences")}>
                  Back
                </Button>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={handleGenerateRecommendations}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      AI is analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generate AI Recommendations
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6 pt-6">
          {recommendations && (
            <>
              {/* AI Reasoning */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-pink-500" />
                    <span>AI Analysis</span>
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                      {Math.round(recommendations.confidence * 100)}% Confidence
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{recommendations.reasoning}</p>
                  {recommendations.alternativeOccasions && recommendations.alternativeOccasions.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">You might also consider:</p>
                      <div className="flex flex-wrap gap-2">
                        {recommendations.alternativeOccasions.map((occasion) => (
                          <Badge key={occasion} variant="outline" className="text-xs">
                            {occasion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recommendations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.recommendations.map((item, index) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                  >
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Pick #{index + 1}
                      </Badge>

                      <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>

                      {item.originalPrice && item.originalPrice > item.price && (
                        <Badge className="absolute bottom-3 left-3 bg-red-500 text-white">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-gray-600 mb-3 text-sm">{item.description}</p>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-xs text-blue-800">
                          <Brain className="w-3 h-3 inline mr-1" />
                          <strong>AI Insight:</strong> {item.aiReason}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {item.rating} ({item.reviews})
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">{formatCurrency(item.price)}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {Math.round(item.confidence * 100)}% Match
                        </Badge>
                      </div>

                      <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                        <a href={`/products/${item.id}`}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveTab("preferences")
                    setRecommendations(null)
                  }}
                >
                  Try Different Preferences
                </Button>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={handleGenerateRecommendations}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get New Recommendations
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
