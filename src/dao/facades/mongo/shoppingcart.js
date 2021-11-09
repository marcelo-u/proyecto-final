const { getConnection } = require("../../db/atlas/db");
const _shoppingCartModel = require("../../models/atlas/ShoppingCart");
const logger = require("../../../utils/logger");
const log = logger.getLogger("default");
const logFile = logger.getLogger("file");

class ShoppingCartFacade {
  constructor() {
    try {
      getConnection();
      log.info("DB Connected");
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async getAllShoppingCartItems(user) {
    try {
      const sc = await _shoppingCartModel.findOne({ user }).populate("user");
      return sc;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async addShoppingCart(sc) {
    try {
      const added = await _shoppingCartModel.create(sc);
      return added;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async updateShoppingCart(user, products) {
    try {
      const scUpdated = await _shoppingCartModel.updateOne(
        { user: user },
        products
      );
      return scUpdated;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async removeShoppingCart(user) {
    try {
      const removed = await _shoppingCartModel.deleteOne({ user });
      return removed;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async removeShoppingCartById(id) {
    try {
      const removed = await _shoppingCartModel.remove({ _id: id });
      return removed;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }
}

module.exports = ShoppingCartFacade;
