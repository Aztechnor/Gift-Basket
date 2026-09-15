import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Product, Cart, CartItem, Order, PriceRange, BudgetRange } from '@/types'
import { BUDGET_RANGES, DEFAULTS } from '@/constants'

// ============================================
// CLASS NAME UTILITIES
// ============================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// FORMATTING UTILITIES
// ============================================

/**
 * Format currency with Kenyan Shilling symbol
 * @param amount - The amount to format
 * @param currency - Optional currency code (defaults to KES)
 * @param showSymbol - Whether to show the currency symbol (default: true)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = DEFAULTS.CURRENCY,
  showSymbol: boolean = true
): string {
  const symbol = showSymbol ? DEFAULTS.CURRENCY_SYMBOL : ''
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }
  
  const formatted = amount.toLocaleString('en-KE', options)
  return `${symbol} ${formatted}`
}

/**
 * Format price with strikethrough for original price
 * @param price - Current price
 * @param originalPrice - Original price (optional)
 * @returns JSX element with formatted prices
 */
export function formatPrice(price: number, originalPrice?: number): string {
  if (!originalPrice) return formatCurrency(price)
  
  const discount = calculateDiscount(price, originalPrice)
  return discount > 0
    ? `${formatCurrency(originalPrice)} (${discount}% OFF)`
    : formatCurrency(price)
}

/**
 * Calculate discount percentage
 * @param price - Current price
 * @param originalPrice - Original price
 * @returns Discount percentage
 */
export function calculateDiscount(price: number, originalPrice: number): number {
  if (originalPrice <= 0) return 0
  const discount = ((originalPrice - price) / originalPrice) * 100
  return Math.round(discount)
}

/**
 * Format number with commas
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-KE')
}

/**
 * Format rating with star emoji
 * @param rating - Rating (0-5)
 * @param maxRating - Maximum rating (default: 5)
 * @returns Formatted rating string
 */
export function formatRating(rating: number, maxRating: number = 5): string {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)
  
  return `${'★'.repeat(fullStars)}${hasHalfStar ? '½' : ''}${'☆'.repeat(emptyStars)}`
}

/**
 * Format date relative to now (e.g., "2 days ago")
 * @param date - Date to format
 * @returns Formatted relative date string
 */
export function formatRelativeDate(date: Date | string): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      return interval === 1
        ? `${interval} ${unit} ago`
        : `${interval} ${unit}s ago`
    }
  }
  
  return 'just now'
}

/**
 * Format date in a readable format
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  return targetDate.toLocaleDateString('en-KE', defaultOptions)
}

/**
 * Format time in a readable format
 * @param date - Date to format
 * @param showSeconds - Whether to show seconds (default: false)
 * @returns Formatted time string
 */
export function formatTime(date: Date | string, showSeconds: boolean = false): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
    hour12: false,
  }
  return targetDate.toLocaleTimeString('en-KE', options)
}

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Capitalize each word in a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalizeWords(str: string): string {
  return str.split(' ').map(capitalize).join(' ')
}

/**
 * Truncate a string
 * @param str - String to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to append (default: '...')
 * @returns Truncated string
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length) + suffix
}

/**
 * Generate a slug from a string
 * @param str - String to convert to slug
 * @returns Generated slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Pluralize a word based on count
 * @param word - Word to pluralize
 * @param count - Count to determine pluralization
 * @param singular - Optional singular form (default: word)
 * @param plural - Optional plural form
 * @returns Pluralized word
 */
export function pluralize(
  word: string,
  count: number,
  singular: string = word,
  plural: string = word + 's'
): string {
  return count === 1 ? singular : plural
}

// ============================================
// PRICE & DISCOUNT UTILITIES
// ============================================

/**
 * Convert USD to KES
 * @param usdAmount - Amount in USD
 * @param rate - Exchange rate (default: 130)
 * @returns Amount in KES
 */
export function convertToKES(usdAmount: number, rate: number = DEFAULTS.USD_TO_KES_RATE): number {
  return Math.round(usdAmount * rate)
}

/**
 * Convert KES to USD
 * @param kesAmount - Amount in KES
 * @param rate - Exchange rate (default: 130)
 * @returns Amount in USD
 */
