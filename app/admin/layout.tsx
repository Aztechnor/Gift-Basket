import type { Metadata } from "next"
import { AdminAuthProvider } from "@/components/admin-auth"

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
    <AdminAuthProvider>{children}</AdminAuthProvider>
  )
}
