'use client'

import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch, addToCart, removeFromCart, updateCartItemQuantity, clearCart as clearCartAction } from '@/store/store'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export function useCart() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, total } = useSelector((state: RootState) => state.cart)
  const [isLoading, setIsLoading] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        // Could implement cart persistence here
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
  }, [])

  const add = useCallback((item: CartItem) => {
    dispatch(addToCart(item))
    localStorage.setItem('cart-last-updated', new Date().toISOString())
  }, [dispatch])

  const remove = useCallback((id: number) => {
    dispatch(removeFromCart(id))
  }, [dispatch])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      remove(id)
    } else {
      dispatch(updateCartItemQuantity({ id, quantity }))
    }
  }, [dispatch, remove])

  const clearCart = useCallback(() => {
    dispatch(clearCartAction())
  }, [dispatch])

  const checkout = useCallback(async () => {
    setIsLoading(true)
    try {
      // Mock checkout - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      clearCart()
      return { success: true, message: 'Order placed successfully' }
    } catch (error) {
      return { success: false, message: 'Checkout failed' }
    } finally {
      setIsLoading(false)
    }
  }, [clearCart])

  return {
    items,
    total,
    isLoading,
    add,
    remove,
    updateQuantity,
    clearCart,
    checkout,
    itemCount: items.length,
  }
}
