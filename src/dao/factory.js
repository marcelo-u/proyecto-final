const { DB_SOURCE } = require("../config/globals");

module.exports = factory = () => {
  const facedePaths = {
    1: {
      product: "./facades/mongo/product",
      scItem: "./facades/mongo/shoppingcartitem",
    },
    2: {
      product: "./facades/mysql/product",
      scItem: "./facades/mysql/shoppingcartitem",
    },
  };
  const ProductFacade = require(facedePaths[DB_SOURCE].product);
  const ShoppingCartItemFacade = require(facedePaths[DB_SOURCE].scItem);

  return { ProductFacade, ShoppingCartItemFacade };
};
