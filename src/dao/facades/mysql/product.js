const { getConnection } = require("../../db/mysql/db");

let _sequelize = null;
let _productModel = null;

class ProductFacade {
  constructor() {
    _sequelize = getConnection();
    _productModel = require("../../models/mysql/product")(_sequelize);
  }

  async getAllProducts() {
    const data = await _productModel.findAll({ raw: true });
    return data;
  }
}

module.exports = ProductFacade;
