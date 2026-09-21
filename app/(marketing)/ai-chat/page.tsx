"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, Sparkles, MessageCircle, ShoppingCart, Star, RefreshCw, Download } from "lucide-react"
import Image from "next/image"
import { ConversationalAI, type ChatMessage } from "@/lib/conversational-ai"
import { formatCurrency } from "@/lib/utils"

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome to the full AI Gift Advisor experience! 🎁✨\n\nI'm here to have a detailed conversation about finding you the perfect gift. I can help with:\n\n• Personalized recommendations based on detailed preferences\n• Cultural gift suggestions for Kenyan occasions\n• Budget-friendly options across all price ranges\n• Corporate and business gift solutions\n\nWhat would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Help me find the perfect birthday gift",
        "I need traditional Kenyan gifts for ruracio",
        "Show me luxury anniversary options",
        "Corporate gifts for my team",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const aiAssistant = ConversationalAI.getInstance()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await aiAssistant.processMessage(inputValue)
      setMessages((prev) => [...prev, response])
    } catch (error) {
      console.error("Failed to get AI response:", error)
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: "assistant",
        content:
          "I apologize, but I'm experiencing some technical difficulties. Please try your question again, and I'll do my best to help you find the perfect gift!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetConversation = () => {
    aiAssistant.resetContext()
    setMessages([
      {
        id: "welcome_reset",
        role: "assistant",
        content: "Great! Let's start fresh. What kind of gift are you looking for today?",
        timestamp: new Date(),
        suggestions: ["Birthday gift ideas", "Anniversary presents", "Baby shower gifts", "Corporate appreciation"],
      },
    ])
  }

  const exportConversation = () => {
    const conversationText = messages
      .map(
        (msg) => `${msg.role === "user" ? "You" : "AI Assistant"} (${msg.timestamp.toLocaleString()}): ${msg.content}`,
      )
      .join("\n\n")

    const blob = new Blob([conversationText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `gift-consultation-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-zinc-100">
      <main className="py-4 sm:py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">AI Gift Advisor Chat</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Have a detailed conversation with our AI to find the perfect gift. Get personalized recommendations,
              cultural insights, and expert advice.
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="shadow-2xl border-0 mx-auto max-w-4xl">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>AI Gift Advisor</span>
                  <Badge className="bg-white/20 text-white text-xs sm:text-sm">Online</Badge>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={exportConversation}
                    className="text-white hover:bg-white/20 hidden sm:flex"
                    disabled={messages.length <= 1}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    <span className="hidden md:inline">Export</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetConversation}
                    className="text-white hover:bg-white/20"
                  >
                    <RefreshCw className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Reset</span>
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <ScrollArea className="h-[50vh] sm:h-[60vh] lg:h-[600px] p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className="space-y-3 sm:space-y-4">
                      <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex items-start space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[85%] ${
                            message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.role === "user"
                                ? "bg-pink-500 text-white"
                                : "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            }`}
                          >
                            {message.role === "user" ? (
                              <User className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </div>
                          <div
                            className={`rounded-2xl p-3 sm:p-4 ${
                              message.role === "user"
                                ? "bg-pink-500 text-white"
                                : "bg-white border border-gray-200 text-gray-900 shadow-sm"
                            }`}
                          >
                            <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base break-words">
                              {message.content}
                            </p>
                            <p
                              className={`text-xs mt-2 ${message.role === "user" ? "text-pink-100" : "text-gray-500"}`}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 ml-10 sm:ml-13">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-colors text-xs sm:text-sm h-8 sm:h-9"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Product Recommendations */}
                      {message.products && message.products.length > 0 && (
                        <div className="ml-10 sm:ml-13 grid gap-3 sm:gap-4">
                          {message.products.map((product) => (
                            <Card
                              key={product.id}
                              className="border border-pink-200 hover:shadow-lg transition-all duration-300"
                            >
                              <CardContent className="p-3 sm:p-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mx-auto sm:mx-0 flex-shrink-0"
                                  />
                                  <div className="flex-1 text-center sm:text-left">
                                    <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                                      {product.name}
                                    </h4>
                                    <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                                      <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm text-gray-600">{product.rating}</span>
                                      </div>
                                      <Badge variant="secondary" className="text-xs">
                                        {product.category}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-blue-600 mb-2">{product.quickReason}</p>
                                    <p className="font-bold text-lg sm:text-xl text-gray-900">
                                      {formatCurrency(product.price)}
                                    </p>
                                  </div>
                                  <div className="flex flex-col space-y-2 w-full sm:w-auto">
                                    <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full sm:w-auto">
                                      <Link href="/cart">
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Add to Cart
                                      </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                                      View Details
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center">
                          <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              <div className="p-4 sm:p-6 border-t bg-gray-50">
                <div className="flex space-x-2 sm:space-x-3">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about gifts..."
                    className="flex-1 border-pink-200 focus:border-pink-400 bg-white text-sm sm:text-base"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-4 sm:px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
                  💡 Try asking: "I need a gift for my wife's 30th birthday, budget around KSh 20,000"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
