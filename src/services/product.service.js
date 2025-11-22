import logger from "../utils/logger.js";
import { NotFoundError } from "../utils/errors.js";
import {getAllProductsModels, getProductByIdModels, getProductsInStockModels, updateProductModels, deleteProductModels, createProductModels} from "../models/products.model.js";


export const  getAllProductsService = async  () => {
  return new Promise(async (resolve, reject) => {
      try {
        const productsModel = await getAllProductsModels();
        resolve(productsModel);
      } catch (error) {
        reject(error);
      }
});
}

export const  getProductByIdService = async (productId) => {
  const productsById = await getProductByIdModels(productId);
  //console.log("This is the service layer", productsById);
  return productsById;
}

export const getProductsInStockService = async () => {
  try {
    const products = await getProductsInStockModels();
    const count = Array.isArray(products) ? products.length : 0;
    logger.info(`Products in stock fetched: ${count}`);
    return products;
  } catch (error) {
    logger.error("Error in getProductsInStockService:", error);
    throw error;
  }
};

//#TODO : create new product service - validation of data and checking with model.
export const addNewProductService = async(productData) => {
  if (
    !productData.name ||
    typeof productData.price !== 'number' ||
    !productData.category ||
    productData.stock === undefined
  ) {
    throw new Error("Missing required product fields: name, price,  category, stock");
  }
  if (productData.price < 0 || productData.stock < 0) {
    logger.error("Price and stock must be non-negative");
    throw new Error("Price and stock must be non-negative");
  }
  return await createProductModels(productData);
}

//#TODO : update product stock service - validation of data and checking with model.
export const  updateProductStockService = async(productId, newStock) => {
  if (newStock < 0) {
    logger.error("Stock must be non-negative");
    throw new Error("Stock must be non-negative");
  }
  const product = await getProductByIdModels(productId);
  if (!product) {
    logger.error(`Product with ID ${productId} for the updating proccess was not found`);
    throw new Error("Product not found");
  }
  return await updateProductModels(productId, { stock: newStock });
}

export const deleteProductService = async(productId) => {
  const product = await getProductByIdModels(productId);
  if (!product) {
    logger.error(`Product with ID ${productId} for the deleting proccess was not found`);
    throw new Error("Product not found");
  }
  return await deleteProductModels(productId);
}

export const updateProductService = async (productId, updateData) => {
  try {
    if (!updateData || typeof updateData !== "object") {
      throw new Error("Invalid update data");
    }

    const product = await getProductByIdModels(productId);
    if (!product) {
      const msg = `Product with ID ${productId} not found (update)`;
      logger.warn(msg);
      throw new Error("Product not found");
    }

    // validate updateData fields (e.g. no negative price/stock)
    if (updateData.price !== undefined && updateData.price < 0) {
      throw new Error("Price must be non-negative");
    }
    if (updateData.stock !== undefined && updateData.stock < 0) {
      throw new Error("Stock must be non-negative");
    }

    const updated = await updateProductModels(productId, updateData);
    return updated;
  } catch (error) {
    logger.error(`Error in updateProductService for id ${productId}:`, error);
    throw error;
  }
};
