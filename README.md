# Desafio Gerenciamento de Produtos para a Loja AgilStore

## Descrição

Este é um sistema simples de gerenciamento de inventário desenvolvido em Node.js. Ele permite adicionar, listar, filtrar e ordenar produtos no estoque. O sistema é executado via linha de comando e utiliza bibliotecas para melhorar a experiência do usuário e a funcionalidade.

## Tecnologias e Bibliotecas Utilizadas

- **JavaScript**: Linguagem de programação utilizada para desenvolver o sistema.
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Chalk**: Utilizada para estilizar a saída no terminal com cores.
- **Inquirer**: Utilizada para interagir com o usuário via prompts no terminal.
- **UUID**: Utilizada para gerar identificadores únicos para cada produto no inventário.
- **File System (fs)**: Para leitura e gravação no arquivo JSON.

## Requisitos para Execução

- [Node.js](https://nodejs.org/) instalado (versão 14 ou superior).

## Instruções para Rodar a Aplicação Localmente

### 1. Clonar o Repositório

Use o seguinte comando para clonar o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### 2. Navegar até o Diretório do Projeto

```bash
cd seu-repositorio
```

### 3. Instalar Dependências

Instale as dependências necessárias utilizando o NPM:

```bash
npm install
```

### 4. Executar a Aplicação

Para iniciar o sistema, utilize o comando:

```bash
node src/app.js
```

### 5. Testar a Aplicação

Siga as instruções apresentadas no terminal para interagir com o sistema de inventário.

## Funcionalidades

- **Adicionar Produto**: Insira novos produtos no inventário com nome, quantidade e preço.
- **Listar Produtos**: Exiba todos os produtos cadastrados.
- **Atualizar Produto**: Atualize informações de um produto existente por ID.
- **Buscar Produto**: Procure por um produto utilizando o ID ou o nome.
- **Excluir Produto**: Remova produtos do inventário por ID.
- **Persistência**: Os dados são salvos no arquivo JSON `data/products.json`.

## Estrutura do Projeto

```
.
├── src
│   ├── app.js            # Ponto de entrada da aplicação
│   ├── controllers       # Controladores que gerenciam as operações
│   │   └── InventoryController.js
│   ├── services          # Lógica de negócio
│   │   └── InventoryService.js
│   ├── models            # Manipulação de dados e persistência
│   │   └── ProductModel.js
│   └── products.json     # Arquivo JSON com os dados persistidos
└── package.json          # Dependências e configuração do projeto
```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

