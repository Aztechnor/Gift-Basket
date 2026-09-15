import { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'GiftBasket',
  description: 'AI-Powered Gift Curation Platform - Find the perfect gift for every occasion',
  url: 'https://giftbasket.vercel.app',
  ogImage: 'https://giftbasket.vercel.app/og.png',
  links: {
    twitter: 'https://twitter.com/giftbasket',
    github: 'https://github.com/giftbasket',
  },
  creator: 'GiftBasket Team',
  theme: {
    primary: 'pink',
    secondary: 'purple',
    accent: 'zinc',
  },
  features: {
    aiRecommendations: true,
    chatAssistant: true,
    basketBuilder: true,
    customPrinting: true,
  },
  currency: {
    code: 'KES',
    symbol: 'KSh',
    rate: 130, // USD to KES
  },
  navigation: {
    main: [
      { title: 'Who', href: '/recipients' },
      { title: 'Why', href: '/occasions' },
      { title: 'What', href: '/categories' },
    ],
    footer: [
      { title: 'About', href: '/about' },
      { title: 'Corporate', href: '/corporate' },
      { title: 'Custom Printing', href: '/custom-printing' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  social: {
    facebook: 'https://facebook.com/giftbasket',
    instagram: 'https://instagram.com/giftbasket',
    linkedin: 'https://linkedin.com/company/giftbasket',
    whatsapp: 'https://wa.me/254700000000',
  },
}
