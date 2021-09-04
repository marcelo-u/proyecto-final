const router = require("express").Router();
const Product = require("../../model/product");
const ScItem = require("../../model/ScItem");
const productController = require("./product");
const ShoppingCartDBManager = require("../persistence/shoppingCart");

const getShoppingCart = async (id) => {
  if (id) {
    const shoppingCart = await ShoppingCartDBManager.readShoppingCart();
    const scItem = shoppingCart.find((x) => x.id === Number(id));
    return scItem || {};
  } else return await ShoppingCartDBManager.readShoppingCart();
};

const addProduct = async (id) => {
  const ts = Date.now();
  const prod = await productController.getProducts(id);
  const scItem = new ScItem(ts, ts, prod);
  const shoppingCart = await ShoppingCartDBManager.readShoppingCart();
  shoppingCart.push(scItem);
  await ShoppingCartDBManager.writeShoppingCart(shoppingCart);
};

const deleteProduct = async (id) => {
  const shoppingCart = await ShoppingCartDBManager.readShoppingCart();
  const sc = shoppingCart.filter((scItem) => scItem.id !== Number(id));
  if (sc.length !== shoppingCart.length) {
    await ShoppingCartDBManager.writeShoppingCart(sc);
    return { status: "ok" };
  } else return {};
};

module.exports = { getShoppingCart, addProduct, deleteProduct };
