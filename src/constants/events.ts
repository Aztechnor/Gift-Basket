import { Occasion } from '@/src/types'

// ============================================
// EXPANDED OCCASIONS WITH DETAILED INFORMATION
// ============================================

export interface Event extends Occasion {
  giftIdeas?: string[]
  traditionalGifts?: string[]
  modernGifts?: string[]
  culturalSignificance?: string
  timing?: string
  preparation?: string[]
  associatedColors?: string[]
  symbols?: string[]
}

// ============================================
// CELEBRATION EVENTS
// ============================================

export const BIRTHDAY_EVENT: Event = {
  id: 'birthday',
  name: 'Birthday',
  slug: 'birthday',
  description: 'Celebrate another year of life with joy, love, and thoughtful gifts that bring happiness',
  category: 'celebration',
  image: '/images/occasions/birthday.jpg',
  tags: ['celebration', 'personal', 'joy', 'party', 'cake', 'candles'],
  isActive: true,
  order: 1,
  giftIdeas: [
    'Personalized gifts with their name',
    'Experience gifts (concerts, spa, etc.)',
    'Their favorite hobby or interest items',
    'Birthday cake or cupcakes',
    'Party decorations and supplies',
    'Jewelry or accessories',
    'Books by their favorite author',
    'Gourmet food and wine',
    'Subscription boxes',
    'Handwritten letter or card',
  ],
  traditionalGifts: [
    'Cake with candles',
    'Birthday card',
    'Balloons',
    'Flowers',
    'Candles',
  ],
  modernGifts: [
    'Tech gadgets',
    'Personalized items',
    'Experience vouchers',
    'Custom art or illustration',
    'Smart home devices',
    'Fitness trackers',
    'Gaming accessories',
  ],
  culturalSignificance: 'Birthdays celebrate the gift of life and mark the passage of time. Different cultures have various traditions, but the universal theme is celebration and appreciation.',
  timing: 'Typically celebrated on the exact date of birth, but some cultures celebrate over multiple days',
  preparation: [
    'Plan a surprise party',
    'Decorate with balloons and streamers',
    'Bake or order a birthday cake',
    'Prepare their favorite meal',
    'Invite close friends and family',
    'Choose a thoughtful gift',
    'Create a birthday playlist',
  ],
  associatedColors: ['#fc8181', '#f96868', '#f6ad55', '#fbbf24'],
  symbols: ['🎂', '🎉', '🎁', '🎈', '🎊'],
}

export const ANNIVERSARY_EVENT: Event = {
  id: 'anniversary',
  name: 'Anniversary',
  slug: 'anniversary',
  description: 'Celebrate milestones in relationships with romantic and meaningful gifts that honor your journey together',
  category: 'relationship',
  image: '/images/occasions/anniversary.jpg',
  tags: ['romantic', 'milestone', 'relationship', 'love', 'celebration', 'memory'],
  isActive: true,
  order: 2,
  giftIdeas: [
    'Personalized photo gifts',
    'Matching couple items',
    'Jewelry with engravings',
    'Romantic dinner experience',
    'Custom star map of your special date',
    'Love letter or book',
    'Matching watches',
    'Spa or massage voucher',
    'Weekend getaway',
    'Custom portrait or illustration',
  ],
  traditionalGifts: [
    'Flowers (especially roses)',
    'Chocolates',
    'Jewelry',
    'Romantic dinner',
    'Love letters',
    'Perfume or cologne',
  ],
  modernGifts: [
    'Personalized gifts',
    'Experience-based gifts',
    'Custom artwork',
    'Matching tech gadgets',
    'Subscription services',
    'Memory books or scrapbooks',
    'Custom jewelry',
    'Smart photo frames',
  ],
  culturalSignificance: 'Anniversaries mark the passage of time in relationships and provide an opportunity to reflect on shared experiences, growth, and love. Different anniversary years have traditional gift themes (e.g., paper for 1st, cotton for 2nd, leather for 3rd, etc.).',
  timing: 'Celebrated on the anniversary date of a significant event (wedding, first date, etc.)',
  preparation: [
    'Plan a romantic dinner or date',
    'Reminisce about your journey together',
    'Choose a meaningful gift',
    'Write a heartfelt letter',
    'Create a photo album or video',
    'Book a surprise experience',
    'Decorate with photos and memories',
  ],
  associatedColors: ['#e53e3e', '#f96868', '#8b5cf6', '#7c3aed'],
  symbols: ['💕', '💍', '🎉', '💑', '💌', '💎'],
}

