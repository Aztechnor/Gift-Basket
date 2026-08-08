import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-zinc-50 font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-zinc-50">GiftBasket</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Creating unforgettable moments with curated gifts for every occasion. Powered by AI recommendations
              and crafted with love.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 rounded-full">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 rounded-full">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 rounded-full">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-50 uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/occasions" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Occasions
              </Link>
              <Link href="/collections" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Collections
              </Link>
              <Link href="/custom-printing" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Custom Printing
              </Link>
              <Link href="/basket-builder" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Basket Builder
              </Link>
              <Link href="/corporate" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Corporate Gifts
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-50 uppercase tracking-wider">Customer Service</h3>
            <div className="space-y-3">
              <Link href="/help" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Help Center
              </Link>
              <Link href="/shipping" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Returns & Exchanges
              </Link>
              <Link href="/track-order" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Track Your Order
              </Link>
              <Link href="/contact" className="block text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-50 uppercase tracking-wider">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-zinc-400">
                <Phone className="w-4 h-4 text-zinc-500" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-zinc-400">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span>hello@giftbasket.co.ke</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-sm text-zinc-400">Get updates on new collections and offers</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-zinc-900 border-zinc-800 text-zinc-50 placeholder-zinc-500 focus:ring-1 focus:ring-zinc-700"
                />
                <Button className="bg-zinc-100 hover:bg-white text-zinc-900">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-zinc-500 text-sm">© 2024 GiftBasket. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
