const { getConnection } = require("../../db/mysql/db");

let _sequelize = null;
let _shoppingCartItemModel = null;
let _productModel = null;

class ShoppingCartItemFacade {
  constructor() {
    _sequelize = getConnection();
    _productModel = require("../../models/mysql/product")(_sequelize);
    _shoppingCartItemModel = require("../../models/mysql/shoppingcartitem")(
      _sequelize
    );
    _shoppingCartItemModel.hasOne(_productModel, {
      hooks: true,
      onDelete: "CASCADE",
      foreignKey: "id",
      sourceKey: "product",
    });
  }

  async getAllShoppingCartItems() {
    let scItems = await _shoppingCartItemModel.findAll({
      include: _productModel,
      raw: true,
      nest: true,
    });
    scItems = scItems.map((item) => {
      const { id, timestamp, Product: product } = item;
      return { id, timestamp, product };
    });
    return scItems;
  }

  async getShoppingCartItemById(scItemId) {
    const scItem = await _shoppingCartItemModel.findByPk(scItemId, {
      include: _productModel,
      raw: true,
      nest: true,
    });
    const { id, timestamp, Product: product } = scItem;
    return { id, timestamp, product };
  }

  async addShoppingCartItem(scItem) {
    const scItemCreated = await _shoppingCartItemModel.create(scItem);
    return scItemCreated;
  }

  async updateShoppingCartItem(id, payload) {
    const scItemUpdated = await _shoppingCartItemModel.update(payload, {
      where: { id },
    });
    return scItemUpdated;
  }

  async deleteShoppingCartItem(id) {
    const scItemDeleted = await _shoppingCartItemModel.destroy({
      where: { id: Number(id) },
    });
    return { scItemDeleted };
  }
}

module.exports = ShoppingCartItemFacade;
