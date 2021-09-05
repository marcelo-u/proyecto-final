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
  const ProductFacade = require(facedePaths[1].product);
  const ShoppingCartItemFacade = require(facedePaths[1].scItem);

  return { ProductFacade, ShoppingCartItemFacade };
};
