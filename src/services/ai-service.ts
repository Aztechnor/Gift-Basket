import { Product, RecommendationContext, ChatMessage, AIRecommendation } from '@/types'
import { GoogleGenAI } from '@google/genai'
import { DEFAULTS, ERROR_MESSAGES } from '@/constants'
import { formatCurrency, generateId } from '@/utils'

// ============================================
// AI SERVICE CONFIGURATION
// ============================================

interface AIServiceConfig {
  apiKey?: string
  model?: string
  temperature?: number
  maxTokens?: number
  timeout?: number
}

const DEFAULT_CONFIG: AIServiceConfig = {
  model: 'gemini-2.5-flash',
  temperature: 0.7,
  maxTokens: 4096,
  timeout: 30000,
}

// ============================================
// PRODUCT CATALOG FOR AI RECOMMENDATIONS
// ============================================

// This would ideally come from a database or API
const PRODUCT_CATALOG: Product[] = [
  {
    id: 1,
    name: 'Premium Gift Basket',
    description: 'A luxurious collection of premium gifts including chocolates, flowers, and more',
    slug: 'premium-gift-basket',
    price: 15600,
    originalPrice: 19500,
    category: { id: 'custom', name: 'Custom Gifts', slug: 'custom' },
    tags: ['Premium', 'Luxury', 'Gift Basket', 'Special Occasion'],
    images: [{ id: '1', url: '/images/products/premium-basket.jpg', alt: 'Premium Gift Basket', isPrimary: true, order: 0 }],
    stock: { quantity: 50, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 156,
    isFeatured: true,
    isOnSale: true,
    aiReason: 'Perfect for special occasions with premium items',
    confidence: 0.95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Traditional Ruracio Ceremony Set',
    description: 'Authentic Kikuyu traditional items for ruracio ceremonies including kiondo, muthundu, and more',
    slug: 'traditional-ruracio-set',
    price: 22000,
    originalPrice: 26000,
    category: { id: 'custom', name: 'Custom Gifts', slug: 'custom' },
    tags: ['Cultural', 'Traditional', 'Authentic', 'Ruracio', 'Kenyan'],
    images: [{ id: '1', url: '/images/products/ruracio.jpg', alt: 'Traditional Ruracio Set', isPrimary: true, order: 0 }],
    stock: { quantity: 25, inStock: true, lowStock: true },
    rating: 4.8,
    reviews: 89,
    isFeatured: true,
    isOnSale: true,
    aiReason: 'Culturally appropriate with authentic traditional elements for Kenyan ceremonies',
    confidence: 0.92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Baby Essentials Bundle',
    description: 'Carefully curated baby essentials including organic cotton clothes, toys, and care products',
    slug: 'baby-essentials-bundle',
    price: 12500,
    category: { id: 'care-packages', name: 'Care Packages', slug: 'care-packages' },
    tags: ['Organic', 'Premium', 'Practical', 'Baby Shower', 'New Parents'],
    images: [{ id: '1', url: '/images/products/baby-essentials.jpg', alt: 'Baby Essentials Bundle', isPrimary: true, order: 0 }],
    stock: { quantity: 100, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 203,
    isFeatured: true,
    aiReason: 'Perfect for new parents with premium organic items',
    confidence: 0.95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'Corporate Executive Gift Box',
    description: 'Professional gift set perfect for corporate relationships with branded items',
    slug: 'corporate-executive-box',
    price: 18000,
    originalPrice: 22000,
    category: { id: 'custom', name: 'Custom Gifts', slug: 'custom' },
    tags: ['Professional', 'Premium', 'Branded', 'Corporate', 'Executive'],
    images: [{ id: '1', url: '/images/products/corporate-gift.jpg', alt: 'Corporate Executive Gift Box', isPrimary: true, order: 0 }],
    stock: { quantity: 75, inStock: true, lowStock: false },
    rating: 4.7,
    reviews: 78,
    isFeatured: true,
    isOnSale: true,
    aiReason: 'Professional presentation suitable for business relationships',
    confidence: 0.85,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: 'Romantic Anniversary Collection',
    description: 'Romantic gifts perfect for celebrating love and milestones with your partner',
    slug: 'romantic-anniversary-collection',
    price: 22000,
    originalPrice: 26000,
    category: { id: 'custom', name: 'Custom Gifts', slug: 'custom' },
    tags: ['Romantic', 'Luxury', 'Personalized', 'Anniversary', 'Love'],
    images: [{ id: '1', url: '/images/products/anniversary.jpg', alt: 'Romantic Anniversary Collection', isPrimary: true, order: 0 }],
    stock: { quantity: 45, inStock: true, lowStock: true },
    rating: 4.8,
    reviews: 112,
    isFeatured: true,
    isOnSale: true,
    aiReason: 'Romantic elements perfect for celebrating relationship milestones',
    confidence: 0.91,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: 'Birthday Celebration Deluxe',
    description: 'Fun and festive birthday celebration package with balloons, cake, and gifts',
    slug: 'birthday-celebration-deluxe',
    price: 13000,
    originalPrice: 16000,
    category: { id: 'custom', name: 'Custom Gifts', slug: 'custom' },
    tags: ['Fun', 'Colorful', 'Sweet Treats', 'Birthday', 'Celebration'],
    images: [{ id: '1', url: '/images/products/birthday.jpg', alt: 'Birthday Celebration Deluxe', isPrimary: true, order: 0 }],
    stock: { quantity: 80, inStock: true, lowStock: false },
    rating: 4.6,
    reviews: 203,
    isFeatured: true,
    isOnSale: true,
    aiReason: 'Festive and fun elements perfect for birthday celebrations',
    confidence: 0.87,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: 'Graduation Success Bundle',
    description: 'Inspirational gifts to celebrate academic achievements and future success',
    slug: 'graduation-success-bundle',
    price: 11700,
    originalPrice: 14000,
    category: { id: 'custom', name: 'Custom Gifts', slug: 'custom' },
    tags: ['Inspirational', 'Achievement', 'Future-focused', 'Graduation', 'Success'],
    images: [{ id: '1', url: '/images/products/graduation.jpg', alt: 'Graduation Success Bundle', isPrimary: true, order: 0 }],
    stock: { quantity: 60, inStock: true, lowStock: false },
    rating: 4.7,
    reviews: 95,
    isFeatured: true,
    isOnSale: true,
    aiReason: 'Achievement-focused items to inspire future success',
    confidence: 0.89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: 'Wedding Bliss Collection',
    description: 'Elegant wedding gifts for the happy couple with luxury items',
    slug: 'wedding-bliss-collection',
    price: 28000,
    originalPrice: 35000,
    category: { id: 'custom', name: 'Custom Gifts', slug: 'custom' },
    tags: ['Elegant', 'Romantic', 'Memorable', 'Wedding', 'Newlyweds'],
    images: [{ id: '1', url: '/images/products/wedding.jpg', alt: 'Wedding Bliss Collection', isPrimary: true, order: 0 }],
    stock: { quantity: 30, inStock: true, lowStock: true },
    rating: 4.9,
    reviews: 167,
    isFeatured: true,
    isOnSale: true,
    aiReason: 'Elegant and memorable items perfect for newlyweds',
    confidence: 0.93,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    name: 'Artisan Chocolate Box',
    description: 'Handcrafted artisan chocolates with various flavors and fillings',
    slug: 'artisan-chocolate-box',
    price: 4500,
    category: { id: 'chocolates', name: 'Chocolates & Sweets', slug: 'chocolates' },
    tags: ['Chocolate', 'Artisan', 'Handcrafted', 'Gift', 'Sweet Treats'],
    images: [{ id: '1', url: '/images/products/chocolate.jpg', alt: 'Artisan Chocolate Box', isPrimary: true, order: 0 }],
    stock: { quantity: 200, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 312,
    isFeatured: true,
    aiReason: 'Decadent handcrafted chocolates perfect for any sweet tooth',
    confidence: 0.88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    name: 'Get Well Soon Care Package',
    description: 'Comforting items for recovery including herbal teas, cozy socks, and relaxing music',
    slug: 'get-well-soon-care-package',
    price: 6500,
    category: { id: 'care-packages', name: 'Care Packages', slug: 'care-packages' },
    tags: ['Care', 'Comfort', 'Recovery', 'Wellness', 'Get Well'],
    images: [{ id: '1', url: '/images/products/get-well.jpg', alt: 'Get Well Soon Care Package', isPrimary: true, order: 0 }],
    stock: { quantity: 120, inStock: true, lowStock: false },
    rating: 4.7,
    reviews: 189,
    isFeatured: true,
    aiReason: 'Comforting items carefully selected to aid recovery',
    confidence: 0.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// USER PROFILE FOR CONTEXT
// ============================================

const USER_PROFILE = {
  name: 'Alex',
  history: [
    { recipient: 'James', relationship: 'Partner', lastGift: 'Artisan Chocolate Box', date: 'Last Year' },
    { recipient: 'Mum', relationship: 'Mother', lastGift: 'Flowers', date: 'Last Mother\'s Day' },
    { recipient: 'Sarah', relationship: 'Sister', lastGift: 'Luxury Spa Hamper', date: '2 months ago' },
  ],
}

// ============================================
// AI PROMPTS
// ============================================

const SYSTEM_PROMPT = (catalog: Product[] = PRODUCT_CATALOG) => `You are a helpful, contextual AI Gift Advisor for GiftBasket.
You understand the current occasion, recipient, relationship, recipient preferences, previous gifts, budget, and product catalogue.

You have access to the user's profile:
User Name: ${USER_PROFILE.name}
Saved People & Gifting History:
${JSON.stringify(USER_PROFILE.history, null, 2)}

Product Catalog (NEVER invent products, only recommend from this list):
${JSON.stringify(
  catalog.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    category: p.category.name,
    tags: p.tags,
    description: p.description,
    rating: p.rating,
    reviews: p.reviews,
    aiReason: p.aiReason,
    confidence: p.confidence,
  })),
  null,
  2
)}

Guidelines:
1. If the user mentions a specific person (e.g., James, Mum, Sarah), use the saved history. For example, if they say James, you can mention he liked the chocolate box last year.
2. If they mention everyday occasions like "She isn't feeling well", "cheer him up", "girlfriend has cramps", recommend appropriate care packages using respectful, non-medical language.
3. NEVER invent products. Only use the provided catalog.
4. Output your response strictly in the provided JSON schema.

Schema requirements:
- content: Your conversational reply to the user.
- productIds: Array of product IDs from the catalog you recommend based on their request.
- suggestions: Quick reply suggestions for the user to click.
`

const RECOMMENDATION_PROMPT = (context: RecommendationContext, catalog: Product[] = PRODUCT_CATALOG) => `You are an expert AI Gift Recommendation Engine for GiftBasket.
Your task is to provide personalized gift recommendations based on the user's preferences and context.

Current Context:
${JSON.stringify(context, null, 2)}

Product Catalog (only recommend from this list):
${JSON.stringify(
  catalog.map((p) => ({
    id: p.id,
    name: p.name,
    price: formatCurrency(p.price),
    category: p.category.name,
    tags: p.tags,
    description: p.description,
    rating: p.rating,
    reviews: p.reviews,
    aiReason: p.aiReason,
    confidence: p.confidence,
  })),
  null,
  2
)}

Guidelines:
1. Filter products based on the context (occasion, budget, recipient).
2. Rank products by relevance and confidence score.
3. Provide a reasoning for your recommendations.
4. NEVER invent products. Only use the provided catalog.
5. Output in JSON format with the following structure:
{
  "recommendations": [
    {
      "id": number,
      "name": string,
      "price": number,
      "category": string,
      "rating": number,
      "reviews": number,
      "tags": string[],
      "description": string,
      "aiReason": string,
      "confidence": number,
      "image": string
    }
  ],
  "reasoning": string,
  "confidence": number
}
`

// ============================================
// AI SERVICE CLASS
// ============================================

class AIService {
  private ai: GoogleGenAI
  private config: AIServiceConfig
  private catalog: Product[]
  
  constructor(config: AIServiceConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.ai = new GoogleGenAI({ apiKey: config.apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY })
    this.catalog = PRODUCT_CATALOG
  }
  
  // ==========================================
  // CHAT FUNCTIONS
  // ==========================================
  
  /**
   * Generate AI chat response
   * @param message - User message
   * @param history - Chat history
   * @param context - Current conversation context
   * @returns Promise with AI response
   */
  async generateChatResponse(
    message: string,
    history: ChatMessage[] = [],
    context: RecommendationContext = {}
  ): Promise<{
    content: string
    productIds?: number[]
    suggestions?: string[]
  }> {
    try {
      const formattedHistory = history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }))
      
      const response = await this.ai.models.generateContent({
        model: this.config.model,
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT(this.catalog) }] },
          { role: 'model', parts: [{ text: 'Understood. I will follow these instructions.' }] },
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] },
        ],
        config: {
          temperature: this.config.temperature,
          maxOutputTokens: this.config.maxTokens,
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              content: { type: 'STRING' },
              productIds: {
                type: 'ARRAY',
                items: { type: 'INTEGER' },
              },
              suggestions: {
                type: 'ARRAY',
                items: { type: 'STRING' },
              },
            },
            required: ['content', 'productIds', 'suggestions'],
          },
        },
      })
      
      const text = response.text || '{}'
      const parsed = JSON.parse(text)
      
      return {
        content: parsed.content,
        productIds: parsed.productIds,
        suggestions: parsed.suggestions,
      }
    } catch (error) {
      console.error('AI chat error:', error)
      throw new Error(ERROR_MESSAGES.SERVER_ERROR)
    }
  }
  
  /**
   * Stream chat response
   * @param message - User message
   * @param history - Chat history
   * @returns Async generator for streaming response
   */
  async *streamChatResponse(
    message: string,
    history: ChatMessage[] = []
  ): AsyncGenerator<string> {
    try {
      const formattedHistory = history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }))
      
      const stream = await this.ai.models.streamGenerateContent({
        model: this.config.model,
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT(this.catalog) }] },
          { role: 'model', parts: [{ text: 'Understood. I will follow these instructions.' }] },
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] },
        ],
        config: {
          temperature: this.config.temperature,
          maxOutputTokens: this.config.maxTokens,
        },
      })
      
      for await (const chunk of stream) {
        const text = chunk.text
        if (text) {
          yield text
        }
      }
    } catch (error) {
      console.error('AI stream error:', error)
      throw new Error(ERROR_MESSAGES.SERVER_ERROR)
    }
  }
  
  // ==========================================
  // RECOMMENDATION FUNCTIONS
  // ==========================================
  
  /**
   * Generate personalized recommendations
   * @param context - Recommendation context
   * @returns Promise with AI recommendations
   */
  async generateRecommendations(
    context: RecommendationContext
  ): Promise<AIRecommendation> {
    try {
      // Filter and score products based on context
      const filteredProducts = this.filterProductsByContext(context)
      const scoredProducts = this.scoreProducts(filteredProducts, context)
      const sortedProducts = scoredProducts.sort((a, b) => b.score - a.score)
      
      const recommendations = sortedProducts.slice(0, 6).map((p) => p.product)
      const reasoning = this.generateReasoning(context, recommendations)
      const confidence = recommendations.length > 0
        ? recommendations.reduce((sum, p) => sum + (p.confidence || 0), 0) / recommendations.length
        : 0
      
      return {
        id: generateId(),
        query: this.buildQueryString(context),
        recommendations,
        reasoning,
        confidence: Math.round(confidence * 100) / 100,
        context,
        createdAt: new Date(),
      }
    } catch (error) {
      console.error('Recommendation error:', error)
      throw new Error(ERROR_MESSAGES.SERVER_ERROR)
    }
  }
  
  /**
   * Filter products based on context
   * @param context - Recommendation context
   * @returns Filtered products
   */
  private filterProductsByContext(context: RecommendationContext): Product[] {
    let filtered = [...this.catalog]
    
    // Filter by occasion
    if (context.occasion) {
      filtered = filtered.filter((product) => {
        const occasionLower = context.occasion?.toLowerCase() || ''
        return (
          product.category.name.toLowerCase().includes(occasionLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(occasionLower)) ||
          product.name.toLowerCase().includes(occasionLower)
        )
      })
    }
    
    // Filter by budget
    if (context.budget) {
      const budgetRange = this.getBudgetRange(context.budget)
      filtered = filtered.filter((product) => {
        return product.price >= budgetRange.min && product.price <= budgetRange.max
      })
    }
    
    // Filter by recipient
    if (context.recipient) {
      const { age, gender, relationship, interests } = context.recipient
      
      if (age) {
        filtered = filtered.filter((product) => {
          const ageLower = age.toLowerCase()
          return product.tags.some((tag) => 
            tag.toLowerCase().includes(ageLower) ||
            (ageLower === 'child' && tag.toLowerCase().includes('baby')) ||
            (ageLower === 'adult' && !tag.toLowerCase().includes('baby') && !tag.toLowerCase().includes('child'))
          )
        })
      }
      
      if (gender) {
        const genderLower = gender.toLowerCase()
        filtered = filtered.filter((product) => {
          return product.tags.some((tag) => {
            const tagLower = tag.toLowerCase()
            return (
              (genderLower === 'female' && (tagLower.includes('female') || tagLower.includes('woman') || tagLower.includes('girl'))) ||
              (genderLower === 'male' && (tagLower.includes('male') || tagLower.includes('man') || tagLower.includes('boy'))) ||
              (tagLower === 'unisex' || tagLower === 'neutral')
            )
          })
        })
      }
      
      if (relationship) {
        const relationshipLower = relationship.toLowerCase()
        filtered = filtered.filter((product) => {
          return product.tags.some((tag) => 
            tag.toLowerCase().includes(relationshipLower)
          )
        })
      }
      
      if (interests && interests.length > 0) {
        filtered = filtered.filter((product) => {
          return interests.some((interest) =>
            product.tags.some((tag) =>
              tag.toLowerCase().includes(interest.toLowerCase())
            )
          )
        })
      }
    }
    
    return filtered
  }
  
  /**
   * Score products based on context
   * @param products - Products to score
   * @param context - Recommendation context
   * @returns Scored products with score
   */
  private scoreProducts(products: Product[], context: RecommendationContext): { product: Product; score: number }[] {
    return products.map((product) => {
      let score = product.confidence || 0.5
      
      // Boost by rating
      score += (product.rating / 5) * 0.2
      
      // Boost by review count
      score += Math.min(product.reviews / 100, 0.1)
      
      // Boost if featured
      if (product.isFeatured) score += 0.1
      
      // Boost if on sale
      if (product.isOnSale) score += 0.05
      
      // Context-based scoring
      if (context.occasion) {
        const occasionLower = context.occasion.toLowerCase()
        if (
          product.category.name.toLowerCase().includes(occasionLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(occasionLower))
        ) {
          score += 0.2
        }
      }
      
      if (context.recipient) {
        const { age, gender, relationship } = context.recipient
        
        if (age) {
          const ageLower = age.toLowerCase()
          if (product.tags.some((tag) => tag.toLowerCase().includes(ageLower))) {
            score += 0.15
          }
        }
        
        if (gender) {
          const genderLower = gender.toLowerCase()
          if (product.tags.some((tag) => {
            const tagLower = tag.toLowerCase()
            return (
              (genderLower === 'female' && (tagLower.includes('female') || tagLower.includes('woman'))) ||
              (genderLower === 'male' && (tagLower.includes('male') || tagLower.includes('man')))
            )
          })) {
            score += 0.1
          }
        }
      }
      
      return { product, score: Math.min(score, 1.0) }
    })
  }
  
  /**
   * Generate reasoning for recommendations
   * @param context - Recommendation context
   * @param recommendations - Recommended products
   * @returns Reasoning string
   */
  private generateReasoning(context: RecommendationContext, recommendations: Product[]): string {
    const parts: string[] = []
    
    if (context.occasion) {
      parts.push(`Based on the ${context.occasion} occasion`)
    }
    
    if (context.budget) {
      const budgetRange = this.getBudgetRange(context.budget)
      parts.push(`within your ${budgetRange.label} budget`)
    }
    
    if (context.recipient) {
      const { relationship, age, gender } = context.recipient
      
      if (relationship) {
        parts.push(`for your ${relationship}`)
      }
      
      if (age) {
        parts.push(`who is ${age}`)
      }
      
      if (gender) {
        parts.push(`(${gender})`)
      }
    }
    
    if (parts.length > 0) {
      return `These recommendations were selected ${parts.join(' ')}. I've analyzed our catalog and found the best matches for your criteria.`
    }
    
    return 'Here are some personalized recommendations based on your preferences.'
  }
  
  /**
   * Build query string from context
   * @param context - Recommendation context
   * @returns Query string
   */
  private buildQueryString(context: RecommendationContext): string {
    const parts: string[] = []
    
    if (context.occasion) {
      parts.push(context.occasion)
    }
    
    if (context.budget) {
      parts.push(context.budget)
    }
    
    if (context.recipient?.relationship) {
      parts.push(context.recipient.relationship)
    }
    
    if (context.recipient?.age) {
      parts.push(context.recipient.age)
    }
    
    return parts.join(' ') || 'general recommendation'
  }
  
  /**
   * Get budget range from value
   * @param budget - Budget range value
   * @returns Min and max values
   */
  private getBudgetRange(budget: string): { min: number; max: number } {
    const ranges: Record<string, { min: number; max: number }> = {
      '0-5000': { min: 0, max: 5000 },
      '5000-10000': { min: 5000, max: 10000 },
      '10000-20000': { min: 10000, max: 20000 },
      '20000-30000': { min: 20000, max: 30000 },
      '30000+': { min: 30000, max: 100000 },
    }
    return ranges[budget] || { min: 0, max: 100000 }
  }
  
  // ==========================================
  // SINGLETON INSTANCE
  // ==========================================
  
  private static instance: AIService
  
  static getInstance(config: AIServiceConfig = {}): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService(config)
    }
    return AIService.instance
  }
  
  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
  
  /**
   * Search products by query
   * @param query - Search query
   * @param limit - Maximum number of results
   * @returns Matching products
   */
  searchProducts(query: string, limit: number = 10): Product[] {
    const queryLower = query.toLowerCase()
    
    return this.catalog
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(queryLower) ||
          product.description.toLowerCase().includes(queryLower) ||
          product.category.name.toLowerCase().includes(queryLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(queryLower))
        )
      })
      .slice(0, limit)
  }
  
  /**
   * Get product by ID
   * @param id - Product ID
   * @returns Product or undefined
   */
  getProductById(id: number | string): Product | undefined {
    return this.catalog.find((p) => p.id === id)
  }
  
  /**
   * Get products by category
   * @param categorySlug - Category slug
   * @returns Products in category
   */
  getProductsByCategory(categorySlug: string): Product[] {
    return this.catalog.filter((p) => p.category.slug === categorySlug)
  }
  
  /**
   * Get featured products
   * @param limit - Maximum number of results
   * @returns Featured products
   */
  getFeaturedProducts(limit: number = 8): Product[] {
    return this.catalog
      .filter((p) => p.isFeatured)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }
  
  /**
   * Get products on sale
   * @param limit - Maximum number of results
   * @returns Products on sale
   */
  getProductsOnSale(limit: number = 8): Product[] {
    return this.catalog
      .filter((p) => p.isOnSale)
      .sort((a, b) => ((b.originalPrice || b.price) - (a.originalPrice || a.price)) / (a.price || 1) - ((b.originalPrice || b.price) - b.price) / (b.price || 1))
      .slice(0, limit)
  }
  
  /**
   * Get top rated products
   * @param limit - Maximum number of results
   * @returns Top rated products
   */
  getTopRatedProducts(limit: number = 8): Product[] {
    return this.catalog
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }
  
  /**
   * Get best sellers (simulated)
   * @param limit - Maximum number of results
   * @returns Best selling products
   */
  getBestSellers(limit: number = 8): Product[] {
    // Simulate best sellers by reviews and rating
    return this.catalog
      .sort((a, b) => (b.reviews * b.rating) - (a.reviews * a.rating))
      .slice(0, limit)
  }
}

// Export singleton instance
export const aiService = AIService.getInstance()

export default AIService
