// controllers/imovelController.js
const Imovel = require("../models/Imovel");
const path = require("path");
const fs = require("fs");

exports.listar = async (req, res) => {
  try {
    const imoveis = await Imovel.findAll({ order: [["id", "DESC"]] });
    res.render("index", { imoveis });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao listar imóveis.");
  }
};

exports.criar = async (req, res) => {
  try {
    const { titulo, descricao, preco, endereco, quartos, banheiros, area, garagem } = req.body;
    const imagem = req.file ? req.file.filename : null;

    await Imovel.create({
      titulo,
      descricao,
      preco: parseFloat(preco) || 0,
      endereco,
      quartos: quartos ? parseInt(quartos) : null,
      banheiros: banheiros ? parseInt(banheiros) : null,
      area: area ? parseFloat(area) : null,
      garagem: garagem === "on",
      imagem
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar imóvel.");
  }
};

exports.remover = async (req, res) => {
  try {
    const id = req.params.id;
    const imovel = await Imovel.findByPk(id);
    if (!imovel) return res.status(404).send("Imóvel não encontrado");

    if (imovel.imagem) {
      const filePath = path.join(__dirname, "..", "public", "uploads", imovel.imagem);
      fs.unlink(filePath, () => {});
    }

    await imovel.destroy();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao remover imóvel.");
  }
};
