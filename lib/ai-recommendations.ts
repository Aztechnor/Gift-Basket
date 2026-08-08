export interface UserPreferences {
  occasion?: string
  budget?: string
  recipient?: {
    age?: string
    gender?: string
    relationship?: string
    interests?: string[]
  }
  previousPurchases?: string[]
  browsedCategories?: string[]
}

export interface RecommendationItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  image: string
  rating: number
  reviews: number
  tags: string[]
  description: string
  aiReason: string
  confidence: number
}

export interface AIRecommendationResponse {
  recommendations: RecommendationItem[]
  reasoning: string
  confidence: number
  alternativeOccasions?: string[]
}

// Mock AI recommendation engine
export class AIRecommendationEngine {
  private static instance: AIRecommendationEngine
  private productDatabase: RecommendationItem[]

  constructor() {
    this.productDatabase = this.initializeProductDatabase()
  }

  static getInstance(): AIRecommendationEngine {
    if (!AIRecommendationEngine.instance) {
      AIRecommendationEngine.instance = new AIRecommendationEngine()
    }
    return AIRecommendationEngine.instance
  }

  private initializeProductDatabase(): RecommendationItem[] {
    return [
      {
        id: 1,
        name: "Premium Baby Essentials Basket",
        price: 12500,
        originalPrice: 15000,
        category: "Baby Shower",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 156,
        tags: ["Organic", "Premium", "Practical"],
        description: "Carefully curated baby essentials including organic cotton clothes, toys, and care products",
        aiReason: "Perfect for new parents with premium organic items",
        confidence: 0.95,
      },
      {
        id: 2,
        name: "Traditional Ruracio Ceremony Set",
        price: 18500,
        originalPrice: 22000,
        category: "Ruracio",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 89,
        tags: ["Cultural", "Traditional", "Authentic"],
        description: "Authentic Kikuyu traditional items for ruracio ceremonies",
        aiReason: "Culturally appropriate with authentic traditional elements",
        confidence: 0.92,
      },
      {
        id: 3,
        name: "Quinceañera Princess Collection",
        price: 25000,
        originalPrice: 30000,
        category: "Quinceañera",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 134,
        tags: ["Elegant", "Personalized", "Luxury"],
        description: "Elegant collection for the special quinceañera celebration",
        aiReason: "Age-appropriate luxury items for this milestone celebration",
        confidence: 0.88,
      },
      {
        id: 4,
        name: "Corporate Executive Gift Box",
        price: 15600,
        originalPrice: 19500,
        category: "Corporate",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 78,
        tags: ["Professional", "Premium", "Branded"],
        description: "Professional gift set perfect for corporate relationships",
        aiReason: "Professional presentation suitable for business relationships",
        confidence: 0.85,
      },
      {
        id: 5,
        name: "Romantic Anniversary Collection",
        price: 22000,
        originalPrice: 26000,
        category: "Anniversary",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 112,
        tags: ["Romantic", "Luxury", "Personalized"],
        description: "Romantic gifts perfect for celebrating love and milestones",
        aiReason: "Romantic elements perfect for celebrating relationship milestones",
        confidence: 0.91,
      },
      {
        id: 6,
        name: "Birthday Celebration Deluxe",
        price: 13000,
        originalPrice: 16000,
        category: "Birthday",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 203,
        tags: ["Fun", "Colorful", "Sweet Treats"],
        description: "Fun and festive birthday celebration package",
        aiReason: "Festive and fun elements perfect for birthday celebrations",
        confidence: 0.87,
      },
      {
        id: 7,
        name: "Graduation Success Bundle",
        price: 11700,
        originalPrice: 14000,
        category: "Graduation",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 95,
        tags: ["Inspirational", "Achievement", "Future-focused"],
        description: "Inspirational gifts to celebrate academic achievements",
        aiReason: "Achievement-focused items to inspire future success",
        confidence: 0.89,
      },
      {
        id: 8,
        name: "Wedding Bliss Collection",
        price: 28000,
        originalPrice: 35000,
        category: "Wedding",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 167,
        tags: ["Elegant", "Romantic", "Memorable"],
        description: "Elegant wedding gifts for the happy couple",
        aiReason: "Elegant and memorable items perfect for newlyweds",
        confidence: 0.93,
      },
    ]
  }

