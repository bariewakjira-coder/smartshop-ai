# SmartShop AI - Frontend

## Overview

Modern React/Next.js frontend for the SmartShop AI e-commerce platform with AI-powered features.

## Features

- 🎨 Responsive Design with Tailwind CSS
- ⚡ Server-Side Rendering with Next.js 14
- 🎬 Smooth Animations with Framer Motion
- 🔐 JWT Authentication
- 🛒 Shopping Cart Management
- 💬 Real-time Chat with Socket.io
- 📊 Redux State Management
- 📱 Mobile-First Approach

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Real-time**: Socket.io
- **Language**: TypeScript

## Installation

```bash
npm install
```

## Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API URL.

## Running

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── pages/           # API routes
├── hooks/           # Custom hooks
├── styles/          # CSS files
├── store/           # Redux store
└── utils/           # Utilities
```

## Key Pages

- `/` - Homepage
- `/products` - Product Catalog
- `/product/[id]` - Product Details
- `/cart` - Shopping Cart
- `/login` - Login Page
- `/register` - Registration Page
- `/dashboard` - User Dashboard

## Testing

```bash
npm test
npm run test:coverage
```

## Building

```bash
npm run build
```

## Deployment

Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md)

## License

MIT
