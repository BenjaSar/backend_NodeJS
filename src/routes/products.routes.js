import express  from "express";
//import { Router } from "express"; 
import { getAllProducts, getProductById, createProduct, getProductsInStock, updateProduct, deleteProduct } from "../controllers/products.controller.js"; 
const router = express.Router();



// get all products
router.get("/products", getAllProducts)
router.get("/products/in-stock", getProductsInStock);
router.get("/products/:id", getProductById);
router.post("/products/create", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);




export default router;

