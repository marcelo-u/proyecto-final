"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      timestamp: DataTypes.STRING,
      nombre: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      codigo: DataTypes.INTEGER,
      foto: DataTypes.STRING,
      precio: DataTypes.INTEGER,
      sotck: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
