import { create } from 'zustand'

interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'system'
  
  // Sidebar
  isSidebarOpen: boolean
  isMobileSidebarOpen: boolean
  
  // Modals
  isAuthModalOpen: boolean
  isSearchModalOpen: boolean
  isCartSidebarOpen: boolean
  isCheckoutModalOpen: boolean
  isAIChatOpen: boolean
  isBasketBuilderOpen: boolean
  
  // Loading states
  isPageLoading: boolean
  isInitialLoading: boolean
  
  // Scroll position
  scrollPosition: number
  isScrolled: boolean
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
  
  // Sidebar actions
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  
  // Mobile sidebar actions
  openMobileSidebar: () => void
  closeMobileSidebar: () => void
  toggleMobileSidebar: () => void
  
  // Modal actions
  openAuthModal: () => void
  closeAuthModal: () => void
  toggleAuthModal: () => void
  
  openSearchModal: () => void
  closeSearchModal: () => void
  toggleSearchModal: () => void
  
  openCartSidebar: () => void
  closeCartSidebar: () => void
  toggleCartSidebar: () => void
  
  openCheckoutModal: () => void
  closeCheckoutModal: () => void
  toggleCheckoutModal: () => void
  
  openAIChat: () => void
  closeAIChat: () => void
  toggleAIChat: () => void
  
  openBasketBuilder: () => void
  closeBasketBuilder: () => void
  toggleBasketBuilder: () => void
  
  // Loading actions
  startPageLoading: () => void
  stopPageLoading: () => void
  
  startInitialLoading: () => void
  stopInitialLoading: () => void
  
  // Scroll actions
  setScrollPosition: (position: number) => void
  updateScrollState: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  // Theme
  theme: 'system',
  
  // Sidebar
  isSidebarOpen: false,
  isMobileSidebarOpen: false,
  
  // Modals
  isAuthModalOpen: false,
  isSearchModalOpen: false,
  isCartSidebarOpen: false,
  isCheckoutModalOpen: false,
  isAIChatOpen: false,
  isBasketBuilderOpen: false,
  
  // Loading states
  isPageLoading: false,
  isInitialLoading: true,
  
  // Scroll position
  scrollPosition: 0,
  isScrolled: false,
  
  // Theme actions
  setTheme: (theme) => {
    set({ theme })
    // If using next-themes, you might want to call its setTheme here
  },
  
  toggleTheme: () => {
    const currentTheme = get().theme
    const nextTheme: 'light' | 'dark' | 'system' =
      currentTheme === 'light' ? 'dark' :
      currentTheme === 'dark' ? 'system' : 'light'
    set({ theme: nextTheme })
  },
  
  // Sidebar actions
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  // Mobile sidebar actions
  openMobileSidebar: () => set({ isMobileSidebarOpen: true }),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
  toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  
  // Modal actions
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  toggleAuthModal: () => set((state) => ({ isAuthModalOpen: !state.isAuthModalOpen })),
  
  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),
  toggleSearchModal: () => set((state) => ({ isSearchModalOpen: !state.isSearchModalOpen })),
  
  openCartSidebar: () => set({ isCartSidebarOpen: true }),
  closeCartSidebar: () => set({ isCartSidebarOpen: false }),
  toggleCartSidebar: () => set((state) => ({ isCartSidebarOpen: !state.isCartSidebarOpen })),
  
  openCheckoutModal: () => set({ isCheckoutModalOpen: true }),
  closeCheckoutModal: () => set({ isCheckoutModalOpen: false }),
  toggleCheckoutModal: () => set((state) => ({ isCheckoutModalOpen: !state.isCheckoutModalOpen })),
  
  openAIChat: () => set({ isAIChatOpen: true }),
  closeAIChat: () => set({ isAIChatOpen: false }),
  toggleAIChat: () => set((state) => ({ isAIChatOpen: !state.isAIChatOpen })),
  
  openBasketBuilder: () => set({ isBasketBuilderOpen: true }),
  closeBasketBuilder: () => set({ isBasketBuilderOpen: false }),
  toggleBasketBuilder: () => set((state) => ({ isBasketBuilderOpen: !state.isBasketBuilderOpen })),
  
  // Loading actions
  startPageLoading: () => set({ isPageLoading: true }),
  stopPageLoading: () => set({ isPageLoading: false }),
  
  startInitialLoading: () => set({ isInitialLoading: true }),
  stopInitialLoading: () => set({ isInitialLoading: false }),
  
  // Scroll actions
  setScrollPosition: (position) => {
    set({
      scrollPosition: position,
      isScrolled: position > 100,
    })
  },
  
  updateScrollState: () => {
    if (typeof window === 'undefined') return
    const position = window.scrollY
    set({
      scrollPosition: position,
      isScrolled: position > 100,
    })
  },
}))

// Selector hooks for better performance
export const useTheme = () => useUIStore((state) => state.theme)
export const useSidebar = () => useUIStore((state) => ({
  isOpen: state.isSidebarOpen,
  open: state.openSidebar,
  close: state.closeSidebar,
  toggle: state.toggleSidebar,
}))
export const useMobileSidebar = () => useUIStore((state) => ({
  isOpen: state.isMobileSidebarOpen,
  open: state.openMobileSidebar,
  close: state.closeMobileSidebar,
  toggle: state.toggleMobileSidebar,
}))

export const useAuthModal = () => useUIStore((state) => ({
  isOpen: state.isAuthModalOpen,
  open: state.openAuthModal,
  close: state.closeAuthModal,
  toggle: state.toggleAuthModal,
}))

export const useSearchModal = () => useUIStore((state) => ({
  isOpen: state.isSearchModalOpen,
  open: state.openSearchModal,
  close: state.closeSearchModal,
  toggle: state.toggleSearchModal,
}))

export const useCartSidebar = () => useUIStore((state) => ({
  isOpen: state.isCartSidebarOpen,
  open: state.openCartSidebar,
  close: state.closeCartSidebar,
  toggle: state.toggleCartSidebar,
}))

export const useCheckoutModal = () => useUIStore((state) => ({
  isOpen: state.isCheckoutModalOpen,
  open: state.openCheckoutModal,
  close: state.closeCheckoutModal,
  toggle: state.toggleCheckoutModal,
}))

export const useAIChat = () => useUIStore((state) => ({
  isOpen: state.isAIChatOpen,
  open: state.openAIChat,
  close: state.closeAIChat,
  toggle: state.toggleAIChat,
}))

export const useBasketBuilder = () => useUIStore((state) => ({
  isOpen: state.isBasketBuilderOpen,
  open: state.openBasketBuilder,
  close: state.closeBasketBuilder,
  toggle: state.toggleBasketBuilder,
}))

export const useLoading = () => useUIStore((state) => ({
  isPageLoading: state.isPageLoading,
  isInitialLoading: state.isInitialLoading,
}))

export const useScroll = () => useUIStore((state) => ({
  position: state.scrollPosition,
  isScrolled: state.isScrolled,
}))