export const WEDDING_EVENT: Event = {
  id: 'wedding',
  name: 'Wedding',
  slug: 'wedding',
  description: 'Celebrate the union of two souls with elegant and thoughtful gifts that honor their new journey together',
  category: 'relationship',
  image: '/images/occasions/wedding.jpg',
  tags: ['elegant', 'romantic', 'new beginnings', 'celebration', 'love', 'union'],
  isActive: true,
  order: 3,
  giftIdeas: [
    'Gifts from their registry',
    'Personalized home items',
    'Honeymoon fund contribution',
    'Custom artwork',
    'Elegant dinnerware',
    'Luxury linens or towels',
    'Custom cutting board',
    'Personalized doormat',
    'Custom portrait',
    'Experience vouchers',
  ],
  traditionalGifts: [
    'Crystal or glassware',
    'Silver items',
    'Linens',
    'Cookware',
    'Furniture',
    'Jewelry',
  ],
  modernGifts: [
    'Tech gadgets for the home',
    'Smart home devices',
    'Personalized items',
    'Subscription services',
    'Gift cards for honeymoon',
    'Custom art',
    'Personalized home decor',
  ],
  culturalSignificance: 'Weddings are a universal celebration of love and commitment. Different cultures have rich traditions, from the white wedding dress in Western cultures to vibrant colors and multiple-day celebrations in many African and Asian cultures.',
  timing: 'Celebrated on the wedding day, with gifts often given before, during, or after the ceremony',
  preparation: [
    'Check the couple\'s registry',
    'Choose a gift that reflects their style',
    'Consider practical gifts for their new home',
    'Personalize the gift with their names or wedding date',
    'Package the gift beautifully',
    'Include a heartfelt card',
  ],
  associatedColors: ['#f6ad55', '#fbbf24', '#8b5cf6', '#f96868'],
  symbols: ['💍', '👰', '🤵', '🎉', '💕', '💑'],
}

// ============================================
// FAMILY EVENTS
// ============================================

export const BABY_SHOWER_EVENT: Event = {
  id: 'baby-shower',
  name: 'Baby Shower',
  slug: 'baby-shower',
  description: 'Celebrate the impending arrival of a little one with practical and heartfelt gifts for baby and parents',
  category: 'family',
  image: '/images/occasions/baby-shower.jpg',
  tags: ['baby', 'practical', 'new parents', 'celebration', 'shower', 'mother', 'pregnancy'],
  isActive: true,
  order: 4,
  giftIdeas: [
    'Baby clothes and accessories',
    'Diapers and wipes',
    'Baby care products',
    'Nursery items',
    'Baby toys',
    'Books for baby',
    'Gift cards for parents',
    'Meal delivery service',
    'Parenting books',
    'Personalized baby items',
  ],
  traditionalGifts: [
    'Baby clothes',
    'Blankets',
    'Baby bottles',
    'Diapers',
    'Pacifiers',
    'Baby bathtub',
  ],
  modernGifts: [
    'Organic baby products',
    'Smart baby monitors',
    'Personalized baby items',
    'Baby subscription boxes',
    'High-quality baby carriers',
    'Educational toys',
    'Eco-friendly baby products',
    'Custom baby name art',
  ],
  culturalSignificance: 'Baby showers celebrate the upcoming birth and provide support to the mother-to-be. Different cultures have various traditions, from games in Western cultures to blessing ceremonies in many African cultures.',
  timing: 'Typically held 1-2 months before the due date',
  preparation: [
    'Check if parents have a baby registry',
    'Choose practical gifts that parents need',
    'Consider the baby\'s gender if known',
    'Choose organic and safe materials',
    'Personalize gifts with baby\'s name',
    'Package gifts beautifully',
    'Include a card with well wishes',
  ],
  associatedColors: ['#68d391', '#48bb78', '#f687b3', '#fc8181'],
  symbols: ['👶', '🍼', '🎀', '👔', '🎁', '💕'],
}

