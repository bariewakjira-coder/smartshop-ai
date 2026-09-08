'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Professional Laptop',
    price: 1299.99,
    rating: 4.5,
    image_url: 'https://via.placeholder.com/300?text=Laptop',
    category: 'Electronics',
    description: 'High-performance laptop for professionals and developers'
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 199.99,
    rating: 4.7,
    image_url: 'https://via.placeholder.com/300?text=Headphones',
    category: 'Audio',
    description: 'Premium noise-cancelling wireless headphones with 30hr battery'
  },
  {
    id: 3,
    name: 'Smartphone',
    price: 899.99,
    rating: 4.6,
    image_url: 'https://via.placeholder.com/300?text=Phone',
    category: 'Electronics',
    description: 'Latest generation smartphone with advanced camera system'
  },
  {
    id: 4,
    name: 'Tablet Pro',
    price: 499.99,
    rating: 4.4,
    image_url: 'https://via.placeholder.com/300?text=Tablet',
    category: 'Electronics',
    description: 'Portable tablet with stylus support and 120Hz display'
  },
  {
    id: 5,
    name: 'Smart Watch',
    price: 299.99,
    rating: 4.3,
    image_url: 'https://via.placeholder.com/300?text=Watch',
    category: 'Wearables',
    description: 'Fitness tracking smart watch with health monitoring'
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    price: 149.99,
    rating: 4.8,
    image_url: 'https://via.placeholder.com/300?text=Keyboard',
    category: 'Accessories',
    description: 'RGB mechanical keyboard for gaming and typing'
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('popular')

  const categories = ['All', 'Electronics', 'Audio', 'Wearables', 'Accessories']

  useEffect(() => {
    let filtered = SAMPLE_PRODUCTS

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setProducts(filtered)
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600">Discover amazing products with AI-powered recommendations</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12 text-gray-600"
        >
          <p>Showing {products.length} products</p>
        </motion.div>
      </div>
    </div>
  )
}
