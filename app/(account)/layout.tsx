import type { ReactNode } from "react"
import { StorefrontShell } from "@/components/storefront-shell"

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <StorefrontShell>{children}</StorefrontShell>
}
