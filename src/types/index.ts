// Core Types
import { ReactNode } from 'react'

export type { ReactNode }

// Site Configuration
export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
  creator: string
  theme: {
    primary: string
    secondary: string
    accent: string
  }
  features: {
    aiRecommendations: boolean
    chatAssistant: boolean
    basketBuilder: boolean
    customPrinting: boolean
  }
  currency: {
    code: string
    symbol: string
    rate: number
  }
  navigation: {
    main: NavItem[]
    footer: NavItem[]
  }
  social: Record<string, string>
}

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

// User & Authentication
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: UserRole
  preferences?: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'customer' | 'admin' | 'moderator'

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system'
  language?: string
  currency?: string
  notifications?: boolean
}

// Products & Categories
export interface Product {
  id: number | string
  name: string
  description: string
  slug: string
  price: number
  originalPrice?: number
  cost?: number
  category: Category
  subcategory?: Subcategory
  tags: string[]
  sku?: string
  barcode?: string
  images: ProductImage[]
  stock: StockInfo
  rating: number
  reviews: number
  isFeatured?: boolean
  isNew?: boolean
  isOnSale?: boolean
  aiReason?: string
  confidence?: number
  metadata?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface StockInfo {
  quantity: number
  inStock: boolean
  lowStock?: boolean
  location?: string
}

export interface Category {
  id: number | string
  name: string
  slug: string
  description?: string
  image?: string
  parent?: Category
  children?: Category[]
  order?: number
  isActive?: boolean
  metadata?: Record<string, unknown>
}

export interface Subcategory {
  id: number | string
  name: string
  slug: string
  category: Category
  description?: string
  image?: string
}

// Occasions & Recipients
export interface Occasion {
  id: number | string
  name: string
  slug: string
  description: string
  category?: string
  image?: string
  tags: string[]
  isActive: boolean
  order: number
  metadata?: Record<string, unknown>
}

export interface Recipient {
  id: number | string
  name: string
  relationship: string
  age?: string
  gender?: string
  interests?: string[]
  notes?: string
  userId?: string
  createdAt: Date
  updatedAt: Date
}

export type RecipientRelationship = 
  | 'partner'
  | 'spouse'
  | 'mother'
  | 'father'
  | 'sister'
  | 'brother'
  | 'daughter'
  | 'son'
  | 'friend'
  | 'colleague'
  | 'boss'
  | 'client'
  | 'myself'

// Orders & Cart
export interface CartItem {
  id: string
  product: Product
  productId: number | string
  quantity: number
  price: number
  total: number
  selectedVariants?: Record<string, string>
  customization?: CustomizationOptions
  giftMessage?: string
  isGift?: boolean
  wrapGift?: boolean
  wrapMessage?: string
}

export interface Cart {
  id: string
  userId?: string
  items: CartItem[]
  subtotal: number
  discount: number
  tax: number
  shipping: number
  total: number
  currency: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId?: string
  customer: CustomerInfo
  items: OrderItem[]
  subtotal: number
  discount: number
  tax: number
  shipping: number
  total: number
  currency: string
  status: OrderStatus
  payment: PaymentInfo
  shippingInfo: ShippingInfo
  notes?: string
  tracking?: TrackingInfo
  metadata?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  product: Product
  productId: number | string
  quantity: number
  price: number
  total: number
  selectedVariants?: Record<string, string>
  customization?: CustomizationOptions
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address?: Address
}

export interface Address {
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
  isDefault?: boolean
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface PaymentInfo {
  method: PaymentMethod
  status: PaymentStatus
  transactionId?: string
  amount: number
  currency: string
  paidAt?: Date
}

export type PaymentMethod = 
  | 'mpesa'
  | 'card'
  | 'bank_transfer'
  | 'cash_on_delivery'
  | 'paypal'

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface ShippingInfo {
  method: ShippingMethod
  cost: number
  estimatedDelivery: Date
  trackingNumber?: string
  address: Address
}

export type ShippingMethod = 
  | 'standard'
  | 'express'
  | 'same_day'
  | 'pickup'

export interface TrackingInfo {
  number: string
  url: string
  status: string
  updates: TrackingUpdate[]
}

export interface TrackingUpdate {
  date: Date
  status: string
  description: string
  location?: string
}

export interface CustomizationOptions {
  text?: string
  color?: string
  font?: string
  image?: string
  message?: string
  // Flexible key-value pairs for various customization options
  [key: string]: string | undefined
}

// AI & Recommendations
export interface AIRecommendation {
  id: string
  query: string
  recommendations: Product[]
  reasoning: string
  confidence: number
  context: RecommendationContext
  createdAt: Date
}

export interface RecommendationContext {
  occasion?: string
  budget?: BudgetRange
  recipient?: {
    age?: string
    gender?: string
    relationship?: string
    interests?: string[]
  }
  preferences?: string[]
  userId?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  suggestions?: string[]
  products?: Product[]
  metadata?: Record<string, unknown>
}

export interface Conversation {
  id: string
  userId?: string
  messages: ChatMessage[]
  context: RecommendationContext
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Budget & Pricing
export type BudgetRange = 
  | '0-5000'
  | '5000-10000'
  | '10000-20000'
  | '20000-30000'
  | '30000+'

export interface PriceRange {
  min: number
  max: number
  label: string
}

// Basket Builder
export interface Basket {
  id: string
  userId?: string
  name: string
  description?: string
  items: BasketItem[]
  theme?: string
  occasion?: string
  budget?: BudgetRange
  isPublic: boolean
  shareLink?: string
  createdAt: Date
  updatedAt: Date
}

export interface BasketItem {
  id: string
  product: Product
  productId: number | string
  quantity: number
  order: number
  customization?: CustomizationOptions
}

// Custom Printing
export interface PrintJob {
  id: string
  userId?: string
  product: Product
  design: DesignOptions
  quantity: number
  status: PrintJobStatus
  cost: number
  preview?: string
  createdAt: Date
  updatedAt: Date
}

export interface DesignOptions {
  text?: string
  font?: string
  color?: string
  image?: string
  position?: string
  size?: string
  // Flexible for various printing options
  [key: string]: string | undefined
}

export type PrintJobStatus = 
  | 'pending'
  | 'designing'
  | 'processing'
  | 'completed'
  | 'cancelled'

// Collections
export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  products: Product[]
  order: number
  isFeatured?: boolean
  isActive: boolean
  metadata?: Record<string, unknown>
}

// Reviews & Ratings
export interface Review {
  id: string
  productId: number | string
  userId?: string
  user: {
    name: string
    avatar?: string
  }
  rating: number
  title?: string
  content: string
  images?: string[]
  helpful: number
  isVerified: boolean
  createdAt: Date
}

// API Responses
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
  pagination?: Pagination
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}

// Filters & Sorting
export interface FilterOptions {
  category?: string[]
  subcategory?: string[]
  priceRange?: [number, number]
  rating?: number
  tags?: string[]
  search?: string
  occasion?: string[]
  recipient?: string[]
  inStock?: boolean
  onSale?: boolean
  isFeatured?: boolean
}

export interface SortOptions {
  field: string
  order: 'asc' | 'desc'
}

export interface QueryParams {
  page?: number
  limit?: number
  filters?: FilterOptions
  sort?: SortOptions
  search?: string
}

// Notifications
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  url?: string
  createdAt: Date
}

