const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Imovel = require("./Imovel");

const Venda = sequelize.define("Venda", {
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dataVenda: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

// Relacionamento: cada venda pertence a um imóvel
Venda.belongsTo(Imovel, { foreignKey: "imovelId" });
Imovel.hasMany(Venda, { foreignKey: "imovelId" });

module.exports = Venda;
