const { Sequelize } = require("sequelize");
let _sequelize = null;

exports.getConnection = () => {
  return new Sequelize("ecommerce", "root", null, {
    dialect: "mysql",
    host: "127.0.0.1",
  });
};
