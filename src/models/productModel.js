const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data.json');

class ProductModel {
  static getAll() {
    const data = fs.readFileSync(filePath, 'uft-8');  
    return JSON.parse(data);
  }

  static saveAll(products) {
    fs.writeFileSync(filePath, JSON.stringify(products,null, 2));
  }
}

module.exports = ProductModel;