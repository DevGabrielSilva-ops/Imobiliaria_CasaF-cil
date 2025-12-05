const Venda = require("../models/Venda");
const Imovel = require("../models/Imovel");

exports.listar = async (req, res) => {
  try {
    const vendas = await Venda.findAll({
      include: [{ model: Imovel }],
      order: [["createdAt", "DESC"]],
    });

    res.render("vendas/listar", { vendas });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao listar vendas.");
  }
};

exports.criarForm = async (req, res) => {
  try {
    const imoveis = await Imovel.findAll({
      where: { vendido: false },
      order: [["id", "DESC"]],
    });
    res.render("vendas/create", { imoveis });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar formulário de venda.");
  }
};

exports.criar = async (req, res) => {
  try {
    const { imovelId, valor } = req.body;

    const imovel = await Imovel.findByPk(imovelId);
    if (!imovel) return res.status(404).send("Imóvel não encontrado.");
    if (imovel.vendido) return res.status(400).send("Imóvel já foi vendido.");

    await Venda.create({
      imovelId: imovel.id,
      valor: parseFloat(valor) || imovel.preco,
      dataVenda: new Date(),
    });

    imovel.vendido = true;
    await imovel.save();

    res.redirect("/vendas");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao registrar venda.");
  }
};

exports.resumo = async (req, res) => {
  try {
    const vendas = await Venda.findAll({ include: [{ model: Imovel }] });

    const totalVendas = vendas.length;
    const totalValor = vendas.reduce((acc, v) => acc + v.valor, 0);

    res.render("vendas/resumo", { vendas, totalVendas, totalValor });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar resumo de vendas.");
  }
};
