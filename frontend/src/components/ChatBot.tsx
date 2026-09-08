'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, X, Loader } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 How can I help you today? I can assist with product recommendations, answer questions, or help with your order.',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 800)
  }

  const generateBotResponse = (userInput: string): string => {
    const responses: { [key: string]: string } = {
      'recommend': 'Based on your preferences, I\'d recommend checking out our Electronics category. We have some amazing products like laptops and headphones on sale!',
      'help': 'I can help you with: Product recommendations, Order status, Payment information, Returns & refunds, or General questions.',
      'order': 'To check your order status, please log in to your account and visit the "My Orders" section in your dashboard.',
      'return': 'Our return policy allows returns within 30 days of purchase. Please visit our Returns page or contact customer support.',
      'price': 'Yes! We have regular discounts and special offers. Check our Products page to see current deals!',
      'shipping': 'We offer free shipping on orders over $50! Standard delivery takes 5-7 business days.',
    }

    const lowerInput = userInput.toLowerCase()
    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return value
      }
    }

    return 'That\'s a great question! I\'m here to help. Could you provide more details so I can assist you better? You can ask about products, orders, shipping, returns, or recommendations!'
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center z-40"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h3 className="font-bold text-lg">SmartShop AI Assistant</h3>
          <p className="text-sm text-blue-100">Always here to help</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <Loader className="w-5 h-5 text-blue-600 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="border-t p-3 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </motion.div>
    </>
  )
}
