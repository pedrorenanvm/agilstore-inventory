const ProductModel = require("../models/productModel");
const {v4: uuidv4} = require('uuid');

class InventoryService { 
  static getAll({name, category, quantity, price}) {
    const products = ProductModel.getAll();
    const newProduct = {
      id: uuidv4(),
      name,
      category,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };

    products.push(newProduct);
    ProductModel.saveAll(products);
    return newProduct;
  }

  static listProducts(){
    return ProductModel.getAll();
  }

  static findProductById(id){
    const products = ProductModel.getAll();
    return products.find((products) => products.id === id);
  }

  static updateProduct(id, updates){
    const products = ProductModel.getAll();
    const productIndex = products.findIndex((product) => product.id === id);

    if(productIndex === -1) return null;

    products[productIndex] = { ...products[productIndex], ...updates };
    ProductModel.saveAll(products);
    return products[productIndex];
  }

  static deleteProduct(id){
    let products = ProductModel.getAll();
    const product = products.find((product) => product.id === id);
    if(!product) return null;

    products = products.filter((product) => product.id !== id);
    ProductModel.saveAll(products); 
    return product;
  }
}

module.exports = InventoryService;