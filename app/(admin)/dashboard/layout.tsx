import * as React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
            <SidebarTrigger className="-ml-1" />
            <div className="w-full flex justify-between items-center">
              <h1 className="font-semibold text-lg text-zinc-900 hidden sm:block">Dashboard</h1>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                <span className="text-sm font-medium text-zinc-600">AD</span>
              </div>
            </div>
          </header>
          <main className="p-4 sm:p-6 lg:p-8 bg-zinc-50/50 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
