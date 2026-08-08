"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Sparkles, ShoppingCart, Star, X, Minimize2, Maximize2 } from "lucide-react"
import Image from "next/image"
import { ConversationalAI, type ChatMessage } from "@/lib/conversational-ai"
import { formatCurrency } from "@/lib/utils"

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! 👋 I'm your AI gift advisor. I'm here to help you find the perfect gift for any occasion. What can I help you with today?",
      timestamp: new Date(),
      suggestions: [
        "I need gift ideas",
        "Help me find birthday gifts",
        "Show me traditional Kenyan gifts",
        "What's good for corporate gifts?",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

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
    if (isOpen) {
      setUnreadCount(0)
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true)
      setIsMinimized(false)
    }
    window.addEventListener('open-ai-chat', handleOpenChat)
    return () => window.removeEventListener('open-ai-chat', handleOpenChat)
  }, [])

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    const currentHistory = [...messages, userMessage]
    setMessages(currentHistory)
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: currentHistory.map(m => ({ role: m.role, content: m.content })).slice(0, -1)
        })
      });

      if (!response.ok) throw new Error("API failed");
      
      const data = await response.json();
      
      const aiResponse: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        suggestions: data.suggestions,
        products: data.products
      }

      setMessages((prev) => [...prev, aiResponse])

      if (!isOpen) {
        setUnreadCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to get AI response:", error)
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: "assistant",
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Fullscreen Overlay */}
      <div className="fixed inset-0 z-50 md:hidden">
        <Card className="w-full h-full shadow-none border-0 bg-white rounded-none">
          <CardHeader className="pb-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Bot className="w-5 h-5" />
                <span>AI Gift Advisor</span>
                <Sparkles className="w-4 h-4" />
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm opacity-90">Get personalized gift recommendations powered by AI</p>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col mobile-chat-height">
            <ScrollArea className="flex-1 p-4 chat-scrollbar">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`flex items-start space-x-2 max-w-[85%] ${
                          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user"
                              ? "bg-pink-500 text-white"
                              : "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                          }`}
                        >
                          {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div
                          className={`rounded-lg p-3 chat-message ${
                            message.role === "user" ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 ml-10">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-8 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Product Recommendations - Mobile Optimized */}
                    {message.products && message.products.length > 0 && (
                      <div className="ml-10 space-y-3">
                        {message.products.map((product) => (
                          <Card key={product.id} className="border border-pink-200 hover:shadow-md transition-shadow">
                            <CardContent className="p-3">
                              <div className="flex flex-col space-y-3">
                                <div className="flex items-center space-x-3">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    width={60}
                                    height={60}
                                    className="rounded-lg flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-gray-900 truncate">{product.name}</h4>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                      <span className="text-xs text-gray-600">{product.rating}</span>
                                    </div>
                                    <p className="text-xs text-blue-600 mt-1 line-clamp-2">{product.quickReason}</p>
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-2 mt-2 pt-2 border-t border-pink-100">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="font-bold text-sm text-gray-900">{formatCurrency(product.price)}</p>
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xs px-3 py-1 h-7"
                                    >
                                      <ShoppingCart className="w-3 h-3 mr-1" />
                                      Add to Cart
                                    </Button>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 rounded-full border-pink-200">
                                      Customize
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 rounded-full border-pink-200">
                                      Send to Someone
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100">
                                      Save Idea
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100">
                                      See Similar
                                    </Button>
                                  </div>
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
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
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

            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about gifts..."
                  className="flex-1 border-pink-200 focus:border-pink-400 chat-input"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop/Tablet Floating Window */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 hidden md:block ${
          isMinimized ? "w-80 h-16" : "w-80 lg:w-96 tablet-chat-height lg:desktop-chat-height"
        }`}
      >
        <Card className="w-full h-full shadow-2xl border-0 bg-white">
          <CardHeader className="pb-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                <Bot className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>AI Gift Advisor</span>
                <Sparkles className="w-3 h-3 lg:w-4 lg:h-4" />
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 w-7 h-7 lg:w-8 lg:h-8 p-0"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3 h-3 lg:w-4 lg:h-4" />
                  ) : (
                    <Minimize2 className="w-3 h-3 lg:w-4 lg:h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 w-7 h-7 lg:w-8 lg:h-8 p-0"
                >
                  <X className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>
            </div>
            {!isMinimized && (
              <p className="text-xs lg:text-sm opacity-90">Get personalized gift recommendations powered by AI</p>
            )}
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[320px] lg:h-[400px] p-3 lg:p-4 chat-scrollbar">
                  <div className="space-y-3 lg:space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="space-y-2 lg:space-y-3">
                        <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`flex items-start space-x-2 max-w-[85%] ${
                              message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                            }`}
                          >
                            <div
                              className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                message.role === "user"
                                  ? "bg-pink-500 text-white"
                                  : "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                              }`}
                            >
                              {message.role === "user" ? (
                                <User className="w-3 h-3 lg:w-4 lg:h-4" />
                              ) : (
                                <Bot className="w-3 h-3 lg:w-4 lg:h-4" />
                              )}
                            </div>
                            <div
                              className={`rounded-lg p-2 lg:p-3 chat-message ${
                                message.role === "user" ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p className="text-xs lg:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-1 lg:gap-2 ml-8 lg:ml-10">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs h-6 lg:h-8 px-2 lg:px-3 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}

                        {/* Product Recommendations */}
                        {message.products && message.products.length > 0 && (
                          <div className="ml-8 lg:ml-10 space-y-2 lg:space-y-3">
                            {message.products.map((product) => (
                              <Card
                                key={product.id}
                                className="border border-pink-200 hover:shadow-md transition-shadow"
                              >
                                <CardContent className="p-2 lg:p-3">
                                  <div className="flex items-center space-x-2 lg:space-x-3">
                                    <Image
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.name}
                                      width={40}
                                      height={40}
                                      className="lg:w-[60px] lg:h-[60px] rounded-lg flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-xs lg:text-sm text-gray-900 truncate">
                                        {product.name}
                                      </h4>
                                      <div className="flex items-center space-x-1 mt-1">
                                        <Star className="w-2 h-2 lg:w-3 lg:h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs text-gray-600">{product.rating}</span>
                                      </div>
                                      <p className="text-xs text-blue-600 mt-1 line-clamp-1 lg:line-clamp-2">
                                        {product.quickReason}
                                      </p>
                                      <p className="font-bold text-xs lg:text-sm text-gray-900 mt-1">
                                        {formatCurrency(product.price)}
                                      </p>
                                    </div>
                                    <div className="flex flex-col items-end justify-between h-full gap-2">
                                      <Button
                                        size="sm"
                                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-[10px] lg:text-xs px-2 lg:px-3 h-6 lg:h-7 whitespace-nowrap"
                                      >
                                        <ShoppingCart className="w-3 h-3 mr-1 hidden lg:inline" />
                                        Add
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="mt-2 pt-2 border-t border-pink-100 grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-1.5">
                                    <Button variant="outline" size="sm" className="h-6 text-[9px] lg:text-[10px] px-1 rounded-full border-pink-200">
                                      Customize
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-6 text-[9px] lg:text-[10px] px-1 rounded-full border-pink-200">
                                      Send to...
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-6 text-[9px] lg:text-[10px] px-1 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100">
                                      Save
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-6 text-[9px] lg:text-[10px] px-1 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100">
                                      Similar
                                    </Button>
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
                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center">
                            <Bot className="w-3 h-3 lg:w-4 lg:h-4" />
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2 lg:p-3">
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-gray-400 rounded-full animate-bounce"
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
              </CardContent>

              <div className="p-3 lg:p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about gifts..."
                    className="flex-1 border-pink-200 focus:border-pink-400 text-sm chat-input"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-3"
                  >
                    <Send className="w-3 h-3 lg:w-4 lg:h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  )
}
