const { log } = require("console");
const { default: logger } = require("../logger");
const productsModel = require("../models/products.model");
const usersModel = require("../models/user.model");

async function getProductsInStock() {
  const products = await productsModel.getAllProducts();
  return products.filter((product) => product.stock > 0);
}

async function addNewProduct(productData) {
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

async function updateProductStock(productId, newStock) {
  if (newStock < 0) {
    logger.error("Stock must be non-negative");
    throw new Error("Stock must be non-negative");
  }
  const product = await productsModel.getProductById(productId);
  if (!product) {
    logger.error(`Product with ID ${productId} not found`);
    throw new Error("Product not found");
  }
  return await productsModel.updateProduct(productId, { stock: newStock });
}

module.exports = {
  getProductsInStock,
  addNewProduct,
  updateProductStock,
};  
