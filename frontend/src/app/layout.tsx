import type { Metadata } from 'next'
import { Providers } from '@/app/providers'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'SmartShop AI - AI-Powered E-Commerce',
  description: 'Shop smart with AI recommendations and intelligent chatbot assistance',
  keywords: ['ecommerce', 'shopping', 'ai', 'chatbot', 'recommendations'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
