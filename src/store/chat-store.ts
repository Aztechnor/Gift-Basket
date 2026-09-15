import { create } from 'zustand'
import { ChatMessage, Conversation, RecommendationContext, Product } from '@/types'
import { generateId } from '@/utils'

interface ChatState {
  // State
  conversations: Conversation[]
  activeConversationId: string | null
  messages: ChatMessage[]
  context: RecommendationContext
  isLoading: boolean
  isTyping: boolean
  error: string | null
  unreadCount: number
  isMinimized: boolean
  
  // Actions
  initializeChat: () => void
  createConversation: () => Conversation
  switchConversation: (conversationId: string) => void
  closeConversation: () => void
  
  addMessage: (message: ChatMessage) => void
  addUserMessage: (content: string) => ChatMessage
  addAssistantMessage: (
    content: string,
    options?: { suggestions?: string[]; products?: Product[] }
  ) => ChatMessage
  
  updateMessage: (messageId: string, updates: Partial<ChatMessage>) => void
  removeMessage: (messageId: string) => void
  
  updateContext: (updates: Partial<RecommendationContext>) => void
  clearContext: () => void
  
  setTyping: (isTyping: boolean) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  
  incrementUnreadCount: () => void
  resetUnreadCount: () => void
  
  setMinimized: (isMinimized: boolean) => void
  toggleMinimized: () => void
  
  // Getters
  getConversation: (conversationId: string) => Conversation | undefined
  getActiveConversation: () => Conversation | undefined
  getMessages: () => ChatMessage[]
  getContext: () => RecommendationContext
  hasUnreadMessages: () => boolean
}

const initialContext: RecommendationContext = {
  occasion: undefined,
  budget: undefined,
  recipient: {
    age: undefined,
    gender: undefined,
    relationship: undefined,
    interests: [],
  },
  preferences: [],
  userId: undefined,
}

