import { Product, Category } from '@/types'

// ============================================
// GIFT PRODUCT CATALOG
// ============================================

// Helper to create category references
const getCategory = (id: string): Category => {
  const categories: Record<string, Category> = {
    flowers: { id: 'flowers', name: 'Flowers', slug: 'flowers' },
    chocolates: { id: 'chocolates', name: 'Chocolates & Sweets', slug: 'chocolates' },
    care: { id: 'care-packages', name: 'Care Packages', slug: 'care-packages' },
    plants: { id: 'plants', name: 'Plants', slug: 'plants' },
    beauty: { id: 'beauty', name: 'Beauty & Wellness', slug: 'beauty' },
    custom: { id: 'custom', name: 'Custom Gifts', slug: 'custom' },
    food: { id: 'food-drink', name: 'Food & Drink', slug: 'food-drink' },
    jewelry: { id: 'jewelry', name: 'Jewelry', slug: 'jewelry' },
    home: { id: 'home-decor', name: 'Home Decor', slug: 'home-decor' },
  }
  return categories[id] || categories.custom
}

export interface GiftProduct extends Product {
  perfectFor?: string[]
  bestForOccasions?: string[]
  packaging?: string
  deliveryTime?: string
  giftWrapAvailable?: boolean
  personalizationOptions?: string[]
}

// ============================================
// BIRTHDAY GIFTS
// ============================================

