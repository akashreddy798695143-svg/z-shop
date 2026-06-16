import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Type Definitions ────────────────────────────────────────────────────────

export type View =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'checkout-success'
  | 'orders'
  | 'order-detail';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface ShopState {
  // Navigation
  view: View;
  selectedProductId: string | null;
  selectedOrderId: string | null;
  navigate: (view: View, id?: string) => void;
  goHome: () => void;

  // Search & Filter
  searchQuery: string;
  selectedCategory: string | null;
  sortBy: SortOption;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (slug: string | null) => void;
  setSortBy: (sort: SortOption) => void;

  // Cart
  cartItems: CartItem[];
  sessionId: string;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setCartFromServer: (items: CartItem[]) => void;

  // Checkout
  lastOrderId: string | null;
  setLastOrderId: (id: string | null) => void;

  // Auth
  user: UserInfo | null;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  setUser: (user: UserInfo | null) => void;
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  logout: () => void;
}

interface ShopGetters {
  cartCount: number;
  cartTotal: number;
}

// ─── Helper: Generate Session ID ─────────────────────────────────────────────

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useShopStore = create<ShopState & ShopGetters>()(
  persist(
    (set, get) => ({
      // ── Navigation ──────────────────────────────────────────────────
      view: 'home',
      selectedProductId: null,
      selectedOrderId: null,

      navigate: (view: View, id?: string) => {
        set(() => {
          const updates: Partial<ShopState> = { view };

          // Clear previous selections
          updates.selectedProductId = null;
          updates.selectedOrderId = null;

          if (view === 'product-detail' && id) {
            updates.selectedProductId = id;
          } else if (view === 'order-detail' && id) {
            updates.selectedOrderId = id;
          }

          return updates;
        });
      },

      goHome: () => {
        set({
          view: 'home',
          selectedProductId: null,
          selectedOrderId: null,
          searchQuery: '',
          selectedCategory: null,
          sortBy: 'featured',
        });
      },

      // ── Search & Filter ─────────────────────────────────────────────
      searchQuery: '',
      selectedCategory: null,
      sortBy: 'featured',

      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSelectedCategory: (slug: string | null) => set({ selectedCategory: slug }),
      setSortBy: (sort: SortOption) => set({ sortBy: sort }),

      // ── Cart ────────────────────────────────────────────────────────
      cartItems: [],
      sessionId: generateSessionId(),

      cartCount: 0,
      cartTotal: 0,

      addToCart: (item: Omit<CartItem, 'quantity'>) => {
        set((state) => {
          const existing = state.cartItems.find(
            (ci) => ci.productId === item.productId
          );

          let newCartItems: CartItem[];

          if (existing) {
            newCartItems = state.cartItems.map((ci) =>
              ci.productId === item.productId
                ? { ...ci, quantity: ci.quantity + 1 }
                : ci
            );
          } else {
            newCartItems = [...state.cartItems, { ...item, quantity: 1 }];
          }

          return {
            cartItems: newCartItems,
            cartCount: newCartItems.reduce((sum, ci) => sum + ci.quantity, 0),
            cartTotal: newCartItems.reduce(
              (sum, ci) => sum + ci.price * ci.quantity,
              0
            ),
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          let newCartItems: CartItem[];

          if (quantity <= 0) {
            newCartItems = state.cartItems.filter(
              (ci) => ci.productId !== productId
            );
          } else {
            newCartItems = state.cartItems.map((ci) =>
              ci.productId === productId ? { ...ci, quantity } : ci
            );
          }

          return {
            cartItems: newCartItems,
            cartCount: newCartItems.reduce((sum, ci) => sum + ci.quantity, 0),
            cartTotal: newCartItems.reduce(
              (sum, ci) => sum + ci.price * ci.quantity,
              0
            ),
          };
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => {
          const newCartItems = state.cartItems.filter(
            (ci) => ci.productId !== productId
          );

          return {
            cartItems: newCartItems,
            cartCount: newCartItems.reduce((sum, ci) => sum + ci.quantity, 0),
            cartTotal: newCartItems.reduce(
              (sum, ci) => sum + ci.price * ci.quantity,
              0
            ),
          };
        });
      },

      clearCart: () => {
        set({
          cartItems: [],
          cartCount: 0,
          cartTotal: 0,
        });
      },

      setCartFromServer: (items: CartItem[]) => {
        set({
          cartItems: items,
          cartCount: items.reduce((sum, ci) => sum + ci.quantity, 0),
          cartTotal: items.reduce((sum, ci) => sum + ci.price * ci.quantity, 0),
        });
      },

      // ── Checkout ────────────────────────────────────────────────────
      lastOrderId: null,

      setLastOrderId: (id: string | null) => set({ lastOrderId: id }),

      // ── Auth ───────────────────────────────────────────────────────
      user: null,
      isAuthModalOpen: false,
      authModalTab: 'login',

      setUser: (user: UserInfo | null) => set({ user }),
      openAuthModal: (tab?: 'login' | 'signup') => set({
        isAuthModalOpen: true,
        authModalTab: tab || 'login',
      }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),
      logout: () => set({
        user: null,
        cartItems: [],
        cartCount: 0,
        cartTotal: 0,
      }),
    }),
    {
      name: 'z-shop-storage',
      partialize: (state) => ({
        cartItems: state.cartItems,
        sessionId: state.sessionId,
        user: state.user,
      }),
      // Re-derive computed values after rehydration
      onRehydrateStorage: () => (state) => {
        if (state && state.cartItems.length > 0) {
          state.cartCount = state.cartItems.reduce(
            (sum, ci) => sum + ci.quantity,
            0
          );
          state.cartTotal = state.cartItems.reduce(
            (sum, ci) => sum + ci.price * ci.quantity,
            0
          );
        }
      },
    }
  )
);
