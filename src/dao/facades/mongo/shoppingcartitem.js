const { getConnection } = require("../../db/atlas/db");

const _shoppingCartItemModel = require("../../models/atlas/shoppingCartItem");

class ShoppingCartItemFacade {
  constructor() {
    getConnection();
  }

  async getAllShoppingCartItems() {
    const scItems = await _shoppingCartItemModel.find().populate("product");
    return scItems;
  }

  async getShoppingCartItemById(id) {
    const scItem = await _shoppingCartItemModel
      .findById(id)
      .populate("product");
    return scItem;
  }

  async addShoppingCartItem(item) {
    const scItemCreated = _shoppingCartItemModel.create(item);
    return scItemCreated;
  }

  async updateShoppingCartItem(id, payload) {
    const scItemUpdated = await _shoppingCartItemModel.findOneAndUpdate(
      id,
      payload
    );
    return scItemUpdated;
  }

  async deleteShoppingCartItem(id) {
    const scItemDeleted = await _shoppingCartItemModel.findByIdAndDelete(id);
    return scItemDeleted;
  }
}

module.exports = ShoppingCartItemFacade;