export const GRADUATION_EVENT: Event = {
  id: 'graduation',
  name: 'Graduation',
  slug: 'graduation',
  description: 'Celebrate academic achievements and the exciting journey ahead with inspiring and practical gifts',
  category: 'achievement',
  image: '/images/occasions/graduation.jpg',
  tags: ['achievement', 'future', 'inspiration', 'success', 'education', 'milestone'],
  isActive: true,
  order: 5,
  giftIdeas: [
    'Graduation cap and gown accessories',
    'Personalized graduation frame',
    'Inspirational books',
    'Tech gadgets for the next chapter',
    'Luggage or travel gear',
    'Gift cards for future purchases',
    'Professional development courses',
    'Personalized leather journal',
    'Success celebration hamper',
    'Custom engraved pen',
  ],
  traditionalGifts: [
    'Money or gift cards',
    'Books',
    'Watches',
    'Jewelry',
    'Clothing',
    'Frame for diploma',
  ],
  modernGifts: [
    'Tech gadgets',
    'Online courses',
    'Subscription services',
    'Travel vouchers',
    'Personalized items',
    'Professional development gifts',
    'Smart devices',
    'Experience-based gifts',
  ],
  culturalSignificance: 'Graduation marks the completion of an educational journey and the beginning of a new chapter. It\'s a time to celebrate hard work, dedication, and the potential of the future.',
  timing: 'Celebrated after the completion of a degree or program, often with a ceremony',
  preparation: [
    'Choose a gift that aligns with their future plans',
    'Consider practical gifts for their next chapter',
    'Personalize the gift with their name or graduation year',
    'Include a heartfelt congratulations message',
    'Package the gift nicely',
    'Consider gifts that will help them in their career',
  ],
  associatedColors: ['#4299e1', '#3182ce', '#2b6cb0', '#2c5282'],
  symbols: ['🎓', '📜', '🎉', '💼', '📚', '🌟'],
}

// ============================================
// CULTURAL EVENTS (Kenyan)
// ============================================

export const RURACIO_EVENT: Event = {
  id: 'ruracio',
  name: 'Ruracio',
  slug: 'ruracio',
  description: 'Traditional Kikuyu dowry ceremony where the groom\'s family presents gifts to the bride\'s family to formalize the marriage agreement',
  category: 'cultural',
  image: '/images/occasions/ruracio.jpg',
  tags: ['traditional', 'kenyan', 'cultural', 'dowry', 'kikuyu', 'ceremony', 'marriage'],
  isActive: true,
  order: 6,
  giftIdeas: [
    'Complete Ruracio ceremony set',
    'Traditional Kiondo',
    'Muthundu (traditional gourd)',
    'Ngoro (calabashes)',
    'Kikuyu beaded jewelry',
    'Handwoven baskets',
    'Traditional clothing (Kikoy)',
    'Honey and sugarcane',
    'Goat or livestock (traditional)',
    'Money in traditional envelopes',
  ],
  traditionalGifts: [
    'Kiondo (woven container)',
    'Muthundu (gourd for drinking)',
    'Ngoro (calabashes)',
    'Kikoy (traditional cloth)',
    'Beer (for elders)',
    'Honey',
    'Sugarcane',
    'Goat or livestock',
    'Money',
  ],
  modernGifts: [
    'Modern interpretation of traditional items',
    'Cash gifts in decorative envelopes',
    'Jewelry with traditional designs',
    'Custom traditional art',
    'Handcrafted items from local artisans',
  ],
  culturalSignificance: 'Ruracio is a sacred Kikuyu tradition that symbolizes the groom\'s commitment and ability to provide for his future wife. It\'s a ceremony rich in symbolism, where each gift has a specific meaning and purpose. The ceremony involves extensive negotiations and presentations, and it\'s considered the official engagement in Kikuyu culture.',
  timing: 'The ceremony date is agreed upon by both families through negotiations (Kuhuga). It can take months of planning and often involves multiple meetings.',
  preparation: [
    'Consult with family elders on traditional requirements',
    'Prepare the traditional gifts (Kiondo, Muthundu, etc.)',
    'Arrange for livestock if including traditional animals',
    'Prepare cash gifts in proper envelopes',
    'Coordinate with the bride\'s family on expectations',
    'Invite family members and elders',
    'Prepare traditional food and drinks',
    'Dress in traditional attire (Kikoy)',
  ],
  associatedColors: ['#8b4513', '#a0522d', '#cd853f', '#d2691e', '#b8860b'],
  symbols: ['🎁', '💍', '👨‍👩‍👧‍👦', '🏡', '🌾', '🐐'],
}

