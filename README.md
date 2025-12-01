![header](doc/imgs/LogoHeader.png)

# Project Store REST API

A production-ready Express.js REST API for managing products and users with JWT authentication, health monitoring, and Prometheus metrics.

## Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Technologies](#technologies)

## Quick Start

### Prerequisites

- Node.js v18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/BenjaSar/backend_NodeJS.git
cd Project
npm install
```

### Setup

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
ALLOWED_ORIGINS=*
```

### Run Server

```bash
npm start
```

Server runs at `http://localhost:3000/`

## Features

- RESTful API with CRUD operations
- JWT token-based authentication
- Product management with stock tracking
- Health monitoring endpoint
- Prometheus metrics integration
- Comprehensive request logging (Winston)
- CORS support
- Centralized error handling
- Database integration (Firebase/MongoDB)
- Automatic restart on file changes (Nodemon)

## API Endpoints

### General

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Welcome page | No |
| GET | `/health` | Server health check | No |
| GET | `/ping` | Ping endpoint | No |
| GET | `/metrics` | Prometheus metrics | No |

### Authentication

| Method | Endpoint | Body | Auth |
|--------|----------|------|------|
| POST | `/api/login` | `{ "username", "password" }` | No |

**Login Example:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"<your-username>","password":"<your-password>"}'
```

**Response:**
```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

### Products

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products | Yes |
| GET | `/api/products/:id` | Get product by ID | Yes |
| GET | `/api/products/in-stock` | Get in-stock products | Yes |
| POST | `/api/products/create` | Create product | Yes |
| PATCH | `/api/products/:id/stock` | Update stock | Yes |
| DELETE | `/api/products/:id` | Delete product | Yes |

**Create Product Example:**
```bash
curl -X POST http://localhost:3000/api/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Product Name",
    "price": 99.99,
    "category": "electronics",
    "stock": 50
  }'
```

**Required Fields for Product Creation:**
- `name` - Product name (string)
- `price` - Product price (number)
- `category` - Product category (string)
- `stock` - Stock quantity (number)

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

**Default Test Credentials:**
- Username: `<your-usenname>`
- Password: `<your-password>`

1. Login to get a token
2. Use token in subsequent requests

## Project Structure

```
Project/
├── index.js                 # Server entry point
├── package.json
├── .env                     # Environment variables
├── prometheus.yml           # Prometheus config
├── src/
│   ├── controllers/         # Request handlers
│   ├── services/            # Business logic
│   ├── routes/              # API routes
│   ├── models/              # Data models
│   ├── middleware/          # JWT validation
│   ├── utils/               # Logger, utilities
│   ├── data/                # Static data
│   └── logs/                # Application logs
└── doc/                     # Documentation assets
```

**Architecture:** Routes → Controllers → Services → Models

## Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=*

# JWT
JWT_SECRET=your_super_secret_key

# Firebase (optional)
FIREBASE_API_KEY=key
FIREBASE_PROJECT_ID=project_id
FIREBASE_AUTH_DOMAIN=auth_domain

# MongoDB (optional)
MONGODB_URI=mongodb://localhost:27017/store
```

## Technologies

- **Express.js** - Web framework
- **JWT** - Authentication
- **Winston** - Logging
- **CORS** - Cross-origin requests
- **Prometheus** - Metrics
- **Nodemon** - Dev server reload
- **Firebase** - Optional auth/database
- **Mongoose** - Optional MongoDB ODM

## Common Issues

**Module Not Found:**
- Check import paths and file names
- Ensure correct directory structure

**JWT Token Errors:**
- Verify token in Authorization header
- Check JWT_SECRET is set in .env
- Ensure token hasn't expired

**CORS Issues:**
- Update ALLOWED_ORIGINS in .env
- Verify client sends proper headers

**Product Creation Fails:**
- Ensure all required fields: name, price, category, stock
- Check field values are correct types
- Verify Content-Type: application/json header

## Health Check

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "uptime": 123.456,
  "message": "OK",
  "timestamp": 1700318000000
}
```

## Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push branch: `git push origin feature/name`
5. Open Pull Request

## License

MIT

## Author

**FS** - Backend Developer

---

Made with ❤️

![footer](doc/imgs/LogoFooter.png)
