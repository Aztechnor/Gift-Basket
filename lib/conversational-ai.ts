export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  products?: RecommendedProduct[]
  typing?: boolean
}

export interface RecommendedProduct {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
  quickReason: string
}

export interface ConversationContext {
  occasion?: string
  budget?: string
  recipient?: {
    age?: string
    gender?: string
    relationship?: string
    interests?: string[]
  }
  preferences?: string[]
  currentStep?: "greeting" | "occasion" | "budget" | "recipient" | "recommendations" | "refinement"
}

export class ConversationalAI {
  private static instance: ConversationalAI
  private context: ConversationContext = {}
  private conversationHistory: ChatMessage[] = []

  static getInstance(): ConversationalAI {
    if (!ConversationalAI.instance) {
      ConversationalAI.instance = new ConversationalAI()
    }
    return ConversationalAI.instance
  }

  async processMessage(userMessage: string): Promise<ChatMessage> {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Analyze user intent and extract information
    const intent = this.analyzeIntent(userMessage)
    const extractedInfo = this.extractInformation(userMessage)

    // Update context with extracted information
    this.updateContext(extractedInfo)

    // Generate appropriate response
    const response = this.generateResponse(intent, userMessage)

    return {
      id: messageId,
      role: "assistant",
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions,
      products: response.products,
    }
  }

  private analyzeIntent(message: string): string {
    const lowerMessage = message.toLowerCase()

    // Greeting patterns
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return "greeting"
    }

    // Occasion patterns
    if (lowerMessage.match(/(birthday|anniversary|wedding|baby shower|graduation|ruracio|quinceañera|corporate)/)) {
      return "occasion_mentioned"
    }

    // Budget patterns
    if (lowerMessage.match(/(budget|price|cost|spend|afford|ksh|shilling)/)) {
      return "budget_mentioned"
    }

    // Recipient patterns
    if (lowerMessage.match(/(for my|for a|for someone|recipient|person|friend|family|colleague|partner)/)) {
      return "recipient_mentioned"
    }

    // Product inquiry
    if (lowerMessage.match(/(show me|recommend|suggest|what do you have|options|ideas)/)) {
      return "product_inquiry"
    }

    // Refinement
    if (lowerMessage.match(/(different|other|more|less expensive|cheaper|premium|luxury)/)) {
      return "refinement"
    }

    // Help
    if (lowerMessage.match(/(help|how|what can you do|assist)/)) {
      return "help"
    }

