'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart, Menu, LogOut } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow">
      <nav className="container flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          SmartShop AI
        </Link>

        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/products" className="hover:text-primary">Products</Link>
          {user && <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>}
          {!user && <Link href="/login" className="hover:text-primary">Login</Link>}
        </div>

        <div className="flex gap-4 items-center">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </Link>

          {user && (
            <button onClick={logout} className="flex items-center gap-2 text-red-500 hover:text-red-700">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-gray-50 p-4 space-y-2">
          <Link href="/" className="block hover:text-primary">Home</Link>
          <Link href="/products" className="block hover:text-primary">Products</Link>
          {user && <Link href="/dashboard" className="block hover:text-primary">Dashboard</Link>}
          {!user && <Link href="/login" className="block hover:text-primary">Login</Link>}
        </div>
      )}
    </header>
  )
}
