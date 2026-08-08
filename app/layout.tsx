import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AIChatAssistant } from "@/components/ai-chat-assistant"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GiftBasket - AI-Powered Gift Curation",
  description: "Find the perfect gift for every occasion with our AI-powered recommendations",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden antialiased bg-zinc-50/50`}>
        {children}
        <AIChatAssistant />
      </body>
    </html>
  )
}
