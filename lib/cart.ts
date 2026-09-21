export type CartProduct = {
  id: number
  name: string
  price: number
  image: string
  category?: string
  quantity?: number
}

const CART_KEY = "giftbasket-cart"
const CART_UPDATED_EVENT = "giftbasket-cart-updated"

function notifyCartUpdated(count: number) {
  if (typeof window === "undefined") return

  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: { count } }))
}

export function readCart(): CartProduct[] {
  if (typeof window === "undefined") return []

  try {
    const stored = window.localStorage.getItem(CART_KEY)
    return stored ? (JSON.parse(stored) as CartProduct[]) : []
  } catch {
    return []
  }
}

export function getCartCount(): number {
  return readCart().reduce((total, item) => total + (item.quantity ?? 1), 0)
}

export function addToCart(product: CartProduct, quantity = 1): number {
  if (typeof window === "undefined") return 0

  const current = readCart()
  const productIndex = current.findIndex((item) => item.id === product.id)

  if (productIndex >= 0) {
    current[productIndex].quantity = (current[productIndex].quantity ?? 1) + quantity
  } else {
    current.push({ ...product, quantity })
  }

  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(current))
    const count = getCartCount()
    notifyCartUpdated(count)
    return count
  } catch {
    return getCartCount()
  }
}

export function addMultipleToCart(products: CartProduct[]): number {
  if (!products.length) return getCartCount()

  const current = readCart()

  for (const product of products) {
    const index = current.findIndex((item) => item.id === product.id)
    const qty = product.quantity ?? 1

    if (index >= 0) {
      current[index].quantity = (current[index].quantity ?? 1) + qty
    } else {
      current.push({ ...product, quantity: qty })
    }
  }

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(current))
      notifyCartUpdated(getCartCount())
    } catch {
      return getCartCount()
    }
  }

  return getCartCount()
}

export function clearCart(): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.removeItem(CART_KEY)
    notifyCartUpdated(0)
  } catch {
    return
  }
}