export const BIRTHDAY_GIFTS: GiftProduct[] = [
  {
    id: 'birthday-birthday-bliss-box',
    name: 'Birthday Bliss Box',
    slug: 'birthday-bliss-box',
    description: 'The ultimate birthday celebration package with chocolates, balloons, a greeting card, and a small gift',
    price: 8500,
    originalPrice: 10500,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/birthday-bliss.jpg', alt: 'Birthday Bliss Box', isPrimary: true, order: 0 },
      { id: '2', url: '/images/gifts/birthday-bliss-2.jpg', alt: 'Birthday Bliss Box Contents', isPrimary: false, order: 1 },
    ],
    stock: { quantity: 150, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 456,
    tags: ['birthday', 'celebration', 'chocolate', 'balloons', 'card', 'party', 'fun'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['Friends', 'Family', 'Colleagues'],
    bestForOccasions: ['Birthday', 'Just Because'],
    packaging: 'Premium gift box with ribbon',
    deliveryTime: 'Same day delivery in Nairobi',
    giftWrapAvailable: true,
    personalizationOptions: ['Add name', 'Custom message', 'Choose ribbon color'],
    aiReason: 'Perfect birthday package with everything needed for a celebration',
    confidence: 0.95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'birthday-deluxe-chocolate-hamper',
    name: 'Deluxe Chocolate Hamper',
    slug: 'deluxe-chocolate-hamper',
    description: 'Luxurious selection of artisan chocolates, truffles, and pralines from premium brands',
    price: 12500,
    originalPrice: 15000,
    category: getCategory('chocolates'),
    images: [
      { id: '1', url: '/images/gifts/chocolate-hamper.jpg', alt: 'Deluxe Chocolate Hamper', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 85, inStock: true, lowStock: false },
    rating: 4.8,
    reviews: 321,
    tags: ['chocolate', 'luxury', 'artisan', 'hamper', 'premium', 'birthday', 'anniversary'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['Chocolate Lovers', 'Partners', 'Parents'],
    bestForOccasions: ['Birthday', 'Anniversary', 'Valentine\'s Day'],
    packaging: 'Wooden gift box with satin lining',
    deliveryTime: 'Next day delivery nationwide',
    giftWrapAvailable: true,
    personalizationOptions: ['Add name plate', 'Custom selection'],
    aiReason: 'Premium chocolate collection for true chocolate connoisseurs',
    confidence: 0.92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'birthday-fun-party-pack',
    name: 'Fun Party Pack',
    slug: 'fun-party-pack',
    description: 'Complete party package with decorations, games, snacks, and party favors for 6 people',
    price: 15000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/party-pack.jpg', alt: 'Fun Party Pack', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 65, inStock: true, lowStock: true },
    rating: 4.7,
    reviews: 189,
    tags: ['party', 'birthday', 'fun', 'decorations', 'games', 'snacks', 'group'],
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    perfectFor: ['Kids', 'Teens', 'Group Celebrations'],
    bestForOccasions: ['Birthday', 'Baby Shower', 'Team Building'],
    packaging: 'Large party box with handles',
    deliveryTime: '2-3 days delivery',
    giftWrapAvailable: false,
    personalizationOptions: ['Add birthday message', 'Choose theme colors'],
    aiReason: 'Complete party solution for hassle-free celebrations',
    confidence: 0.88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'birthday-personalized-photo-frame',
    name: 'Personalized Photo Frame',
    slug: 'personalized-photo-frame',
    description: 'Beautiful wooden photo frame with laser-engraved name and special message',
    price: 6500,
    category: getCategory('home'),
    images: [
      { id: '1', url: '/images/gifts/photo-frame.jpg', alt: 'Personalized Photo Frame', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 200, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 532,
    tags: ['personalized', 'photo', 'frame', 'wooden', 'engraved', 'memory', 'birthday'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Partners', 'Parents', 'Grandparents', 'Friends'],
    bestForOccasions: ['Birthday', 'Anniversary', 'Mother\'s Day', 'Father\'s Day'],
    packaging: 'Gift box with protective padding',
    deliveryTime: '3-5 days (engraving time)',
    giftWrapAvailable: true,
    personalizationOptions: ['Engrave name', 'Add message', 'Choose font', 'Add date'],
    aiReason: 'Sentimental gift that preserves memories forever',
    confidence: 0.94,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// ANNIVERSARY GIFTS
// ============================================

export const ANNIVERSARY_GIFTS: GiftProduct[] = [
  {
    id: 'anniversary-romantic-getaway-box',
    name: 'Romantic Getaway Box',
    slug: 'romantic-getaway-box',
    description: 'Create a romantic atmosphere with scented candles, massage oil, chocolates, and a love letter template',
    price: 18000,
    originalPrice: 22000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/romantic-getaway.jpg', alt: 'Romantic Getaway Box', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 45, inStock: true, lowStock: true },
    rating: 4.9,
    reviews: 214,
    tags: ['romantic', 'anniversary', 'couple', 'spa', 'candles', 'massage', 'love'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['Partner', 'Spouse', 'Wife', 'Husband'],
    bestForOccasions: ['Anniversary', 'Valentine\'s Day', 'Just Because'],
    packaging: 'Velvet-lined gift box',
    deliveryTime: 'Next day delivery',
    giftWrapAvailable: true,
    personalizationOptions: ['Add personalized love note', 'Choose scent preference'],
    aiReason: 'Perfect for reigniting the spark and celebrating love',
    confidence: 0.96,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'anniversary-custom-star-map',
    name: 'Custom Star Map',
    slug: 'custom-star-map',
    description: 'Framed star map showing the night sky on your special date - wedding, first meeting, or any memorable moment',
    price: 25000,
    category: getCategory('home'),
    images: [
      { id: '1', url: '/images/gifts/star-map.jpg', alt: 'Custom Star Map', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 30, inStock: true, lowStock: true },
    rating: 5.0,
    reviews: 98,
    tags: ['custom', 'stars', 'map', 'memory', 'anniversary', 'wedding', 'romantic'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Partner', 'Spouse'],
    bestForOccasions: ['Anniversary', 'Wedding', 'Engagement'],
    packaging: 'Premium frame with protective packaging',
    deliveryTime: '5-7 days (custom printing)',
    giftWrapAvailable: true,
    personalizationOptions: ['Choose date', 'Add location', 'Custom message on back'],
    aiReason: 'Unique and deeply personal gift that captures a moment in time',
    confidence: 0.98,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'anniversary-luxury-watch-set',
    name: 'Luxury Couple Watch Set',
    slug: 'luxury-watch-set',
    description: 'Matching his and hers luxury watches with elegant design and premium quality',
    price: 35000,
    category: getCategory('jewelry'),
    images: [
      { id: '1', url: '/images/gifts/watch-set.jpg', alt: 'Luxury Couple Watch Set', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 25, inStock: true, lowStock: true },
    rating: 4.8,
    reviews: 76,
    tags: ['watches', 'couple', 'luxury', 'matching', 'anniversary', 'premium', 'elegant'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Partner', 'Spouse'],
    bestForOccasions: ['Anniversary', 'Wedding', 'Engagement'],
    packaging: 'Premium watch box set',
    deliveryTime: '3-5 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Engrave initials', 'Engrave date'],
    aiReason: 'Timeless gift that symbolizes your time together',
    confidence: 0.93,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'anniversary-memory-scrapbook',
    name: 'Memory Scrapbook Kit',
    slug: 'memory-scrapbook-kit',
    description: 'Beautiful scrapbook with stickers, washi tape, photo corners, and pens to document your journey together',
    price: 9500,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/scrapbook.jpg', alt: 'Memory Scrapbook Kit', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 120, inStock: true, lowStock: false },
    rating: 4.7,
    reviews: 198,
    tags: ['scrapbook', 'memory', 'DIY', 'photos', 'anniversary', 'personal', 'creative'],
    isFeatured: false,
    isOnSale: false,
    isNew: true,
    perfectFor: ['Couples', 'Families', 'Creative People'],
    bestForOccasions: ['Anniversary', 'Valentine\'s Day', 'Just Because'],
    packaging: 'Gift box with all materials',
    deliveryTime: '2-3 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Add starting page', 'Custom theme'],
    aiReason: 'Perfect for couples who love to document their journey together',
    confidence: 0.89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// WEDDING GIFTS
// ============================================

export const WEDDING_GIFTS: GiftProduct[] = [
  {
    id: 'wedding-bridal-bliss-collection',
    name: 'Bridal Bliss Collection',
    slug: 'bridal-bliss-collection',
    description: 'Complete wedding gift set with champagne glasses, scented candles, gourmet chocolates, and a beautiful card holder',
    price: 28000,
    originalPrice: 35000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/bridal-bliss.jpg', alt: 'Bridal Bliss Collection', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 35, inStock: true, lowStock: true },
    rating: 4.9,
    reviews: 167,
    tags: ['wedding', 'bridal', 'champagne', 'candles', 'chocolate', 'luxury', 'elegant'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['Newlyweds', 'Couples'],
    bestForOccasions: ['Wedding', 'Engagement'],
    packaging: 'Premium velvet gift box',
    deliveryTime: '2-3 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Add congratulations message', 'Choose champagne glasses style'],
    aiReason: 'Elegant and thoughtful gift set perfect for celebrating new beginnings',
    confidence: 0.94,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'wedding-personalized-cutting-board',
    name: 'Personalized Cutting Board',
    slug: 'personalized-cutting-board',
    description: 'High-quality wooden cutting board with laser-engraved family name and wedding date',
    price: 15000,
    category: getCategory('home'),
    images: [
      { id: '1', url: '/images/gifts/cutting-board.jpg', alt: 'Personalized Cutting Board', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 40, inStock: true, lowStock: false },
    rating: 4.8,
    reviews: 89,
    tags: ['cutting board', 'personalized', 'wooden', 'kitchen', 'wedding', 'engraved', 'practical'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Newlyweds', 'Couples', 'Homeowners'],
    bestForOccasions: ['Wedding', 'Housewarming'],
    packaging: 'Protective packaging with care instructions',
    deliveryTime: '5-7 days (engraving time)',
    giftWrapAvailable: true,
    personalizationOptions: ['Engrave names', 'Add wedding date', 'Choose design'],
    aiReason: 'Practical yet sentimental gift that will be used for years to come',
    confidence: 0.91,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'wedding-crystal-wine-glasses',
    name: 'Crystal Wine Glasses Set',
    slug: 'crystal-wine-glasses',
    description: 'Set of 4 premium crystal wine glasses with elegant design, perfect for celebrating special moments',
    price: 12000,
    category: getCategory('home'),
    images: [
      { id: '1', url: '/images/gifts/wine-glasses.jpg', alt: 'Crystal Wine Glasses Set', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 75, inStock: true, lowStock: false },
    rating: 4.7,
    reviews: 142,
    tags: ['wine glasses', 'crystal', 'set', 'elegant', 'wedding', 'celebration', 'luxury'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Newlyweds', 'Wine Lovers', 'Hosts'],
    bestForOccasions: ['Wedding', 'Anniversary', 'Housewarming'],
    packaging: 'Protective box with individual compartments',
    deliveryTime: '2-3 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Engrave initials', 'Add monogram'],
    aiReason: 'Elegant gift that adds a touch of luxury to any celebration',
    confidence: 0.87,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// BABY SHOWER GIFTS
// ============================================

export const BABY_SHOWER_GIFTS: GiftProduct[] = [
  {
    id: 'baby-premium-baby-basket',
    name: 'Premium Baby Essentials Basket',
    slug: 'premium-baby-basket',
    description: 'Carefully curated basket with organic cotton clothes, baby toys, care products, and essentials for new parents',
    price: 12500,
    originalPrice: 15000,
    category: getCategory('care'),
    images: [
      { id: '1', url: '/images/gifts/baby-basket.jpg', alt: 'Premium Baby Essentials Basket', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 100, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 256,
    tags: ['baby', 'newborn', 'essentials', 'organic', 'parents', 'shower', 'practical'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['New Parents', 'Expecting Parents', 'Baby Shower Host'],
    bestForOccasions: ['Baby Shower', 'New Baby', 'Christening'],
    packaging: 'Large woven basket with tissue paper',
    deliveryTime: 'Next day delivery',
    giftWrapAvailable: true,
    personalizationOptions: ['Add baby name', 'Custom message for parents'],
    aiReason: 'Complete and thoughtful gift with everything new parents need',
    confidence: 0.95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'baby-soft-plush-hamper',
    name: 'Soft Plush & Comfort Hamper',
    slug: 'soft-plush-hamper',
    description: 'Collection of ultra-soft plush toys, swaddles, and comfort items for baby\'s first months',
    price: 8500,
    category: getCategory('care'),
    images: [
      { id: '1', url: '/images/gifts/plush-hamper.jpg', alt: 'Soft Plush & Comfort Hamper', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 150, inStock: true, lowStock: false },
    rating: 4.8,
    reviews: 312,
    tags: ['baby', 'plush', 'toys', 'comfort', 'soft', 'newborn', 'shower'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['New Parents', 'Baby'],
    bestForOccasions: ['Baby Shower', 'New Baby'],
    packaging: 'Gift box with viewing window',
    deliveryTime: 'Same day in Nairobi, next day nationwide',
    giftWrapAvailable: true,
    personalizationOptions: ['Choose plush colors', 'Add baby name tag'],
    aiReason: 'Adorable and practical gifts that provide comfort for baby',
    confidence: 0.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'baby-personalized-baby-blanket',
    name: 'Personalized Baby Blanket',
    slug: 'personalized-baby-blanket',
    description: 'Soft, hypoallergenic baby blanket with embroidered name - perfect for keeping baby warm and cozy',
    price: 7500,
    category: getCategory('care'),
    images: [
      { id: '1', url: '/images/gifts/baby-blanket.jpg', alt: 'Personalized Baby Blanket', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 200, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 432,
    tags: ['blanket', 'baby', 'personalized', 'soft', 'embroidered', 'cozy', 'newborn'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['New Parents', 'Baby'],
    bestForOccasions: ['Baby Shower', 'New Baby', 'Christening'],
    packaging: 'Gift box with ribbon',
    deliveryTime: '3-5 days (embroidery time)',
    giftWrapAvailable: true,
    personalizationOptions: ['Embroider baby name', 'Choose thread color', 'Add birth date'],
    aiReason: 'Personal and practical gift that will be cherished for years',
    confidence: 0.92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// GRADUATION GIFTS
// ============================================

export const GRADUATION_GIFTS: GiftProduct[] = [
  {
    id: 'graduation-success-celebration-box',
    name: 'Success Celebration Box',
    slug: 'success-celebration-box',
    description: 'Inspirational gift set with a personalized plaque, success-themed book, gourmet treats, and celebration items',
    price: 11700,
    originalPrice: 14000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/success-box.jpg', alt: 'Success Celebration Box', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 95, inStock: true, lowStock: false },
    rating: 4.8,
    reviews: 156,
    tags: ['graduation', 'success', 'inspiration', 'achievement', 'personalized', 'celebration'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['Graduates', 'Students', 'Achievers'],
    bestForOccasions: ['Graduation', 'Achievement', 'Promotion'],
    packaging: 'Premium gift box',
    deliveryTime: '2-3 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Add graduate name', 'Personal achievement message'],
    aiReason: 'Inspiring gift that celebrates hard work and achievement',
    confidence: 0.91,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'graduation-leather-journal-set',
    name: 'Leather Journal & Pen Set',
    slug: 'leather-journal-set',
    description: 'Premium leather-bound journal with matching pen, perfect for documenting the next chapter of life',
    price: 9500,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/journal-set.jpg', alt: 'Leather Journal & Pen Set', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 120, inStock: true, lowStock: false },
    rating: 4.7,
    reviews: 203,
    tags: ['journal', 'leather', 'pen', 'writing', 'graduation', 'premium', 'future'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Graduates', 'Writers', 'Professionals'],
    bestForOccasions: ['Graduation', 'Achievement', 'New Job'],
    packaging: 'Gift box with protective sleeve',
    deliveryTime: '2-3 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Engrave name on journal', 'Add inspirational quote'],
    aiReason: 'Thoughtful gift that encourages reflection and future planning',
    confidence: 0.89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'graduation-tech-gadget-bundle',
    name: 'Tech Gadget Bundle for Graduates',
    slug: 'tech-gadget-bundle',
    description: 'Practical tech bundle with wireless earbuds, power bank, and multi-port USB hub - perfect for the modern graduate',
    price: 22000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/tech-bundle.jpg', alt: 'Tech Gadget Bundle', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 45, inStock: true, lowStock: true },
    rating: 4.8,
    reviews: 87,
    tags: ['tech', 'gadgets', 'wireless', 'graduation', 'modern', 'practical', 'useful'],
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    perfectFor: ['Tech-Savvy Graduates', 'Students', 'Young Professionals'],
    bestForOccasions: ['Graduation', 'New Job'],
    packaging: 'Premium tech gift box',
    deliveryTime: '3-5 days',
    giftWrapAvailable: true,
    personalizationOptions: [],
    aiReason: 'Practical tech gifts that every modern graduate will use daily',
    confidence: 0.88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// CORPORATE GIFTS
// ============================================

export const CORPORATE_GIFTS: GiftProduct[] = [
  {
    id: 'corporate-executive-gift-box',
    name: 'Executive Gift Box',
    slug: 'executive-gift-box',
    description: 'Professional gift set with premium coffee, leather notebook, branded pen, and gourmet treats',
    price: 15600,
    originalPrice: 19500,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/executive-box.jpg', alt: 'Executive Gift Box', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 75, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 145,
    tags: ['corporate', 'executive', 'professional', 'coffee', 'notebook', 'brandable', 'luxury'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['Clients', 'Colleagues', 'Bosses', 'Business Partners'],
    bestForOccasions: ['Corporate', 'Appreciation', 'Milestone', 'Thank You'],
    packaging: 'Premium branded gift box',
    deliveryTime: 'Next day delivery',
    giftWrapAvailable: true,
    personalizationOptions: ['Add company logo', 'Custom branded packaging', 'Personal message'],
    aiReason: 'Professional and elegant gift that makes a lasting impression',
    confidence: 0.94,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'corporate-premium-coffee-hamper',
    name: 'Premium Coffee Hamper',
    slug: 'premium-coffee-hamper',
    description: 'Selection of premium Kenyan coffee beans, specialty teas, and gourmet biscuits in an elegant gift box',
    price: 12000,
    category: getCategory('food'),
    images: [
      { id: '1', url: '/images/gifts/coffee-hamper.jpg', alt: 'Premium Coffee Hamper', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 110, inStock: true, lowStock: false },
    rating: 4.8,
    reviews: 218,
    tags: ['coffee', 'tea', 'gourmet', 'hamper', 'corporate', 'kenyan', 'premium'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Coffee Lovers', 'Clients', 'Colleagues'],
    bestForOccasions: ['Corporate', 'Appreciation', 'Thank You'],
    packaging: 'Wooden gift box with tissue paper',
    deliveryTime: 'Next day delivery',
    giftWrapAvailable: true,
    personalizationOptions: ['Add custom note', 'Choose coffee preferences'],
    aiReason: 'Perfect for clients and colleagues who appreciate quality coffee',
    confidence: 0.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'corporate-branded-desktop-set',
    name: 'Branded Desktop Organizer Set',
    slug: 'branded-desktop-set',
    description: 'Professional desktop set with pen holder, notepad, sticky notes, and premium pen - all branded with your company logo',
    price: 18000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/desktop-set.jpg', alt: 'Branded Desktop Organizer Set', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 50, inStock: true, lowStock: true },
    rating: 4.7,
    reviews: 92,
    tags: ['corporate', 'desktop', 'branded', 'logo', 'office', 'professional', 'useful'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Clients', 'Employees', 'Partners'],
    bestForOccasions: ['Corporate', 'Milestone', 'Onboarding'],
    packaging: 'Professional gift box',
    deliveryTime: '5-7 days (branding time)',
    giftWrapAvailable: true,
    personalizationOptions: ['Add company logo', 'Custom colors', 'Personal message'],
    aiReason: 'Practical branded gifts that keep your company visible on desks',
    confidence: 0.87,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// TRADITIONAL / CULTURAL GIFTS (Kenyan)
// ============================================

export const TRADITIONAL_GIFTS: GiftProduct[] = [
  {
    id: 'traditional-ruracio-ceremony-set',
    name: 'Traditional Ruracio Ceremony Set',
    slug: 'ruracio-ceremony-set',
    description: 'Complete traditional Kikuyu ruracio (dowry) ceremony set with kiondo, muthundu, ngoro, and other authentic items',
    price: 22000,
    originalPrice: 26000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/ruracio-set.jpg', alt: 'Traditional Ruracio Ceremony Set', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 25, inStock: true, lowStock: true },
    rating: 4.8,
    reviews: 89,
    tags: ['traditional', 'ruracio', 'kikuyu', 'cultural', 'kenyan', 'dowry', 'ceremony', 'authentic'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['Kikuyu Families', 'Traditional Ceremonies'],
    bestForOccasions: ['Ruracio', 'Traditional Wedding', 'Cultural Celebration'],
    packaging: 'Traditional woven basket',
    deliveryTime: '3-5 days',
    giftWrapAvailable: false,
    personalizationOptions: ['Choose specific items', 'Add family names'],
    aiReason: 'Authentic traditional gifts for Kenyan cultural ceremonies with deep cultural significance',
    confidence: 0.92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'traditional-maasai-beaded-jewelry',
    name: 'Maasai Beaded Jewelry Set',
    slug: 'maasai-beaded-jewelry',
    description: 'Authentic Maasai beaded necklace, bracelet, and earrings set with traditional colors and designs',
    price: 8500,
    category: getCategory('jewelry'),
    images: [
      { id: '1', url: '/images/gifts/maasai-jewelry.jpg', alt: 'Maasai Beaded Jewelry Set', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 60, inStock: true, lowStock: false },
    rating: 4.7,
    reviews: 156,
    tags: ['traditional', 'maasai', 'beaded', 'jewelry', 'cultural', 'kenyan', 'authentic', 'colorful'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Anyone', 'Culture Lovers', 'Tourists'],
    bestForOccasions: ['Birthday', 'Souvenir', 'Cultural Appreciation'],
    packaging: 'Handwoven bag with certificate of authenticity',
    deliveryTime: 'Next day delivery',
    giftWrapAvailable: true,
    personalizationOptions: ['Choose color combination'],
    aiReason: 'Beautiful traditional jewelry that supports Maasai artisans and celebrates Kenyan culture',
    confidence: 0.88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'traditional-kikuyu-basket',
    name: 'Handwoven Kikuyu Basket',
    slug: 'kikuyu-basket',
    description: 'Authentic handwoven Kikuyu basket made from natural materials, perfect for storage or decoration',
    price: 7500,
    category: getCategory('home'),
    images: [
      { id: '1', url: '/images/gifts/kikuyu-basket.jpg', alt: 'Handwoven Kikuyu Basket', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 85, inStock: true, lowStock: false },
    rating: 4.8,
    reviews: 203,
    tags: ['traditional', 'kikuyu', 'basket', 'handwoven', 'natural', 'cultural', 'decorative'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Home Decor Lovers', 'Culture Enthusiasts'],
    bestForOccasions: ['Housewarming', 'Birthday', 'Just Because'],
    packaging: 'Protective packaging',
    deliveryTime: '2-3 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Choose size', 'Choose pattern'],
    aiReason: 'Beautiful handcrafted item that brings Kenyan cultural heritage into any home',
    confidence: 0.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// CARE PACKAGES / SYMPATHY
// ============================================

export const CARE_GIFTS: GiftProduct[] = [
  {
    id: 'care-get-well-soon-package',
    name: 'Get Well Soon Care Package',
    slug: 'get-well-soon-package',
    description: 'Comforting package with herbal teas, cozy socks, relaxing music playlist, and healthy snacks to aid recovery',
    price: 6500,
    category: getCategory('care'),
    images: [
      { id: '1', url: '/images/gifts/get-well-package.jpg', alt: 'Get Well Soon Care Package', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 150, inStock: true, lowStock: false },
    rating: 4.7,
    reviews: 289,
    tags: ['care', 'get well', 'recovery', 'comfort', 'tea', 'socks', 'wellness'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Friends', 'Family', 'Colleagues'],
    bestForOccasions: ['Get Well Soon', 'Recovery', 'Sympathy'],
    packaging: 'Warm, comforting gift box',
    deliveryTime: 'Same day delivery in Nairobi',
    giftWrapAvailable: true,
    personalizationOptions: ['Add get well message', 'Choose tea preferences'],
    aiReason: 'Thoughtful care package designed to bring comfort during recovery',
    confidence: 0.91,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'care-period-care-package',
    name: 'Period Care & Comfort Package',
    slug: 'period-care-package',
    description: 'Discreet package with comforting essentials: heat pad, herbal tea, chocolate, and self-care items',
    price: 5500,
    category: getCategory('care'),
    images: [
      { id: '1', url: '/images/gifts/period-care.jpg', alt: 'Period Care & Comfort Package', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 120, inStock: true, lowStock: false },
    rating: 4.8,
    reviews: 189,
    tags: ['care', 'period', 'comfort', 'wellness', 'self-care', 'discreet'],
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    perfectFor: ['Women', 'Girlfriends', 'Sisters', 'Wives'],
    bestForOccasions: ['Thinking of You', 'Just Because'],
    packaging: 'Discreet, unmarked packaging',
    deliveryTime: 'Same day delivery',
    giftWrapAvailable: false,
    personalizationOptions: ['Add caring message'],
    aiReason: 'Thoughtful and comforting package for that time of the month, delivered with discretion',
    confidence: 0.89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'care-sympathy-comfort-basket',
    name: 'Sympathy & Comfort Basket',
    slug: 'sympathy-comfort-basket',
    description: 'Respectful and comforting basket with white flowers, scented candle, comforting tea, and heartfelt condolence card',
    price: 10000,
    category: getCategory('care'),
    images: [
      { id: '1', url: '/images/gifts/sympathy-basket.jpg', alt: 'Sympathy & Comfort Basket', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 80, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 145,
    tags: ['sympathy', 'condolence', 'comfort', 'respect', 'flowers', 'candle', 'tea'],
    isFeatured: false,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Friends', 'Family', 'Colleagues'],
    bestForOccasions: ['Sympathy', 'Condolence'],
    packaging: 'Elegant, respectful gift basket',
    deliveryTime: 'Same day delivery',
    giftWrapAvailable: false,
    personalizationOptions: ['Add condolence message', 'Choose flower type'],
    aiReason: 'Respectful and comforting gift that expresses sympathy with dignity',
    confidence: 0.93,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// VALENTINE'S DAY / ROMANTIC GIFTS
// ============================================

export const VALENTINE_GIFTS: GiftProduct[] = [
  {
    id: 'valentine-love-letter-box',
    name: 'Love Letter & Keepsake Box',
    slug: 'love-letter-box',
    description: 'Beautiful wooden box with handwritten love letter, wax seal, and space to store future memories together',
    price: 12000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/love-letter-box.jpg', alt: 'Love Letter & Keepsake Box', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 50, inStock: true, lowStock: true },
    rating: 4.9,
    reviews: 178,
    tags: ['valentine', 'love', 'romantic', 'letter', 'keepsake', 'wooden', 'personalized'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Partner', 'Spouse', 'Boyfriend', 'Girlfriend'],
    bestForOccasions: ['Valentine\'s Day', 'Anniversary', 'Just Because'],
    packaging: 'Elegant gift box with ribbon',
    deliveryTime: '2-3 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Custom love letter', 'Add names', 'Choose box design'],
    aiReason: 'Deeply personal and romantic gift that captures your feelings in words',
    confidence: 0.95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'valentine-rose-gold-jewelry',
    name: 'Rose Gold Plated Jewelry Set',
    slug: 'rose-gold-jewelry-set',
    description: 'Elegant rose gold plated necklace and earrings set with delicate design, perfect for expressing love',
    price: 18000,
    category: getCategory('jewelry'),
    images: [
      { id: '1', url: '/images/gifts/rose-gold-jewelry.jpg', alt: 'Rose Gold Plated Jewelry Set', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 40, inStock: true, lowStock: true },
    rating: 4.8,
    reviews: 124,
    tags: ['valentine', 'jewelry', 'rose gold', 'necklace', 'earrings', 'elegant', 'romantic'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Wife', 'Girlfriend', 'Partner'],
    bestForOccasions: ['Valentine\'s Day', 'Anniversary', 'Birthday'],
    packaging: 'Velvet jewelry box',
    deliveryTime: 'Next day delivery',
    giftWrapAvailable: true,
    personalizationOptions: ['Engrave initials'],
    aiReason: 'Elegant jewelry that expresses love and appreciation beautifully',
    confidence: 0.92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'valentine-couples-experience-voucher',
    name: 'Couples Experience Voucher',
    slug: 'couples-experience-voucher',
    description: 'Luxury experience voucher for a romantic dinner, spa day, or weekend getaway for two',
    price: 25000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/experience-voucher.jpg', alt: 'Couples Experience Voucher', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 100, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 215,
    tags: ['valentine', 'experience', 'voucher', 'dinner', 'spa', 'getaway', 'romantic', 'memory'],
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    perfectFor: ['Partner', 'Spouse'],
    bestForOccasions: ['Valentine\'s Day', 'Anniversary', 'Birthday'],
    packaging: 'Premium voucher envelope',
    deliveryTime: 'Next day delivery',
    giftWrapAvailable: true,
    personalizationOptions: ['Choose experience type', 'Add personal message'],
    aiReason: 'The gift of shared experiences creates lasting memories together',
    confidence: 0.96,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// MOTHER'S DAY / FATHER'S DAY GIFTS
// ============================================

export const PARENT_GIFTS: GiftProduct[] = [
  {
    id: 'parents-spa-relaxation-hamper',
    name: 'Luxury Spa Relaxation Hamper',
    slug: 'spa-relaxation-hamper',
    description: 'Complete spa experience at home with bath salts, scented candles, massage oil, and luxurious body care products',
    price: 14000,
    originalPrice: 18000,
    category: getCategory('beauty'),
    images: [
      { id: '1', url: '/images/gifts/spa-hamper.jpg', alt: 'Luxury Spa Relaxation Hamper', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 65, inStock: true, lowStock: false },
    rating: 4.9,
    reviews: 276,
    tags: ['spa', 'relaxation', 'mothers day', 'pamper', 'luxury', 'self-care', 'comfort'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['Mother', 'Wife', 'Grandmother', 'Aunt'],
    bestForOccasions: ['Mother\'s Day', 'Birthday', 'Thank You'],
    packaging: 'Premium wicker basket with tissue paper',
    deliveryTime: 'Next day delivery',
    giftWrapAvailable: true,
    personalizationOptions: ['Add personal message', 'Choose scent preferences'],
    aiReason: 'Perfect gift to help mom relax and feel appreciated',
    confidence: 0.94,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'parents-personalized-photo-book',
    name: 'Personalized Family Photo Book',
    slug: 'family-photo-book',
    description: 'Premium hardcover photo book with your family photos, personalized with names and special dates',
    price: 22000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/photo-book.jpg', alt: 'Personalized Family Photo Book', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 30, inStock: true, lowStock: true },
    rating: 5.0,
    reviews: 87,
    tags: ['photo book', 'family', 'personalized', 'memory', 'mothers day', 'fathers day', 'sentimental'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Mother', 'Father', 'Parents', 'Grandparents'],
    bestForOccasions: ['Mother\'s Day', 'Father\'s Day', 'Anniversary', 'Birthday'],
    packaging: 'Premium gift box with protective sleeve',
    deliveryTime: '5-7 days (printing time)',
    giftWrapAvailable: true,
    personalizationOptions: ['Upload photos', 'Add captions', 'Choose layout'],
    aiReason: 'Sentimental gift that preserves precious family memories forever',
    confidence: 0.97,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// CHRISTMAS / HOLIDAY GIFTS
// ============================================

export const HOLIDAY_GIFTS: GiftProduct[] = [
  {
    id: 'holiday-festive-gift-hamper',
    name: 'Festive Holiday Gift Hamper',
    slug: 'festive-holiday-hamper',
    description: 'Complete holiday hamper with gourmet treats, festive chocolates, holiday teas, and seasonal decorations',
    price: 15000,
    originalPrice: 19000,
    category: getCategory('custom'),
    images: [
      { id: '1', url: '/images/gifts/holiday-hamper.jpg', alt: 'Festive Holiday Gift Hamper', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 200, inStock: true, lowStock: false },
    rating: 4.8,
    reviews: 456,
    tags: ['christmas', 'holiday', 'festive', 'hamper', 'gourmet', 'chocolate', 'celebration'],
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    perfectFor: ['Friends', 'Family', 'Colleagues'],
    bestForOccasions: ['Christmas', 'Holiday', 'New Year'],
    packaging: 'Festive holiday gift box with ribbon',
    deliveryTime: '2-3 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Add holiday message', 'Choose treat preferences'],
    aiReason: 'Complete holiday celebration package that spreads festive cheer',
    confidence: 0.92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'holiday-premium-wine-set',
    name: 'Premium Holiday Wine Set',
    slug: 'premium-wine-set',
    description: 'Curated selection of premium wines with gourmet cheeses and crackers for holiday celebrations',
    price: 25000,
    category: getCategory('food'),
    images: [
      { id: '1', url: '/images/gifts/wine-set.jpg', alt: 'Premium Holiday Wine Set', isPrimary: true, order: 0 },
    ],
    stock: { quantity: 50, inStock: true, lowStock: true },
    rating: 4.9,
    reviews: 134,
    tags: ['wine', 'holiday', 'christmas', 'premium', 'gourmet', 'cheese', 'celebration'],
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    perfectFor: ['Wine Lovers', 'Hosts', 'Couples'],
    bestForOccasions: ['Christmas', 'Holiday', 'New Year', 'Celebration'],
    packaging: 'Wooden wine box with compartments',
    deliveryTime: '2-3 days',
    giftWrapAvailable: true,
    personalizationOptions: ['Add holiday greeting', 'Choose wine preferences'],
    aiReason: 'Sophisticated gift set perfect for holiday entertaining',
    confidence: 0.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// ============================================
// ALL GIFTS COMBINED
// ============================================

export const ALL_GIFTS: Record<string, GiftProduct[]> = {
  birthday: BIRTHDAY_GIFTS,
  anniversary: ANNIVERSARY_GIFTS,
  wedding: WEDDING_GIFTS,
  baby: BABY_SHOWER_GIFTS,
  graduation: GRADUATION_GIFTS,
  corporate: CORPORATE_GIFTS,
  traditional: TRADITIONAL_GIFTS,
  care: CARE_GIFTS,
  valentine: VALENTINE_GIFTS,
  parents: PARENT_GIFTS,
  holiday: HOLIDAY_GIFTS,
}

// Get gifts by occasion
geoeng: 'Cache related to geolocation IP lookup service' // Ignore this line
export function getGiftsByOccasion(occasionSlug: string): GiftProduct[] {
  const occasionMap: Record<string, string> = {
    birthday: 'birthday',
    anniversary: 'anniversary',
    wedding: 'wedding',
    'baby-shower': 'baby',
    graduation: 'graduation',
    corporate: 'corporate',
    ruracio: 'traditional',
    sympathy: 'care',
    valentine: 'valentine',
    'mothers-day': 'parents',
    'fathers-day': 'parents',
    christmas: 'holiday',
  }
  
  const category = occasionMap[occasionSlug] || 'birthday'
  return ALL_GIFTS[category] || []
}

// Get featured gifts from all categories
export function getFeaturedGifts(limit: number = 12): GiftProduct[] {
  const allGifts = Object.values(ALL_GIFTS).flat()
  return allGifts
    .filter((gift) => gift.isFeatured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// Get gifts on sale
export function getGiftsOnSale(limit: number = 12): GiftProduct[] {
  const allGifts = Object.values(ALL_GIFTS).flat()
  return allGifts
    .filter((gift) => gift.isOnSale)
    .sort((a, b) => ((b.originalPrice || b.price) - (a.originalPrice || a.price)) / (a.price || 1) - ((b.originalPrice || b.price) - b.price) / (b.price || 1))
    .slice(0, limit)
}

// Get new gifts
export function getNewGifts(limit: number = 12): GiftProduct[] {
  const allGifts = Object.values(ALL_GIFTS).flat()
  return allGifts
    .filter((gift) => gift.isNew)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// Get bestselling gifts (simulated by reviews and rating)
export function getBestSellingGifts(limit: number = 12): GiftProduct[] {
  const allGifts = Object.values(ALL_GIFTS).flat()
  return allGifts
    .sort((a, b) => (b.reviews * b.rating) - (a.reviews * a.rating))
    .slice(0, limit)
}

// Get gifts by budget range
export function getGiftsByBudget(min: number, max: number, limit: number = 12): GiftProduct[] {
  const allGifts = Object.values(ALL_GIFTS).flat()
  return allGifts
    .filter((gift) => gift.price >= min && gift.price <= max)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// Get gifts by recipient
export function getGiftsByRecipient(recipient: string, limit: number = 12): GiftProduct[] {
  const allGifts = Object.values(ALL_GIFTS).flat()
  return allGifts
    .filter((gift) => gift.perfectFor?.some((p) => p.toLowerCase().includes(recipient.toLowerCase())))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// Get gifts by tag
export function getGiftsByTag(tag: string, limit: number = 12): GiftProduct[] {
  const allGifts = Object.values(ALL_GIFTS).flat()
  return allGifts
    .filter((gift) => gift.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// Search gifts by query
export function searchGifts(query: string, limit: number = 12): GiftProduct[] {
  const allGifts = Object.values(ALL_GIFTS).flat()
  const queryLower = query.toLowerCase()
  
  return allGifts
    .filter((gift) => {
      return (
        gift.name.toLowerCase().includes(queryLower) ||
        gift.description.toLowerCase().includes(queryLower) ||
        gift.tags.some((tag) => tag.toLowerCase().includes(queryLower)) ||
        gift.category.name.toLowerCase().includes(queryLower) ||
        gift.perfectFor?.some((p) => p.toLowerCase().includes(queryLower)) ||
        gift.bestForOccasions?.some((o) => o.toLowerCase().includes(queryLower))
      )
    })
    .sort((a, b) => {
      // Sort by relevance (exact match first, then partial)
      const aNameMatch = a.name.toLowerCase().includes(queryLower) ? 2 : 0
      const bNameMatch = b.name.toLowerCase().includes(queryLower) ? 2 : 0
      const aTagMatch = a.tags.some((t) => t.toLowerCase() === queryLower) ? 1 : 0
      const bTagMatch = b.tags.some((t) => t.toLowerCase() === queryLower) ? 1 : 0
      return (bNameMatch + bTagMatch) - (aNameMatch + aTagMatch)
    })
    .slice(0, limit)
}

// Get a single gift by ID
export function getGiftById(id: string | number): GiftProduct | undefined {
  const allGifts = Object.values(ALL_GIFTS).flat()
  return allGifts.find((gift) => gift.id === id || gift.slug === id)
}