export type NotificationType = 
  | 'order'
  | 'promotion'
  | 'message'
  | 'system'
  | 'abandoned_cart'

// Settings
export interface Settings {
  id: string
  key: string
  value: unknown
  description?: string
  category: string
}

// Analytics
export interface AnalyticsEvent {
  event: string
  data?: Record<string, unknown>
  userId?: string
  timestamp: Date
}

// Theme & UI
export interface ThemeConfig {
  primary: string
  secondary: string
  accent: string
  font?: string
}

// Component Props
export interface BaseComponentProps {
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  disabled?: boolean
  loading?: boolean
  onClick?: (event: React.MouseEvent) => void
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export interface InputProps extends BaseComponentProps {
  value?: string | number
  onChange?: (value: string | number) => void
  placeholder?: string
  type?: string
  disabled?: boolean
  readOnly?: boolean
  error?: string
  label?: string
  required?: boolean
  name?: string
}

export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  header?: ReactNode
  footer?: ReactNode
  hoverable?: boolean
  clickable?: boolean
  onClick?: () => void
  image?: string
  badge?: ReactNode
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export type Optional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>

export type Nullable<T> = T | null

export type ArrayElement<A> = A extends (infer T)[] ? T : never

// Event Handlers
export type HandleChange<T = string | number> = (value: T) => void

export type HandleSubmit<T = unknown> = (data: T) => void | Promise<void>
