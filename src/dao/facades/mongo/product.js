const { getConnection } = require("../../db/atlas/db");

const _productModel = require("../../models/atlas/product");

class ProductFacade {
  constructor() {
    getConnection();
  }

  async getAllProducts(filter) {
    const query = prepareQuery(filter);
    const products = await _productModel.find(query ? query : {});
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
