import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, Share2, Truck, ShieldCheck, ChevronLeft, Minus, Plus, ShoppingCart, Sparkles, MessageSquareHeart } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { ProductCard, type Product } from "@/components/product-card"

// Mock database
const products = {
  "1": {
    id: 1,
    name: "Classic Red Rose Bouquet",
    price: 8500,
    originalPrice: 10000,
    rating: 4.9,
    reviews: 245,
    images: [
      "/placeholder.svg?height=800&width=800&text=Rose+Bouquet+1",
      "/placeholder.svg?height=800&width=800&text=Rose+Bouquet+2",
      "/placeholder.svg?height=800&width=800&text=Rose+Bouquet+3",
      "/placeholder.svg?height=800&width=800&text=Rose+Bouquet+4",
    ],
    category: "Flowers",
    tags: ["Romance", "Anniversary"],
    availability: "In Stock - Same-Day Delivery Available",
    description: "A timeless expression of love and passion. This stunning bouquet features 24 premium, long-stemmed red roses, carefully selected for their deep color and velvet-like petals. Hand-tied by our expert florists with delicate greenery.",
    contents: [
      "24 Premium Red Roses",
      "Seasonal Greenery (Eucalyptus & Ruscus)",
      "Premium Wrapping Paper & Ribbon",
      "Flower Food Packet",
      "Care Instructions Card"
    ],
    sizes: [
      { id: "standard", name: "Standard (12 Roses)", price: 5000 },
      { id: "premium", name: "Premium (24 Roses)", price: 8500 },
      { id: "deluxe", name: "Deluxe (36 Roses)", price: 12000 },
    ],
    perfectFor: ["Anniversary", "Valentine's Day", "Just Because", "Apology"],
    recipientSuitability: ["Partner", "Spouse", "Crush"],
  }
}

const relatedProducts: Product[] = [
  {
    id: 2,
    name: "Artisan Chocolate Truffle Box",
    price: 4500,
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=300",
    category: "Chocolates",
    tags: ["Sweet", "Birthday"],
  },
  {
    id: 3,
    name: "Self-Care Sunday Retreat",
    price: 12000,
    originalPrice: 15000,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Self-care",
    isAiRecommended: true,
    tags: ["Relaxation", "Get Well Soon"],
  },
  {
    id: 4,
    name: "Gourmet Fruit & Cheese Board",
    price: 9500,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    category: "Edible",
    tags: ["Corporate", "Thank You"],
    availability: "Next-Day Delivery",
  },
]

