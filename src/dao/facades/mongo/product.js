const { getConnection } = require("../../db/atlas/db");

const _productModel = require("../../models/atlas/product");

class ProductFacade {
  constructor() {
    getConnection();
  }

  async getAllProducts() {
    const products = await _productModel.find();
    return products;
  }

  async getProductById(id) {
    const productCreated = await _productModel.findById(id);
    return productCreated;
  }

  async addProduct(product) {
    const productCreated = await _productModel.create(product);
    return productCreated;
  }

  async updateProduct(id, payload) {
    const productUpdated = await _productModel.findByIdAndUpdate(id, payload);
    return productUpdated;
  }

  async deleteProduct(id) {
    //TODO: workaround: se tiene que hacer con el hook de mongoose: Schame.pre(... etc)
    const _shoppingCartItemsModel = require("../../models/atlas/shoppingCartItem");
    await _shoppingCartItemsModel.deleteMany({ product: id });
    // ---
    const productDeleted = await _productModel.findByIdAndDelete(id);
    return productDeleted;
  }
}

module.exports = ProductFacade;
