# SmartShop AI - Complete Setup Guide

## 🎉 Welcome to SmartShop AI!

You now have a production-ready, full-stack AI-powered e-commerce platform. This guide will help you get started.

---

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://www.python.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/))
- **Redis** 7+ ([Download](https://redis.io/))
- **Git** ([Download](https://git-scm.com/))
- **Docker** (Optional, for containerization)

---

## 🚀 Quick Start with Docker

The easiest way to get everything running:

```bash
# Clone the repository
git clone https://github.com/bariewakjira-coder/smartshop-ai.git
cd smartshop-ai

# Setup environment
cp .env.example .env.local
# Edit .env.local with your settings

# Start all services
docker-compose up -d

# Wait for services to be healthy (30-60 seconds)
docker-compose ps
```

✅ All services are now running!

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **ML Service**: http://localhost:5000
- **Database**: localhost:5432
- **Redis**: localhost:6379

---

## 🔧 Manual Setup (Without Docker)

### 1. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres

CREATE DATABASE smartshop_ai_db;
CREATE USER smartshop_user WITH PASSWORD 'secure_password';
ALTER ROLE smartshop_user SET client_encoding TO 'utf8';
ALTER ROLE smartshop_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE smartshop_user SET default_transaction_deferrable TO on;
ALTER ROLE smartshop_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE smartshop_ai_db TO smartshop_user;
\q
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local

# Run migrations
npm run migrate

# Seed sample data
npm run seed

# Start development server
npm run dev
```

✅ Backend running at `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

✅ Frontend running at `http://localhost:3000`

### 4. ML Service Setup

```bash
cd ml-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env.local
# Edit .env.local and add your OpenAI API key

# Start ML service
python main.py
```

✅ ML Service running at `http://localhost:5000`

---

## 🔑 Environment Variables

Create `.env.local` in the root directory:

```env
# Application
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://smartshop_user:secure_password@localhost:5432/smartshop_ai_db
POSTGRES_USER=smartshop_user
POSTGRES_PASSWORD=secure_password
POSTGRES_DB=smartshop_ai_db

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE_IN=7d

# OpenAI (for Chatbot)
OPENAI_API_KEY=sk-your-openai-api-key

# ML Service
ML_SERVICE_URL=http://localhost:5000
```

---

## 📚 Project Structure

```
smartshop-ai/
├── backend/                  # Node.js/Express API
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/      # Business logic
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Express middleware
│   │   └── database/        # Migrations & schemas
│   └── package.json
│
├── frontend/                 # Next.js React App
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   └── store/           # Redux store
│   └── package.json
│
├── ml-service/              # Python ML Service
│   ├── app/
│   │   ├── recommendations/ # Recommendation engine
│   │   ├── chatbot/         # Chatbot logic
│   │   └── models/          # ML models
│   └── requirements.txt
│
├── database/                # Database files
│   ├── init.sql            # Schema initialization
│   └── migrations/         # Migration scripts
│
└── docker-compose.yml       # Docker orchestration
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
npm run test:coverage
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

### ML Service Tests
```bash
cd ml-service
pytest
pytest --cov
```

---

## 📚 API Documentation

### Authentication Endpoints

**Register User**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "fullName": "John Doe"
}
```

**Login**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Product Endpoints

**Get All Products**
```bash
GET /api/products?page=1&limit=10&category=Electronics
```

**Get Single Product**
```bash
GET /api/products/:id
```

**Create Product (Admin)**
```bash
POST /api/products
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Description",
  "price": 99.99,
  "stock": 50,
  "category": "Electronics",
  "imageUrl": "https://..."
}
```

### ML Service Endpoints

**Get Recommendations**
```bash
POST http://localhost:5000/api/recommendations/get-recommendations
Content-Type: application/json

{
  "user_id": 1,
  "n_recommendations": 5
}
```

**Chat with Bot**
```bash
POST http://localhost:5000/api/chatbot/message
Content-Type: application/json

{
  "user_id": "user123",
  "message": "What products do you recommend?"
}
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm install -g vercel
cd frontend
vercel
```

### Backend (Railway/Render)
1. Create account on [Railway](https://railway.app) or [Render](https://render.com)
2. Connect GitHub repository
3. Select `backend` directory
4. Set environment variables
5. Deploy

### ML Service (Heroku/Railway)
1. Similar process to backend
2. Select `ml-service` directory
3. Deploy

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process on port 3001
lsof -i :3001
# Kill process
kill -9 <PID>
```

### Database Connection Error
```bash
# Test PostgreSQL connection
psql -U smartshop_user -d smartshop_ai_db -h localhost
```

### Redis Connection Error
```bash
# Test Redis connection
redis-cli ping
# Should return: PONG
```

### Python Virtual Environment
```bash
# If venv not activating
cd ml-service
python -m venv venv
source venv/bin/activate
```

---

## 📖 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [ML Service README](./ml-service/README.md)
- [Project Phases](./PROJECT_PHASES.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

---

## 👨‍💻 Author

**Barie Wakjira**
- GitHub: [@bariewakjira-coder](https://github.com/bariewakjira-coder)
- Email: bariewakjira2@gmail.com
- Portfolio: [bariiportfolio.vercel.app](https://bariiportfolio.vercel.app)

---

## 🎯 Next Steps

1. ✅ Clone and setup project
2. ✅ Configure environment variables
3. ✅ Run database migrations
4. ✅ Start all services
5. 🔜 Test API endpoints
6. 🔜 Customize for your needs
7. 🔜 Deploy to production

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: bariewakjira2@gmail.com
- Check [Troubleshooting](#troubleshooting) section

---

<div align="center">

**⭐ If you find this project helpful, please give it a star on GitHub!**

Built with ❤️ by [Barie Wakjira](https://github.com/bariewakjira-coder)

</div>
