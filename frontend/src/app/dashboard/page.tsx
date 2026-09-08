'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { Heart, Package, Settings, LogOut, Edit } from 'lucide-react'
import { useState } from 'react'

const SAMPLE_ORDERS = [
  {
    id: 'ORD-001',
    date: '2026-09-01',
    total: 1499.98,
    status: 'Delivered',
    items: 2
  },
  {
    id: 'ORD-002',
    date: '2026-08-25',
    total: 299.99,
    status: 'Shipped',
    items: 1
  },
]

const SAMPLE_WISHLIST = [
  { id: 1, name: 'Gaming Mouse', price: 89.99 },
  { id: 2, name: 'USB-C Hub', price: 49.99 },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome Back, {user?.full_name || 'User'}!</h1>
              <p className="text-gray-600">Here's your account dashboard</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="flex items-center gap-2 px-6 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg p-6 shadow">
              {/* Profile Card */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {user?.full_name?.charAt(0) || 'U'}
                </div>
                <h3 className="font-bold text-lg mb-1">{user?.full_name}</h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ x: 4 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </motion.button>
                  )
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Orders', value: SAMPLE_ORDERS.length, icon: Package },
                    { label: 'Wishlist Items', value: SAMPLE_WISHLIST.length, icon: Heart },
                    { label: 'Saved Addresses', value: 2, icon: Package },
                  ].map((stat, i) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-lg p-6 shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                          </div>
                          <Icon className="w-8 h-8 text-blue-600 opacity-20" />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {SAMPLE_ORDERS.slice(0, 2).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.items} item{order.items !== 1 ? 's' : ''} • {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">${order.total.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold mb-4">Your Orders</h3>
                <div className="space-y-3">
                  {SAMPLE_ORDERS.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total.toFixed(2)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold mb-4">My Wishlist</h3>
                <div className="space-y-3">
                  {SAMPLE_WISHLIST.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                
                {isEditing ? (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input type="text" defaultValue={user?.full_name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" defaultValue={user?.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-3">
                      <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">Save Changes</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold">Full Name</p>
                        <p className="text-gray-600">{user?.full_name}</p>
                      </div>
                      <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-white rounded transition">
                        <Edit className="w-5 h-5 text-blue-600" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
