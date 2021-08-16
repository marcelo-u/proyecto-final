const Product = require("../../model/product");
const ProductDBManager = require("../persistence/product");

const fs = require("fs");
const { isAdmin } = require("../auth");
const file = "db/products.txt";

const addProduct = async (p) => {
  const products = await getProducts();
  products.push(p);
  await ProductDBManager.writeProducts(products);
};

const getProducts = async (id) => {
  if (id) {
    const all = await ProductDBManager.readProducts();
    const product = all.find((x) => x.id === Number(id));
    return product ? product : {};
  } else {
    return await ProductDBManager.readProducts();
  }
};

const updateProduct = async (product) => {
  const all = await ProductDBManager.readProducts();
  const products = all.map((p) => (p.id === product.id ? product : p));
  await ProductDBManager.writeProducts(products);
  return 1;
};

const deleteProduct = async (id) => {
  const all = await ProductDBManager.readProducts();
  const products = all.filter((p) => p.id !== Number(id));
  await ProductDBManager.writeProducts(products);
  return 1;
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
