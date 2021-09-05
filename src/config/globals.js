require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "",
  DB_SOURCE: process.env.DB_SOURCE || 1,
  MYSQL_ENV: process.env.MYSQL_ENV || "development",
  ADMIN: process.env.ADMIN || false,
};
