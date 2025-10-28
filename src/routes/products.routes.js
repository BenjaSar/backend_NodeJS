import express  from "express";
//import { Router } from "express"; 
import { getAllProducts, getProductById, createProduct, getProductsInStock, updateProductStock } from "../controllers/products.controller.js"; 
const router = express.Router();



// get all products
router.get("/products", getAllProducts)
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.get("/products/in-stock", getProductsInStock);
router.patch("/products/:id/stock", updateProductStock);




export default router;