const initialConversation: Conversation = {
  id: generateId(),
  userId: undefined,
  messages: [],
  context: initialContext,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const useChatStore = create<ChatState>()((set, get) => ({
  // Initialize state
  conversations: [initialConversation],
  activeConversationId: initialConversation.id,
  messages: initialConversation.messages,
  context: initialContext,
  isLoading: false,
  isTyping: false,
  error: null,
  unreadCount: 0,
  isMinimized: false,
  
  // Initialize chat
  initializeChat: () => {
    const hasConversations = get().conversations.length > 0
    if (!hasConversations) {
      const newConversation = get().createConversation()
      set({
        conversations: [newConversation],
        activeConversationId: newConversation.id,
      })
    }
  },
  
  // Create a new conversation
  createConversation: () => {
    const newConversation: Conversation = {
      id: generateId(),
      userId: get().context.userId,
      messages: [
        {
          id: generateId(),
          role: 'assistant',
          content: 'Hi there! 👋 I\'m your AI gift advisor. I\'m here to help you find the perfect gift for any occasion. What can I help you with today?',
          timestamp: new Date(),
          suggestions: [
            'I need gift ideas',
            'Help me find birthday gifts',
            'Show me traditional Kenyan gifts',
            'What\'s good for corporate gifts?',
          ],
        },
      ],
      context: initialContext,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    set((state) => ({
      conversations: [...state.conversations, newConversation],
      activeConversationId: newConversation.id,
      messages: newConversation.messages,
      context: initialContext,
      unreadCount: 0,
    }))
    
    return newConversation
  },
  
  // Switch to a different conversation
  switchConversation: (conversationId) => {
    const conversation = get().conversations.find((c) => c.id === conversationId)
    if (!conversation) return
    
    set({
      activeConversationId: conversationId,
      messages: conversation.messages,
      context: conversation.context,
      unreadCount: 0,
    })
  },
  
  // Close active conversation
  closeConversation: () => {
    set({
      activeConversationId: null,
      messages: [],
      context: initialContext,
    })
  },
  
  // Add a message to the active conversation
  addMessage: (message) => {
    const conversationId = get().activeConversationId
    if (!conversationId) return
    
    set((state) => {
      const updatedConversations = state.conversations.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [...c.messages, message],
            updatedAt: new Date(),
          }
        }
        return c
      })
      
      return {
        conversations: updatedConversations,
        messages: [...state.messages, message],
      }
    })
  },
  
  // Add a user message
  addUserMessage: (content) => {
    const message: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    
    get().addMessage(message)
    return message
  },
  
  // Add an assistant message
  addAssistantMessage: (content, options = {}) => {
    const { suggestions, products } = options
    const message: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      suggestions,
      products,
    }
    
    get().addMessage(message)
    return message
  },
  
  // Update a message
  updateMessage: (messageId, updates) => {
    const conversationId = get().activeConversationId
    if (!conversationId) return
    
    set((state) => {
      const updatedConversations = state.conversations.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: c.messages.map((m) =>
              m.id === messageId ? { ...m, ...updates } : m
            ),
            updatedAt: new Date(),
          }
        }
        return c
      })
      
      return {
        conversations: updatedConversations,
        messages: state.messages.map((m) =>
          m.id === messageId ? { ...m, ...updates } : m
        ),
      }
    })
  },
  
  // Remove a message
  removeMessage: (messageId) => {
    const conversationId = get().activeConversationId
    if (!conversationId) return
    
    set((state) => {
      const updatedConversations = state.conversations.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: c.messages.filter((m) => m.id !== messageId),
            updatedAt: new Date(),
          }
        }
        return c
      })
      
      return {
        conversations: updatedConversations,
        messages: state.messages.filter((m) => m.id !== messageId),
      }
    })
  },
  
  // Update conversation context
  updateContext: (updates) => {
    const conversationId = get().activeConversationId
    if (!conversationId) return
    
    set((state) => {
      const newContext = { ...state.context, ...updates }
      const updatedConversations = state.conversations.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            context: newContext,
            updatedAt: new Date(),
          }
        }
        return c
      })
      
      return {
        conversations: updatedConversations,
        context: newContext,
      }
    })
  },
  
  // Clear conversation context
  clearContext: () => {
    get().updateContext(initialContext)
  },
  
  // Typing state
  setTyping: (isTyping) => {
    set({ isTyping })
  },
  
  // Loading state
  setLoading: (isLoading) => {
    set({ isLoading })
  },
  
  // Error state
  setError: (error) => {
    set({ error })
  },
  
  clearError: () => {
    set({ error: null })
  },
  
  // Unread count
  incrementUnreadCount: () => {
    set((state) => ({ unreadCount: state.unreadCount + 1 }))
  },
  
  resetUnreadCount: () => {
    set({ unreadCount: 0 })
  },
  
  // Minimized state
  setMinimized: (isMinimized) => {
    set({ isMinimized })
  },
  
  toggleMinimized: () => {
    set((state) => ({ isMinimized: !state.isMinimized }))
  },
  
  // Getters
  getConversation: (conversationId) => {
    return get().conversations.find((c) => c.id === conversationId)
  },
  
  getActiveConversation: () => {
    const conversationId = get().activeConversationId
    return get().conversations.find((c) => c.id === conversationId)
  },
  
  getMessages: () => {
    return get().messages
  },
  
  getContext: () => {
    return get().context
  },
  
  hasUnreadMessages: () => {
    return get().unreadCount > 0
  },
}))

// Selector hooks for better performance
export const useActiveConversationId = () => 
  useChatStore((state) => state.activeConversationId)
export const useMessages = () => useChatStore((state) => state.messages)
export const useChatContext = () => useChatStore((state) => state.context)
export const useIsChatTyping = () => useChatStore((state) => state.isTyping)
export const useIsChatLoading = () => useChatStore((state) => state.isLoading)
export const useChatError = () => useChatStore((state) => state.error)
export const useUnreadCount = () => useChatStore((state) => state.unreadCount)
export const useIsChatMinimized = () => useChatStore((state) => state.isMinimized)
export const useConversations = () => useChatStore((state) => state.conversations)
