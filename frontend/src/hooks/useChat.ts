'use client'

import { useCallback, useState } from 'react'

interface ChatMessage {
  user_message: string
  bot_response: string
  timestamp: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL
const ML_SERVICE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (message: string, userId: string = 'anonymous') => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${ML_SERVICE_URL}/api/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          message: message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const newMessage: ChatMessage = {
          user_message: message,
          bot_response: data.response,
          timestamp: new Date().toISOString(),
        }
        setMessages(prev => [...prev, newMessage])
        return data.response
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getConversationHistory = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`${ML_SERVICE_URL}/api/chatbot/conversation/${userId}`)
      const data = await response.json()

      if (data.success) {
        return data.conversation
      }
    } catch (err: any) {
      console.error('Error fetching conversation:', err)
    }
  }, [])

  const clearConversation = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`${ML_SERVICE_URL}/api/chatbot/clear/${userId}`, {
        method: 'POST',
      })
      const data = await response.json()

      if (data.success) {
        setMessages([])
        return true
      }
    } catch (err: any) {
      console.error('Error clearing conversation:', err)
    }
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    getConversationHistory,
    clearConversation,
  }
}
