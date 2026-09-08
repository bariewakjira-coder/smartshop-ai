import { createSlice, configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

interface User {
  id: number
  email: string
  full_name: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  total: number
}

const cartInitialState: CartState = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1
      } else {
        state.items.push(action.payload)
      }
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    updateCartItemQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

export const { setUser, setToken, setLoading, setError, logout, clearError } = authSlice.actions
export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
