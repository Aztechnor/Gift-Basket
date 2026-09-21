import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function StorefrontShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/50 selection:bg-zinc-100">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
