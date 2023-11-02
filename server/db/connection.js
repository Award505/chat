const Sequelize = require("sequelize");

module.exports.connection = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
});