  async generateRecommendations(preferences: UserPreferences): Promise<AIRecommendationResponse> {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const { occasion, budget, recipient } = preferences
    let filteredProducts = [...this.productDatabase]
    let reasoning =
      "Based on your preferences, I've analyzed thousands of gift combinations to find the perfect matches. "

    // Filter by occasion
    if (occasion && occasion !== "any") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.toLowerCase().includes(occasion.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(occasion.toLowerCase())),
      )
      reasoning += `I focused on ${occasion} gifts that are culturally appropriate and well-received. `
    }

    // Filter by budget
    if (budget) {
      const [min, max] = this.parseBudgetRange(budget)
      filteredProducts = filteredProducts.filter((product) => product.price >= min && product.price <= max)
      reasoning += `I selected items within your ${budget} budget range. `
    }

    // Apply AI scoring based on recipient info
    if (recipient) {
      filteredProducts = filteredProducts.map((product) => ({
        ...product,
        confidence: this.calculatePersonalizationScore(product, recipient),
      }))
      reasoning += `I personalized selections based on the recipient's profile. `
    }

    // Sort by AI confidence and rating
    filteredProducts.sort((a, b) => b.confidence * b.rating - a.confidence * a.rating)

    // Take top recommendations
    const recommendations = filteredProducts.slice(0, 6)

    // Calculate overall confidence
    const overallConfidence =
      recommendations.length > 0
        ? recommendations.reduce((sum, item) => sum + item.confidence, 0) / recommendations.length
        : 0

    reasoning += `These recommendations have a ${Math.round(overallConfidence * 100)}% confidence score based on similar successful purchases.`

    return {
      recommendations,
      reasoning,
      confidence: overallConfidence,
      alternativeOccasions: this.suggestAlternativeOccasions(occasion),
    }
  }

  private parseBudgetRange(budget: string): [number, number] {
    const ranges: Record<string, [number, number]> = {
      "6500-13000": [6500, 13000],
      "13000-26000": [13000, 26000],
      "26000-39000": [26000, 39000],
      "39000+": [39000, 100000],
    }
    return ranges[budget] || [0, 100000]
  }

  private calculatePersonalizationScore(product: RecommendationItem, recipient: any): number {
    let score = product.confidence

    // Age-based adjustments
    if (recipient.age) {
      if (recipient.age === "child" && product.tags.includes("Fun")) score += 0.1
      if (recipient.age === "adult" && product.tags.includes("Professional")) score += 0.1
      if (recipient.age === "senior" && product.tags.includes("Traditional")) score += 0.1
    }

    // Gender-based adjustments (subtle)
    if (recipient.gender) {
      if (recipient.gender === "female" && product.tags.includes("Elegant")) score += 0.05
      if (recipient.gender === "male" && product.tags.includes("Professional")) score += 0.05
    }

    // Interest-based adjustments
    if (recipient.interests) {
      const matchingInterests = product.tags.filter((tag) =>
        recipient.interests.some((interest: string) => interest.toLowerCase().includes(tag.toLowerCase())),
      )
      score += matchingInterests.length * 0.1
    }

    return Math.min(score, 1.0)
  }

  private suggestAlternativeOccasions(currentOccasion?: string): string[] {
    const alternatives: Record<string, string[]> = {
      birthday: ["anniversary", "graduation"],
      anniversary: ["wedding", "valentine"],
      "baby-shower": ["christening", "first-birthday"],
      graduation: ["promotion", "achievement"],
      wedding: ["anniversary", "engagement"],
      corporate: ["appreciation", "milestone"],
    }
    return alternatives[currentOccasion || ""] || []
  }

  async getPersonalizedSuggestions(userId: string): Promise<RecommendationItem[]> {
    // Simulate getting user history and generating personalized suggestions
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return this.productDatabase
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map((item) => ({
        ...item,
        aiReason: "Based on your browsing history and similar customers' preferences",
      }))
  }
}
