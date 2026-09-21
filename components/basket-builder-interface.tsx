"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Minus, ShoppingCart, Sparkles, Heart, Gift } from "lucide-react"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { addToCart } from "@/lib/cart"

interface BasketItem {
  id: number
  name: string
  price: number
  category: string
  image: string
  quantity: number
  isAiRecommended?: boolean
}

const availableItems: Omit<BasketItem, "quantity">[] = [
  {
    id: 1,
    name: "Premium Chocolate Box",
    price: 3250,
    category: "Sweets",
    image: "/placeholder.svg?height=150&width=150",
    isAiRecommended: true,
  },
  {
    id: 2,
    name: "Artisan Coffee Beans",
    price: 2470,
    category: "Beverages",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 3,
    name: "Scented Candle Set",
    price: 4290,
    category: "Home",
    image: "/placeholder.svg?height=150&width=150",
    isAiRecommended: true,
  },
  { id: 4, name: "Gourmet Cookies", price: 2210, category: "Sweets", image: "/placeholder.svg?height=150&width=150" },
  {
    id: 5,
    name: "Herbal Tea Collection",
    price: 2990,
    category: "Beverages",
    image: "/placeholder.svg?height=150&width=150",
    isAiRecommended: true,
  },
  {
    id: 6,
    name: "Luxury Hand Cream",
    price: 3770,
    category: "Beauty",
    image: "/placeholder.svg?height=150&width=150",
  },
  { id: 7, name: "Organic Honey Jar", price: 2600, category: "Food", image: "/placeholder.svg?height=150&width=150" },
  {
    id: 8,
    name: "Silk Scarf",
    price: 5980,
    category: "Fashion",
    image: "/placeholder.svg?height=150&width=150",
    isAiRecommended: true,
  },
]

export function BasketBuilderInterface() {
  const [selectedItems, setSelectedItems] = useState<BasketItem[]>([])
  const [occasion, setOccasion] = useState("")
  const [budget, setBudget] = useState("")
  const [personalMessage, setPersonalMessage] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [activeTab, setActiveTab] = useState("configure")
  const [cartAdded, setCartAdded] = useState(false)

  const addItem = (item: Omit<BasketItem, "quantity">) => {
    const existingItem = selectedItems.find((i) => i.id === item.id)
    if (existingItem) {
      setSelectedItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setSelectedItems((prev) => [...prev, { ...item, quantity: 1 }])
    }
  }

  const removeItem = (itemId: number) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId)
    } else {
      setSelectedItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const aiRecommendedItems = availableItems.filter((item) => item.isAiRecommended)

  const getAiRecommendations = () => {
    // Simulate AI recommendations based on occasion
    const recommendations = {
      "baby-shower": [1, 5, 6],
      birthday: [1, 3, 4],
      anniversary: [3, 8, 2],
      corporate: [2, 7, 5],
    }
    return recommendations[occasion as keyof typeof recommendations] || [1, 3, 5]
  }

  // Shipping and packaging costs in KES
  const basketPackagingCost = 1690
  const shippingCost = 1170

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Panel - Configuration */}
      <div className="lg:col-span-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="configure">Configure</TabsTrigger>
            <TabsTrigger value="items">Add Items</TabsTrigger>
            <TabsTrigger value="personalize">Personalize</TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <span>AI-Powered Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label id="builder-occasion-label" className="text-sm font-medium mb-2 block">Occasion</label>
                  <Select value={occasion} onValueChange={setOccasion} aria-labelledby="builder-occasion-label">
                    <SelectTrigger id="builder-occasion-trigger" aria-labelledby="builder-occasion-label builder-occasion-trigger">
                      <SelectValue placeholder="Select an occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baby-shower">Baby Shower</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="ruracio">Ruracio</SelectItem>
                      <SelectItem value="quinceanera">Quinceañera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label id="builder-budget-label" className="text-sm font-medium mb-2 block">Budget Range</label>
                  <Select value={budget} onValueChange={setBudget} aria-labelledby="builder-budget-label">
                    <SelectTrigger id="builder-budget-trigger" aria-labelledby="builder-budget-label builder-budget-trigger">
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

                <div>
                  <label htmlFor="builder-recipient" className="text-sm font-medium mb-2 block">Recipient Name</label>
                  <Input
                    id="builder-recipient"
                    placeholder="Enter recipient's name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>

                {occasion && (
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 text-pink-500 mr-2" />
                      AI Recommendations for {occasion.replace("-", " ")}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {getAiRecommendations().map((itemId) => {
                        const item = availableItems.find((i) => i.id === itemId)
                        return item ? (
                          <Button
                            key={item.id}
                            variant="outline"
                            size="sm"
                            onClick={() => addItem(item)}
                            className="justify-start text-left h-auto p-2"
                          >
                            <div className="flex items-center space-x-2">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={30}
                                height={30}
                                className="rounded"
                              />
                              <div>
                                <div className="text-xs font-medium">{item.name}</div>
                                <div className="text-xs text-gray-500">{formatCurrency(item.price)}</div>
                              </div>
                            </div>
                          </Button>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        {item.isAiRecommended && (
                          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs">
                            AI
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(item.price)}</p>
                      </div>
                      <Button
                        onClick={() => addItem(item)}
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personalize" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span>Personal Touch</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="builder-message" className="text-sm font-medium mb-2 block">Personal Message</label>
                  <Textarea
                    id="builder-message"
                    placeholder="Write a heartfelt message for the recipient..."
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Gift className="w-6 h-6 mb-2" />
                    <span className="text-sm">Add Gift Card</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Heart className="w-6 h-6 mb-2" />
                    <span className="text-sm">Custom Ribbon</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Panel - Basket Summary */}
      <div className="space-y-6">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Basket</span>
              <Badge variant="secondary">{selectedItems.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Your basket is empty</p>
                <p className="text-sm">Add items to get started</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-sm text-gray-600">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Basket & Packaging:</span>
                    <span>{formatCurrency(basketPackagingCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{formatCurrency(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(totalPrice + basketPackagingCost + shippingCost)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={() => {
                    selectedItems.forEach((item) => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        category: item.category,
                      }, item.quantity)
                    })
                    setCartAdded(true)
                    window.setTimeout(() => setCartAdded(false), 2200)
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {cartAdded ? "Added to Cart" : "Add to Cart"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
