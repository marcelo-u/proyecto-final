const { query } = require("express");
const { getConnection } = require("../../db/mysql/db");
const { Op } = require("sequelize");

let _sequelize = null;
let _productModel = null;

class ProductFacade {
  constructor() {
    _sequelize = getConnection();
    _productModel = require("../../models/mysql/product")(_sequelize);
  }

  async getAllProducts(filter) {
    const query = prepareQuery(filter);
    const products = await _productModel.findAll({
      ...query,
      ...{ raw: true },
    });
    return products;
  }

  async pfilter(filter) {
    const filtered = await _productModel.findAll({
      ...filter,
      ...{ raw: true },
    });
    return filtered;
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
    const productDeleted = await _productModel.destroy({
      where: { id: Number(id) },
    });
    return { productDeleted };
  }
}

const prepareQuery = (filter) => {
  let where = {};
  const { nombre, codigo, precio, precioMax, stock, stockMax } = filter;
  if (nombre) where = { ...where, ...{ nombre } };
  if (codigo) where = { ...where, ...{ codigo } };
  if (precio && precioMax)
    where = {
      ...where,
      ...{ precio: { [Op.between]: [Number(precio), Number(precioMax)] } },
    };
  if (stock && stockMax)
    where = {
      ...where,
      ...{ stock: { [Op.between]: [Number(stock), Number(stockMax)] } },
    };
  return { where };
};

module.exports = ProductFacade;