export const QUINCEANERA_EVENT: Event = {
  id: 'quinceanera',
  name: 'Quinceañera',
  slug: 'quinceanera',
  description: 'Celebration of a girl\'s 15th birthday, marking her transition from childhood to young womanhood in Latin American cultures',
  category: 'celebration',
  image: '/images/occasions/quinceanera.jpg',
  tags: ['milestone', 'princess', 'celebration', 'coming of age', '15th birthday', 'latin'],
  isActive: true,
  order: 7,
  giftIdeas: [
    'Personalized jewelry',
    'Princess tiara',
    'Elegant dress or accessories',
    'Memory book or scrapbook',
    'Spa or beauty treatment voucher',
    'Custom portrait',
    'Photo album for the event',
    'Personalized music box',
    'Charm bracelet',
    'Inspirational books',
  ],
  traditionalGifts: [
    'Tiara (symbolizing the princess)',
    'Gloves (symbolizing elegance)',
    'High heels (symbolizing maturity)',
    'Jewelry',
    'Elegant dress',
    'Waltz with father (symbolic dance)',
  ],
  modernGifts: [
    'Personalized items',
    'Tech gadgets',
    'Experience gifts',
    'Custom artwork',
    'Subscription services',
    'Beauty products',
    'Fashion accessories',
  ],
  culturalSignificance: 'The Quinceañera is a significant rite of passage in many Latin American cultures. It celebrates a girl\'s journey to womanhood and often includes symbolic ceremonies like the changing of shoes from flats to high heels, representing her transition from childhood to young womanhood.',
  timing: 'Celebrated on or around the girl\'s 15th birthday with a large party and ceremony',
  preparation: [
    'Plan the celebration venue',
    'Choose a theme and decorations',
    'Order or make the birthday dress',
    'Arrange for the traditional waltz with father',
    'Prepare the symbolic items (tiara, gloves, etc.)',
    'Create a guest list',
    'Plan the music and entertainment',
    'Choose a gift that honors this milestone',
  ],
  associatedColors: ['#e91e63', '#f06292', '#f48fb1', '#f8bbd0', '#ffcdd2'],
  symbols: ['👑', '🎀', '💃', '🎉', '💖', '🎊'],
}

// ============================================
// BUSINESS EVENTS
// ============================================

export const CORPORATE_EVENT: Event = {
  id: 'corporate',
  name: 'Corporate',
  slug: 'corporate',
  description: 'Professional gifts for clients, colleagues, and business partners to express appreciation and strengthen relationships',
  category: 'business',
  image: '/images/occasions/corporate.jpg',
  tags: ['professional', 'appreciation', 'business', 'thank you', 'relationship', 'partnership'],
  isActive: true,
  order: 8,
  giftIdeas: [
    'Branded corporate gifts',
    'Premium coffee or tea sets',
    'Gourmet gift baskets',
    'Personalized desk items',
    'Tech gadgets for the office',
    'Gift cards',
    'Subscription services',
    'Custom branded merchandise',
    'Executive gift sets',
    'Potted plants or succulents',
  ],
  traditionalGifts: [
    'Bottle of wine or whiskey',
    'Gourmet chocolates',
    'Coffee or tea',
    'Desk accessories',
    'Leather goods',
    'Briefcases or bags',
    'Watches',
  ],
  modernGifts: [
    'Branded tech gadgets',
    'Custom corporate merchandise',
    'Eco-friendly office supplies',
    'Smart office devices',
    'Personalized corporate gifts',
    'Subscription boxes',
    'Experience vouchers',
    'Wellness gifts',
  ],
  culturalSignificance: 'Corporate gift-giving is a professional tradition that helps build and maintain business relationships. The gifts should be thoughtful, appropriate, and align with the recipient\'s taste and the nature of your relationship.',
  timing: 'Can be given at any time to express appreciation, celebrate milestones, or during holiday seasons',
  preparation: [
    'Consider the recipient\'s position and preferences',
    'Choose a gift appropriate for your relationship',
    'Avoid overly personal gifts',
    'Consider company gift-giving policies',
    'Add a personalized note or card',
    'Ensure the gift is professionally packaged',
    'Consider cultural sensitivities',
    'Keep the gift within an appropriate budget',
  ],
  associatedColors: ['#4a5568', '#2d3748', '#1a202c', '#718096', '#4299e1'],
  symbols: ['💼', '📈', '🤝', '📊', '💳', '🏢'],
}

