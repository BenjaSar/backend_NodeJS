import db from "../data/data.js";
import { doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import logger from "../utils/logger.js";

export async function getProductByIdModels(id) {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = { id: docSnap.id, ...docSnap.data() };

      logger.info("Product retrieved", { id, product });
      return product;
    } else {
      logger.warn(`Product with ID ${id} not found`);
      return null;
    }
  } catch (error) {
    logger.error("Error retrieving product", { id, error });
    throw error;
  }
}

export async function getProductsInStockModels() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    const productsInStock = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(product => product.stock > 0);

    logger.info(`Products in stock fetched: ${productsInStock.length}`);

    return productsInStock;

  } catch (error) {
    logger.error("Error fetching products in stock", { error });
    throw error;
  }
}


export async function createProductModels(productData) {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
      category: productData.category,
      //createdAt: new Date(),
    });
    logger.info("Product added with ID: ", docRef.id);

    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error("Error adding product:", error);
    logger.error("Error adding product:", error);
    throw error;
  }
}

export async function getAllProductsModels() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    logger.info("All products fetched", { count: products.length });
    return products;
    } catch (error) {
        logger.error('Error fetching all products:', error);
        throw error;
    }
}


export async function updateProductModels(productId, updateData) {
    try {
        const docRef = doc(db, "products", productId);
        await updateDoc(docRef, updateData);
        const updatedDoc = await getDoc(docRef);
        logger.info(`Product updated with ID: ${productId}`);
        return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (error) {
        logger.error(`Error updating product with ID: ${productId}`, { error });
        throw error;
    }
}


export async function deleteProductModels(productId) {
    try {
        const docRef = doc(db, "products", productId);
        await deleteDoc(docRef);
        logger.info(`Product deleted with ID: ${productId}`);
    } catch (error) {
        logger.error(`Error deleting product with ID: ${productId}`, { error });
        throw error;
    }
}

