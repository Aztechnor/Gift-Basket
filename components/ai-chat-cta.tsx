"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Bot, Sparkles, ArrowRight } from "lucide-react"

export function AIChatCTA() {
  return (
    <section className="py-8 sm:py-16 bg-zinc-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Side - Content */}
                <div className="p-6 sm:p-8 lg:p-12 bg-zinc-900 text-white">
                  <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                    Chat with Our AI Gift Expert
                  </h2>

                  <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 opacity-90 leading-relaxed">
                    Get instant, personalized gift advice through natural conversation. Our AI understands context,
                    cultural preferences, and budget constraints to help you find the perfect gift.
                  </p>

                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">Natural conversation about your gift needs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">Cultural insights for Kenyan occasions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">Real-time product recommendations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">Budget-aware suggestions</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button 
                      size="lg" 
                      className="bg-white text-zinc-900 hover:bg-zinc-100 w-full sm:w-auto"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Start Chatting
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-zinc-900 w-full sm:w-auto bg-transparent" onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
                    >
                      See Example Chat
                    </Button>
                  </div>
                </div>

                {/* Right Side - Chat Preview */}
                <div className="p-6 sm:p-8 lg:p-12 bg-white">
                  <div className="space-y-4">
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">Live Chat Preview</h3>
                      <p className="text-zinc-500 text-sm">See how our AI helps customers</p>
                    </div>

                    {/* Mock Chat Messages */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-zinc-900 text-white rounded-lg p-2 sm:p-3 max-w-xs">
                          <p className="text-xs sm:text-sm">
                            I need a gift for my wife's birthday, budget around KSh 20,000
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-zinc-100 rounded-lg p-2 sm:p-3 max-w-xs">
                          <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                            <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-900" />
                            <span className="text-xs font-medium text-zinc-600">AI Assistant</span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-900">
                            That's wonderful! Tell me a bit about her interests. Does she enjoy jewelry, spa
                            experiences, or perhaps something more personalized?
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-zinc-900 text-white rounded-lg p-2 sm:p-3 max-w-xs">
                          <p className="text-xs sm:text-sm">She loves spa treatments and self-care</p>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-zinc-100 rounded-lg p-2 sm:p-3 max-w-xs">
                          <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                            <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-900" />
                            <span className="text-xs font-medium text-zinc-600">AI Assistant</span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-900">
                            Perfect! I have some amazing spa-themed gifts that would be ideal...
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-3 sm:pt-4">
                      <p className="text-xs text-zinc-500">
                        💬 The chat widget is always available in the bottom-right corner
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