// ============================================
// PERSONAL EVENTS
// ============================================

export const THINKING_OF_YOU_EVENT: Event = {
  id: 'thinking-of-you',
  name: 'Thinking of You',
  slug: 'thinking-of-you',
  description: 'Small tokens to show you care and are thinking of someone special, perfect for any time of the year',
  category: 'personal',
  image: '/images/occasions/thinking-of-you.jpg',
  tags: ['thoughtful', 'care', 'appreciation', 'friendship', 'love', 'just because'],
  isActive: true,
  order: 9,
  giftIdeas: [
    'Handwritten letter or card',
    'Small treat or snack',
    'Personalized keychain or charm',
    'Inspirational book or quote card',
    'Scented candle',
    'Small plant or succulent',
    'Chocolate or candy',
    'Custom stickers or magnets',
    'Gift card for their favorite store',
    'Digital gift (ebook, music, etc.)',
  ],
  traditionalGifts: [
    'Flowers',
    'Handwritten note',
    'Small treat',
    'Book',
    'Candle',
    'Chocolate',
  ],
  modernGifts: [
    'Digital gifts',
    'Subscription services',
    'Personalized small items',
    'Experience vouchers',
    'E-gift cards',
    'Custom stickers or art',
    'Small tech gadgets',
  ],
  culturalSignificance: 'Sometimes the most meaningful gifts are those given without a specific occasion. These small tokens show that you\'re thinking of someone and value your relationship with them.',
  timing: 'Can be given at any time',
  preparation: [
    'Choose something personal and meaningful',
    'Add a heartfelt note',
    'Keep it simple and thoughtful',
    'Consider their current situation or needs',
    'Package it nicely',
    'Surprise them when they least expect it',
  ],
  associatedColors: ['#fc8181', '#f6ad55', '#68d391', '#48bb78'],
  symbols: ['💌', '💕', '💖', '🌸', '☕', '📦'],
}

export const GET_WELL_SOON_EVENT: Event = {
  id: 'get-well-soon',
  name: 'Get Well Soon',
  slug: 'get-well-soon',
  description: 'Comforting gifts to aid recovery and show you care during difficult times',
  category: 'care',
  image: '/images/occasions/get-well-soon.jpg',
  tags: ['care', 'comfort', 'recovery', 'wellness', 'healing', 'support'],
  isActive: true,
  order: 10,
  giftIdeas: [
    'Get well soon card',
    'Comforting care package',
    'Soft blanket or pillow',
    'Inspirational books or magazines',
    'Herbal teas or soups',
    'Scented candles',
    'Relaxing music playlist',
    'Healthy snacks',
    'Puzzle or activity book',
    'Soft, cozy socks',
  ],
  traditionalGifts: [
    'Flowers (check for allergies)',
    'Get well card',
    'Chicken soup',
    'Fruit basket',
    'Books or magazines',
    'Soft blanket',
  ],
  modernGifts: [
    'Custom care packages',
    'Wellness subscriptions',
    'Digital entertainment',
    'Audiobooks',
    'Smart home devices for comfort',
    'Personalized recovery items',
    'Health and wellness products',
  ],
  culturalSignificance: 'When someone is ill or going through a tough time, a thoughtful gift can provide comfort and show that you care. The most important thing is to show your support and concern.',
  timing: 'Can be given at any time during their recovery',
  preparation: [
    'Consider their specific illness or needs',
    'Choose comforting and practical items',
    'Avoid food if they have dietary restrictions',
    'Check for allergies before sending flowers',
    'Include a heartfelt get well message',
    'Consider the hospital or recovery facility rules',
    'Choose items that will bring them comfort',
  ],
  associatedColors: ['#68d391', '#48bb78', '#38b2ac', '#319795'],
  symbols: ['💐', '🌿', '☕', '💊', '🛌️', '💕'],
}

