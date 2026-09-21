"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Phone, CreditCard, CheckCircle, Loader2, ArrowRight, ArrowLeft, Gift, MessageSquare, MapPin, Search, Calendar } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

interface CheckoutFormProps {
  paymentMethod: "mpesa" | "card" | ""
  setPaymentMethod: (method: "mpesa" | "card" | "") => void
}

const STEPS = [
  "Your Details",
  "Recipient",
  "Gift Message",
  "Delivery",
  "Review",
  "Payment",
]

// Mock cart items (shared logic just for display)
const cartItems = [
  {
    id: 1,
    name: "Classic Red Rose Bouquet",
    price: 8500,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Artisan Chocolate Truffle Box",
    price: 4500,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function CheckoutForm({ paymentMethod, setPaymentMethod }: CheckoutFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")

  // Form states
  const [yourDetails, setYourDetails] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [recipient, setRecipient] = useState({ type: "new", name: "", phone: "" })
  const [message, setMessage] = useState({ to: "", from: "", content: "" })
  const [delivery, setDelivery] = useState({ type: "new", address: "", city: "", date: "", instructions: "", isSurprise: false })

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePayment = async () => {
    if (!paymentMethod) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  if (isComplete) {
    return (
      <Card className="border-emerald-100 bg-emerald-50/30 overflow-hidden shadow-lg shadow-emerald-100/50">
        <CardContent className="pt-12 pb-12 px-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-emerald-950 mb-3">Your gift is on its way.</h2>
          <p className="text-emerald-700/80 mb-8 max-w-md">
            Order reference <span className="font-semibold text-emerald-900">#GFT-{Math.floor(100000 + Math.random() * 900000)}</span>. We've sent a confirmation email to you.
          </p>
          
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 text-left mb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-500 mb-1">Recipient</p>
                <p className="text-sm font-semibold text-zinc-900">{recipient.name || "Sarah (Partner)"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 mb-1">Delivery Date</p>
                <p className="text-sm font-semibold text-zinc-900">{delivery.date || "Oct 12, 2026"}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Gift Preview</p>
              <div className="flex -space-x-3 mt-2">
                {cartItems.map((item, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-zinc-100 relative z-10">
                     <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500 relative z-0">
                  +{cartItems.length}
                </div>
              </div>
            </div>
            <div>
               <p className="text-sm font-medium text-zinc-500 mb-1">Message</p>
               <p className="text-sm text-zinc-700 italic border-l-2 border-emerald-200 pl-3 py-1">"{message.content || "Happy Anniversary! I love you."}"</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-md">
             <Button variant="outline" className="w-full h-12 rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50">
               Track Order Status
             </Button>
             <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md">
               <Calendar className="w-4 h-4 mr-2" />
               Add this occasion to reminders
             </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress indicators */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4 scrollbar-hide">
        {STEPS.map((step, index) => (
          <div key={index} className="flex items-center min-w-max">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold transition-colors
              ${currentStep === index ? 'border-purple-600 bg-purple-600 text-white' : 
                currentStep > index ? 'border-purple-600 text-purple-600 bg-purple-50' : 'border-zinc-200 text-zinc-400 bg-white'}`}
            >
              {currentStep > index ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${currentStep === index ? 'text-purple-900' : currentStep > index ? 'text-purple-600' : 'text-zinc-400'}`}>
              {step}
            </span>
            {index < STEPS.length - 1 && (
              <div className={`w-8 sm:w-12 h-px mx-2 sm:mx-4 ${currentStep > index ? 'bg-purple-200' : 'bg-zinc-200'}`} />
            )}
          </div>
        ))}
      </div>

      <Card className="border-zinc-200 overflow-hidden shadow-sm">
        <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
          <CardTitle className="text-xl">{STEPS[currentStep]}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          
          {/* STEP 1: YOUR DETAILS */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-sm text-zinc-500 mb-4">Tell us who is placing the order. We'll send the receipt and updates to you.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={yourDetails.firstName} onChange={(e) => setYourDetails({...yourDetails, firstName: e.target.value})} placeholder="Your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={yourDetails.lastName} onChange={(e) => setYourDetails({...yourDetails, lastName: e.target.value})} placeholder="Your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={yourDetails.email} onChange={(e) => setYourDetails({...yourDetails, email: e.target.value})} placeholder="We'll send the receipt here" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={yourDetails.phone} onChange={(e) => setYourDetails({...yourDetails, phone: e.target.value})} placeholder="Your phone number" />
              </div>
            </div>
          )}

          {/* STEP 2: RECIPIENT */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-sm text-zinc-500 mb-4">Who is the lucky person receiving this gift?</p>
              
              <RadioGroup value={recipient.type} onValueChange={(v) => setRecipient({...recipient, type: v})} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className={`border rounded-xl p-4 cursor-pointer transition-all ${recipient.type === 'saved' ? 'border-purple-600 ring-1 ring-purple-600 bg-purple-50/50' : 'border-zinc-200 hover:border-zinc-300'}`}>
                  <RadioGroupItem value="saved" id="rec-saved" className="sr-only" />
                  <Label htmlFor="rec-saved" className="cursor-pointer flex flex-col h-full">
                    <span className="font-semibold text-zinc-900 mb-1">Saved Person</span>
                    <span className="text-xs text-zinc-500">Choose from your connections</span>
                  </Label>
                </div>
                <div className={`border rounded-xl p-4 cursor-pointer transition-all ${recipient.type === 'new' ? 'border-purple-600 ring-1 ring-purple-600 bg-purple-50/50' : 'border-zinc-200 hover:border-zinc-300'}`}>
                  <RadioGroupItem value="new" id="rec-new" className="sr-only" />
                  <Label htmlFor="rec-new" className="cursor-pointer flex flex-col h-full">
                    <span className="font-semibold text-zinc-900 mb-1">New Recipient</span>
                    <span className="text-xs text-zinc-500">Enter their details manually</span>
                  </Label>
                </div>
              </RadioGroup>

              {recipient.type === 'saved' ? (
                <div className="space-y-4">
                  <div className="relative">
                     <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                     <Input placeholder="Search your connections..." className="pl-9" />
                  </div>
                  <div className="border border-zinc-200 rounded-lg p-3 flex items-center justify-between hover:bg-zinc-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold">S</div>
                      <div>
                        <p className="font-semibold text-zinc-900 text-sm">Sarah Ndung'u</p>
                        <p className="text-xs text-zinc-500">Partner</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Select</Button>
                  </div>
                  <div className="border border-zinc-200 rounded-lg p-3 flex items-center justify-between hover:bg-zinc-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">M</div>
                      <div>
                        <p className="font-semibold text-zinc-900 text-sm">Mom</p>
                        <p className="text-xs text-zinc-500">Family</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Select</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recName">Recipient's Full Name</Label>
                    <Input id="recName" value={recipient.name} onChange={(e) => setRecipient({...recipient, name: e.target.value})} placeholder="e.g. Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recPhone">Recipient's Phone Number (Optional)</Label>
                    <Input id="recPhone" value={recipient.phone} onChange={(e) => setRecipient({...recipient, phone: e.target.value})} placeholder="For delivery coordination" />
                    <p className="text-xs text-zinc-500">Don't worry, we won't ruin the surprise if you ask us not to.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: GIFT MESSAGE */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-zinc-500">Add a personal touch with a printed card.</p>
                <div className="flex items-center gap-2">
                   <Button variant="outline" size="sm" className="h-8 text-xs"><MessageSquare className="w-3 h-3 mr-1" /> Use AI Suggestion</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="msgTo">To</Label>
                  <Input id="msgTo" value={message.to} onChange={(e) => setMessage({...message, to: e.target.value})} placeholder={`e.g. ${recipient.name || "Jane"}`} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="msgFrom">From</Label>
                  <Input id="msgFrom" value={message.from} onChange={(e) => setMessage({...message, from: e.target.value})} placeholder={`e.g. ${yourDetails.firstName || "John"}`} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="msgContent">Message</Label>
                <Textarea 
                  id="msgContent" 
                  value={message.content} 
                  onChange={(e) => setMessage({...message, content: e.target.value})} 
                  placeholder="Write your heartfelt message here..." 
                  className="h-32 resize-none"
                />
                <p className="text-xs text-zinc-500 text-right">{message.content.length}/250 characters</p>
              </div>
            </div>
          )}

          {/* STEP 4: DELIVERY */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <p className="text-sm text-zinc-500 mb-4">When and where should we deliver the gift?</p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <h3 className="font-semibold text-zinc-900 border-b pb-2">Location</h3>
                   <RadioGroup value={delivery.type} onValueChange={(v) => setDelivery({...delivery, type: v})} className="flex flex-col gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="saved" id="del-saved" />
                      <Label htmlFor="del-saved">Use saved address for {recipient.name || "Recipient"}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="del-new" />
                      <Label htmlFor="del-new">Enter new address</Label>
                    </div>
                  </RadioGroup>

                  {delivery.type === 'new' && (
                    <div className="space-y-3 mt-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Street Address</Label>
                        <Input value={delivery.address} onChange={(e) => setDelivery({...delivery, address: e.target.value})} placeholder="123 Example Rd" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">City/Area</Label>
                        <Input value={delivery.city} onChange={(e) => setDelivery({...delivery, city: e.target.value})} placeholder="Nairobi" />
                      </div>
                    </div>
                  )}
                 </div>

                 <div className="space-y-4">
                   <h3 className="font-semibold text-zinc-900 border-b pb-2">Timing & Preferences</h3>
                   <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Preferred Delivery Date</Label>
                        <Input type="date" value={delivery.date} onChange={(e) => setDelivery({...delivery, date: e.target.value})} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Delivery Instructions (Optional)</Label>
                        <Input value={delivery.instructions} onChange={(e) => setDelivery({...delivery, instructions: e.target.value})} placeholder="e.g. Leave with reception" />
                      </div>
                      
                      <label className="flex items-start gap-3 mt-4 bg-purple-50 p-3 rounded-lg border border-purple-100 cursor-pointer">
                         <input type="checkbox" className="mt-1 border-purple-300 text-purple-600 focus:ring-purple-600 rounded" checked={delivery.isSurprise} onChange={(e) => setDelivery({...delivery, isSurprise: e.target.checked})} />
                         <div>
                           <p className="text-sm font-semibold text-purple-900">It's a surprise!</p>
                           <p className="text-xs text-purple-700 mt-0.5">We will not contact the recipient or reveal the sender before delivery.</p>
                         </div>
                      </label>
                   </div>
                 </div>
               </div>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-100">
                 <h3 className="text-lg font-bold text-zinc-900 mb-4">Please verify the details below</h3>
                 
                 <div className="grid sm:grid-cols-2 gap-y-6 gap-x-8">
                   <div>
                     <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Recipient</h4>
                     <p className="text-sm font-medium text-zinc-900">{recipient.name || "Not provided"}</p>
                     <p className="text-sm text-zinc-600">{recipient.phone || "No phone provided"}</p>
                   </div>
                   
                   <div>
                     <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Delivery</h4>
                     <p className="text-sm font-medium text-zinc-900">{delivery.address || "No address"}, {delivery.city}</p>
                     <p className="text-sm text-zinc-600">On {delivery.date || "Any available date"}</p>
                     {delivery.isSurprise && <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-700 hover:bg-purple-100 border-none">Surprise Delivery</Badge>}
                   </div>

                   <div className="sm:col-span-2">
                     <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Gift Message</h4>
                     {message.content ? (
                       <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-sm relative">
                         <p className="text-sm font-serif italic text-zinc-800 text-center leading-relaxed">
                           "{message.content}"
                         </p>
                         <p className="text-xs font-medium text-zinc-500 mt-2 text-right">— {message.from || yourDetails.firstName}</p>
                       </div>
                     ) : (
                       <p className="text-sm text-zinc-500 italic">No message included.</p>
                     )}
                   </div>
                 </div>
               </div>
            </div>
          )}

          {/* STEP 6: PAYMENT */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <p className="text-sm text-zinc-500 mb-4">Choose how you want to pay for this gift.</p>
               <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "mpesa" | "card")} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-green-500 ring-1 ring-green-500 bg-green-50/50' : 'border-zinc-200 hover:border-zinc-300'}`}>
                    <RadioGroupItem value="mpesa" id="mpesa" className="sr-only" />
                    <Label htmlFor="mpesa" className="cursor-pointer flex items-center h-full">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 text-green-600">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">M-Pesa</p>
                        <p className="text-xs text-zinc-500">Pay using mobile money</p>
                      </div>
                    </Label>
                  </div>
                  <div className={`border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/50' : 'border-zinc-200 hover:border-zinc-300'}`}>
                    <RadioGroupItem value="card" id="card" className="sr-only" />
                    <Label htmlFor="card" className="cursor-pointer flex items-center h-full">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">Card</p>
                        <p className="text-xs text-zinc-500">Credit or debit card</p>
                      </div>
                    </Label>
                  </div>
               </RadioGroup>

               {paymentMethod === "mpesa" && (
                <div className="space-y-4 border-t border-zinc-100 pt-4 mt-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="space-y-2">
                    <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                    <Input
                      id="mpesaPhone"
                      placeholder="e.g. 07XX XXX XXX"
                      value={phoneNumber || yourDetails.phone}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-xs text-zinc-500">
                      An STK push will be sent to this number. Enter your PIN to complete the payment.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-4 border-t border-zinc-100 pt-4 mt-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="XXX" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-100">
             <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0 || isProcessing} className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl px-6">
                {currentStep > 0 ? (
                  <>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </>
                ) : 'Cancel'}
             </Button>

             {currentStep < STEPS.length - 1 ? (
                <Button onClick={handleNext} className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-8 shadow-sm">
                  Continue to {STEPS[currentStep + 1]} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
             ) : (
                <Button 
                  onClick={handlePayment} 
                  disabled={!paymentMethod || isProcessing}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl px-8 shadow-md"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing Payment
                    </>
                  ) : (
                    <>
                      Pay {formatCurrency(21470)}
                    </>
                  )}
                </Button>
             )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
