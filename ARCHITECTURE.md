# GiftBasket - Improved Architecture & Structure

## Overview

This document describes the improved architecture, structure, and implementation for the GiftBasket e-commerce platform. The improvements focus on:

- **Better Code Organization** - Clear folder structure and separation of concerns
- **Proper State Management** - Zustand-based state management
- **Type Safety** - Comprehensive TypeScript types and interfaces
- **Reusable Components** - Consistent design system and UI components
- **Improved AI Integration** - Modular AI service with better error handling
- **Enhanced UX** - Better loading states, error handling, and accessibility

## Project Structure

```
/src
├── /config              # Application configuration
│   └── site.ts         # Site-wide configuration (name, theme, features, etc.)
│
├── /constants          # Static constants and configuration
│   └── index.ts        # All constants (occasions, categories, budget ranges, etc.)
│
├── /hooks              # Custom React hooks
│   └── index.ts        # Hook exports
│
├── /lib                # Library utilities and legacy code
│
├── /services           # Business logic and API services
│   └── ai-service.ts   # AI service with recommendations and chat
│
├── /store              # Zustand state management stores
│   ├── index.ts        # Store exports
│   ├── cart-store.ts   # Cart state management
│   ├── chat-store.ts   # AI chat state management
│   ├── ui-store.ts     # UI state (modals, theme, loading, etc.)
│   └── user-store.ts   # User authentication and preferences
│
├── /types              # TypeScript type definitions
│   └── index.ts        # All type definitions
│
└── /utils              # Utility functions and helpers
    └── index.ts        # All utility functions

/app
├── (account)           # Account-related pages
├── (admin)            # Admin dashboard pages
├── (marketing)        # Marketing and content pages
├── (shop)             # Shopping-related pages
├── api                # API routes
└── layout.tsx         # Root layout

/components
├── /ui                # Reusable UI components (shadcn/ui)
└── *.tsx              # Custom components

/styles
└── globals.css        # Global styles

public/                # Static assets
```

## Key Improvements

### 1. Architecture Pattern

The application now follows a **Feature-based Modular Architecture** with clear separation of concerns:

- **Presentation Layer** (`/app`, `/components`) - UI components and pages
- **Application Layer** (`/store`) - State management with Zustand
- **Domain Layer** (`/services`) - Business logic and external integrations
- **Infrastructure Layer** (`/utils`, `/config`, `/constants`) - Utilities and configuration

### 2. State Management (Zustand)

Replaced local state with centralized Zustand stores:

```typescript
// Cart Store
import { useCartStore } from '@/store'

// Add item to cart
const { addItem } = useCartStore()
addItem(product)

// Get cart item count
const { getItemCount } = useCartStore()
const itemCount = getItemCount()
```

**Available Stores:**
- `useCartStore()` - Cart management (add, remove, update, calculate totals)
- `useUIStore()` - UI state (modals, theme, loading, scroll)
- `useUserStore()` - User authentication and preferences
- `useChatStore()` - AI chat state and conversation management
- `useProductStore()` - Product data and filtering
- `useBasketStore()` - Basket builder functionality

### 3. Comprehensive Type System

Created a complete type system in `/src/types/index.ts`:

```typescript
// Product types
interface Product {
  id: number | string
  name: string
  price: number
  category: Category
  // ...
}

// Cart types
interface CartItem {
  id: string
  product: Product
  quantity: number
  // ...
}

// AI types
interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  suggestions?: string[]
  products?: Product[]
}

// And many more...
```

### 4. Constants and Configuration

Centralized all configuration in `/src/constants/index.ts`:

```typescript
// Occasions
const OCCASIONS: Occasion[] = [...]

// Categories
const CATEGORIES: Category[] = [...]

// Budget ranges
const BUDGET_RANGES: { value: string; label: string; min: number; max: number }[] = [...]

// Shipping methods, payment methods, etc.
```

### 5. Utility Functions

Comprehensive utility library in `/src/utils/index.ts`:

