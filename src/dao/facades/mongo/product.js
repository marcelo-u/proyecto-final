const { getConnection } = require("../../db/atlas/db");

const _productModel = require("../../models/atlas/product");

class ProductFacade {
  constructor() {
    getConnection();
  }

  async getAllProducts() {
    const products = await _productModel.find();
    console.log(products);

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
    const productDeleted = await _productModel.findByIdAndDelete(id);
    return productDeleted;
  }
}

module.exports = ProductFacade;

/*
async addProduct(product) {
    const productCreated = await productModel.create(product);
    console.log(productCreated);
    return productCreated;
  }
  */
