const productos = [];
const router = require("express").Router();
const ShoppingCart = require("../../model/shoppingCart");
const productController = require("./product");

const shoppingCart = new ShoppingCart(1, Date.now(), productos);

const getShoppingCart = () => shoppingCart;

const addProduct = async (id) => {
  const prods = await productController.getProducts(id);
  console.log(prods);
  shoppingCart.productos = [...shoppingCart.productos, ...prods];
  console.log(shoppingCart.productos);
};

module.exports = { getShoppingCart, addProduct };
