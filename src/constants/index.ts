import { Occasion, Category, BudgetRange, RecipientRelationship } from '@/types'

// ============================================
// OCCASIONS
// ============================================

export const OCCASIONS: Occasion[] = [
  {
    id: 'birthday',
    name: 'Birthday',
    slug: 'birthday',
    description: 'Celebrate birthdays with thoughtful gifts that bring joy',
    category: 'celebration',
    image: '/images/occasions/birthday.jpg',
    tags: ['celebration', 'personal', 'joy', 'party'],
    isActive: true,
    order: 1,
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    slug: 'anniversary',
    description: 'Honor special milestones and years together',
    category: 'relationship',
    image: '/images/occasions/anniversary.jpg',
    tags: ['romantic', 'milestone', 'relationship', 'love'],
    isActive: true,
    order: 2,
  },
  {
    id: 'wedding',
    name: 'Wedding',
    slug: 'wedding',
    description: 'Congratulate the happy couple with elegant gifts',
    category: 'relationship',
    image: '/images/occasions/wedding.jpg',
    tags: ['elegant', 'romantic', 'new beginnings', 'celebration'],
    isActive: true,
    order: 3,
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    slug: 'baby-shower',
    description: 'Welcome the little one with essential baby gifts',
    category: 'family',
    image: '/images/occasions/baby-shower.jpg',
    tags: ['baby', 'practical', 'new parents', 'celebration'],
    isActive: true,
    order: 4,
  },
  {
    id: 'graduation',
    name: 'Graduation',
    slug: 'graduation',
    description: 'Celebrate academic achievements and future success',
    category: 'achievement',
    image: '/images/occasions/graduation.jpg',
    tags: ['achievement', 'future', 'inspiration', 'success'],
    isActive: true,
    order: 5,
  },
  {
    id: 'ruracio',
    name: 'Ruracio',
    slug: 'ruracio',
    description: 'Traditional Kenyan dowry ceremony gifts',
    category: 'cultural',
    image: '/images/occasions/ruracio.jpg',
    tags: ['traditional', 'kenyan', 'cultural', 'dowry'],
    isActive: true,
    order: 6,
  },
  {
    id: 'quinceanera',
    name: 'Quinceañera',
    slug: 'quinceanera',
    description: 'Celebrate the milestone 15th birthday',
    category: 'celebration',
    image: '/images/occasions/quinceanera.jpg',
    tags: ['milestone', 'princess', 'celebration', 'coming of age'],
    isActive: true,
    order: 7,
  },
  {
    id: 'corporate',
    name: 'Corporate',
    slug: 'corporate',
    description: 'Professional gifts for clients and colleagues',
    category: 'business',
    image: '/images/occasions/corporate.jpg',
    tags: ['professional', 'appreciation', 'business', 'thank you'],
    isActive: true,
    order: 8,
  },
  {
    id: 'thinking-of-you',
    name: 'Thinking of You',
    slug: 'thinking-of-you',
    description: 'Small tokens to show you care',
    category: 'personal',
    image: '/images/occasions/thinking-of-you.jpg',
    tags: ['thoughtful', 'care', 'appreciation', 'friendship'],
    isActive: true,
    order: 9,
  },
  {
    id: 'get-well-soon',
    name: 'Get Well Soon',
    slug: 'get-well-soon',
    description: 'Comforting gifts to aid recovery',
    category: 'care',
    image: '/images/occasions/get-well-soon.jpg',
    tags: ['care', 'comfort', 'recovery', 'wellness'],
    isActive: true,
    order: 10,
  },
  {
    id: 'sympathy',
    name: 'Sympathy',
    slug: 'sympathy',
    description: 'Express condolences with respectful gifts',
    category: 'care',
    image: '/images/occasions/sympathy.jpg',
    tags: ['condolence', 'respect', 'comfort', 'support'],
    isActive: true,
    order: 11,
  },
  {
    id: 'valentine',
    name: 'Valentine\'s Day',
    slug: 'valentine',
    description: 'Romantic gifts for your loved one',
    category: 'relationship',
    image: '/images/occasions/valentine.jpg',
    tags: ['romantic', 'love', 'passion', 'intimacy'],
    isActive: true,
    order: 12,
  },
  {
    id: 'mothers-day',
    name: 'Mother\'s Day',
    slug: 'mothers-day',
    description: 'Honor mothers with heartfelt gifts',
    category: 'family',
    image: '/images/occasions/mothers-day.jpg',
    tags: ['mother', 'appreciation', 'love', 'family'],
    isActive: true,
    order: 13,
  },
  {
    id: 'fathers-day',
    name: 'Father\'s Day',
    slug: 'fathers-day',
    description: 'Celebrate fathers with meaningful gifts',
    category: 'family',
    image: '/images/occasions/fathers-day.jpg',
    tags: ['father', 'appreciation', 'respect', 'family'],
    isActive: true,
    order: 14,
  },
  {
    id: 'christmas',
    name: 'Christmas',
    slug: 'christmas',
    description: 'Festive gifts for the holiday season',
    category: 'celebration',
    image: '/images/occasions/christmas.jpg',
    tags: ['festive', 'holiday', 'joy', 'celebration'],
    isActive: true,
    order: 15,
  },
]

