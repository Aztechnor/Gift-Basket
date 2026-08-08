"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Sparkles, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HeroSection() {
  return (
    <section className="bg-zinc-50 border-b border-zinc-200/50">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-zinc-200/50 shadow-sm">
            <Sparkles className="w-4 h-4 text-zinc-900" />
            <span className="text-sm font-semibold text-zinc-900 uppercase tracking-widest">A Thoughtful Marketplace</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
            Send a little something <br className="hidden sm:block" />
            <span className="text-zinc-500">that says a lot.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Flowers, treats, care packages, and thoughtful gifts for the people who matter. 
            Because you don't always need a reason to show you care.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 h-14 rounded-full text-base font-medium w-full sm:w-auto shadow-sm transition-all"
            >
              <Link href="/ai-recommendations">Find a Gift</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 px-8 h-14 rounded-full text-base font-medium w-full sm:w-auto transition-all"
            >
              <Link href="/basket-builder">Build a Gift</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 px-8 h-14 rounded-full text-base font-medium w-full sm:w-auto transition-all"
            >
              <Link href="/categories">I know what I want</Link>
            </Button>
          </div>
        </div>

        {/* Gift Finder Interactive Bar */}
        <div className="max-w-4xl mx-auto mt-16 bg-white p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-zinc-200/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label id="label-who" className="text-sm font-semibold text-zinc-900 px-2">Who is it for?</label>
              <Select aria-labelledby="label-who">
                <SelectTrigger id="select-who" aria-labelledby="label-who select-who" className="h-14 rounded-2xl bg-zinc-50 border-0 focus:ring-0 focus:ring-offset-0 px-4 text-base font-medium text-zinc-700">
                  <SelectValue placeholder="Anyone" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border border-zinc-100 shadow-lg">
                  <SelectItem value="partner">Partner or Spouse</SelectItem>
                  <SelectItem value="mom">Mom</SelectItem>
                  <SelectItem value="dad">Dad</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="colleague">Colleague</SelectItem>
                  <SelectItem value="myself">Myself</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label id="label-occasion" className="text-sm font-semibold text-zinc-900 px-2">What's the occasion?</label>
              <Select aria-labelledby="label-occasion">
                <SelectTrigger id="select-occasion" aria-labelledby="label-occasion select-occasion" className="h-14 rounded-2xl bg-zinc-50 border-0 focus:ring-0 focus:ring-offset-0 px-4 text-base font-medium text-zinc-700">
                  <SelectValue placeholder="Just Because" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border border-zinc-100 shadow-lg">
                  <SelectItem value="just-because">Just Because</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="thinking">Thinking of You</SelectItem>
                  <SelectItem value="thank-you">Thank You</SelectItem>
                  <SelectItem value="get-well">Get Well Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label id="label-budget" className="text-sm font-semibold text-zinc-900 px-2">What's your budget?</label>
              <Select aria-labelledby="label-budget">
                <SelectTrigger id="select-budget" aria-labelledby="label-budget select-budget" className="h-14 rounded-2xl bg-zinc-50 border-0 focus:ring-0 focus:ring-offset-0 px-4 text-base font-medium text-zinc-700">
                  <SelectValue placeholder="Any budget" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border border-zinc-100 shadow-lg">
                  <SelectItem value="under-50">Under KSh 5,000</SelectItem>
                  <SelectItem value="50-100">KSh 5,000 - 10,000</SelectItem>
                  <SelectItem value="100-200">KSh 10,000 - 20,000</SelectItem>
                  <SelectItem value="over-200">Over KSh 20,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button asChild className="h-14 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-base w-full md:w-auto px-8 transition-all flex items-center justify-center">
              <Link href="/ai-recommendations">
                <Search className="w-5 h-5 mr-2" />
                Find Gifts
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
