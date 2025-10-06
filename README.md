# Meu Projeto (Express + Sequelize + EJS)

Aplicação Node.js com CRUD de produtos e upload de imagens.

## Pré-requisitos
- Node.js 18+
- MySQL 8+

## Banco de dados
Crie o banco:
```sql
CREATE DATABASE loja;
```
Edite `config/database.js` e coloque a senha do seu MySQL em `SENHA_DO_MYSQL`.

## Instalação
```bash
npm install
```

## Executar
```bash
npm run start
# ou em desenvolvimento (com reload automático)
npm run dev
```

Abra http://localhost:3000

## Estrutura
```
config/database.js      # conexão Sequelize
models/Produto.js       # model Produto
controllers/            # regras de negócio (listar, criar, remover)
routes/                 # rotas Express + Multer
views/index.ejs         # interface (lista + formulário)
public/css/styles.css   # estilos
public/uploads/         # imagens enviadas
```

## Observação
Este pacote foi gerado com base no esqueleto que você forneceu (Express + Sequelize + EJS). 
