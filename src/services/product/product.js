const ProductDAO = require("../../models/dao/product/product");

module.exports = class ProductService {
  async createProduct(product) {
    const data = await getProducts();
    if (Array.isArray(data)) {
      product.id = Date.now();
      data.push(product);
      return writeProducts(data);
    }
    return data;
  }

  async getProduct(id) {
    const data = await getProducts();
    if (Array.isArray(data)) {
      const index = await findIndexById(data);
      if (index === -1)
        return { status: 0, msg: `item with id:${id} was not found` };
      else return data[index];
    }
    return data;
  }

  async updateProduct(id, payload) {
    const data = await getProducts();
    if (Array.isArray(data)) {
      const index = await findIndexById(id);
      if (index === -1)
        return { status: 0, msg: `item with id:${id} was not found` };
      else {
        data[index] = { ...data[index], ...payload };
        return writeProducts(data);
      }
    }
    return data;
  }

  async getAllProducts() {
    return getProducts();
  }

  async deleteProduct(id) {
    const data = await getProducts();
    if (Array.isArray(data)) {
      const index = await findIndexById(id, data);
      if (index === -1)
        return { status: 0, msg: `item with id:${id} was not found` };
      else {
        data.splice(index, 1);
        return writeProducts(data);
      }
    }
    return data;
  }
};

const writeProducts = async (products) => {
  const productDAO = new ProductDAO();
  if (await productDAO.createProduct(products)) {
    return { status: 1, msg: "product saved" };
  } else return { status: -1, msg: "not saved" };
};

const getProducts = async () => {
  const productDAO = new ProductDAO();
  try {
    return await productDAO.readProduct();
  } catch (exception) {
    return { status: -1, msg: exception };
  }
};

const findIndexById = async (id, products) => {
  let index = -1;
  products.forEach((prod, i) => (prod.id == id ? (index = i) : ""));
  return index;
};