// ============================================
// CATEGORIES
// ============================================

export const CATEGORIES: Category[] = [
  {
    id: 'flowers',
    name: 'Flowers',
    slug: 'flowers',
    description: 'Fresh beautiful blooms for any occasion',
    image: '/images/categories/flowers.jpg',
    order: 1,
    isActive: true,
    children: [
      { id: 'fresh-flowers', name: 'Fresh Flowers', slug: 'fresh-flowers' },
      { id: 'dried-flowers', name: 'Dried Flowers', slug: 'dried-flowers' },
      { id: 'flower-arrangements', name: 'Arrangements', slug: 'flower-arrangements' },
    ],
  },
  {
    id: 'chocolates',
    name: 'Chocolates & Sweets',
    slug: 'chocolates',
    description: 'Indulgent treats and decadent chocolates',
    image: '/images/categories/chocolates.jpg',
    order: 2,
    isActive: true,
    children: [
      { id: 'artisan-chocolates', name: 'Artisan Chocolates', slug: 'artisan-chocolates' },
      { id: 'chocolate-boxes', name: 'Chocolate Boxes', slug: 'chocolate-boxes' },
      { id: 'candies', name: 'Candies & Sweets', slug: 'candies' },
    ],
  },
  {
    id: 'care-packages',
    name: 'Care Packages',
    slug: 'care-packages',
    description: 'Curated comfort items for any situation',
    image: '/images/categories/care-packages.jpg',
    order: 3,
    isActive: true,
    children: [
      { id: 'get-well', name: 'Get Well Soon', slug: 'get-well' },
      { id: 'self-care', name: 'Self Care', slug: 'self-care' },
      { id: 'comfort-food', name: 'Comfort Food', slug: 'comfort-food' },
    ],
  },
  {
    id: 'plants',
    name: 'Plants',
    slug: 'plants',
    description: 'Greenery that lasts and brings life to any space',
    image: '/images/categories/plants.jpg',
    order: 4,
    isActive: true,
    children: [
      { id: 'indoor-plants', name: 'Indoor Plants', slug: 'indoor-plants' },
      { id: 'outdoor-plants', name: 'Outdoor Plants', slug: 'outdoor-plants' },
      { id: 'succulents', name: 'Succulents', slug: 'succulents' },
    ],
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    slug: 'beauty',
    description: 'Self-care essentials for relaxation and rejuvenation',
    image: '/images/categories/beauty.jpg',
    order: 5,
    isActive: true,
    children: [
      { id: 'skincare', name: 'Skincare', slug: 'skincare' },
      { id: 'bath-body', name: 'Bath & Body', slug: 'bath-body' },
      { id: 'fragrances', name: 'Fragrances', slug: 'fragrances' },
    ],
  },
  {
    id: 'custom',
    name: 'Custom Gifts',
    slug: 'custom',
    description: 'Personalized gifts tailored just for them',
    image: '/images/categories/custom.jpg',
    order: 6,
    isActive: true,
    children: [
      { id: 'personalized', name: 'Personalized Items', slug: 'personalized' },
      { id: 'engraved', name: 'Engraved Gifts', slug: 'engraved' },
      { id: 'custom-baskets', name: 'Custom Baskets', slug: 'custom-baskets' },
    ],
  },
  {
    id: 'food-drink',
    name: 'Food & Drink',
    slug: 'food-drink',
    description: 'Gourmet treats and premium beverages',
    image: '/images/categories/food-drink.jpg',
    order: 7,
    isActive: true,
    children: [
      { id: 'gourmet-food', name: 'Gourmet Food', slug: 'gourmet-food' },
      { id: 'wine-spirits', name: 'Wine & Spirits', slug: 'wine-spirits' },
      { id: 'coffee-tea', name: 'Coffee & Tea', slug: 'coffee-tea' },
    ],
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Elegant pieces for every style and occasion',
    image: '/images/categories/jewelry.jpg',
    order: 8,
    isActive: true,
    children: [
      { id: 'rings', name: 'Rings', slug: 'rings' },
      { id: 'necklaces', name: 'Necklaces', slug: 'necklaces' },
      { id: 'earrings', name: 'Earrings', slug: 'earrings' },
    ],
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    slug: 'home-decor',
    description: 'Beautiful items to enhance any living space',
    image: '/images/categories/home-decor.jpg',
    order: 9,
    isActive: true,
    children: [
      { id: 'candles', name: 'Candles & Holders', slug: 'candles' },
      { id: 'vases', name: 'Vases', slug: 'vases' },
      { id: 'decorative', name: 'Decorative Items', slug: 'decorative' },
    ],
  },
]

