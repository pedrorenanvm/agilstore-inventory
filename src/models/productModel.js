const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class ProductModel {
  constructor() {
    this.filePath = path.resolve(__dirname, '../products.json');
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error("Erro ao salvar os produtos no arquivo:", error.message);
    }
  }


  addProduct(product) {
    const newProduct = { id: uuidv4(), ...product };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getAll(filterBy = null, orderBy = null) {
    let result = [...this.products];

    if (filterBy) {
      result = result.filter((product) => product.category === filterBy);
    }

    if (orderBy) {
      result.sort((a, b) => {
        if (orderBy === 'name') return a.name.localeCompare(b.name);
        if (orderBy === 'quantity') return a.quantity - b.quantity;
        if (orderBy === 'price') return a.price - b.price;
        return 0;
      });
    }

    return result;
  }

  findById(id) {
    return this.products.find((product) => product.id === id);
  }

  search(query) {
    return this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.id === query
    );
  }

  updateProduct(id, updates) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) return null;

    const updatedProduct = { ...this.products[productIndex], ...updates };

    if (updates.name && updates.name.trim() === '') {
      throw new Error('Nome inválido');
    }
    if (updates.quantity !== undefined && (isNaN(updates.quantity) || updates.quantity < 0)) {
      throw new Error('Quantidade inválida');
    }
    if (updates.price !== undefined && (isNaN(updates.price) || updates.price < 0)) {
      throw new Error('Preço inválido');
    }


    this.products[productIndex] = updatedProduct;
    this.saveProducts();
    return updatedProduct;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) return null;

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    this.saveProducts();
    return deletedProduct;
  }
}

module.exports = ProductModel;
