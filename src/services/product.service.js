import { log } from "console";
import logger from "../utils/logger.js";
//const productsModel = require("../models/products.model");

const productsModel = [
  {
    id: 1,
    name: "Producto 1",
    price: 1000,
    stock: 10,
  },
  {
    id: 2,
    name: "Producto 2",
    price: 2000,
    stock: 22,
  },
];

export const  getAllProductsService = async  () => {
  log("Fetching all products from service");
  return productsModel;
}

export const  getProductByIdService = async (productId) => {
  return productsModel.find((product) => product.id === productId);
}

export const  getProductsInStockService = async () => {
  const products = await productsModel.getAllProductsService();
  return products.filter((product) => product.stock > 0);
}

export const addNewProductService = async(productData) => {
  if (
    !productData.name ||
    !productData.price ||
    productData.stock === undefined
  ) {
    throw new Error("Missing required product fields: name, price, stock");
  }
  if (productData.price < 0 || productData.stock < 0) {
    logger.error("Price and stock must be non-negative");
    throw new Error("Price and stock must be non-negative");
  }
  return await productsModel.createProduct(productData);
}

export const  updateProductStockService = async(productId, newStock) => {
  if (newStock < 0) {
    logger.error("Stock must be non-negative");
    throw new Error("Stock must be non-negative");
  }
  const product = await productsModel.getProductByIdService(productId);
  if (!product) {
    logger.error(`Product with ID ${productId} not found`);
    throw new Error("Product not found");
  }
  return await productsModel.updateProductStockService(productId, { stock: newStock });
}