export function convertToUSD(kesAmount: number, rate: number = DEFAULTS.USD_TO_KES_RATE): number {
  return Math.round((kesAmount / rate) * 100) / 100
}

/**
 * Calculate tax amount
 * @param amount - Amount to calculate tax for
 * @param rate - Tax rate (default: 0.16)
 * @returns Tax amount
 */
export function calculateTax(amount: number, rate: number = DEFAULTS.TAX_RATE): number {
  return Math.round(amount * rate * 100) / 100
}

/**
 * Calculate shipping cost based on cart total
 * @param cartTotal - Cart total
 * @param method - Shipping method
 * @returns Shipping cost
 */
export function calculateShipping(cartTotal: number, method: string = 'standard'): number {
  if (cartTotal >= DEFAULTS.FREE_SHIPPING_THRESHOLD) return 0
  
  switch (method) {
    case 'express':
      return 500
    case 'same_day':
      return 1500
    case 'pickup':
      return 0
    default:
      return 0 // Standard is free
  }
}

/**
 * Get budget range from value
 * @param value - Budget range value
 * @returns Price range object
 */
export function getBudgetRange(value: BudgetRange): PriceRange {
  const range = BUDGET_RANGES.find((r) => r.value === value)
  return range
    ? { min: range.min, max: range.max, label: range.label }
    : { min: 0, max: 100000, label: 'Any budget' }
}

/**
 * Check if product is affordable within budget
 * @param product - Product to check
 * @param budget - Budget range
 * @returns Whether product is affordable
 */
export function isAffordable(product: Product, budget: BudgetRange): boolean {
  const range = getBudgetRange(budget)
  return product.price >= range.min && product.price <= range.max
}

// ============================================
// CART UTILITIES
// ============================================

/**
 * Calculate cart subtotal
 * @param cart - Cart object
 * @returns Cart subtotal
 */
export function calculateCartSubtotal(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.total, 0)
}

/**
 * Calculate cart total
 * @param cart - Cart object
 * @returns Cart total
 */
export function calculateCartTotal(cart: Cart): number {
  const subtotal = calculateCartSubtotal(cart)
  const tax = calculateTax(subtotal)
  const shipping = calculateShipping(subtotal, cart.shipping > 0 ? 'express' : 'standard')
  return subtotal + tax + shipping - cart.discount
}

/**
 * Get cart item total
 * @param item - Cart item
 * @returns Item total
 */
export function calculateItemTotal(item: CartItem): number {
  return item.price * item.quantity
}

/**
 * Check if cart meets minimum order
 * @param cart - Cart object
 * @returns Whether cart meets minimum
 */
export function meetsMinimumOrder(cart: Cart): boolean {
  return calculateCartSubtotal(cart) >= DEFAULTS.MIN_ORDER_AMOUNT
}

/**
 * Check if cart qualifies for free shipping
 * @param cart - Cart object
 * @returns Whether cart qualifies for free shipping
 */
export function qualifiesForFreeShipping(cart: Cart): boolean {
  return calculateCartSubtotal(cart) >= DEFAULTS.FREE_SHIPPING_THRESHOLD
}

// ============================================
// ORDER UTILITIES
// ============================================

/**
 * Get order status color
 * @param status - Order status
 * @returns Tailwind color class
 */
export function getOrderStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-indigo-100 text-indigo-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
  }
  return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

/**
 * Get order status badge variant
 * @param status - Order status
 * @returns Badge variant
 */
export function getOrderStatusVariant(status: string): string {
  const variants: Record<string, string> = {
    pending: 'warning',
    confirmed: 'info',
    processing: 'default',
    shipped: 'purple',
    delivered: 'success',
    cancelled: 'destructive',
    refunded: 'secondary',
  }
  return variants[status.toLowerCase()] || 'default'
}

// ============================================
// ARRAY & OBJECT UTILITIES
// ============================================

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Deep merge two objects
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target }
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (result[key] && typeof result[key] === 'object') {
        result[key] = deepMerge(
          result[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>
        ) as T[Extract<keyof T, string>]
      } else {
        result[key] = { ...(source[key] as object) } as T[Extract<keyof T, string>]
      }
    } else {
      result[key] = source[key] as T[Extract<keyof T, string>]
    }
  }
  
  return result
}