export const SYMPATHY_EVENT: Event = {
  id: 'sympathy',
  name: 'Sympathy',
  slug: 'sympathy',
  description: 'Express condolences with respectful and comforting gifts that show your support',
  category: 'care',
  image: '/images/occasions/sympathy.jpg',
  tags: ['condolence', 'respect', 'comfort', 'support', 'sympathy', 'memorial'],
  isActive: true,
  order: 11,
  giftIdeas: [
    'Sympathy card',
    'White flowers (lilies, roses, etc.)',
    'Comforting care basket',
    'Memorial candle',
    'Personalized remembrance gift',
    'Donation to a charity in their name',
    'Photo frame or memory book',
    'Scented candle for relaxation',
    'Gourmet food basket',
    'Planted tree or memorial garden',
  ],
  traditionalGifts: [
    'Sympathy card',
    'White flowers',
    'Food or meals',
    'Candle',
    'Wreath',
    'Memorial donation',
  ],
  modernGifts: [
    'Custom memorial items',
    'Personalized remembrance gifts',
    'Digital memorials',
    'Charity donations',
    'Planted trees or gardens',
    'Online memorial pages',
  ],
  culturalSignificance: 'Expressing sympathy is an important way to show your support and respect for someone who has experienced a loss. The most meaningful gifts are those that come from the heart and acknowledge their grief.',
  timing: 'Typically sent shortly after learning of the loss, or can be given at the funeral or memorial service',
  preparation: [
    'Choose a respectful and appropriate gift',
    'Consider the family\'s cultural and religious traditions',
    'Write a heartfelt sympathy message',
    'Choose white or neutral colors',
    'Avoid overly cheerful or bright gifts',
    'Consider the relationship you had with the deceased',
    'Choose a gift that provides comfort',
    'Respect the family\'s wishes',
  ],
  associatedColors: ['#e2e8f0', '#cbd5e0', '#a0aec0', '#718096', '#4a5568'],
  symbols: ['🕊️', '🌹', '🪔', '💐', '☁️', '💙'],
}

// ============================================
// ROMANTIC EVENTS
// ============================================

export const VALENTINE_EVENT: Event = {
  id: 'valentine',
  name: 'Valentine\'s Day',
  slug: 'valentine',
  description: 'Celebrate love and romance with heartfelt gifts that express your feelings for that special someone',
  category: 'relationship',
  image: '/images/occasions/valentine.jpg',
  tags: ['romantic', 'love', 'passion', 'intimacy', 'hearts', 'chocolate', 'flowers'],
  isActive: true,
  order: 12,
  giftIdeas: [
    'Romantic dinner experience',
    'Jewelry (necklace, bracelet, earrings)',
    'Personalized love letter or book',
    'Chocolates and sweets',
    'Flowers (especially roses)',
    'Perfume or cologne',
    'Couple\'s massage voucher',
    'Weekend getaway',
    'Custom portrait or illustration',
    'Matching couple items',
  ],
  traditionalGifts: [
    'Roses (especially red)',
    'Chocolates',
    'Love letters',
    'Jewelry',
    'Romantic dinner',
    'Perfume',
    'Candles',
    'Teddy bear',
  ],
  modernGifts: [
    'Experience-based gifts',
    'Personalized items',
    'Custom artwork',
    'Smart couple\'s devices',
    'Matching tech gadgets',
    'Subscription boxes',
    'Digital photo frames',
    'Memory books',
  ],
  culturalSignificance: 'Valentine\'s Day celebrates romantic love and is an opportunity to express your feelings for your partner. While it has Christian origins (St. Valentine), it has evolved into a secular celebration of love in many cultures.',
  timing: 'Celebrated on February 14th each year',
  preparation: [
    'Plan a romantic date or experience',
    'Choose a gift that reflects your love and relationship',
    'Write a heartfelt love letter or card',
    'Consider their love language',
    'Create a romantic atmosphere',
    'Choose traditional romantic gifts (flowers, chocolates)',
    'Consider personalized or custom gifts',
    'Add a surprise element',
  ],
  associatedColors: ['#e53e3e', '#fc8181', '#f96868', '#8b5cf6', '#7c3aed'],
  symbols: ['💘', '💕', '💖', '🌹', '🍫', '💍', '💑'],
}

// ============================================
// FAMILY EVENTS
// ============================================

