import db from '../data/data.js';
import data from '../data/data.js';
import { doc, collection, getDoc } from 'firebase/firestore';
import logger from "../utils/logger.js";




export async function getProductByIdModels() {
    const docRef = doc(db, 'products','EhQgulC7iEHo3JkwY92b');

    const docsSnap = await getDoc(docRef);

    if (docsSnap.exists()) {
        logger.info('Document data:', docsSnap.data());
        console.log('Document data:', docsSnap.data());
        return docsSnap.data();
    } else {
        console.log('No such document!');
        return null;
    }   
}

export async function getAllProductsModels() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
    });
    //return products;
}

export async function getProductsInStockModels() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsInStock = []; 
    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.stock > 0) {
            productsInStock.push({ id: doc.id, ...productData });
        }
    });
    return productsInStock;
}