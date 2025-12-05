const express = require("express");
const router = express.Router();
const vendaController = require("../controllers/vendaController");
const Imovel = require("../models/Imovel");

// Lista todas as vendas
router.get("/", vendaController.listar);

// Formulário para registrar venda
router.get("/create", async (req, res) => {
  try {
    const imoveis = await Imovel.findAll();
    res.render("vendas/create", { imoveis });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar formulário de venda.");
  }
});

// Criar venda (POST)
router.post("/create", vendaController.criar);

// Resumo de vendas
router.get("/resumo", vendaController.resumo);

module.exports = router;
