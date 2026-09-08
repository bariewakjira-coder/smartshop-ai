'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ProductCard'
import { TrendingUp, Sparkles } from 'lucide-react'

const RECOMMENDED_PRODUCTS = [
  {
    id: 1,
    name: 'Professional Laptop',
    price: 1299.99,
    rating: 4.5,
    image_url: 'https://via.placeholder.com/300?text=Laptop',
    category: 'Electronics',
    description: 'High-performance laptop for professionals'
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 199.99,
    rating: 4.7,
    image_url: 'https://via.placeholder.com/300?text=Headphones',
    category: 'Audio',
    description: 'Premium noise-cancelling headphones'
  },
  {
    id: 5,
    name: 'Smart Watch',
    price: 299.99,
    rating: 4.3,
    image_url: 'https://via.placeholder.com/300?text=Watch',
    category: 'Wearables',
    description: 'Fitness tracking smart watch'
  },
]

export function RecommendedProducts() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-blue-200 text-blue-800 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4 inline mr-2" />
            AI-Powered Recommendations
          </div>
          <h2 className="text-4xl font-bold mb-4">Recommended For You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our smart recommendation engine analyzes your preferences and suggests products you'll love
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {RECOMMENDED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            <TrendingUp className="w-5 h-5" />
            View All Recommendations
          </button>
        </motion.div>
      </div>
    </section>
  )
}