// ============================================
// RECIPIENT RELATIONSHIPS
// ============================================

export const RECIPIENT_RELATIONSHIPS: { value: RecipientRelationship; label: string; icon: string; description: string }[] = [
  {
    value: 'partner',
    label: 'Partner or Spouse',
    icon: 'Heart',
    description: 'Romantic gifts to say I love you',
  },
  {
    value: 'mother',
    label: 'Mother',
    icon: 'User',
    description: 'Thoughtful gifts for Mom',
  },
  {
    value: 'father',
    label: 'Father',
    icon: 'User',
    description: 'Appreciation gifts for Dad',
  },
  {
    value: 'sister',
    label: 'Sister',
    icon: 'User',
    description: 'Gifts for your sister',
  },
  {
    value: 'brother',
    label: 'Brother',
    icon: 'User',
    description: 'Gifts for your brother',
  },
  {
    value: 'daughter',
    label: 'Daughter',
    icon: 'User',
    description: 'Special gifts for your daughter',
  },
  {
    value: 'son',
    label: 'Son',
    icon: 'User',
    description: 'Thoughtful gifts for your son',
  },
  {
    value: 'friend',
    label: 'Friend',
    icon: 'Sparkles',
    description: 'Celebrate the chosen family',
  },
  {
    value: 'colleague',
    label: 'Colleague or Client',
    icon: 'Briefcase',
    description: 'Professional yet personal appreciation',
  },
  {
    value: 'boss',
    label: 'Boss',
    icon: 'Crown',
    description: 'Gifts for your manager or supervisor',
  },
  {
    value: 'client',
    label: 'Client',
    icon: 'Handshake',
    description: 'Professional gifts for business relationships',
  },
  {
    value: 'myself',
    label: 'Myself',
    icon: 'Sparkles',
    description: 'Because you deserve a treat too',
  },
]

// ============================================
// BUDGET RANGES
// ============================================

export const BUDGET_RANGES: { value: BudgetRange; label: string; min: number; max: number }[] = [
  { value: '0-5000', label: 'Under KSh 5,000', min: 0, max: 5000 },
  { value: '5000-10000', label: 'KSh 5,000 - 10,000', min: 5000, max: 10000 },
  { value: '10000-20000', label: 'KSh 10,000 - 20,000', min: 10000, max: 20000 },
  { value: '20000-30000', label: 'KSh 20,000 - 30,000', min: 20000, max: 30000 },
  { value: '30000+', label: 'Over KSh 30,000', min: 30000, max: 100000 },
]

// ============================================
// SHIPPING METHODS
// ============================================

export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Delivered in 3-5 business days',
    cost: 0,
    estimatedDays: 5,
    isFree: true,
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Delivered in 1-2 business days',
    cost: 500,
    estimatedDays: 2,
    isFree: false,
  },
  {
    id: 'same_day',
    name: 'Same Day Delivery',
    description: 'Delivered on the same day (order before 12 PM)',
    cost: 1500,
    estimatedDays: 0,
    isFree: false,
  },
  {
    id: 'pickup',
    name: 'Store Pickup',
    description: 'Pick up from our store location',
    cost: 0,
    estimatedDays: 0,
    isFree: true,
  },
]

// ============================================
// PAYMENT METHODS
// ============================================

export const PAYMENT_METHODS = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    description: 'Mobile money payment via M-Pesa',
    icon: 'Mpesa',
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, and other card payments',
    icon: 'CreditCard',
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    description: 'Direct bank transfer payment',
    icon: 'Bank',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'cash_on_delivery',
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: 'DollarSign',
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Secure online payments via PayPal',
    icon: 'Paypal',
    isPopular: false,
    isAvailable: false,
  },
]

// ============================================
// SOCIAL LINKS
// ============================================