export const MOTHERS_DAY_EVENT: Event = {
  id: 'mothers-day',
  name: 'Mother\'s Day',
  slug: 'mothers-day',
  description: 'Honor and appreciate mothers and mother figures with heartfelt gifts that show your gratitude',
  category: 'family',
  image: '/images/occasions/mothers-day.jpg',
  tags: ['mother', 'appreciation', 'love', 'family', 'gratitude', 'thank you'],
  isActive: true,
  order: 13,
  giftIdeas: [
    'Personalized photo gifts',
    'Spa or relaxation hamper',
    'Handmade gifts from children',
    'Jewelry',
    'Family photo book',
    'Breakfast in bed experience',
    'Custom portrait',
    'Personalized mug or glass',
    'Inspirational books',
    'Gift cards for her favorite store',
  ],
  traditionalGifts: [
    'Flowers',
    'Chocolates',
    'Handmade cards',
    'Jewelry',
    'Breakfast in bed',
    'Perfume',
    'Candles',
  ],
  modernGifts: [
    'Personalized items',
    'Experience gifts',
    'Custom artwork',
    'Smart home devices',
    'Subscription boxes',
    'Wellness gifts',
    'Tech gadgets',
    'E-readers',
  ],
  culturalSignificance: 'Mother\'s Day is a celebration of the incredible love, sacrifice, and dedication that mothers provide. Different countries celebrate it on different dates, but the sentiment is universal - to honor and appreciate the special women in our lives.',
  timing: 'Celebrated on various dates around the world (second Sunday in May in Kenya and many other countries)',
  preparation: [
    'Choose a gift that reflects her personality and interests',
    'Consider her love language',
    'Add a heartfelt message or card',
    'Plan a special activity or experience',
    'Involve the whole family',
    'Consider her needs and wants',
    'Choose something that will make her feel appreciated',
    'Package the gift nicely',
  ],
  associatedColors: ['#fc8181', '#f96868', '#f6ad55', '#8b5cf6'],
  symbols: ['💕', '👩', '👶', '🌸', '💖', '🎁'],
}

export const FATHERS_DAY_EVENT: Event = {
  id: 'fathers-day',
  name: 'Father\'s Day',
  slug: 'fathers-day',
  description: 'Celebrate and appreciate fathers and father figures with thoughtful gifts that honor their role',
  category: 'family',
  image: '/images/occasions/fathers-day.jpg',
  tags: ['father', 'appreciation', 'respect', 'family', 'gratitude', 'thank you'],
  isActive: true,
  order: 14,
  giftIdeas: [
    'Personalized gifts with his name',
    'Tech gadgets',
    'Tools or DIY items',
    'Sports merchandise',
    'Gourmet food and drinks',
    'Watches',
    'Personalized leather goods',
    'Books by his favorite author',
    'Experience gifts (sports tickets, etc.)',
    'Grilling or outdoor gear',
  ],
  traditionalGifts: [
    'Tools',
    'Tie or accessories',
    'Books',
    'Watches',
    'Gourmet food',
    'Grilling items',
    'Sports items',
  ],
  modernGifts: [
    'Tech gadgets',
    'Smart devices',
    'Personalized items',
    'Experience vouchers',
    'Subscription services',
    'DIY kits',
    'Fitness trackers',
    'Gaming accessories',
  ],
  culturalSignificance: 'Father\'s Day celebrates the important role that fathers play in our lives. It\'s a time to honor their love, guidance, and support. Different countries celebrate it on different dates, but the third Sunday in June is common in many countries including Kenya.',
  timing: 'Celebrated on various dates around the world (third Sunday in June in Kenya)',
  preparation: [
    'Choose a gift that reflects his personality and interests',
    'Consider his hobbies',
    'Add a heartfelt message or card',
    'Plan a special activity or experience together',
    'Consider practical gifts he can use',
    'Choose something that will make him feel appreciated',
    'Package the gift nicely',
    'Consider his needs and wants',
  ],
  associatedColors: ['#4a5568', '#2d3748', '#1a202c', '#718096', '#4299e1'],
  symbols: ['👨', '👔', '💼', '🎣', '🔧', '💙', '🎁'],
}

// ============================================
// SEASONAL EVENTS
// ============================================

