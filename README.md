![header](doc/imgs/LogoHeader.png)

# Project Store REST API

This project is an Express-based REST API for managing products. It provides endpoints for CRUD operations (Create, Read, Update, Delete) on products, along with health monitoring and metrics collection.

## Features

- RESTful API endpoints for product management
- Health check endpoint
- Prometheus metrics integration
- CORS support
- Request logging with Winston
- Error handling and 404 routing

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or pnpm

### Installation

1. Clone this repository:
   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```sh
   cd Project
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file (if needed) for environment variables:
   ```
   PORT=3000
   ALLOWED_ORIGINS=*
   ```

### Running the Server

Start the development server:
```sh
npm start
```

The server will run at `http://localhost:3000/`

## API Endpoints

### General Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome page with available endpoints |
| GET | `/health` | Health check - returns server status |
| GET | `/ping` | Simple ping endpoint |
| GET | `/metrics` | Prometheus metrics |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/in-stock` | Get products with stock > 0 |
| GET | `/api/products/:id` | Get a specific product by ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id/stock` | Update product stock |

### Example Requests

**Get All Products:**
```sh
curl http://localhost:3000/api/products
```

**Get Product by ID:**
```sh
curl http://localhost:3000/api/products/1
```

**Create New Product:**
```sh
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Product","price":100,"stock":50}'
```

**Update Product Stock:**
```sh
curl -X PUT http://localhost:3000/api/products/1/stock \
  -H "Content-Type: application/json" \
  -d '{"stock":25}'
```

## Project Structure

```
Project/
├── index.js                          # Main server file
├── src/
│   ├── controllers/                  # Request handlers
│   │   └── products.controller.js
│   ├── services/                     # Business logic
│   │   └── product.service.js
│   ├── routes/                       # API routes
│   │   └── products.routes.js
│   ├── utils/                        # Utilities
│   │   └── logger.js                # Winston logger
│   ├── metrics.js                    # Prometheus metrics
│   └── fakestoreAPI.js              # External API integration
├── logs/                            # Log files
└── doc/                             # Documentation assets

```


### Architecture Improvements
- Properly separated concerns: Routes → Controllers → Services
- Fixed circular dependencies and naming conflicts
- Improved error handling in services and controllers

## Error Handling

- 404 errors for undefined routes
- 500 errors for server-side issues
- Proper error logging with Winston
- Validation for required product fields and non-negative values


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

MIT

## Author

FS

---

Done with :heart:

![footer](doc/imgs/LogoFooter.png)
