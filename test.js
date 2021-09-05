const ShoppingCartItemFacade = require("./src/dao/facades/mongo/shoppingcartitem");
const ProductFacade = require("./src/dao/facades/mongo/product");
const test = async () => {
  pf = new ProductFacade();
  // const { _id } = await pf.getProductById("6133823f516c8534168c8889");
  // console.log(_id);
  // item = {
  //   timestamp: Date.now() + "",
  //   product: _id,
  // };
  // sciFacade = new ShoppingCartItemFacade();

  // let items = await sciFacade.getAllShoppingCartItems();
  // console.log(items);
  // let added = await sciFacade.addShoppingCartItem(item);
  // items = await sciFacade.getAllShoppingCartItems();
  // console.log(items);
  scItemFacade = new ShoppingCartItemFacade();
  const elems = await scItemFacade.getAllShoppingCartItems();
  console.log(elems);
};

test();
