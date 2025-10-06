const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Imobiliaria", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