/**
 * Group array items by a key
 * @param array - Array to group
 * @param key - Key to group by
 * @returns Grouped object
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const keyValue = String(item[key])
    if (!acc[keyValue]) acc[keyValue] = []
    acc[keyValue].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

/**
 * Unique array by a key
 * @param array - Array to make unique
 * @param key - Key to check uniqueness by
 * @returns Unique array
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set()
  return array.filter((item) => {
    const keyValue = String(item[key])
    if (seen.has(keyValue)) return false
    seen.add(keyValue)
    return true
  })
}

/**
 * Chunk array into smaller arrays
 * @param array - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Pick random items from array
 * @param array - Array to pick from
 * @param count - Number of items to pick
 * @returns Array of random items
 */
export function pickRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count)
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Check if string contains HTML
 * @param str - String to check
 * @returns Whether string contains HTML
 */
export function containsHtml(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str)
}

/**
 * Strip HTML tags from string
 * @param str - String to strip
 * @returns String without HTML tags
 */
export function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

/**
 * Sanitize string for display
 * @param str - String to sanitize
 * @returns Sanitized string
 */
export function sanitize(str: string): string {
  return stripHtml(str).trim()
}

/**
 * Generate a random ID
 * @param length - Length of ID (default: 8)
 * @returns Random ID
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

/**
 * Generate a unique ID for cart items
 * @returns Unique cart item ID
 */
export function generateCartItemId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
}

/**
 * Generate a unique ID for orders
 * @returns Unique order ID
 */
export function generateOrderId(): string {
  return `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

/**
 * Generate a tracking number
 * @returns Tracking number
 */
export function generateTrackingNumber(): string {
  return `GB${Math.random().toString(36).substring(2, 12).toUpperCase()}`
}

// ============================================
// URL UTILITIES
// ============================================

/**
 * Build URL with query parameters
 * @param baseUrl - Base URL
 * @param params - Query parameters
 * @returns URL with query parameters
 */
export function buildUrl(baseUrl: string, params: Record<string, unknown>): string {
  const url = new URL(baseUrl, window.location.origin)
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, String(v)))
      } else {
        url.searchParams.append(key, String(value))
      }
    }
  }
  
  return url.toString()
}

/**
 * Parse query parameters from URL
 * @param search - URL search string
 * @returns Parsed query parameters
 */
export function parseQuery(search: string): Record<string, string | string[]> {
  const params = new URLSearchParams(search)
  const result: Record<string, string | string[]> = {}
  
  params.forEach((value, key) => {
    if (result[key]) {
      const existing = result[key]
      if (Array.isArray(existing)) {
        existing.push(value)
      } else {
        result[key] = [existing, value]
      }
    } else {
      result[key] = value
    }
  })
  
  return result
}

/**
 * Get query parameter value
 * @param search - URL search string
 * @param key - Parameter key
 * @returns Parameter value or undefined
 */
export function getQueryParam(search: string, key: string): string | undefined {
  const params = new URLSearchParams(search)
  return params.get(key) || undefined
}

// ============================================
// STORAGE UTILITIES
// ============================================

/**
 * Get value from localStorage
 * @param key - Storage key
 * @param defaultValue - Default value if not found
 * @returns Parsed value
 */
export function getStorage<T>(key: string, defaultValue?: T): T | undefined {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

/**
 * Set value in localStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

/**
 * Remove value from localStorage
 * @param key - Storage key
 */
export function removeStorage(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}

/**
 * Clear localStorage
 */
export function clearStorage(): void {
  if (typeof window === 'undefined') return
  localStorage.clear()
}

// ============================================
// SESSION STORAGE UTILITIES
// ============================================

/**
 * Get value from sessionStorage
 * @param key - Storage key
 * @param defaultValue - Default value if not found
 * @returns Parsed value
 */
export function getSessionStorage<T>(key: string, defaultValue?: T): T | undefined {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

/**
 * Set value in sessionStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export function setSessionStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to sessionStorage:', error)
  }
}

// ============================================
// DEVICE DETECTION
// ============================================

/**
 * Check if current device is mobile
 * @returns Whether device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Check if current device is tablet
 * @returns Whether device is tablet
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

/**
 * Check if current device is desktop
 * @returns Whether device is desktop
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 1024
}

/**
 * Check if touch device
 * @returns Whether device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// ============================================
// COOKIE UTILITIES
// ============================================

/**
 * Get cookie value
 * @param name - Cookie name
 * @returns Cookie value or undefined
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}

/**
 * Set cookie
 * @param name - Cookie name
 * @param value - Cookie value
 * @param days - Days until expiration
 * @param path - Cookie path (default: '/')
 */
export function setCookie(
  name: string,
  value: string,
  days: number = 7,
  path: string = '/'
): void {
  if (typeof document === 'undefined') return
  
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=${path};SameSite=Lax`
}