```typescript
// Formatting
formatCurrency(amount)      // "KSh 15,000"
formatRating(rating)        // "★★★★☆"
formatDate(date)            // "January 15, 2026"

// Calculations
calculateDiscount(price, originalPrice)
calculateTax(amount)
calculateShipping(total)

// Validation
isValidEmail(email)
isValidKenyanPhone(phone)

// Storage
getStorage(key, defaultValue)
setStorage(key, value)

// Arrays
groupBy(array, key)
uniqueBy(array, key)
chunk(array, size)
shuffle(array)

// And many more...
```

### 6. AI Service

Improved AI integration with `/src/services/ai-service.ts`:

```typescript
import { aiService } from '@/services/ai-service'

// Generate chat response
const response = await aiService.generateChatResponse(
  userMessage,
  chatHistory,
  context
)

// Generate recommendations
const recommendations = await aiService.generateRecommendations(context)

// Search products
const results = aiService.searchProducts('birthday gifts')

// Get featured products
const featured = aiService.getFeaturedProducts(8)
```

## UI/UX Improvements

### 1. Design System

- Consistent use of shadcn/ui components
- Unified styling with Tailwind CSS
- Better responsive design
- Improved accessibility (ARIA labels, keyboard navigation)

### 2. Loading States

- Added loading states for all async operations
- Skeleton loaders for content
- Loading spinners for buttons

### 3. Error Handling

- Comprehensive error messages
- User-friendly error notifications
- Graceful fallbacks

### 4. Chat UI Improvements

The AI chat component has been restructured:

- **Modular design** - Separated into smaller, maintainable components
- **Better state management** - Uses Zustand store
- **Responsive** - Works well on mobile and desktop
- **Accessible** - Proper ARIA labels and keyboard support
- **Performance** - Virtualized message list for long conversations

## Migration Guide

### For Existing Components

1. **Import from new locations:**
   ```typescript
   // Old
   import { cn } from '@/lib/utils'
   
   // New
   import { cn, formatCurrency, formatDate } from '@/utils'
   ```

2. **Use Zustand stores:**
   ```typescript
   // Old (local state)
   const [cart, setCart] = useState([])
   
   // New (Zustand)
   import { useCartStore } from '@/store'
   const { cart, addItem, removeItem } = useCartStore()
   ```

3. **Use constants:**
   ```typescript
   // Old
   const occasions = [...]
   
   // New
   import { OCCASIONS } from '@/constants'
   ```

4. **Use types:**
   ```typescript
   // Old
   interface Product {
     id: number
     name: string
     // ...
   }
   
   // New
   import { Product } from '@/types'
   ```

### For New Features

1. **Create a new store:**
   ```typescript
   // /src/store/new-store.ts
   import { create } from 'zustand'
   
   interface NewState {
     value: string
     setValue: (value: string) => void
   }
   
   export const useNewStore = create<NewState>((set) => ({
     value: '',
     setValue: (value) => set({ value }),
   }))
   ```

2. **Add to types:**
   ```typescript
   // /src/types/index.ts
   export interface NewType {
     // ...
   }
   ```

3. **Add to constants:**
   ```typescript
   // /src/constants/index.ts
   export const NEW_CONSTANTS = [...]
   ```

4. **Add to utils:**
   ```typescript
   // /src/utils/index.ts
   export function newUtility() {
     // ...
   }
   ```

## Best Practices

### 1. Component Structure

```tsx
// Good: Component with clear structure
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store'
import { Product } from '@/types'
import { formatCurrency } from '@/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
      <Button onClick={() => addItem(product)}>
        Add to Cart
      </Button>
    </div>
  )
}
```

### 2. State Management

```typescript
// Good: Using Zustand with selectors
import { useCartStore } from '@/store'

function CartIndicator() {
  // Selector for performance optimization
  const itemCount = useCartStore((state) => state.getItemCount())
  
  return <span>Cart: {itemCount}</span>
}

function AddToCartButton({ product }) {
  const { addItem } = useCartStore()
  
  return (
    <Button onClick={() => addItem(product)}>
      Add to Cart
    </Button>
  )
}
```

### 3. Error Handling

```typescript
// Good: Proper error handling
import { ERROR_MESSAGES } from '@/constants'
import { toast } from 'sonner'

async function fetchProducts() {
  try {
    const response = await api.getProducts()
    return response.data
  } catch (error) {
    toast.error(ERROR_MESSAGES.NETWORK_ERROR)
    console.error('Failed to fetch products:', error)
    return []
  }
}
```