export const CHRISTMAS_EVENT: Event = {
  id: 'christmas',
  name: 'Christmas',
  slug: 'christmas',
  description: 'Celebrate the holiday season with festive gifts that bring joy and warmth to your loved ones',
  category: 'celebration',
  image: '/images/occasions/christmas.jpg',
  tags: ['festive', 'holiday', 'joy', 'celebration', 'christmas', 'winter', 'giving'],
  isActive: true,
  order: 15,
  giftIdeas: [
    'Festive gift hampers',
    'Personalized Christmas ornaments',
    'Holiday-themed decorations',
    'Gourmet food and wine',
    'Cozy blankets and pillows',
    'Christmas books or movies',
    'Gift cards',
    'Holiday experience vouchers',
    'Family board games',
    'Christmas tree decorations',
  ],
  traditionalGifts: [
    'Christmas tree ornaments',
    'Holiday decorations',
    'Gourmet food baskets',
    'Wine or spirits',
    'Chocolates',
    'Books',
    'Toys for children',
    'Cozy items',
  ],
  modernGifts: [
    'Personalized holiday items',
    'Tech gadgets',
    'Experience-based gifts',
    'Subscription boxes',
    'Smart home devices',
    'Digital entertainment',
    'Custom holiday art',
    'Eco-friendly gifts',
  ],
  culturalSignificance: 'Christmas is a celebration of love, family, and giving. While it has Christian origins celebrating the birth of Jesus Christ, it has become a cultural holiday celebrated by people of many faiths and backgrounds. It\'s a time for gathering with loved ones and expressing gratitude.',
  timing: 'Celebrated on December 25th each year, with preparations often starting in early December',
  preparation: [
    'Create a gift list for family and friends',
    'Choose gifts that reflect each person\'s personality',
    'Consider practical and thoughtful gifts',
    'Personalize gifts with names or messages',
    'Package gifts beautifully',
    'Plan holiday activities and traditions',
    'Decorate your home festively',
    'Prepare holiday meals and treats',
  ],
  associatedColors: ['#e53e3e', '#c53030', '#b91c1c', '#991b1b', '#fbbf24', '#f59e0b'],
  symbols: ['🎄', '⭐', '🎁', '🎅', '❄️', '🔥', '🎊'],
}

// ============================================
// ALL EVENTS COMBINED
// ============================================

export const ALL_EVENTS: Event[] = [
  BIRTHDAY_EVENT,
  ANNIVERSARY_EVENT,
  WEDDING_EVENT,
  BABY_SHOWER_EVENT,
  GRADUATION_EVENT,
  RURACIO_EVENT,
  QUINCEANERA_EVENT,
  CORPORATE_EVENT,
  THINKING_OF_YOU_EVENT,
  GET_WELL_SOON_EVENT,
  SYMPATHY_EVENT,
  VALENTINE_EVENT,
  MOTHERS_DAY_EVENT,
  FATHERS_DAY_EVENT,
  CHRISTMAS_EVENT,
]

// Get event by slug
export function getEventBySlug(slug: string): Event | undefined {
  return ALL_EVENTS.find((event) => event.slug === slug)
}

// Get event by ID
export function getEventById(id: string): Event | undefined {
  return ALL_EVENTS.find((event) => event.id === id)
}

// Get events by category
export function getEventsByCategory(category: string): Event[] {
  return ALL_EVENTS.filter((event) => event.category === category)
}

// Get featured events
export function getFeaturedEvents(limit: number = 6): Event[] {
  return ALL_EVENTS
    .filter((event) => event.isActive)
    .sort((a, b) => a.order - b.order)
    .slice(0, limit)
}

// Search events by query
export function searchEvents(query: string): Event[] {
  const queryLower = query.toLowerCase()
  return ALL_EVENTS.filter((event) => {
    return (
      event.name.toLowerCase().includes(queryLower) ||
      event.description.toLowerCase().includes(queryLower) ||
      event.tags.some((tag) => tag.toLowerCase().includes(queryLower)) ||
      event.category?.toLowerCase().includes(queryLower) ||
      (event.giftIdeas && event.giftIdeas.some((idea) => idea.toLowerCase().includes(queryLower)))
    )
  })
}

// Get related events based on tags
export function getRelatedEvents(slug: string, limit: number = 4): Event[] {
  const currentEvent = getEventBySlug(slug)
  if (!currentEvent) return []

  return ALL_EVENTS
    .filter((event) => event.slug !== slug)
    .filter((event) => {
      return (
        event.category === currentEvent.category ||
        event.tags.some((tag) => currentEvent.tags.includes(tag))
      )
    })
    .slice(0, limit)
}
