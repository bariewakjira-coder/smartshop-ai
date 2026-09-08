'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch, setUser, setToken, logout } from '@/store/store'
import { useCallback } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, token } = useSelector((state: RootState) => state.auth)

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (data.success) {
        dispatch(setUser(data.data.user))
        dispatch(setToken(data.data.accessToken))
        localStorage.setItem('token', data.data.accessToken)
        return data.data
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }, [dispatch])

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      })
      const data = await response.json()
      if (data.success) {
        dispatch(setUser(data.data.user))
        dispatch(setToken(data.data.accessToken))
        localStorage.setItem('token', data.data.accessToken)
        return data.data
      }
    } catch (error) {
      console.error('Register error:', error)
    }
  }, [dispatch])

  const handleLogout = useCallback(() => {
    dispatch(logout())
    localStorage.removeItem('token')
  }, [dispatch])

  return { user, token, login, register, logout: handleLogout }
}
