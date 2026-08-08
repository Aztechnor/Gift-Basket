"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Inventory",
      url: "/admin/dashboard/inventory",
      icon: Package,
    },
    {
      title: "Orders",
      url: "/admin/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-16 flex items-center justify-center border-b">
        <div className="flex items-center gap-2 font-bold text-lg text-zinc-900 w-full px-4">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <span>Admin Portal</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="mt-4 px-2 space-y-1">
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                className={pathname === item.url ? "bg-zinc-100 font-medium" : "text-zinc-500 hover:text-zinc-900"}
              >
                <Link href={item.url}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-zinc-500 hover:text-zinc-900">
              <Link href="/admin">
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
