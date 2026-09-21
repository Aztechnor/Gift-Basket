"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const ADMIN_AUTH_KEY = "giftbasket-admin-auth"

type AdminAuthContextValue = {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const value = window.localStorage.getItem(ADMIN_AUTH_KEY)
    setIsAuthenticated(value === "true")
  }, [])

  const login = (email: string, password: string) => {
    const valid = email.trim().toLowerCase() === "admin@giftbasket.com" && password === "giftbasket123"
    if (valid) {
      window.localStorage.setItem(ADMIN_AUTH_KEY, "true")
      setIsAuthenticated(true)
    }
    return valid
  }

  const logout = () => {
    window.localStorage.removeItem(ADMIN_AUTH_KEY)
    setIsAuthenticated(false)
  }

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated])

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider")
  }

  return context
}
