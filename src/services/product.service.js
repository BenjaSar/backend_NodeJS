import { log } from "console";
import logger from "../utils/logger.js";
//const productsModel = require("../models/products.model");
import {getAllProductsModels, getProductByIdModels, getProductsInStockModels, updateProductStockModels} from "../models/products.model.js";


// const productsModel = [
//   {
//     id: 1,
//     name: "Producto 1",
//     price: 1000,
//     stock: 10,
//   },
//   {
//     id: 2,
//     name: "Producto 2",
//     price: 2000,
//     stock: 22,
//   },
// ];

export const  getAllProductsService = async  () => {
  const productsModel = await getAllProductsModels();
  console.log(productsModel);
  return productsModel;
}

export const  getProductByIdService = async (productId) => {
  const productsById = await getProductByIdModels(productId);
  //console.log("This is the service layer", productsById);
  return productsById;
}

export const  getProductsInStockService = async () => {
  const products = await getProductsInStockModels();
  console.log("Products in stock:", products);
  return products;
}

//#TODO : create new product service - validation of data and checking with model.
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

//#TODO : update product stock service - validation of data and checking with model.
export const  updateProductStockService = async(productId, newStock) => {
  if (newStock < 0) {
    logger.error("Stock must be non-negative");
    throw new Error("Stock must be non-negative");
  }
  const product = await productsModel.getProductByIdService(productId);
  if (!product) {
    logger.error(`Product with ID ${productId} for the updating proccess was not found`);
    throw new Error("Product not found");
  }
  return await productsModel.updateProductStockService(productId, { stock: newStock });
}