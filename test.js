const ShoppingCartItemFacade = require("./src/dao/facades/mysql/shoppingcartitem");
const ProductFacade = require("./src/dao/facades/mysql/product");
const { Op } = require("sequelize");
const test = async () => {
  pf = new ProductFacade();

  let elems = await pf.pfilter({
    where: { codigo: 9, nombre: { [Op.like]: "%es%" } },
  });
  console.log(elems);
};

test();
