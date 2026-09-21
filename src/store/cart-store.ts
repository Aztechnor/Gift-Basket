import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem, Product } from '@/src/types'
import { generateCartItemId } from '@/src/utils'
import { DEFAULTS } from '@/src/constants'
import { toast } from 'sonner'

interface CartState {
  // State
  cart: Cart | null
  isLoading: boolean
  error: string | null
  
  // Actions
  initializeCart: () => void
  addItem: (product: Product, quantity?: number, options?: { customization?: Record<string, string>; giftMessage?: string }) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  applyDiscount: (discount: number) => void
  setShipping: (shipping: number) => void
  
  // Getters
  getItem: (itemId: string) => CartItem | undefined
  getItemQuantity: (productId: string | number) => number
  getSubtotal: () => number
  getTotal: () => number
  getItemCount: () => number
  hasItem: (productId: string | number) => boolean
}

const initialCart: Cart = {
  id: DEFAULTS.CART_ID,
  items: [],
  subtotal: 0,
  discount: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  currency: DEFAULTS.CURRENCY,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initialize state
      cart: null,
      isLoading: false,
      error: null,
      
      // Initialize cart (load or create new)
      initializeCart: () => {
        const existingCart = get().cart
        if (!existingCart) {
          set({ cart: initialCart })
        }
      },
      
      // Add item to cart
      addItem: (product, quantity = 1, options = {}) => {
        const { customization, giftMessage } = options
        const { cart } = get()
        
        if (!cart) {
          set({ cart: initialCart })
          return get().addItem(product, quantity, options)
        }
        
        // Check if product already in cart
        const existingItem = cart.items.find((item) => item.productId === product.id)
        
        if (existingItem) {
          // Update quantity if exists
          get().updateQuantity(existingItem.id, existingItem.quantity + quantity)
          toast.info(`${product.name} quantity updated in cart`)
        } else {
          // Add new item
          const newItem: CartItem = {
            id: generateCartItemId(),
            product,
            productId: product.id,
            quantity,
            price: product.price,
            total: product.price * quantity,
            customization,
            giftMessage,
          }
          
          const updatedCart = {
            ...cart,
            items: [...cart.items, newItem],
            subtotal: cart.subtotal + newItem.total,
            updatedAt: new Date(),
          }
          
          set({ cart: updatedCart })
          toast.success(`${product.name} added to cart`)
        }
      },
      
      // Remove item from cart
      removeItem: (itemId) => {
        const { cart } = get()
        
        if (!cart) return
        
        const item = cart.items.find((i) => i.id === itemId)
        if (!item) return
        
        const updatedItems = cart.items.filter((i) => i.id !== itemId)
        const newSubtotal = cart.subtotal - item.total
        
        const updatedCart = {
          ...cart,
          items: updatedItems,
          subtotal: newSubtotal,
          updatedAt: new Date(),
        }
        
        set({ cart: updatedCart })
        toast.success(`${item.product.name} removed from cart`)
      },
      
      // Update item quantity
      updateQuantity: (itemId, quantity) => {
        const { cart } = get()
        
        if (!cart) return
        
        const itemIndex = cart.items.findIndex((i) => i.id === itemId)
        if (itemIndex === -1) return
        
        const item = cart.items[itemIndex]
        const oldTotal = item.total
        const newTotal = item.price * quantity
        
        const updatedItems = [...cart.items]
        updatedItems[itemIndex] = {
          ...item,
          quantity: Math.max(1, quantity),
          total: newTotal,
        }
        
        const updatedCart = {
          ...cart,
          items: updatedItems,
          subtotal: cart.subtotal - oldTotal + newTotal,
          updatedAt: new Date(),
        }
        
        set({ cart: updatedCart })
        toast.info(`${item.product.name} quantity updated to ${quantity}`)
      },
      
      // Clear cart
      clearCart: () => {
        set({ cart: initialCart })
        toast.success('Cart cleared')
      },
      
      // Apply discount
      applyDiscount: (discount) => {
        const { cart } = get()
        
        if (!cart) return
        
        set({
          cart: {
            ...cart,
            discount,
            updatedAt: new Date(),
          },
        })
        toast.success(`Discount of KSh ${discount} applied`)
      },
      
      // Set shipping cost
      setShipping: (shipping) => {
        const { cart } = get()
        
        if (!cart) return
        
        set({
          cart: {
            ...cart,
            shipping,
            updatedAt: new Date(),
          },
        })
      },
      
      // Get item by ID
      getItem: (itemId) => {
        const { cart } = get()
        return cart?.items.find((i) => i.id === itemId)
      },
      
      // Get quantity of product in cart
      getItemQuantity: (productId) => {
        const { cart } = get()
        const item = cart?.items.find((i) => i.productId === productId)
        return item?.quantity || 0
      },
      
      // Get cart subtotal
      getSubtotal: () => {
        const { cart } = get()
        return cart?.subtotal || 0
      },
      
      // Get cart total
      getTotal: () => {
        const { cart } = get()
        if (!cart) return 0
        
        const subtotal = cart.subtotal
        const tax = subtotal * DEFAULTS.TAX_RATE
        const shipping = cart.shipping
        const discount = cart.discount
        
        return subtotal + tax + shipping - discount
      },
      
      // Get total item count
      getItemCount: () => {
        const { cart } = get()
        return cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0
      },
      
      // Check if product is in cart
      hasItem: (productId) => {
        const { cart } = get()
        return cart?.items.some((i) => i.productId === productId) || false
      },
    }),
    {
      name: 'giftbasket-cart-storage',
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
)

// Selector hooks for better performance
export const useCartItems = () => useCartStore((state) => state.cart?.items || [])
export const useCartItemCount = () => useCartStore((state) => state.getItemCount())
export const useCartSubtotal = () => useCartStore((state) => state.getSubtotal())
export const useCartTotal = () => useCartStore((state) => state.getTotal())
export const useHasItem = (productId: string | number) => 
  useCartStore((state) => state.hasItem(productId))
export const useItemQuantity = (productId: string | number) =>
  useCartStore((state) => state.getItemQuantity(productId))
