"use client"

import * as React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ShoppingCart, User, Menu, X, Search, Brain, Sparkles, Heart, Gift, CalendarHeart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus:bg-zinc-50 focus:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-semibold text-zinc-900">
            {icon && <span className="mr-2 text-zinc-500">{icon}</span>}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-500 mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200/50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group mr-4">
            <div className="w-9 h-9 bg-zinc-900 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 group-hover:rotate-3">
              <span className="text-white font-bold text-lg leading-none">G</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">GiftBasket</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 py-2 rounded-full text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 bg-transparent data-[state=open]:bg-zinc-50 data-[state=open]:text-zinc-900 transition-colors">
                    Who
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/recipients/partner" title="Partner or Spouse" icon={<Heart className="w-4 h-4" />}>
                        Romantic gifts to say I love you
                      </ListItem>
                      <ListItem href="/recipients/parents" title="Parents" icon={<User className="w-4 h-4" />}>
                        Thoughtful gifts for Mom or Dad
                      </ListItem>
                      <ListItem href="/recipients/friends" title="Friends" icon={<Sparkles className="w-4 h-4" />}>
                        Celebrate the chosen family
                      </ListItem>
                      <ListItem href="/recipients/colleagues" title="Colleagues or Clients" icon={<User className="w-4 h-4" />}>
                        Professional yet personal appreciation
                      </ListItem>
                      <ListItem href="/recipients/kids" title="Kids & Baby" icon={<Gift className="w-4 h-4" />}>
                        For the little ones in your life
                      </ListItem>
                      <ListItem href="/recipients/myself" title="Myself" icon={<Sparkles className="w-4 h-4" />}>
                        Because you deserve a treat too
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 py-2 rounded-full text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 bg-transparent data-[state=open]:bg-zinc-50 data-[state=open]:text-zinc-900 transition-colors">
                    Why
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/occasions/birthday" title="Birthday" icon={<Gift className="w-4 h-4" />}>
                        Make their day extra special
                      </ListItem>
                      <ListItem href="/occasions/anniversary" title="Anniversary" icon={<CalendarHeart className="w-4 h-4" />}>
                        Celebrate another year together
                      </ListItem>
                      <ListItem href="/occasions/thinking-of-you" title="Thinking of You" icon={<Brain className="w-4 h-4" />}>
                        Just because they are on your mind
                      </ListItem>
                      <ListItem href="/occasions/get-well-soon" title="Get Well Soon" icon={<Heart className="w-4 h-4" />}>
                        Send comfort and care
                      </ListItem>
                      <ListItem href="/occasions/sympathy" title="Sympathy" icon={<Heart className="w-4 h-4" />}>
                        Express your deepest condolences
                      </ListItem>
                      <ListItem href="/occasions" title="All Occasions" icon={<CalendarHeart className="w-4 h-4" />}>
                        Browse all reasons to give
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 py-2 rounded-full text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 bg-transparent data-[state=open]:bg-zinc-50 data-[state=open]:text-zinc-900 transition-colors">
                    What
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
                      <ListItem href="/categories/flowers" title="Flowers">
                        Fresh beautiful blooms
                      </ListItem>
                      <ListItem href="/categories/chocolates" title="Chocolates & Sweets">
                        Indulgent treats
                      </ListItem>
                      <ListItem href="/categories/care-packages" title="Care Packages">
                        Curated comfort items
                      </ListItem>
                      <ListItem href="/categories/plants" title="Plants">
                        Greenery that lasts
                      </ListItem>
                      <ListItem href="/categories/beauty" title="Beauty & Wellness">
                        Self-care essentials
                      </ListItem>
                      <ListItem href="/categories/custom" title="Custom Gifts">
                        Personalized for them
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/ai-recommendations" className={cn(navigationMenuTriggerStyle(), "h-10 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center bg-transparent", isActive('/ai-recommendations') ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50")}>
                      <Brain className="w-4 h-4 mr-1.5" />
                      AI Picks
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
            {/* Search Bar - Desktop */}
            <div className="hidden xl:flex relative group">
              <label htmlFor="search-desktop" className="sr-only">Search gifts</label>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4 group-focus-within:text-zinc-900 transition-colors" />
              <Input 
                id="search-desktop"
                placeholder="Search gifts..." 
                className="pl-9 w-56 lg:w-64 border-zinc-200 focus:border-zinc-300 bg-zinc-50/50 rounded-full h-10 transition-all focus:w-72" 
              />
            </div>
            
            {/* Search Icon - Tablet */}
            <Button variant="ghost" size="icon" aria-label="Search" className="hidden md:flex xl:hidden rounded-full">
              <Search className="w-5 h-5 text-zinc-700" />
            </Button>

            <Link href="/profile" aria-label="Profile">
              <Button variant="ghost" size="icon" className="hidden md:flex rounded-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            
            <Button asChild variant="ghost" size="icon" aria-label="Cart" className="relative rounded-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                <span className="sr-only">Cart items: {cartCount}</span>
                {cartCount > 0 && (
                  <Badge aria-hidden="true" className="absolute -top-0.5 -right-0.5 bg-zinc-900 text-white text-[10px] w-4.5 h-4.5 p-0 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden rounded-full text-zinc-700" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden py-4 border-t border-zinc-100 animate-in slide-in-from-top-2">
            <div className="mb-4">
              <div className="relative">
                <label htmlFor="search-mobile" className="sr-only">Search gifts</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input id="search-mobile" placeholder="Search gifts..." className="pl-9 w-full border-zinc-200 bg-zinc-50 rounded-full h-11" />
              </div>
            </div>
            <nav className="flex flex-col space-y-1">
              {[
                { name: 'Who (Recipients)', path: '/recipients' },
                { name: 'Why (Occasions)', path: '/occasions' },
                { name: 'What (Categories)', path: '/categories' },
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.path} 
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(item.path) 
                      ? "bg-zinc-100 text-zinc-900" 
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="my-2 border-t border-zinc-100" />
              
              <Link
                href="/ai-recommendations"
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center ${
                  isActive('/ai-recommendations') 
                    ? "bg-zinc-900 text-white" 
                    : "text-zinc-900 bg-zinc-50 hover:bg-zinc-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Brain className="w-5 h-5 mr-3 text-zinc-500" />
                AI Recommendations
              </Link>
              
              <Link 
                href="/profile" 
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center ${
                  isActive('/profile') 
                    ? "bg-zinc-100 text-zinc-900" 
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                My Profile
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
