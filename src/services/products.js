const factory = require("../dao/factory");
const { ProductFacade } = factory();
pf = new ProductFacade();
const logger = require("../utils/logger");
const log = logger.getLogger("default");

module.exports = class {
  async getAllProducts(filter) {
    log.info("Retrieving products with filter:", filter);
    const products = await pf.getAllProducts(filter);
    if (products) {
      log.info("Products retrieved:", products);
      return products;
    } else {
      log.warn("Products not found:", products);
      return [];
    }
  }

  async getProductById(id) {
    log.info("Retrieving product with id:", id);
    const product = await pf.getProductById(id);
    if (product) {
      log.info("Product found:", product);
      return product;
    } else {
      log.warn("Product not found");
      return {};
    }
  }

  async addProduct(product) {
    log.info("Adding product:", product);
    const productCreated = await pf.addProduct(product);
    log.info("Product added", productCreated);
    return productCreated;
  }

  async updateProduct(id, payload) {
    log.info("Updating product:", id, payload);
    const productUpdated = await pf.updateProduct(id, payload);
    if (productUpdated) {
      log.info("Product updated:", productUpdated);
      return productUpdated;
    } else {
      log.warn("Product not found");
      return {};
    }
  }

  async deleteProduct(id) {
    log.info("Deleting product:", id);
    const productDeleted = await pf.deleteProduct(id);
    if (productDeleted) {
      log.info("Product deleted:", productDeleted);
      return productDeleted;
    } else {
      log.warn("Product not found:", productDeleted);
      return {};
    }
  }
};
