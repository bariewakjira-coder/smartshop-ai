# Contributing to SmartShop AI

Thank you for your interest in contributing to SmartShop AI! This document provides guidelines and instructions for contributing.

## 📋 Code of Conduct

Please be respectful and inclusive. We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+
- Git

### Setup Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/smartshop-ai.git`
3. Add upstream: `git remote add upstream https://github.com/bariewakjira-coder/smartshop-ai.git`
4. Create feature branch: `git checkout -b feature/your-feature-name`
5. Install dependencies and setup as per README

## 📝 Contribution Types

### Bug Reports
- Use GitHub Issues
- Provide clear description and reproduction steps
- Include relevant logs and screenshots

### Feature Requests
- Use GitHub Discussions
- Clearly describe the feature and use case
- Discuss implementation approach

### Code Contributions
1. Make sure your code follows our style guide
2. Write/update tests for your changes
3. Update documentation
4. Commit with clear messages
5. Push to your fork
6. Create a Pull Request

## 💻 Development Workflow

### Branch Naming
- Feature: `feature/description`
- Bug: `bugfix/description`
- Docs: `docs/description`
- Test: `test/description`

### Commit Messages
```
[TYPE] Brief description

Detailed explanation if needed.

Types: feat, fix, docs, style, refactor, test, chore
```

### Pull Request Process
1. Update README if needed
2. Add tests for new functionality
3. Ensure all tests pass: `npm test`
4. Keep PR focused on single feature/fix
5. Provide clear PR description
6. Be responsive to review feedback

## 🎨 Code Style

### JavaScript/TypeScript
- Use ESLint configuration
- Format with Prettier: `npm run format`
- Use camelCase for variables
- Use PascalCase for components

### Python
- Follow PEP 8
- Use Black formatter: `black .`
- Use meaningful variable names

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

## 📚 Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for functions
- Update API documentation
- Include examples for complex features

## 🔍 Review Process

1. Code review by maintainers
2. Automated tests must pass
3. At least 1 approval required
4. Address review comments
5. Merge when approved

## 📞 Questions?

Create an issue or discussion, or email: bariewakjira2@gmail.com

## ✨ Thank You!

Thank you for contributing to SmartShop AI!
