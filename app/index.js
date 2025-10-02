import {
  readAllProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./fakestoreAPI.js";

const args = process.argv.slice(2);

if (args[0] == "GET" && args[1] == "products") {
  readAllProducts();
} else if (args[0] == "GET" && args[1].includes("products/")) {
  readProductById(args[1]);
} else if (
  args[0] == "POST" &&
  args[1] == "products" &&
  args.length == 5 
) {
  const newProduct = {
    title: args[2],
    price: parseFloat(args[3]),
    description: args[4]
  };
  createProduct(newProduct);
  console.log(`Creating data according to ${args[1]}`);
} else if (args[0] == "UPDATE" && args[1].includes("products") && args.length == 5) {
  const updatedProduct = {
    price: parseFloat(args[3]),
    category: args[4],
  };
  updateProduct(args[2], updatedProduct);
  
  const dataToLog = updatedProduct.title ? updatedProduct.title : `ID: ${args[2]}`; 
    
  console.log(`${dataToLog} was updated`);
} else if (args[0] == "DELETE" && args[1].includes("products/")) {
  deleteProduct(args[1]);
  console.log(`Deleting data according to ${args[1]}`);
} else {
  console.log("Command not recognized. Please use GET, POST, PUT or DELETE");
  process.exit(1);
}