export const SOCIAL_LINKS = [
  { id: 'facebook', name: 'Facebook', url: 'https://facebook.com/giftbasket', icon: 'Facebook' },
  { id: 'instagram', name: 'Instagram', url: 'https://instagram.com/giftbasket', icon: 'Instagram' },
  { id: 'twitter', name: 'Twitter', url: 'https://twitter.com/giftbasket', icon: 'Twitter' },
  { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com/company/giftbasket', icon: 'Linkedin' },
  { id: 'whatsapp', name: 'WhatsApp', url: 'https://wa.me/254700000000', icon: 'MessageSquare' },
  { id: 'tiktok', name: 'TikTok', url: 'https://tiktok.com/@giftbasket', icon: 'Music' },
]

// ============================================
// FOOTER LINKS
// ============================================

export const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Featured', href: '/products?featured=true' },
    { label: 'On Sale', href: '/products?sale=true' },
    { label: 'New Arrivals', href: '/products?new=true' },
  ],
  occasions: [
    { label: 'Birthday', href: '/occasions/birthday' },
    { label: 'Anniversary', href: '/occasions/anniversary' },
    { label: 'Wedding', href: '/occasions/wedding' },
    { label: 'Baby Shower', href: '/occasions/baby-shower' },
    { label: 'All Occasions', href: '/occasions' },
  ],
  recipients: [
    { label: 'For Her', href: '/recipients?gender=female' },
    { label: 'For Him', href: '/recipients?gender=male' },
    { label: 'For Kids', href: '/recipients/kids' },
    { label: 'For Partners', href: '/recipients/partner' },
    { label: 'All Recipients', href: '/recipients' },
  ],
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about/story' },
    { label: 'Our Team', href: '/about/team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  services: [
    { label: 'AI Recommendations', href: '/ai-recommendations' },
    { label: 'Basket Builder', href: '/basket-builder' },
    { label: 'Custom Printing', href: '/custom-printing' },
    { label: 'Corporate Gifts', href: '/corporate' },
    { label: 'Gift Wrapping', href: '/gift-wrapping' },
  ],
}

// ============================================
// DEFAULT VALUES
// ============================================

export const DEFAULTS = {
  PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  CART_ID: 'giftbasket_cart',
  CURRENCY: 'KES',
  CURRENCY_SYMBOL: 'KSh',
  USD_TO_KES_RATE: 130,
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  DEBOUNCE_SEARCH: 300,
  MAX_CART_ITEMS: 50,
  MIN_ORDER_AMOUNT: 1000,
  FREE_SHIPPING_THRESHOLD: 10000,
  TAX_RATE: 0.16, // 16% VAT
}

// ============================================
// API ENDPOINTS
// ============================================

export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/api/products',
  PRODUCT: (id: string | number) => `/api/products/${id}`,
  PRODUCT_CATEGORIES: '/api/categories',
  PRODUCT_SEARCH: '/api/products/search',
  
  // AI
  AI_RECOMMENDATIONS: '/api/ai/recommendations',
  AI_CHAT: '/api/ai/chat',
  AI_ANALYTICS: '/api/ai/analytics',
  
  // Orders
  ORDERS: '/api/orders',
  ORDER: (id: string) => `/api/orders/${id}`,
  ORDER_TRACKING: (trackingNumber: string) => `/api/orders/track/${trackingNumber}`,
  
  // Cart
  CART: '/api/cart',
  CART_ITEM: (id: string) => `/api/cart/items/${id}`,
  
  // Users
  USERS: '/api/users',
  USER: (id: string) => `/api/users/${id}`,
  USER_PROFILE: '/api/users/me',
  USER_PREFERENCES: '/api/users/me/preferences',
  
  // Auth
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REFRESH: '/api/auth/refresh',
  AUTH_VERIFY: '/api/auth/verify',
  
  // Recipients
  RECIPIENTS: '/api/recipients',
  RECIPIENT: (id: string | number) => `/api/recipients/${id}`,
  
  // Reviews
  REVIEWS: '/api/reviews',
  PRODUCT_REVIEWS: (productId: string | number) => `/api/products/${productId}/reviews`,
  
  // Settings
  SETTINGS: '/api/settings',
  
  // Analytics
  ANALYTICS: '/api/analytics',
  
  // Notifications
  NOTIFICATIONS: '/api/notifications',
  NOTIFICATION_READ: (id: string) => `/api/notifications/${id}/read`,
  NOTIFICATION_READ_ALL: '/api/notifications/read-all',
  
  // Uploads
  UPLOAD_IMAGE: '/api/upload/image',
  UPLOAD_FILE: '/api/upload/file',
}

// ============================================
// REGEX PATTERNS
// ============================================

