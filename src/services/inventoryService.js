const ProductModel = require('../models/ProductModel');

class InventoryService {
  static productModel = new ProductModel();

  static saveProduct({ name, category, quantity, price }) {
    return this.productModel.addProduct({
      name,
      category,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    });
  }

  static listProducts(filterBy = null, orderBy = null) {
    return this.productModel.getAll(filterBy, orderBy);
  }



  static findProductById(id) {
    return this.productModel.findById(id);
  }

  static updateProduct(id, updates) {
    try {
      return this.productModel.updateProduct(id, updates);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static deleteProduct(id) {
    return this.productModel.deleteProduct(id);
  }

  static searchProduct(term) {
    return this.productModel.search(term);
  }
}

module.exports = InventoryService;