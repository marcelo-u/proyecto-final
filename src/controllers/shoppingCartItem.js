const ShoppingCartItemService = require("../services/shoppingcartitems");

const service = new ShoppingCartItemService();

exports.listShoppingCartItems = async (req, res, next) => {
  const { id } = req.params;
  res.send(
    id
      ? await service.getShoppingCartItemById(id)
      : await service.getAllShoppingCartItems()
  );
};

exports.addShoppingCartItem = async (req, res, next) => {
  const { id_producto: product } = req.params;
  const shoppingCartItemCreated = await service.addShoppingCartItem({
    ts: Date.now(),
    product,
  });
  res.send(shoppingCartItemCreated);
};

exports.updateShoppingCartItem = async (req, res, next) => {
  const {
    body: payload,
    params: { id },
  } = req;
  const shoppingCartItemUpdated = await service.updateShoppingCartItem(
    id,
    payload
  );
  res.send(shoppingCartItemUpdated);
};

exports.deleteShoppingCartItem = async (req, res, next) => {
  const { id } = req.params;
  const shoppingCartItemDeleted = await service.deleteShoppingCartItem(id);
  res.send(shoppingCartItemDeleted);
};
