'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Bot, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 py-20"
      >
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-blue-200 text-blue-800 rounded-full text-sm font-semibold">
              ✨ Powered by AI & Machine Learning
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Shop Smart with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Experience personalized shopping with intelligent product recommendations and AI-powered customer support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Start Shopping <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why Choose SmartShop AI?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="w-12 h-12 text-blue-600" />,
                title: 'AI Chatbot Assistant',
                description: 'Get instant answers and personalized product recommendations from our intelligent chatbot'
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-green-600" />,
                title: 'Smart Recommendations',
                description: 'ML-powered algorithms learn your preferences and suggest products you\'ll love'
              },
              {
                icon: <Sparkles className="w-12 h-12 text-purple-600" />,
                title: 'Enhanced Experience',
                description: 'Personalized shopping journey designed just for you'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition"
              >
                {feature.icon}
                <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
      >
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience AI Shopping?</h2>
          <p className="text-xl mb-8">Join thousands of happy customers discovering products tailored to their taste</p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Products Now
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
