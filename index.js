import {
  readAllProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./src/fakestoreAPI.js";

import express from "express";
import logger from "./src/utils/logger.js";
import { metricsMiddleware, metricsRouter } from "./src/metrics.js";
import cors from "cors";
import productsRouter from "./src/routes/products.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";

app.use(express.json());

// Apply metrics middleware
app.use(metricsMiddleware);

// Expose /metrics for Prometheus to scrape
app.use(metricsRouter);

const corsOptions = {
  origin: ALLOWED_ORIGINS,
  optionsSuccessStatus: 204,
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  alloweHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Kuma-Revision"],
  credentials: true,
  maxAge: 600,
};

//const router = express.Router();

// CORS middleware
app.use(cors(corsOptions));

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

app.get("/item/:id", (req, res) => {
  // Captura el valor dinámico de la ruta
  const itemId = req.params.id;
  res.send(`You requested item with ID: ${itemId}`);
  logger.info(`You requested item with ID: ${itemId}`);
});

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
app.use((req, res, next) => {
  res.status(404).send("Route not found");
  logger.warn(`Route not found: ${req.method} ${req.url}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  logger.info(`Server running at http://localhost:${PORT}/`);
});

// const args = process.argv.slice(2);

// if (args[0] == "GET" && args[1] == "products") {
//   readAllProducts();
// } else if (args[0] == "GET" && args[1].includes("products/")) {
//   readProductById(args[1]);
// } else if (
//   args[0] == "POST" &&
//   args[1] == "products" &&
//   args.length == 5
// ) {
//   const newProduct = {
//     title: args[2],
//     price: parseFloat(args[3]),
//     description: args[4]
//   };
//   createProduct(newProduct);
//   console.log(`Creating data according to ${args[1]}`);
// } else if (args[0] == "UPDATE" && args[1].includes("products") && args.length == 5) {
//   const updatedProduct = {
//     price: parseFloat(args[3]),
//     category: args[4],
//   };
//   updateProduct(args[2], updatedProduct);

//   const dataToLog = updatedProduct.title ? updatedProduct.title : `ID: ${args[2]}`;

//   console.log(`${dataToLog} was updated`);
// } else if (args[0] == "DELETE" && args[1].includes("products/")) {
//   deleteProduct(args[1]);
//   console.log(`Deleting data according to ${args[1]}`);
// } else {
//   console.log("Command not recognized. Please use GET, POST, PUT or DELETE");
//   process.exit(1);
// }
