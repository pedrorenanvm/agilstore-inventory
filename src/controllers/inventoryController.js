const const inquirer = require('inquirer');
const chalk = require('chalk');
const InventoryService = require('../services/InventoryService');


class InventoryController {
  static async mainMenu() {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          "Adicionar Produto",
          "Listar Produtos",
          "Buscar Produto",
          "Atualizar Produto",
          "Deletar Produto",
          "Sair",
        ],
      },
    ]);


    switch (action) {
      case "Adicionar Produto":
        this.addProduct();
        break;
      case "Listar Produtos":
        InventoryController.listProducts();
        break;
      case "Buscar Produto":
        InventoryController.findProduct();
        break;
      case "Atualizar Produto":
        InventoryController.updateProduct();
        break;
      case "Deletar Produto":
        InventoryController.deleteProduct();
        break;
      case "Sair":
        console.log(chalk.green("Obrigado por utilizar nossos serviços!"));
        process.exit();
    }

    this.mainMenu();
  }


  static async addProduct() {
    const answers = await inquirer.prompt([
      { name: "name", message: "Nome do Produto:" },
      { name: "category", message: "Categoria:" },
      { name: "quantity", message: "Quantidade em Estoque:", validate: (value) => !isNaN(value)},
      { name: "price", message: "Preço:", validate: (value) => !isNaN(value)},
    ]);

    const product = InventoryService.saveProduct(answers);
    console.log(chalk.green(`Produto adicionado com sucesso!`), product);
  }


  static listProducts(){
    const products = InventoryService.listProducts();
    console.table(products);
  }

  static async updateProduct() {
    const { id } = await inquirer.prompt([
      { name: "id", message: "ID do Produto:" },
    ]);

    const product = InventoryService.findProductById(id);
    if (!product) {
      console.log(chalk.red("Produto não encontrado!"));
      return;
  }

    const updates = await inquirer.prompt([
      { name: "name", message: `Nome (${product.name}):`, default: product.name },
      { name: "category", message: `Categoria (${product.category}):`, default: product.category },
      { name: "quantity", message: `Quantidade (${product.quantity}):`, default: product.quantity },
      { name: "price", message: `Preço (${product.price}):`, default: product.price },
    ]);

    const updatedProduct = InventoryService.updateProduct(id, updates);
    console.log(chalk.green(`Produto atualizado com sucesso!`), updatedProduct);
  }

  static async deleteProduct(){
    const { id } = await inquirer.prompt([
      { name: "id", message: "ID do Produto:" },
    ]);
    const product = InventoryService.deleteProduct(id);

    if(!product) {
      console.log(chalk.red("Produto nao encontrado!"));
    }

    console.log(chalk.green(`Produto deletado com sucesso!`), product);

  } 

  static async searchProduct() {
    const { term } = await inquirer.prompt([
      { name: "term", message: "ID ou Nome o Produto:" },
    ]);
    const product = InventoryService.listProducts();
    const results = product.filter(
      (p) => p.id === term || p.name.toLowerCase().includes(term.toLowerCase())
    );

    if(results.length === 0){
      console.log(chalk.red("Produto nao encontrado!"));
    }else{
      console.table(results);
    }
  }

}

module.exports = InventoryController;