    return "general"
  }

  private extractInformation(message: string): Partial<ConversationContext> {
    const extracted: Partial<ConversationContext> = {}
    const lowerMessage = message.toLowerCase()

    // Extract occasion
    const occasions = {
      birthday: "birthday",
      anniversary: "anniversary",
      wedding: "wedding",
      "baby shower": "baby-shower",
      graduation: "graduation",
      ruracio: "ruracio",
      quinceañera: "quinceanera",
      corporate: "corporate",
    }

    for (const [key, value] of Object.entries(occasions)) {
      if (lowerMessage.includes(key)) {
        extracted.occasion = value
        break
      }
    }

    // Extract budget
    const budgetMatch = lowerMessage.match(/(\d+(?:,\d+)*)\s*(?:ksh|shillings?)/i)
    if (budgetMatch) {
      const amount = Number.parseInt(budgetMatch[1].replace(/,/g, ""))
      if (amount < 13000) extracted.budget = "6500-13000"
      else if (amount < 26000) extracted.budget = "13000-26000"
      else if (amount < 39000) extracted.budget = "26000-39000"
      else extracted.budget = "39000+"
    }

    // Extract recipient info
    const recipient: any = {}

    // Age
    if (lowerMessage.match(/(child|kid|baby|toddler)/)) recipient.age = "child"
    else if (lowerMessage.match(/(teen|teenager|adolescent)/)) recipient.age = "teen"
    else if (lowerMessage.match(/(young adult|college|university)/)) recipient.age = "young-adult"
    else if (lowerMessage.match(/(adult|grown.?up)/)) recipient.age = "adult"
    else if (lowerMessage.match(/(senior|elderly|grandparent)/)) recipient.age = "senior"

    // Gender
    if (lowerMessage.match(/(woman|female|girl|she|her|wife|girlfriend|mother|sister|daughter)/)) {
      recipient.gender = "female"
    } else if (lowerMessage.match(/(man|male|boy|he|him|husband|boyfriend|father|brother|son)/)) {
      recipient.gender = "male"
    }

    // Relationship
    if (lowerMessage.match(/(wife|husband|partner|spouse)/)) recipient.relationship = "partner"
    else if (lowerMessage.match(/(friend|buddy|pal)/)) recipient.relationship = "friend"
    else if (lowerMessage.match(/(colleague|coworker|boss|employee)/)) recipient.relationship = "colleague"
    else if (lowerMessage.match(/(mother|father|sister|brother|family)/)) recipient.relationship = "family"

    // Interests
    const interests = []
    if (lowerMessage.match(/(cook|cooking|chef|kitchen)/)) interests.push("cooking")
    if (lowerMessage.match(/(read|reading|books)/)) interests.push("reading")
    if (lowerMessage.match(/(sport|sports|fitness|gym)/)) interests.push("sports")
    if (lowerMessage.match(/(music|musician|sing)/)) interests.push("music")
    if (lowerMessage.match(/(tech|technology|gadget)/)) interests.push("technology")
    if (lowerMessage.match(/(art|artistic|creative|paint)/)) interests.push("art")

    if (interests.length > 0) recipient.interests = interests

    if (Object.keys(recipient).length > 0) {
      extracted.recipient = recipient
    }

    return extracted
  }

  private updateContext(extracted: Partial<ConversationContext>) {
    if (extracted.occasion) this.context.occasion = extracted.occasion
    if (extracted.budget) this.context.budget = extracted.budget
    if (extracted.recipient) {
      this.context.recipient = { ...this.context.recipient, ...extracted.recipient }
    }
  }

  private generateResponse(
    intent: string,
    userMessage: string,
  ): {
    content: string
    suggestions?: string[]
    products?: RecommendedProduct[]
  } {
    switch (intent) {
      case "greeting":
        return {
          content:
            "Hello! 👋 I'm your AI gift advisor. I'm here to help you find the perfect gift! What's the occasion you're shopping for?",
          suggestions: [
            "I need a birthday gift",
            "Looking for anniversary gifts",
            "Baby shower gift ideas",
            "Corporate gift suggestions",
          ],
        }

      case "occasion_mentioned":
        const occasion = this.context.occasion
        return {
          content: `Great choice! ${this.getOccasionResponse(occasion)} What's your budget range for this gift?`,
          suggestions: ["KSh 6,500 - 13,000", "KSh 13,000 - 26,000", "KSh 26,000 - 39,000", "Above KSh 39,000"],
        }

      case "budget_mentioned":
        return {
          content: "Perfect! Now tell me a bit about the recipient. Who is this gift for?",
          suggestions: ["For my partner/spouse", "For a close friend", "For a family member", "For a colleague"],
        }

      case "recipient_mentioned":
        return {
          content: "Excellent! Based on what you've told me, let me show you some personalized recommendations.",
          products: this.generateProductRecommendations(),
        }

      case "product_inquiry":
        return {
          content:
            "I'd love to show you some great options! Let me ask a few quick questions to personalize my recommendations. What's the occasion?",
          suggestions: ["Birthday celebration", "Anniversary gift", "Baby shower", "Just because"],
        }

      case "refinement":
        return {
          content: "Let me adjust my recommendations based on your preferences. Here are some different options:",
          products: this.generateProductRecommendations(true),
        }

      case "help":
        return {
          content:
            "I'm here to help you find the perfect gift! I can:\n\n• Recommend gifts based on occasion and budget\n• Suggest culturally appropriate options\n• Help you personalize gifts\n• Answer questions about our products\n\nJust tell me what you're looking for!",
          suggestions: [
            "Find birthday gifts",
            "Show me traditional gifts",
            "Help with corporate gifts",
            "Suggest romantic gifts",
          ],
        }

      default:
        return {
          content:
            "I understand you're looking for gift ideas! To give you the best recommendations, could you tell me more about the occasion or who the gift is for?",
          suggestions: [
            "It's for a birthday",
            "Anniversary gift needed",
            "Baby shower present",
            "Corporate appreciation",
          ],
        }
    }
  }

  private getOccasionResponse(occasion?: string): string {
    const responses = {
      birthday: "Birthdays are so special! I have amazing ideas for birthday celebrations.",
      anniversary: "Anniversaries deserve something romantic and memorable!",
      "baby-shower": "Baby showers are such joyful occasions! I have perfect gifts for new parents.",
      wedding: "Weddings are magical! Let's find something beautiful for the happy couple.",
      graduation: "Graduation is a huge achievement! Time to celebrate their success.",
      ruracio: "Ruracio is such a beautiful Kenyan tradition! I have culturally appropriate gifts.",
      quinceanera: "Quinceañeras are milestone celebrations! Let's make it extra special.",
      corporate: "Corporate gifts should be professional yet thoughtful.",
    }
    return responses[occasion as keyof typeof responses] || "That sounds like a wonderful occasion!"
  }

  private generateProductRecommendations(alternative = false): RecommendedProduct[] {
    const baseProducts = [
      {
        id: 1,
        name: "Premium Gift Basket",
        price: 15600,
        image: "/placeholder.svg?height=150&width=150",
        category: "Premium",
        rating: 4.9,
        quickReason: "Perfect for special occasions",
      },
      {
        id: 2,
        name: "Traditional Ruracio Set",
        price: 22000,
        image: "/placeholder.svg?height=150&width=150",
        category: "Cultural",
        rating: 4.8,
        quickReason: "Authentic Kenyan tradition",
      },
      {
        id: 3,
        name: "Baby Essentials Bundle",
        price: 12500,
        image: "/placeholder.svg?height=150&width=150",
        category: "Baby",
        rating: 4.9,
        quickReason: "Everything new parents need",
      },
      {
        id: 4,
        name: "Corporate Executive Box",
        price: 18000,
        image: "/placeholder.svg?height=150&width=150",
        category: "Corporate",
        rating: 4.7,
        quickReason: "Professional and impressive",
      },
    ]

    // Filter based on context
    let filtered = baseProducts

    if (this.context.occasion) {
      filtered = baseProducts.filter(
        (product) =>
          product.category.toLowerCase().includes(this.context.occasion!) ||
          product.name.toLowerCase().includes(this.context.occasion!),
      )
    }

    if (this.context.budget) {
      const [min, max] = this.parseBudgetRange(this.context.budget)
      filtered = filtered.filter((product) => product.price >= min && product.price <= max)
    }

    return alternative ? filtered.reverse() : filtered.slice(0, 3)
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

  getContext(): ConversationContext {
    return { ...this.context }
  }

  resetContext(): void {
    this.context = {}
    this.conversationHistory = []
  }
}
