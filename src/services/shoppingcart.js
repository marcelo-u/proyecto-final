const factory = require("../dao/factory");
const { ShoppingCartFacade } = factory();
scf = new ShoppingCartFacade();

module.exports = class {
  async getShoppingCart(user) {
    const sc = await scf.getAllShoppingCartItems(user);
    return sc || {};
  }

  async addShoppingCart(shoppingCart) {
    const scCreated = await scf.addShoppingCart(shoppingCart);
    return scCreated || {};
  }

  async updateShoppingCart(user, items) {
    const found = await scf.getAllShoppingCartItems(user);
    if (found) {
      const scUpdated = await scf.updateShoppingCart(user, items);
      return scUpdated;
    } else if (!found) {
      const { products } = items;
      const scCreated = await scf.addShoppingCart({
        timestamp: Date.now(),
        user,
        products,
      });
      return scCreated;
    }
  }

  async removeShoppingCart(user) {
    const removed = await scf.removeShoppingCart(user);
    console.log("camino");
    console.log(user);
    return removed;
  }

  async removeShoppingCartById(id) {
    const removed = await scf.removeShoppingCartById(id);
    return removed;
  }
};
