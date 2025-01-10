const inquirer = require('inquirer');
const chalk = require('chalk');
const InventoryService = require('../services/inventoryService');


class InventoryController {
  static async mainMenu() {
    let exit = false;
    while(!exit) {
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
          await this.addProduct();
          break;
        case "Listar Produtos":
          await this.listProducts();
          break;
        case "Buscar Produto":
          await this.searchProduct();
          break;
        case "Atualizar Produto":
          await this.updateProduct();
          break;
        case "Deletar Produto":
          await this.deleteProduct();
          break;
        case "Sair":
          console.log(chalk.green("Obrigado por utilizar nossos serviços!"));
          process.exit();
      }
    }

    await this.mainMenu();
  }


  static async addProduct() {
    const answers = await inquirer.prompt([
      { name: "name", message: "Nome do Produto:", validate: (value) =>
      {
        if (value.trim() === '') {
          return 'Digite um nome valido!';
        }
        return true;
      }
      },
      { name: "category", message: "Categoria:", validate: (value) =>
      {
        if (value.trim() === '') {
          return 'Digite uma categoria valida!';
        }
        return true;
      }
      },
      { name: "quantity", message: "Quantidade em Estoque:", validate: (value) => 
        {
          if (isNaN(value)  || value < 0 || value.trim() === '') {
           return 'Digite um número válido!';
          }
          return true;
        }
      },
      
      { name: "price", message: "Preço:", validate: (value) => 
        { 
          if(isNaN(value) || value < 0 || value.trim() === '') {
            return 'Digite um preço valido!';
          }
          return true;
        }  
      },
    ]);

    const product = InventoryService.saveProduct(answers);
    console.log(chalk.green(`Produto adicionado com sucesso!`), product);
  }


  static async listProducts() {
    const { filterBy } = await inquirer.prompt([
      {
        name: "filterBy",
        message: "Deseja filtrar por categoria? (Deixe vazio para não filtrar)",
        default: "",
      },
    ]);

    const { orderBy } = await inquirer.prompt([
      {
        type: "list",
        name: "orderBy",
        message: "Escolha a ordem que os produtos devem ser ordenados",
        choices: [
          { name: "Nome", value: "name" },
          { name: "Quantidade", value: "quantity" },
          { name: "Preço", value: "price" },
          { name: "Sem ordenação", value: null },
        ],
      },
    ]);

    const products = InventoryService.listProducts(filterBy || null, orderBy || null);

    if (products.length === 0) {
      console.log(chalk.red("Nenhum produto encontrado."));
    } else {
      console.table(products);
    }
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
      { name: "term", message: "ID ou Nome do Produto:" },
    ]);

    const results = InventoryService.searchProduct(term);

    if (results.length === 0) {
      console.log(chalk.red("Produto não encontrado!"));
    } else {
      console.table(results);
    }
  }

}

module.exports = InventoryController;