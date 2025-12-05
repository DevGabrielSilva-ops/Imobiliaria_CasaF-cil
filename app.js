// app.js
const express = require("express");
const path = require("path");

// Rotas
const imovelRoutes = require("./routes/imovelRoutes");
const vendaRoutes = require("./routes/vendaRoutes");

// Banco de dados
const sequelize = require("./config/database");

// Models
const Imovel = require("./models/Imovel");
const Venda = require("./models/Venda");

const app = express();

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve css, uploads etc

// Rotas
app.use("/", imovelRoutes);      // rotas de imóveis
app.use("/vendas", vendaRoutes); // rotas de vendas

// Redireciona "/" para lista de imóveis
app.get("/", async (req, res) => {
  try {
    const imoveis = await Imovel.findAll({ order: [["createdAt", "DESC"]] });
    res.render("index", { imoveis });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar imóveis.");
  }
});

// Sincroniza o banco
sequelize
  .sync({ alter: true }) // atualiza tabelas existentes, adicionando colunas como 'vendido'
  .then(() => {
    console.log("Banco de dados sincronizado!");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco:", err);
    process.exit(1);
  });
