"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import type { FormEvent } from "react"
import {
  Search,
  RefreshCw,
  Package,
  User,
  Plus,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function MyGiftingLife() {
  const [people, setPeople] = useState([
    { id: 1, name: "James", relationship: "Partner", event: "Birthday in 8d", initial: "J" },
    { id: 2, name: "Mum", relationship: "Mother", event: "Anniversary in 21d", initial: "M" }
  ]);
  const [newName, setNewName] = useState("");
  const [newRelationship, setNewRelationship] = useState("");
  const [newOccasion, setNewOccasion] = useState("");
  
  const handleAddPerson = (e: FormEvent) => {
    e.preventDefault();
    if (newName) {
      setPeople([...people, {
        id: Date.now(),
        name: newName,
        relationship: newRelationship || "Friend",
        event: newOccasion ? `${newOccasion} upcoming` : "No event",
        initial: newName.charAt(0).toUpperCase()
      }]);
      // Reset form
      setNewName("");
      setNewRelationship("");
      setNewOccasion("");
      // Close dialog
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
    }
  };
  return (
    <div className="space-y-12 pb-12">
      {/* HEADER */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
          <AvatarImage src="/placeholder-user.jpg" alt="Sarah" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div className="space-y-1 mt-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Good morning, Sarah.
          </h1>
          <p className="text-lg text-zinc-500 font-medium flex items-center justify-center md:justify-start gap-2">
            Let's make someone's day. <Sparkles className="w-5 h-5 text-amber-500" />
          </p>
        </div>
      </section>

      {/* DASHBOARD CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-8">
        
        {/* UPCOMING - Mobile: 1, Desktop: Row 2 Left */}
        <section className="order-1 lg:order-2 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-zinc-900">Coming Up</h2>
          </div>
          
          <div className="space-y-4">
            {/* Upcoming Event 1 */}
            <Card className="border-l-4 border-l-rose-500 overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-stretch">
                  <div className="p-6 flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left w-full">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <Avatar className="w-full h-full">
                        <AvatarFallback className="bg-rose-100 text-rose-700 text-xl font-bold">J</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-bold text-lg text-zinc-900">James' Birthday</h3>
                        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none self-center sm:self-auto font-medium">In 8 days</Badge>
                      </div>
                      <p className="text-sm text-zinc-500 font-medium">Partner • August 16th</p>
                      
                      <div className="mt-4 bg-amber-50/50 p-4 rounded-xl flex items-start gap-3 border border-amber-100/50">
                        <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-zinc-700 leading-relaxed">
                          <span className="font-semibold text-zinc-900">Idea:</span> James liked the chocolate gift you sent last year. Looking for something different this year? Maybe an experience or tech accessory.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-zinc-50/80 border-t sm:border-t-0 sm:border-l border-zinc-100 w-full sm:w-auto flex items-center justify-center">
                    <Button asChild className="w-full sm:w-auto rounded-full font-medium shadow-sm"><Link href="/ai-recommendations">Find a Gift</Link></Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Event 2 */}
            <Card className="border-l-4 border-l-blue-500 overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-stretch">
                  <div className="p-6 flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left w-full">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <Avatar className="w-full h-full">
                         <AvatarImage src="/placeholder-user.jpg" alt="Mum" />
                         <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-bold">M</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-bold text-lg text-zinc-900">Mum's Anniversary</h3>
                        <Badge variant="secondary" className="self-center sm:self-auto font-medium">In 21 days</Badge>
                      </div>
                      <p className="text-sm text-zinc-500 font-medium">Mother • August 29th</p>
                      
                      <div className="mt-4 bg-amber-50/50 p-4 rounded-xl flex items-start gap-3 border border-amber-100/50">
                        <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-zinc-700 leading-relaxed">
                          <span className="font-semibold text-zinc-900">Idea:</span> You sent Mum flowers last Mother's Day. A custom photo frame or a gourmet hamper could be a sweet surprise.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-zinc-50/80 border-t sm:border-t-0 sm:border-l border-zinc-100 w-full sm:w-auto flex items-center justify-center">
                    <Button asChild className="w-full sm:w-auto rounded-full font-medium shadow-sm"><Link href="/ai-recommendations">Find a Gift</Link></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* QUICK ACTIONS - Mobile: 2, Desktop: Row 1 Full Width */}
        <section className="order-2 lg:order-1 lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link href="/occasions" className="block group">
              <Card className="h-full hover:border-zinc-300 hover:shadow-md transition-all group-hover:bg-zinc-50 border-zinc-200">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-3 h-full">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Search className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-sm text-zinc-900">Find a Gift</span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/cart" className="block group">
              <Card className="h-full hover:border-zinc-300 hover:shadow-md transition-all group-hover:bg-zinc-50 border-zinc-200">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-3 h-full">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-sm text-zinc-900">Send Again</span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/basket-builder" className="block group">
              <Card className="h-full hover:border-zinc-300 hover:shadow-md transition-all group-hover:bg-zinc-50 border-zinc-200">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-3 h-full">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-sm text-zinc-900">Build a Gift</span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/profile?tab=people" className="block group">
              <Card className="h-full hover:border-zinc-300 hover:shadow-md transition-all group-hover:bg-zinc-50 border-zinc-200">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-3 h-full">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-sm text-zinc-900">My People</span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/profile?tab=reminders" className="block group">
              <Card className="h-full hover:border-zinc-300 hover:shadow-md transition-all group-hover:bg-zinc-50 border-zinc-200">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-3 h-full">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-sm text-zinc-900">Add Reminder</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* PEOPLE - Mobile: 3, Desktop: Row 2 Right */}
        <section className="order-3 lg:order-3 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-zinc-900">My People</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900"><Plus className="w-4 h-4" /></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Person & Reminder</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="e.g. Jane" value={newName} onChange={e => setNewName(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Select value={newRelationship} onValueChange={setNewRelationship}>
                      <SelectTrigger id="relationship">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="colleague">Colleague</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="occasion">Occasion to Remember</Label>
                    <Select value={newOccasion} onValueChange={setNewOccasion}>
                      <SelectTrigger id="occasion">
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleAddPerson}>Save Reminder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card className="shadow-sm border-zinc-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-100">
                <div className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-rose-100 text-rose-700 font-bold">J</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-zinc-900">James</p>
                      <p className="text-xs text-zinc-500 font-medium">Partner</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Birthday in 8d</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">M</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-zinc-900">Mum</p>
                      <p className="text-xs text-zinc-500 font-medium">Mother</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-zinc-700 bg-zinc-100 px-2 py-1 rounded-full">Anniv in 21d</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-zinc-100 text-zinc-700 font-bold">S</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-zinc-900">Sarah</p>
                      <p className="text-xs text-zinc-500 font-medium">Sister</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RECENT GIFTS - Mobile: 4, Desktop: Row 3 Left */}
        <section className="order-4 lg:order-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-zinc-900">Recent Gifts</h2>
            <Button asChild variant="ghost" className="text-sm h-8 px-3 font-medium text-zinc-600 rounded-full hover:bg-zinc-100"><Link href="/products">View all</Link></Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="shadow-sm border-zinc-200">
              <CardContent className="p-4 flex gap-4">
                <div className="w-20 h-20 bg-zinc-100 rounded-lg relative overflow-hidden flex-shrink-0 border border-zinc-100">
                  <Image src="/placeholder.svg?height=160&width=160" alt="Recent gift" fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 line-clamp-1">Luxury Spa Hamper</h4>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">Sent to Sarah • 2 mos ago</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button asChild variant="outline" size="sm" className="h-7 text-xs px-2 w-full rounded-full font-medium"><Link href="/cart">Reorder</Link></Button>
                    <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2 w-full bg-zinc-50 rounded-full font-medium"><Link href="/ai-recommendations">Similar</Link></Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-zinc-200">
              <CardContent className="p-4 flex gap-4">
                <div className="w-20 h-20 bg-zinc-100 rounded-lg relative overflow-hidden flex-shrink-0 border border-zinc-100">
                  <Image src="/placeholder.svg?height=160&width=160" alt="Recent gift" fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 line-clamp-1">Artisan Chocolates</h4>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">Sent to Mark • 5 mos ago</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button asChild variant="outline" size="sm" className="h-7 text-xs px-2 w-full rounded-full font-medium"><Link href="/cart">Reorder</Link></Button>
                    <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2 w-full bg-zinc-50 rounded-full font-medium"><Link href="/ai-recommendations">Similar</Link></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* EVERYDAY MOMENTS - Mobile: 5, Desktop: Row 3 Right */}
        <section className="order-5 lg:order-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-zinc-900">Everyday Moments</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Link href="/occasions/thinking-of-you">
              <Badge variant="outline" className="px-4 py-2 rounded-full hover:bg-zinc-100 cursor-pointer font-medium border-zinc-200 text-sm">
                Thinking of You
              </Badge>
            </Link>
            <Link href="/occasions/get-well-soon">
              <Badge variant="outline" className="px-4 py-2 rounded-full hover:bg-zinc-100 cursor-pointer font-medium border-zinc-200 text-sm">
                Get Well Soon
              </Badge>
            </Link>
            <Link href="/categories/just-because">
              <Badge variant="outline" className="px-4 py-2 rounded-full hover:bg-zinc-100 cursor-pointer font-medium border-zinc-200 text-sm">
                Just Because
              </Badge>
            </Link>
            <Link href="/categories/cheer-up">
              <Badge variant="outline" className="px-4 py-2 rounded-full hover:bg-zinc-100 cursor-pointer font-medium border-zinc-200 text-sm">
                Cheer Someone Up
              </Badge>
            </Link>
            <Link href="/categories/self-care">
              <Badge variant="outline" className="px-4 py-2 rounded-full hover:bg-zinc-100 cursor-pointer font-medium border-zinc-200 text-sm">
                Self-Care
              </Badge>
            </Link>
          </div>
        </section>

        {/* SAVED IDEAS - Mobile: 6, Desktop: Row 4 Right */}
        <section className="order-6 lg:order-6 lg:col-start-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-zinc-900">Saved Ideas</h2>
            <Button asChild variant="ghost" size="sm" className="h-8 px-3 text-xs font-medium text-zinc-600 rounded-full hover:bg-zinc-100"><Link href="/products">See all</Link></Button>
          </div>
          
          <Card className="shadow-sm border-zinc-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-zinc-100 rounded-lg relative overflow-hidden flex-shrink-0 border border-zinc-100">
                  <Image src="/placeholder.svg?height=128&width=128" alt="Saved item" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 line-clamp-1">Premium Coffee Set</h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">Saved for James</p>
                  <p className="text-sm font-bold mt-1 text-zinc-900">$45.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}
