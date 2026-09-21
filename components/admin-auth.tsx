"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

type AdminAuthContextValue = {
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  logout: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    const supabase = createSupabaseBrowserClient()

    const checkAdmin = async (userId: string | undefined) => {
      if (!userId) {
        if (active) {
          setIsAuthenticated(false)
          setIsLoading(false)
        }
        return
      }

      const { data } = await supabase.from("profiles").select("role").eq("id", userId).single()
      if (active) {
        setIsAuthenticated(data?.role === "admin")
        setIsLoading(false)
      }
    }

    void supabase.auth.getUser().then(({ data }) => checkAdmin(data.user?.id))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      void checkAdmin(session?.user.id)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        return { error: "Invalid email or password" }
      }

      return {}
    } catch {
      return { error: "Authentication is not configured" }
    }
  }

  const logout = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
  }

  const value = useMemo(() => ({ isAuthenticated, isLoading, login, logout }), [isAuthenticated, isLoading])

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider")
  }

  return context
}
