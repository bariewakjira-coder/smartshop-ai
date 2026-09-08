#!/bin/bash

# Start all services for development

echo "🚀 Starting SmartShop AI Services..."

# Backend
echo "📦 Starting Backend..."
cd backend
npm run dev &
BACKEND_PID=$!

# Frontend
echo "🎨 Starting Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# ML Service
echo "🤖 Starting ML Service..."
cd ../ml-service
source venv/bin/activate
python main.py &
ML_PID=$!

echo ""
echo "✅ All services started!"
echo ""
echo "📍 Service URLs:"
echo "   Frontend:   http://localhost:3000"
echo "   Backend:    http://localhost:3001"
echo "   ML Service: http://localhost:5000"
echo ""
echo "To stop services, press Ctrl+C"

# Wait for all processes
wait $BACKEND_PID $FRONTEND_PID $ML_PID
