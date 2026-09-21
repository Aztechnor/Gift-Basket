import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserPreferences } from '@/src/types'

interface UserState {
  // State
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  preferences: UserPreferences
  
  // Actions
  setUser: (user: User) => void
  clearUser: () => void
  updateUser: (updates: Partial<User>) => void
  
  setPreferences: (preferences: UserPreferences) => void
  updatePreferences: (updates: Partial<UserPreferences>) => void
  
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  
  // Getters
  getUser: () => User | null
  getIsAuthenticated: () => boolean
  getToken: () => string | null
  getPreferences: () => UserPreferences
}

interface AuthState {
  token: string | null
  refreshToken: string | null
}

const initialPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  currency: 'KES',
  notifications: true,
}

export const useUserStore = create<UserState & AuthState>()(
  persist(
    (set, get) => ({
      // Initialize state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      preferences: initialPreferences,
      token: null,
      refreshToken: null,
      
      // User actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        })
      },
      
      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          refreshToken: null,
        })
      },
      
      updateUser: (updates) => {
        const currentUser = get().user
        if (!currentUser) return
        
        set({
          user: { ...currentUser, ...updates },
        })
      },
      
      // Preferences actions
      setPreferences: (preferences) => {
        set({ preferences })
      },
      
      updatePreferences: (updates) => {
        const currentPreferences = get().preferences
        set({
          preferences: { ...currentPreferences, ...updates },
        })
      },
      
      // Loading and error states
      setLoading: (isLoading) => {
        set({ isLoading })
      },
      
      setError: (error) => {
        set({ error })
      },
      
      clearError: () => {
        set({ error: null })
      },
      
      // Getters
      getUser: () => {
        return get().user
      },
      
      getIsAuthenticated: () => {
        return get().isAuthenticated
      },
      
      getToken: () => {
        return get().token
      },
      
      getPreferences: () => {
        return get().preferences
      },
    }),
    {
      name: 'giftbasket-user-storage',
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
)

// Selector hooks for better performance
export const useUser = () => useUserStore((state) => state.user)
export const useIsAuthenticated = () => useUserStore((state) => state.isAuthenticated)
export const useToken = () => useUserStore((state) => state.token)
export const usePreferences = () => useUserStore((state) => state.preferences)
export const useUserLoading = () => useUserStore((state) => state.isLoading)
export const useUserError = () => useUserStore((state) => state.error)
