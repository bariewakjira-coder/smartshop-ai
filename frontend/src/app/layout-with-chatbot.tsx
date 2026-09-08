'use client'

import { useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ChatBot } from '@/components/ChatBot'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize app
    console.log('App initialized')
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <ChatBot />
      <Footer />
    </>
  )
}
