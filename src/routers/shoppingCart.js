const {
  listShoppingCartItems,
  addShoppingCartItem,
  deleteShoppingCartItem,
} = require("../controllers/shoppingCartItem");

const router = require("express").Router();

router.get("/listar/:id?", listShoppingCartItems);
router.post("/agregar/:id_producto", addShoppingCartItem);
router.delete("/borrar/:id", deleteShoppingCartItem);

module.exports = router;
