const productos = [];
const router = require("express").Router();
const ShoppingCart = require("../../model/shoppingCart");
const productController = require("./product");
const ShoppingCartDBManager = require("../persistence/shoppingCart");

const shoppingCart = new ShoppingCart(1, Date.now(), productos);

const getShoppingCart = async () =>
  await ShoppingCartDBManager.readShoppingCart();

const addProduct = async (id) => {
  const prods = await productController.getProducts(id);
  const sc = await ShoppingCartDBManager.readShoppingCart();
  sc.productos = [...sc.productos, ...prods];
  console.log(sc);
  await ShoppingCartDBManager.writeShoppingCart(sc);
};

const deleteProduct = async (id) => {
  const sc = await ShoppingCartDBManager.readShoppingCart();
  console.log(sc);
  console.log("Deleting");
  const { productos } = sc;
  sc.productos = productos.filter((prod) => prod.id !== Number(id));
  await ShoppingCartDBManager.writeShoppingCart(sc);
};

module.exports = { getShoppingCart, addProduct, deleteProduct };
