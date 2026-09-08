# SmartShop AI - Backend API

## Overview

Node.js/Express REST API for the SmartShop AI e-commerce platform with AI/ML integration.

## Features

- ✅ JWT Authentication
- ✅ Product Management
- ✅ Order Processing
- ✅ User Profiles
- ✅ Real-time Chat via Socket.io
- ✅ Redis Caching
- ✅ Role-based Access Control
- ✅ API Documentation (Swagger)

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Cache**: Redis
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI

## Installation

```bash
npm install
```

## Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration.

## Running

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Database Setup

```bash
npm run migrate
npm run seed
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh token
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/products/search/query` - Search products

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/orders` - Get user orders
- `GET /api/users/preferences` - Get preferences
- `PUT /api/users/preferences` - Update preferences

## Testing

```bash
npm test
npm run test:coverage
```

## Linting

```bash
npm run lint
npm run lint:fix
npm run format
```

## Documentation

API docs available at: `http://localhost:3001/api-docs`

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md)

## License

MIT
