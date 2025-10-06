const express = require("express");
const path = require("path");
const imovelRoutes = require("./routes/imovelRoutes");
const sequelize = require("./config/database");
require("./models/Imovel"); // garante o registro do model

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // serve public (css, uploads etc)

// rotas
app.use("/", imovelRoutes);

// conecta e sobe o servidor
sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado!");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco:", err);
    process.exit(1);
  });