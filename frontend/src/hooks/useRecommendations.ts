'use client'

import { useCallback, useState } from 'react'

const ML_SERVICE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'

export interface Recommendation {
  product_id: number
  score: number
}

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getRecommendations = useCallback(async (userId: number, n: number = 5) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${ML_SERVICE_URL}/api/recommendations/get-recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          n_recommendations: n,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setRecommendations(data.recommendations)
        return data.recommendations
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch recommendations')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const trainModel = useCallback(async (interactions: any[]) => {
    try {
      const response = await fetch(`${ML_SERVICE_URL}/api/recommendations/train`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interactions: interactions,
        }),
      })

      const data = await response.json()
      return data.success
    } catch (err: any) {
      console.error('Error training model:', err)
      return false
    }
  }, [])

  return {
    recommendations,
    isLoading,
    error,
    getRecommendations,
    trainModel,
  }
}
