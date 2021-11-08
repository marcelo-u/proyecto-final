const { getConnection } = require("../../db/atlas/db");

const _shoppingCartModel = require("../../models/atlas/ShoppingCart");

class ShoppingCartFacade {
  constructor() {
    getConnection();
  }

  async getAllShoppingCartItems(user) {
    const sc = await _shoppingCartModel.findOne({ user }).populate("user");
    return sc;
  }

  async addShoppingCart(sc) {
    const added = await _shoppingCartModel.create(sc);
    return added;
  }

  async updateShoppingCart(user, products) {
    const scUpdated = await _shoppingCartModel.updateOne(
      { user: user },
      products
    );
    return scUpdated;
  }

  async removeShoppingCart(user) {
    const removed = await _shoppingCartModel.deleteOne({ user });
    return removed;
  }

  async removeShoppingCartById(id) {
    const removed = await _shoppingCartModel.remove({ _id: id });
    return removed;
  }
}

module.exports = ShoppingCartFacade;
