export type AdminOrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered"

export type AdminOrder = {
  id: string
  recipient: string
  date: string
  status: AdminOrderStatus
  amount: number
}

export type AdminInventoryItem = {
  id: number
  name: string
  price: number
  category: string
  stock: number
  status: "Active" | "Low Stock" | "Out of Stock"
}

export const defaultOrders: AdminOrder[] = [
  { id: "GFT-452391", recipient: "Jane Doe", date: "2026-08-08", status: "Pending", amount: 8500 },
  { id: "GFT-923841", recipient: "Michael Smith", date: "2026-08-07", status: "Processing", amount: 12500 },
  { id: "GFT-129482", recipient: "Sarah Jenkins", date: "2026-08-07", status: "Shipped", amount: 4200 },
  { id: "GFT-847291", recipient: "Robert Williams", date: "2026-08-06", status: "Delivered", amount: 6800 },
  { id: "GFT-592813", recipient: "Emily Chen", date: "2026-08-05", status: "Delivered", amount: 5500 },
]

export const defaultInventory: AdminInventoryItem[] = [
  { id: 1, name: "Classic Red Rose Bouquet", price: 8500, category: "Bouquets", stock: 24, status: "Active" },
  { id: 2, name: "Artisan Chocolate Truffle Box", price: 4200, category: "Edibles", stock: 15, status: "Active" },
  { id: 3, name: "Spa Day Relaxation Basket", price: 12500, category: "Baskets", stock: 8, status: "Low Stock" },
  { id: 4, name: "Get Well Soon Care Package", price: 6800, category: "Care Packages", stock: 45, status: "Active" },
  { id: 5, name: "Premium Coffee Gift Set", price: 5500, category: "Baskets", stock: 0, status: "Out of Stock" },
]

const ADMIN_ORDERS_KEY = "giftbasket-admin-orders"
const ADMIN_INVENTORY_KEY = "giftbasket-admin-inventory"

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback

  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

export function readOrders(): AdminOrder[] {
  return readStored(ADMIN_ORDERS_KEY, defaultOrders)
}

export function saveOrders(orders: AdminOrder[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(orders))
}

export function readInventory(): AdminInventoryItem[] {
  return readStored(ADMIN_INVENTORY_KEY, defaultInventory)
}

export function saveInventory(inventory: AdminInventoryItem[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(ADMIN_INVENTORY_KEY, JSON.stringify(inventory))
}

export function getInventoryStatus(stock: number): "Active" | "Low Stock" | "Out of Stock" {
  if (stock <= 0) return "Out of Stock"
  if (stock <= 10) return "Low Stock"
  return "Active"
}
