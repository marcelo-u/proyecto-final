"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class ShoppingCartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShoppingCartItem.init(
    {
      timestamp: DataTypes.STRING,
      product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "product", key: "Id" },
        field: "product",
      },
    },
    {
      sequelize,
      modelName: "ShoppingCartItem",
    }
  );
  return ShoppingCartItem;
};
