const { getConnection } = require("../../db/atlas/db");
const _productModel = require("../../models/atlas/product");
const logger = require("../../../utils/logger");
const log = logger.getLogger("default");
const logFile = logger.getLogger("file");

class ProductFacade {
  constructor() {
    try {
      getConnection();
      log.info("DB Connected");
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async getAllProducts(filter) {
    const query = prepareQuery(filter);
    try {
      const products = await _productModel.find(query ? query : {});
      return products;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async getProductById(id) {
    try {
      const productCreated = await _productModel.findById(id);
      return productCreated;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async addProduct(product) {
    try {
      const productCreated = await _productModel.create(product);
      return productCreated;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }
  async updateProduct(id, payload) {
    try {
      const productUpdated = await _productModel.findByIdAndUpdate(id, payload);
      return productUpdated;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async deleteProduct(id) {
    //TODO: workaround: se tiene que hacer con el hook de mongoose: Schame.pre(... etc)
    //const _shoppingCartItemsModel = require("../../models/atlas/shoppingCartItem");
    //await _shoppingCartItemsModel.deleteMany({ product: id });
    // ---
    try {
      const productDeleted = await _productModel.findByIdAndDelete(id);
      return productDeleted;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }
}

const prepareQuery = (filter) => {
  let query = {};
  const { nombre, codigo, precio, precioMax, stock, stockMax } = filter;
  if (nombre) query = { ...query, ...{ nombre } };
  if (codigo) query = { ...query, ...{ codigo } };
  if (precio && precioMax)
    query = {
      ...query,
      ...{ precio: { $gt: Number(precio) - 1, $lt: Number(precioMax) + 1 } },
    };
  if (stock && stockMax)
    query = {
      ...query,
      ...{ stock: { $gt: Number(stock) - 1, $lt: Number(stockMax) + 1 } },
    };
  return query;
};

module.exports = ProductFacade;
