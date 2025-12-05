const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Imovel = sequelize.define("Imovel", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quartos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  banheiros: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  area: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  garagem: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  imagem: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  vendido: { 
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = Imovel;
