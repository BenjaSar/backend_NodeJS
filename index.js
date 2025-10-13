import {
  readAllProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./src/fakestoreAPI.js";

import express from "express";
import logger from "./src/logger.js";
import { metricsMiddleware, metricsRouter } from './src/metrics.js';


const app = express();
const PORT = 3001;
app.use(express.json());

// Apply metrics middleware
app.use(metricsMiddleware);

// Expose /metrics for Prometheus to scrape
app.use(metricsRouter);



const router = express.Router();


// Global middleware
app.use((req, res, next) => {
  console.log(`Datos received at:  ${req.method} ${req.url}`);
  next();
});


// Main route
app.get('/', (req, res) => {
  res.send('Hello, World from express with middlewares!');
});

app.get('/ping', (req, res) => {
  res.send('Answering /pong with express!');
  logger.info('Answering /pong with express!');
})

app.get('/health', (req, res) => {
    const healthStatus = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.status(200).json(healthStatus);
        logger.info('Health check successful');       
    } catch (error) {
        healthStatus.message = error;
        res.status(503).json(healthStatus);
        logger.error(`Health check failed: ${error.message}`);
    }
    
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
