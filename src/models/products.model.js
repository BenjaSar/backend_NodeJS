import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const dbPath = path.join(__dirname, 'db.json');

async function readDB() {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const products = await JSON.parse(data);
        return products;
    } catch (error) {
        console.error('Error reading database:', error);
        return [];
    } 
}

export async function getAllProductsModels() {
    const productsModel = await readDB();
    return productsModel;
}

export async function getProductByIdModels(id) {
    const productsModel = await readDB();
    const productId = parseInt(id);
    const product = productsModel.find((p) => p.id === productId);  
    return product
}

export async function getProductsInStockModels() {
    const productsModel = await readDB();
    console.log("All products in db stage stock:", productsModel);
    const productsInStock = productsModel.filter((product) => product.stock > 0);

    return productsInStock
}

export async function createProductModels(productData) {
    const productsModel = await readDB();
    const newProductId = productsModel.length > 0 ? Math.max(...productsModel.map(p => p.id)) + 1 : 1;  
    const newProduct = {
        id: newProductId,
        name: productData.name, 
        price: productData.price,
        stock: productData.stock
    };
    productsModel.push(newProduct);
    fs.writeFileSync(dbPath, JSON.stringify(productsModel, null, 2));
    return newProduct;
}

export async function updateProductStockModels(productId, updateData) {
    const productsModel = await readDB();
    const productIndex = productsModel.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
        throw new Error("Product not found");
    }   
    productsModel[productIndex].stock = updateData.stock;
    fs.writeFileSync(dbPath, JSON.stringify(productsModel, null, 2));
    return productsModel[productIndex];
}