export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+254|0)[17]\d{8,9}$/,
  KENYAN_PHONE: /^(\+2547|\+2541|07|01)\d{8}$/,
  MPESA_PHONE: /^2547\d{8}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  PRICE: /^\d+(\.\d{1,2})?$/,
  NUMBER: /^\d+$/,
  DECIMAL: /^\d+(\.\d+)?$/,
}

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  // Authentication
  AUTH_REQUIRED: 'Please log in to access this feature',
  AUTH_INVALID: 'Invalid email or password',
  AUTH_EXPIRED: 'Your session has expired. Please log in again',
  AUTH_UNAUTHORIZED: 'You are not authorized to perform this action',
  
  // Validation
  VALIDATION_REQUIRED: 'This field is required',
  VALIDATION_EMAIL: 'Please enter a valid email address',
  VALIDATION_PHONE: 'Please enter a valid Kenyan phone number',
  VALIDATION_PASSWORD: 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
  VALIDATION_MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  VALIDATION_MAX_LENGTH: (max: number) => `Must be at most ${max} characters`,
  VALIDATION_MIN: (min: number) => `Must be at least ${min}`,
  VALIDATION_MAX: (max: number) => `Must be at most ${max}`,
  VALIDATION_NUMBER: 'Please enter a valid number',
  VALIDATION_PRICE: 'Please enter a valid price',
  
  // Products
  PRODUCT_NOT_FOUND: 'Product not found',
  PRODUCT_OUT_OF_STOCK: 'Product is out of stock',
  PRODUCT_INSUFFICIENT_STOCK: 'Insufficient stock available',
  
  // Cart
  CART_EMPTY: 'Your cart is empty',
  CART_ITEM_NOT_FOUND: 'Item not found in cart',
  CART_MAX_ITEMS: `Maximum ${DEFAULTS.MAX_CART_ITEMS} items allowed in cart`,
  CART_MIN_ORDER: `Minimum order amount is KSh ${DEFAULTS.MIN_ORDER_AMOUNT}`,
  
  // Orders
  ORDER_NOT_FOUND: 'Order not found',
  ORDER_ALREADY_PROCESSED: 'This order has already been processed',
  ORDER_CANCELLATION_FAILED: 'Order cannot be cancelled at this stage',
  
  // Payments
  PAYMENT_FAILED: 'Payment failed. Please try again',
  PAYMENT_CANCELLED: 'Payment was cancelled',
  PAYMENT_INSUFFICIENT_FUNDS: 'Insufficient funds',
  PAYMENT_INVALID_METHOD: 'Invalid payment method',
  
  // General
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Something went wrong. Please try again later',
  NOT_FOUND: 'Resource not found',
  INVALID_REQUEST: 'Invalid request',
  RATE_LIMITED: 'Too many requests. Please try again in a moment',
}

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  // Cart
  CART_ITEM_ADDED: 'Item added to cart successfully',
  CART_ITEM_UPDATED: 'Cart updated successfully',
  CART_ITEM_REMOVED: 'Item removed from cart',
  CART_CLEARED: 'Cart cleared successfully',
  
  // Orders
  ORDER_PLACED: 'Order placed successfully!',
  ORDER_UPDATED: 'Order updated successfully',
  ORDER_CANCELLED: 'Order cancelled successfully',
  
  // Authentication
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  REGISTER_SUCCESS: 'Account created successfully',
  PASSWORD_RESET: 'Password reset email sent',
  PASSWORD_CHANGED: 'Password changed successfully',
  
  // Products
  PRODUCT_SAVED: 'Product saved to favorites',
  PRODUCT_REMOVED: 'Product removed from favorites',
  
  // General
  SUCCESS: 'Operation completed successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  CREATED: 'Created successfully',
}

// ============================================
// CONFIRMATION MESSAGES
// ============================================

export const CONFIRMATIONS = {
  REMOVE_FROM_CART: 'Are you sure you want to remove this item from your cart?',
  CLEAR_CART: 'Are you sure you want to clear your entire cart?',
  CANCEL_ORDER: 'Are you sure you want to cancel this order?',
  LOGOUT: 'Are you sure you want to log out?',
  DELETE_ACCOUNT: 'Are you sure you want to delete your account? This action cannot be undone.',
  REMOVE_FAVORITE: 'Are you sure you want to remove this from your favorites?',
}

// ============================================
// ANIMATION DURATIONS
// ============================================

export const ANIMATIONS = {
  FAST: '150ms',
  NORMAL: '200ms',
  SLOW: '300ms',
  SLOWER: '500ms',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
}

// ============================================
// BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
}

// ============================================
// COLORS
// ============================================

export const COLORS = {
  PRIMARY: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  SECONDARY: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  ACCENT: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
}
