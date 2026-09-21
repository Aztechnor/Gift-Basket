import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AIChatAssistant } from "@/components/ai-chat-assistant"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GiftBasket - AI-Powered Gift Curation",
  description: "Find the perfect gift for every occasion with our AI-powered recommendations",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://giftbasket.vercel.app"),
  generator: "GiftBasket",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "GiftBasket - AI-Powered Gift Curation",
    description: "Find the perfect gift for every occasion with our AI-powered recommendations",
    url: "/",
    siteName: "GiftBasket",
  },
  twitter: {
    card: "summary_large_image",
    title: "GiftBasket - AI-Powered Gift Curation",
    description: "Find the perfect gift for every occasion with our AI-powered recommendations",
  },
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