/**
 * Remove cookie
 * @param name - Cookie name
 * @param path - Cookie path (default: '/')
 */
export function removeCookie(name: string, path: string = '/'): void {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`
}

// ============================================
// DEBOUNCE & THROTTLE UTILITIES
// ============================================

/**
 * Debounce a function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle a function
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * Clamp a number between min and max
 * @param num - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

/**
 * Check if number is in range
 * @param num - Number to check
 * @param min - Minimum value
 * @param max - Maximum value
 * @param inclusive - Whether range is inclusive (default: true)
 * @returns Whether number is in range
 */
export function inRange(
  num: number,
  min: number,
  max: number,
  inclusive: boolean = true
): boolean {
  return inclusive ? num >= min && num <= max : num > min && num < max
}

/**
 * Format number as percentage
 * @param num - Number to format (0-1)
 * @param decimals - Number of decimals (default: 0)
 * @returns Formatted percentage string
 */
export function formatPercentage(num: number, decimals: number = 0): string {
  return `${(num * 100).toFixed(decimals)}%`
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check
 * @returns Whether value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Check if value is a valid email
 * @param email - Email to validate
 * @returns Whether email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
  return emailRegex.test(email)
}

/**
 * Check if value is a valid Kenyan phone number
 * @param phone - Phone number to validate
 * @returns Whether phone is valid
 */
export function isValidKenyanPhone(phone: string): boolean {
  const phoneRegex = /^(\+2547|\+2541|07|01)\d{8}$/
  return phoneRegex.test(phone)
}

/**
 * Check if value is a valid M-Pesa phone number
 * @param phone - Phone number to validate
 * @returns Whether phone is valid for M-Pesa
 */
export function isValidMpesaPhone(phone: string): boolean {
  // Remove leading + or 0 if present
  const cleanPhone = phone.replace(/^\+254|^0/, '')
  return cleanPhone.startsWith('7') && cleanPhone.length === 9
}

/**
 * Format Kenyan phone number for display
 * @param phone - Phone number to format
 * @returns Formatted phone number
 */
export function formatKenyanPhone(phone: string): string {
  // Remove all non-digit characters
  const clean = phone.replace(/\D/g, '')
  
  // If it's a Kenyan number (starts with 254 or 0)
  if (clean.startsWith('254')) {
    return `+${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)} ${clean.slice(9)}`
  } else if (clean.startsWith('0')) {
    return `+254 ${clean.slice(1, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`
  }
  
  return phone
}

// ============================================
// IMAGE UTILITIES
// ============================================

/**
 * Get image URL with fallback
 * @param src - Image source
 * @param fallback - Fallback image (default: /placeholder.jpg)
 * @returns Image URL
 */
export function getImageUrl(src?: string, fallback: string = '/placeholder.jpg'): string {
  if (!src) return fallback
  if (src.startsWith('http')) return src
  if (src.startsWith('/')) return src
  return `/${src}`
}

/**
 * Get placeholder image URL
 * @param width - Width (default: 300)
 * @param height - Height (default: 300)
 * @param text - Optional text to display
 * @returns Placeholder image URL
 */
export function getPlaceholderUrl(
  width: number = 300,
  height: number = 300,
  text?: string
): string {
  const base = '/placeholder.jpg'
  if (text) return `${base}?text=${encodeURIComponent(text)}&w=${width}&h=${height}`
  return `${base}?w=${width}&h=${height}`
}

// ============================================
// EXPORT ALL UTILITIES
// ============================================

export {
  // From existing utils
  cn as clsx,
}
