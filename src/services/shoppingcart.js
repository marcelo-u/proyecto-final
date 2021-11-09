const factory = require("../dao/factory");
const { ShoppingCartFacade } = factory();
scf = new ShoppingCartFacade();
const logger = require("../utils/logger");
const log = logger.getLogger("default");

module.exports = class {
  async getShoppingCart(user) {
    log.info("Attempting to get the shopping cart for user", user);
    const sc = await scf.getAllShoppingCartItems(user);
    if (sc) {
      log.info("Shopping cart retrieved", sc);
      return sc;
    } else {
      log.warn("Shopping cart not found", sc);
      return {};
    }
    return sc || {};
  }

  async addShoppingCart(shoppingCart) {
    log.info("Creating a new shopping cart", shoppingCart);
    const scCreated = await scf.addShoppingCart(shoppingCart);
    if (scCreated) {
      log.info("Shopping cart created", scCreated);
      return scCreated;
    } else {
      log.warn("Shopping cart was not created", scCreated);
      return {};
    }
  }

  async updateShoppingCart(user, items) {
    log.info("Check if the shopping cart exists", user);
    const found = await scf.getAllShoppingCartItems(user);
    if (found) {
      log.info("Shopping cart found, updating items", items);
      const scUpdated = await scf.updateShoppingCart(user, items);
      return scUpdated;
    } else if (!found) {
      log.info("Shopping cart not found, creating...");
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
    log.info("Removing shopping cart for the user", user);
    const removed = await scf.removeShoppingCart(user);
    return removed;
  }

  async removeShoppingCartById(id) {
    log.info("Removing shopping cart with id", id);
    const removed = await scf.removeShoppingCartById(id);
    return removed;
  }
};
