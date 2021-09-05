const { getConnection } = require("../../db/mysql/db");

let _sequelize = null;
let _productModel = null;

class ProductFacade {
  constructor() {
    _sequelize = getConnection();
    _productModel = require("../../models/mysql/product")(_sequelize);
  }

  async getAllProducts() {
    const products = await _productModel.findAll({ raw: true });
    return products;
  }

  async getProductById(id) {
    const product = await _productModel.findByPk(id);
    return product;
  }

  async addProduct(product) {
    const productCreated = await _productModel.create(product);
    return productCreated;
  }

  async updateProduct(id, payload) {
    const productUpdated = await _productModel.update(payload, {
      where: { id },
    });
    return productUpdated;
  }

  async deleteProduct(id) {
    console.log("test");
    const productDeleted = await _productModel.destroy({
      where: { id: Number(id) },
    });
    return { productDeleted };
  }
}

module.exports = ProductFacade;
