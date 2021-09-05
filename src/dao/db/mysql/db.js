const { Sequelize } = require("sequelize");
const dbConfig = require("../../../config/mysql.json");
const { MYSQL_ENV } = require("../../../config/globals");

exports.getConnection = () => {
  const { database, username, host, dialect } = dbConfig[MYSQL_ENV];
  return new Sequelize(database, username, null, {
    dialect,
    host,
  });
};
