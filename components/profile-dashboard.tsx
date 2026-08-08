"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Package, CalendarHeart, Settings, Camera, BellRing, BellOff, Heart, Users, CreditCard, Shield, Plus, Sparkles, User, RefreshCw, X } from "lucide-react"

export function ProfileDashboard() {
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg?height=100&width=100")
  const [activeTab, setActiveTab] = useState("overview")

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setAvatarUrl(url)
    }
  }

  const handleRemoveAvatar = () => {
    setAvatarUrl("")
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 bg-zinc-50 rounded-[2rem] p-8 border border-zinc-200/50 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 z-10">
          <div className="relative group">
            <Avatar className="w-28 h-28 border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src={avatarUrl} alt="Sarah" className="object-cover" />
              <AvatarFallback className="text-3xl bg-zinc-200 text-zinc-700 font-medium">S</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full cursor-pointer" onClick={() => document.getElementById('avatar-upload')?.click()}>
              <Camera className="w-6 h-6 text-white mb-1" />
              <span className="text-[10px] text-white font-medium">Change</span>
            </div>
            {avatarUrl && (
              <button onClick={handleRemoveAvatar} className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-zinc-200 text-zinc-500 hover:text-red-500 transition-colors z-20" aria-label="Remove photo">
                <X className="w-4 h-4" />
              </button>
            )}
            <input 
              type="file" 
              id="avatar-upload" 
              className="hidden" 
              accept="image/png, image/jpeg, image/webp" 
              onChange={handleAvatarChange}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Good morning, Sarah.</h1>
            <p className="text-lg text-zinc-600 mt-1">Who are we thinking about today?</p>
          </div>
        </div>
        <div className="flex items-center gap-3 z-10">
          <Button variant="outline" size="icon" className="rounded-full bg-white shadow-sm border-zinc-200 relative">
            <BellRing className="w-4 h-4 text-zinc-700" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </Button>
          <Button variant="outline" className="rounded-full bg-white shadow-sm border-zinc-200 font-medium" onClick={() => setActiveTab('settings')}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="grid md:grid-cols-[250px_1fr] gap-8">
          <div className="space-y-6">
            <TabsList className="flex flex-col h-auto bg-transparent space-y-1 p-0">
              <TabsTrigger value="overview" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl w-full text-base font-medium">
                <Package className="w-5 h-5 mr-3 text-zinc-500" /> Overview
              </TabsTrigger>
              <TabsTrigger value="people" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl w-full text-base font-medium">
                <Users className="w-5 h-5 mr-3 text-zinc-500" /> People I Gift
              </TabsTrigger>
              <TabsTrigger value="reminders" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl w-full text-base font-medium">
                <CalendarHeart className="w-5 h-5 mr-3 text-zinc-500" /> Occasion Reminders
              </TabsTrigger>
              <TabsTrigger value="orders" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl w-full text-base font-medium">
                <Package className="w-5 h-5 mr-3 text-zinc-500" /> My Orders
              </TabsTrigger>
              <TabsTrigger value="saved" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl w-full text-base font-medium">
                <Heart className="w-5 h-5 mr-3 text-zinc-500" /> Saved Gifts
              </TabsTrigger>
              <TabsTrigger value="addresses" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl w-full text-base font-medium">
                <MapPin className="w-5 h-5 mr-3 text-zinc-500" /> Addresses
              </TabsTrigger>
              <TabsTrigger value="preferences" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl w-full text-base font-medium">
                <Settings className="w-5 h-5 mr-3 text-zinc-500" /> Preferences
              </TabsTrigger>
              <TabsTrigger value="settings" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl w-full text-base font-medium">
                <Shield className="w-5 h-5 mr-3 text-zinc-500" /> Account & Security
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-6">
            <TabsContent value="overview" className="mt-0 outline-none space-y-6">
              <OverviewTab />
            </TabsContent>
            
            <TabsContent value="people" className="mt-0 outline-none space-y-6">
              <PeopleTab />
            </TabsContent>

            <TabsContent value="reminders" className="mt-0 outline-none space-y-6">
              <RemindersTab />
            </TabsContent>

            <TabsContent value="orders" className="mt-0 outline-none space-y-6">
              <OrdersTab />
            </TabsContent>

            <TabsContent value="saved" className="mt-0 outline-none space-y-6">
               <SavedGiftsTab />
            </TabsContent>

            <TabsContent value="addresses" className="mt-0 outline-none space-y-6">
               <AddressesTab />
            </TabsContent>

            <TabsContent value="preferences" className="mt-0 outline-none space-y-6">
               <PreferencesTab />
            </TabsContent>

            <TabsContent value="settings" className="mt-0 outline-none space-y-6">
               <AccountSettingsTab />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

function OverviewTab() {
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border border-zinc-200/50 shadow-sm bg-white">
          <CardHeader className="pb-4 border-b border-zinc-100">
            <CardTitle className="text-xl font-bold text-zinc-900 flex items-center">
              <CalendarHeart className="w-5 h-5 mr-2 text-zinc-400" />
              Coming Up
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-100">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🎂</div>
                    <div>
                      <h4 className="font-bold text-lg text-zinc-900">James' birthday</h4>
                      <p className="text-zinc-600 font-medium">12 October</p>
                      <Badge variant="secondary" className="mt-2 bg-amber-100 text-amber-800 border-0 font-semibold">18 days away</Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl h-10 w-full sm:w-auto">Find a Gift</Button>
                  <Button variant="outline" className="rounded-xl h-10 w-full sm:w-auto"><Sparkles className="w-4 h-4 mr-2" /> Ask AI</Button>
                </div>
              </div>
              <div className="p-6 bg-zinc-50/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">💐</div>
                    <div>
                      <h4 className="font-bold text-lg text-zinc-900">Mum's anniversary</h4>
                      <p className="text-zinc-600 font-medium">24 October</p>
                      <Badge variant="secondary" className="mt-2 bg-zinc-100 text-zinc-800 border-0 font-semibold">30 days away</Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="rounded-xl h-10 w-full sm:w-auto">Choose a Gift</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/50 shadow-sm bg-white">
          <CardHeader className="pb-4 border-b border-zinc-100">
            <CardTitle className="text-xl font-bold text-zinc-900 flex items-center">
              <Package className="w-5 h-5 mr-2 text-zinc-400" />
              My Gifting History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-100">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                      <img src={`/placeholder.svg?height=100&width=100&text=Gift`} className="object-cover w-full h-full" alt="Gift" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-500 mb-1">{i === 1 ? 'Sent to Brian' : 'Sent to Aisha'}</p>
                      <h4 className="font-bold text-zinc-900">Gourmet Coffee Blend</h4>
                      <p className="text-sm text-zinc-500 mt-1">Mar 14, 2026 • KSh 3,500</p>
                    </div>
                  </div>
                  <Button variant="outline" className="shrink-0 rounded-xl">
                    <RefreshCw className="w-4 h-4 mr-2" /> Send again
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-zinc-200/50 shadow-sm bg-zinc-900 text-white rounded-[2rem] overflow-hidden">
        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <Sparkles className="w-8 h-8 text-zinc-400 mb-4 mx-auto md:mx-0" />
            <h3 className="text-3xl font-bold mb-3">Smart Recommendations</h3>
            <p className="text-lg text-zinc-400">Not sure what to get James for his birthday? Let our AI suggest something perfect based on his interests and your budget.</p>
          </div>
          <Button className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-8 h-14 font-medium text-lg w-full md:w-auto shrink-0 shadow-sm">
            Find the Perfect Gift
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

function PeopleTab() {
  return (
    <Card className="border border-zinc-200/50 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-100">
        <div>
          <CardTitle className="text-2xl font-bold">People I Gift</CardTitle>
          <CardDescription className="text-base mt-1">Manage the important people in your life.</CardDescription>
        </div>
        <Button className="bg-zinc-900 text-white rounded-full font-medium"><Plus className="w-4 h-4 mr-2" /> Add Person</Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="border border-zinc-200/50 rounded-2xl p-6 bg-zinc-50/50 hover:bg-white transition-colors cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-xl">J</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-xl font-bold text-zinc-900">James</h4>
                <p className="text-zinc-500 font-medium">Partner</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Birthday</span>
                <span className="font-medium text-zinc-900">Oct 12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Likes</span>
                <span className="font-medium text-zinc-900">Food, Experiences</span>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl group-hover:border-zinc-300">View Profile</Button>
          </div>

          <div className="border border-zinc-200/50 rounded-2xl p-6 bg-zinc-50/50 hover:bg-white transition-colors cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                <AvatarFallback className="bg-rose-100 text-rose-700 font-bold text-xl">M</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-xl font-bold text-zinc-900">Mom</h4>
                <p className="text-zinc-500 font-medium">Mother</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Birthday</span>
                <span className="font-medium text-zinc-900">Aug 18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Likes</span>
                <span className="font-medium text-zinc-900">Flowers, Spa</span>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl group-hover:border-zinc-300">View Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RemindersTab() {
  return (
    <Card className="border border-zinc-200/50 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-100">
        <div>
          <CardTitle className="text-2xl font-bold">Occasion Reminders</CardTitle>
          <CardDescription className="text-base mt-1">Never miss an important date.</CardDescription>
        </div>
        <Button className="bg-zinc-900 text-white rounded-full font-medium"><Plus className="w-4 h-4 mr-2" /> New Reminder</Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-zinc-100">
          <div className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-2xl">🎂</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-zinc-900">James' Birthday</h4>
                <p className="text-zinc-500 font-medium mt-1">Oct 12 • Reminding 14 days before</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 font-medium border-0">Budget: KSh 5k-8k</Badge>
                  <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 font-medium border-0">Email + Push</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <Switch defaultChecked />
              <Button variant="outline" className="rounded-xl">Edit</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function OrdersTab() {
  return (
    <Card className="border border-zinc-200/50 shadow-sm bg-white">
      <CardHeader className="pb-4 border-b border-zinc-100">
        <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
        <CardDescription className="text-base mt-1">View your order history and track deliveries.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center py-12">
           <Package className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
           <h4 className="text-lg font-bold text-zinc-900">No recent orders</h4>
           <p className="text-zinc-500 mt-2">When you send gifts, they'll appear here.</p>
        </div>
      </CardContent>
    </Card>
  )
}

function SavedGiftsTab() {
  return (
    <Card className="border border-zinc-200/50 shadow-sm bg-white">
      <CardHeader className="pb-4 border-b border-zinc-100">
        <CardTitle className="text-2xl font-bold">Saved Gifts</CardTitle>
        <CardDescription className="text-base mt-1">Gifts you've liked or saved for later.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center py-12">
           <Heart className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
           <h4 className="text-lg font-bold text-zinc-900">Your wishlist is empty</h4>
           <p className="text-zinc-500 mt-2">Heart items while browsing to save them here.</p>
        </div>
      </CardContent>
    </Card>
  )
}

function AddressesTab() {
  return (
    <Card className="border border-zinc-200/50 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-100">
        <div>
          <CardTitle className="text-2xl font-bold">Addresses</CardTitle>
          <CardDescription className="text-base mt-1">Manage delivery locations.</CardDescription>
        </div>
        <Button className="bg-zinc-900 text-white rounded-full font-medium"><Plus className="w-4 h-4 mr-2" /> Add New</Button>
      </CardHeader>
      <CardContent className="p-6 grid sm:grid-cols-2 gap-6">
        <div className="border-2 border-zinc-900 p-6 rounded-2xl relative">
          <Badge className="absolute top-4 right-4 bg-zinc-900 text-white border-0 font-medium">Default</Badge>
          <MapPin className="w-6 h-6 mb-4 text-zinc-900" />
          <h4 className="font-bold text-zinc-900 text-lg">My Home</h4>
          <p className="text-zinc-600 mt-2 mb-6 leading-relaxed">123 Main Street<br />Nairobi, Kenya<br />+254 700 000000</p>
          <Button variant="outline" className="w-full rounded-xl">Edit</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PreferencesTab() {
  return (
    <Card className="border border-zinc-200/50 shadow-sm bg-white">
      <CardHeader className="pb-4 border-b border-zinc-100">
        <CardTitle className="text-2xl font-bold">Preferences</CardTitle>
        <CardDescription className="text-base mt-1">Tell us what you like so we can recommend better gifts.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="space-y-4">
          <h4 className="font-bold text-lg">Favourite Categories</h4>
          <div className="flex flex-wrap gap-2">
            {['Flowers', 'Chocolates', 'Experiences', 'Tech', 'Self-care', 'Custom'].map(cat => (
              <Badge key={cat} variant="outline" className="px-4 py-2 rounded-full text-sm border-zinc-200 cursor-pointer hover:bg-zinc-50">{cat}</Badge>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg">Preferred Occasions</h4>
          <div className="flex flex-wrap gap-2">
            {['Birthdays', 'Anniversaries', 'Just Because', 'Holidays', 'Corporate'].map(cat => (
              <Badge key={cat} variant="outline" className="px-4 py-2 rounded-full text-sm border-zinc-200 cursor-pointer hover:bg-zinc-50">{cat}</Badge>
            ))}
          </div>
        </div>
        <div className="space-y-4">
           <Label className="text-lg font-bold">Typical Budget</Label>
           <Select>
              <SelectTrigger className="w-full sm:w-64 h-12 rounded-xl">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under5k">Under KSh 5,000</SelectItem>
                <SelectItem value="5k10k">KSh 5,000 - 10,000</SelectItem>
                <SelectItem value="10k20k">KSh 10,000 - 20,000</SelectItem>
                <SelectItem value="over20k">Over KSh 20,000</SelectItem>
              </SelectContent>
           </Select>
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t border-zinc-100">
        <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl px-8 h-12 font-medium">Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

function AccountSettingsTab() {
  return (
    <Card className="border border-zinc-200/50 shadow-sm bg-white">
      <CardHeader className="pb-4 border-b border-zinc-100">
        <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
        <CardDescription className="text-base mt-1">Update your account details and security.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first-name" className="font-medium">First Name</Label>
            <Input id="first-name" defaultValue="Sarah" className="rounded-xl h-12 bg-zinc-50 border-zinc-200" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name" className="font-medium">Last Name</Label>
            <Input id="last-name" defaultValue="Johnson" className="rounded-xl h-12 bg-zinc-50 border-zinc-200" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium">Email Address</Label>
          <Input id="email" type="email" defaultValue="sarah@example.com" className="rounded-xl h-12 bg-zinc-50 border-zinc-200" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-medium">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="+254 700 000000" className="rounded-xl h-12 bg-zinc-50 border-zinc-200" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthday" className="font-medium">Birthday</Label>
          <Input id="birthday" type="date" className="rounded-xl h-12 bg-zinc-50 border-zinc-200" />
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t border-zinc-100 flex justify-end">
        <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl h-12 px-8 font-medium">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
