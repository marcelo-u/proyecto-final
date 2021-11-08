const { DB_SOURCE } = require("../config/globals");

/**
 * Metodo que según el flag devuelve un conjunto de facades para el origen de datos
 * 1: Mongo Atlas 2: mySQL, desde acá agregar nuevos tipos de base
 **/
module.exports = factory = () => {
  const facadePaths = {
    1: {
      product: "./facades/mongo/product",
      user: "./facades/mongo/user",
      shoppingCart: "./facades/mongo/shoppingcart",
    },
    2: {
      product: "./facades/mysql/product",
      scItem: "./facades/mysql/shoppingcartitem",
      user: "./facades/mysql/user",
    },
  };
  const ProductFacade = require(facadePaths[DB_SOURCE].product);
  const UserFacade = require(facadePaths[DB_SOURCE].user);
  const ShoppingCartFacade = require(facadePaths[DB_SOURCE].shoppingCart);

  return {
    ProductFacade,
    UserFacade,
    ShoppingCartFacade,
  };
};