const messagePrompts = [
  "Happy Birthday! Wishing you a day as special as you are.",
  "Thinking of you and sending lots of love.",
  "Get well soon. Wishing you a speedy recovery!",
  "Just wanted to brighten your day.",
  "Congratulations on this amazing milestone!",
]

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  const product = products[productId as keyof typeof products]

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Breadcrumbs & Back */}
      <div className="border-b border-zinc-100 bg-zinc-50/50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/products" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/50">
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-zinc-900 border-0 shadow-sm font-medium">
                  {product.category}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4" role="tablist" aria-label="Product image gallery">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  className={`aspect-square relative rounded-xl overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${idx === 0 ? 'border-zinc-900 ring-2 ring-zinc-900 ring-offset-2' : 'border-transparent hover:border-zinc-200'}`}
                  role="tab"
                  aria-selected={idx === 0}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`} 
                    fill 
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="text-3xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-4 leading-[1.1]">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-1" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                  <div className="flex" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-zinc-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-zinc-700 ml-2">
                    {product.rating} <span className="text-zinc-400 underline decoration-zinc-300 decoration-dotted underline-offset-4 cursor-pointer hover:text-zinc-600">({product.reviews} reviews)</span>
                  </span>
                </div>
                <div className="w-1 h-1 rounded-full bg-zinc-300" aria-hidden="true"></div>
                <span className="text-sm font-medium text-emerald-600 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" aria-hidden="true"></span>
                  {product.availability}
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-zinc-900">{formatCurrency(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl font-medium text-zinc-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-50 border-0 font-bold px-3 py-1">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>
              
              <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="space-y-8 flex-1">
              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label id="size-option-label" className="text-base font-bold text-zinc-900">Size & Option</Label>
                </div>
                <Select defaultValue="premium" aria-labelledby="size-option-label">
                  <SelectTrigger id="size-option-trigger" aria-labelledby="size-option-label size-option-trigger" className="w-full h-14 rounded-xl border-zinc-200 text-base">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size.id} value={size.id} className="text-base py-3">
                        <div className="flex justify-between w-full min-w-[200px]">
                          <span>{size.name}</span>
                          <span className="text-zinc-500 ml-4">{formatCurrency(size.price)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Personalization Section */}
              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/50 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 id="gift-message-heading" className="font-bold text-zinc-900 text-lg flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-zinc-700" />
                      Add a Gift Message
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">Include a free printed card with your gift.</p>
                  </div>
                  <Switch id="gift-message-toggle" aria-labelledby="gift-message-heading" />
                </div>
                
                <div className="space-y-4 pt-4 border-t border-zinc-200/50">
                  <Label htmlFor="gift-message" className="sr-only">Your message</Label>
                  <Textarea 
                    id="gift-message"
                    placeholder="Write a heartfelt message..." 
                    className="min-h-[100px] resize-none rounded-xl border-zinc-200 focus-visible:ring-zinc-900 text-base"
                  />
                  
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Need inspiration?</span>
                    <div className="flex flex-wrap gap-2">
                      {messagePrompts.map((prompt, idx) => (
                        <button 
                          key={idx}
                          type="button"
                          className="text-xs bg-white border border-zinc-200 text-zinc-700 px-3 py-1.5 rounded-lg hover:bg-zinc-100 hover:text-zinc-900 transition-colors text-left"
                        >
                          "{prompt}"
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50">
                  <div>
                    <h4 id="gift-wrap-heading" className="font-medium text-zinc-900">Premium Gift Wrapping</h4>
                    <p className="text-sm text-zinc-500">Add elegant wrapping for +KSh 500</p>
                  </div>
                  <Switch id="gift-wrap-toggle" aria-labelledby="gift-wrap-heading" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center border border-zinc-200 rounded-xl h-14 bg-white">
                  <button className="px-4 h-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-l-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900" aria-label="Decrease quantity">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-lg text-zinc-900" aria-live="polite">1</span>
                  <button className="px-4 h-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-r-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900" aria-label="Increase quantity">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button asChild className="flex-1 h-14 text-base font-bold rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Link href="/cart">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart — {formatCurrency(product.price)}
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-zinc-200 text-zinc-600 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0" aria-label="Add to wishlist">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Delivery info */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-zinc-100">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sm text-zinc-900">Fast Delivery</h5>
                    <p className="text-sm text-zinc-500 mt-0.5">Same-day options available at checkout.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sm text-zinc-900">Quality Guarantee</h5>
                    <p className="text-sm text-zinc-500 mt-0.5">Freshness guaranteed for 7 days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details & Specifications */}
      <div className="border-t border-zinc-100 bg-zinc-50/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="bg-transparent border-b border-zinc-200 w-full justify-start rounded-none p-0 h-auto space-x-8 mb-8">
                  <TabsTrigger 
                    value="details" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 rounded-none px-0 py-4 font-medium text-base text-zinc-500 data-[state=active]:text-zinc-900"
                  >
                    Product Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="contents"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 rounded-none px-0 py-4 font-medium text-base text-zinc-500 data-[state=active]:text-zinc-900"
                  >
                    What's Included
                  </TabsTrigger>
                  <TabsTrigger 
                    value="delivery"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 rounded-none px-0 py-4 font-medium text-base text-zinc-500 data-[state=active]:text-zinc-900"
                  >
                    Delivery Info
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="text-zinc-600 leading-relaxed space-y-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-lg">
                  <p>{product.description}</p>
                  <p>Our roses are sourced from sustainable farms and arrive in bud form for lasting freshness. They will bloom beautifully over the next 2-3 days.</p>
                  
                  <div className="mt-8">
                    <h4 className="font-bold text-zinc-900 mb-4">Care Instructions</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Trim stems at a 45-degree angle before placing in water</li>
                      <li>Remove any leaves that will fall below the waterline</li>
                      <li>Change water every 2-3 days and add provided flower food</li>
                      <li>Keep away from direct sunlight, drafts, and heat sources</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="contents" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-lg">
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {product.contents.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-zinc-100">
                        <div className="w-2 h-2 rounded-full bg-zinc-300"></div>
                        <span className="text-zinc-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="delivery" className="text-zinc-600 leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-lg space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-zinc-100 space-y-2">
                    <h4 className="font-bold text-zinc-900 flex items-center">
                      <Truck className="w-5 h-5 mr-2" /> Same-Day Delivery
                    </h4>
                    <p>Available for orders placed before 2:00 PM (EAT) within Nairobi and its environs. Fee: KSh 500.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-zinc-100 space-y-2">
                    <h4 className="font-bold text-zinc-900 flex items-center">
                      <Truck className="w-5 h-5 mr-2" /> Standard Next-Day Delivery
                    </h4>
                    <p>Available nationwide. Orders are dispatched via our trusted courier partners. Fee: KSh 300.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-zinc-200/50 shadow-sm">
                <h3 className="font-bold text-lg text-zinc-900 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-zinc-400" />
                  Perfect For...
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.perfectFor.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-amber-50 text-amber-800 hover:bg-amber-100 border-0 font-medium py-1.5 px-3 text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-100">
                  <h3 className="font-bold text-lg text-zinc-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-zinc-400" />
                    Ideal Recipient
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.recipientSuitability.map(tag => (
                      <Badge key={tag} variant="outline" className="border-zinc-200 text-zinc-600 bg-white font-medium py-1.5 px-3 text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900">They might also love...</h2>
            <Link href="/products" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors hidden sm:inline-block">
              View all gifts &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" className="w-full rounded-xl">View all gifts</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
