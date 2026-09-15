import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin - GiftBasket",
  description: "Admin Dashboard for GiftBasket",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-zinc-50 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
