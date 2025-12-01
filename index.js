import express from "express";
import logger from "./src/utils/logger.js";
import { metricsMiddleware, metricsRouter } from "./src/metrics.js";
import cors from "cors";
import productsRouter from "./src/routes/products.routes.js";
import routerUser from "./src/routes/auth.route.js";
import {authenticateToken}  from "./src/middleware/authentication.js";

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";

const corsOptions = {
  origin: ALLOWED_ORIGINS,
  optionsSuccessStatus: 204,
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  alloweHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Kuma-Revision"],
  credentials: true,
  maxAge: 600,
};


// CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// Apply metrics middleware
app.use(metricsMiddleware);

// Authentication routes (no token required)
app.use("/api", routerUser);

// Expose /metrics for Prometheus to scrape
app.use("/metrics", metricsRouter);

// Global middleware
app.use((req, res, next) => {
  console.log(`Datos received at:  ${req.method} ${req.url}`);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
  
// Add this route before the 404 handler
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the API</h1><p>Available endpoints: /HTML, /ping, /api, /health</p>");
});


// Main route
app.get("/HTML", (req, res) => {
  res.send("<h1>Hello, World from express with middlewares!</h1>");
});

app.get("/ping", (req, res) => {
  res.send("Answering /pong with express!");
  logger.info("Answering /pong with express!");
});

// Protected routes (token required)
app.use(authenticateToken);
app.use("/api", productsRouter);

app.get("/items", (req, res) => {
  const category = req.query.category;
  const price = req.query.price;
  res.send(`Categoría: ${category}, Precio: ${price}`);
  logger.info(`Categoría: ${category}, Precio: ${price}`);
});

app.get("/health", (req, res) => {
  const healthStatus = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.status(200).json(healthStatus);
    logger.info("Health check successful");
  } catch (error) {
    healthStatus.message = error;
    res.status(503).json(healthStatus);
    logger.error(`Health check failed: ${error.message}`);
  }
});

// 404 handler should be at the end
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);

  return res.status(404).json({
    error: {
      message: "Route not found"
    }
  });
});

// Centralized error handling middleware
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    logger.error(`Error encountered: ${error.message}`);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message || "Internal Server Error"
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  logger.info(`Server running at http://localhost:${PORT}/`);
});
