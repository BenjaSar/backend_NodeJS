
import {
  getAllProductsService,
  getProductByIdService,
  getProductsInStockService,
  addNewProductService,
} from "../services/product.service.js";
import logger from "../utils/logger.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
    logger.info("Fetched all products");
  } catch (err) {
    logger.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  try {
    const product = await getProductByIdService(productId);
    if (!product) {
      logger.warn(`Product with ID ${productId} not found`);
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
    logger.info(`Fetched product with ID ${productId}`);
  } catch (err) {
    console.error(`Error fetching product with ID ${productId}:`, err);
    logger.error(`Error fetching product with ID ${productId}:`, err);
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  const productData = req.body; 
    try {
    const newProduct = await addNewProductService(productData);
    res.status(201).json(newProduct);
    logger.info(`Created new product with ID ${newProduct.id}`);
  } catch (err) {
    logger.error("Error creating product:", err);
    res.status(500).json({ error: err.message });
  } 
};

export const getProductsInStock = async (req, res) => {
  try {
    const products = await getProductsInStockService(); 
    res.status(200).json(products);
    logger.info("Fetched products in stock");
  } catch (err) {
    logger.error("Error fetching products in stock:", err);
    res.status(500).json({ error: err.message });
  } 
};

export const updateProductStock = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { stock } = req.body; 
  try {
    const updatedProduct = await updateProductStockService(productId, stock);
    res.status(200).json(updatedProduct);
    logger.info(`Updated stock for product with ID ${productId}`);
  } catch (err) {
    logger.error(`Error updating stock for product with ID ${productId}:`, err);
    res.status(500).json({ error: err.message });
  }
};
