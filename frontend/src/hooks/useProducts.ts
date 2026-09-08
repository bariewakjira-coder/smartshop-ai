'use client'

import { useState, useCallback } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async (page = 1, limit = 10, category?: string) => {
    setLoading(true)
    try {
      const query = new URLSearchParams({ page: String(page), limit: String(limit) })
      if (category) query.append('category', category)
      
      const response = await fetch(`${API_URL}/api/products?${query}`)
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const getProduct = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`)
      const data = await response.json()
      return data.data
    } catch (err: any) {
      setError(err.message)
    }
  }, [])

  return { products, loading, error, fetchProducts, getProduct }
}
