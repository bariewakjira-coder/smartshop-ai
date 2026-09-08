#!/bin/bash

# SmartShop AI - Development Setup Script
# This script automates the setup process

echo "🚀 SmartShop AI - Development Setup"
echo "====================================="

# Check prerequisites
echo "\n📋 Checking prerequisites..."

command -v node &> /dev/null || { echo "❌ Node.js not found. Please install Node.js 18+"; exit 1; }
command -v python3 &> /dev/null || { echo "❌ Python not found. Please install Python 3.9+"; exit 1; }
command -v psql &> /dev/null || { echo "⚠️  PostgreSQL not found. Database setup skipped."; }

echo "✅ Prerequisites check passed!"

# Setup Backend
echo "\n📦 Setting up Backend..."
cd backend
cp .env.example .env.local
npm install
echo "✅ Backend setup complete!"

# Setup Frontend
echo "\n🎨 Setting up Frontend..."
cd ../frontend
cp .env.example .env.local
npm install
echo "✅ Frontend setup complete!"

# Setup ML Service
echo "\n🤖 Setting up ML Service..."
cd ../ml-service
python3 -m venv venv
source venv/bin/activate
cp .env.example .env.local
pip install -r requirements.txt
echo "✅ ML Service setup complete!"

echo "\n✨ Setup complete!"
echo "\n📝 Next steps:"
echo "1. Edit .env.local files with your configuration"
echo "2. Run: docker-compose up -d (or start services manually)"
echo "3. Visit http://localhost:3000 to see the app"
echo "\n📚 Full guide: See SETUP_GUIDE.md"