### 4. Type Safety

```typescript
// Good: Strong typing
import { Product, CartItem } from '@/types'

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0)
}

// Bad: Weak typing
function calculateTotal(items: any[]): number {
  return items.reduce((sum, item) => sum + item.total, 0)
}
```

## API Integration

### Using the AI Service

```typescript
// Chat with AI
const sendMessage = async (message: string) => {
  const { addUserMessage, addAssistantMessage, setTyping, setLoading } = useChatStore()
  
  addUserMessage(message)
  setTyping(true)
  setLoading(true)
  
  try {
    const response = await aiService.generateChatResponse(message, messages)
    
    const products = response.productIds?.map((id) => 
      aiService.getProductById(id)
    ).filter(Boolean)
    
    addAssistantMessage(response.content, {
      suggestions: response.suggestions,
      products,
    })
  } catch (error) {
    addAssistantMessage('Sorry, I encountered an error. Please try again.')
  } finally {
    setTyping(false)
    setLoading(false)
  }
}
```

### Product Recommendations

```typescript
// Generate recommendations
const getRecommendations = async (context: RecommendationContext) => {
  const { setLoading } = useUIStore()
  const { setRecommendations } = useProductStore()
  
  setLoading(true)
  
  try {
    const recommendations = await aiService.generateRecommendations(context)
    setRecommendations(recommendations)
  } catch (error) {
    toast.error('Failed to generate recommendations')
  } finally {
    setLoading(false)
  }
}
```

## Performance Optimization

### 1. Memoization

```typescript
import { useMemo } from 'react'
import { groupBy } from '@/utils'

function ProductGrid({ products }) {
  const groupedProducts = useMemo(
    () => groupBy(products, 'category'),
    [products]
  )
  
  // ...
}
```

### 2. Selective Re-rendering

```typescript
// Only re-render when specific values change
const itemCount = useCartStore((state) => state.getItemCount())

// Or use shallow comparison
import { shallow } from 'zustand/shallow'

const { cart, addItem } = useCartStore(
  (state) => ({ cart: state.cart, addItem: state.addItem }),
  shallow
)
```

### 3. Lazy Loading

```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  { loading: () => <LoadingSpinner /> }
)
```

## Testing

### Unit Testing

```typescript
import { formatCurrency, calculateDiscount } from '@/utils'

test('formatCurrency formats numbers correctly', () => {
  expect(formatCurrency(15000)).toBe('KSh 15,000')
  expect(formatCurrency(0)).toBe('KSh 0')
})

test('calculateDiscount calculates percentage correctly', () => {
  expect(calculateDiscount(80, 100)).toBe(20)
  expect(calculateDiscount(0, 100)).toBe(100)
})
```

### Integration Testing

```typescript
import { useCartStore } from '@/store'
import { renderHook, act } from '@testing-library/react'

test('cart store adds items correctly', () => {
  const { result } = renderHook(() => useCartStore())
  
  act(() => {
    result.current.addItem({ id: 1, name: 'Test', price: 100 })
  })
  
  expect(result.current.getItemCount()).toBe(1)
  expect(result.current.getSubtotal()).toBe(100)
})
```

## Deployment

### Environment Variables

```env
# AI Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=https://giftbasket.vercel.app
NEXT_PUBLIC_API_URL=https://api.giftbasket.com

# Feature Flags
NEXT_PUBLIC_ENABLE_AI=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Build Optimization

```json
{
  "compilerOptions": {
    "incremental": true,
    "skipLibCheck": true
  }
}
```

## Next Steps

1. **Gradual Migration** - Move existing components to the new structure
2. **API Layer** - Create a dedicated API service layer
3. **Testing** - Add comprehensive unit and integration tests
4. **Documentation** - Document each module and service
5. **Performance** - Monitor and optimize bundle size
6. **Accessibility** - Complete accessibility audit

## Contributors

- Primary Architecture: Mistral Vibe
- Type Definitions: Mistral Vibe
- State Management: Mistral Vibe
- AI Integration: Mistral Vibe
- Utilities: Mistral Vibe

---

**Last Updated:** September 15, 2026
**Version:** 1.0.0
