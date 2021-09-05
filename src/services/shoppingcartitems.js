const factory = require("../dao/factory");
const { ShoppingCartItemFacade } = factory();
scif = new ShoppingCartItemFacade();

module.exports = class {
  async getAllShoppingCartItems() {
    const scItems = await scif.getAllShoppingCartItems();
    return scItems ? scItems : [];
  }

  async getShoppingCartItemById(id) {
    const scItem = await scif.getShoppingCartItemById(id);
    return scItem ? scItem : {};
  }

  async addShoppingCartItem(scItem) {
    const scItemCreated = await scif.addShoppingCartItem(scItem);
    return scItemCreated;
  }

  async updateShoppingCartItem(id, payload) {
    const scItemUpdated = await scif.updateShoppingCartItem(id, payload);
    return scItemUpdated ? scItemUpdated : {};
  }

  async deleteShoppingCartItem(id) {
    const scItemDeleted = await scif.deleteShoppingCartItem(id);
    return scItemDeleted ? scItemDeleted : {};
  }
  async deleteShoppingCartItemByProdId(prodId) {
    const scItemsDeleted = await scif.deleteShoppingCartItemByProdId(prodId);
  }
};
