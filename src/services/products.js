const factory = require("../dao/factory");
const { ProductFacade } = factory();
pf = new ProductFacade();

module.exports = class {
  async getAllProducts(filter) {
    const products = await pf.getAllProducts(filter);
    return products ? products : [];
  }

  async getProductById(id) {
    const product = await pf.getProductById(id);
    return product ? product : {};
  }

  async addProduct(product) {
    const productCreated = await pf.addProduct(product);
    return productCreated;
  }

  async updateProduct(id, payload) {
    const productUpdated = await pf.updateProduct(id, payload);
    return productUpdated ? productUpdated : {};
  }

  async deleteProduct(id) {
    const productDeleted = await pf.deleteProduct(id);
    return productDeleted ? productDeleted : {};
  }
};
