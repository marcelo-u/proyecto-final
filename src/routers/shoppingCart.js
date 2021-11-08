const {
  getShoppingCartByUserId,
  updateShoppingCartByUserId,
  deleteShoppingCartByUserId,
  addShoppingCartByUserId,
  deleteShoppingCartById,
  checkout,
} = require("../controllers/shoppingCart");

const router = require("express").Router();

router.post("/crear/:user_id", addShoppingCartByUserId);
router.get("/listar/:user_id", getShoppingCartByUserId);
router.put("/agregar/:user_id", updateShoppingCartByUserId);
router.delete("/borrar/:user_id", deleteShoppingCartByUserId);
router.delete("/borrar/:id", deleteShoppingCartById);
router.post("/checkout", checkout);

module.exports = router;
