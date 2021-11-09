const {
  getShoppingCartByUserId,
  updateShoppingCartByUserId,
  deleteShoppingCartByUserId,
  addShoppingCartByUserId,
  deleteShoppingCartById,
  checkout,
} = require("../controllers/shoppingCart");
const { verifyToken } = require("../middlewares/tokenVerifier");

const router = require("express").Router();

router.post("/crear/:user_id", verifyToken, addShoppingCartByUserId);
router.get("/listar/:user_id", verifyToken, getShoppingCartByUserId);
router.put("/agregar/:user_id", verifyToken, updateShoppingCartByUserId);
router.delete("/borrar/:user_id", verifyToken, deleteShoppingCartByUserId);
router.delete("/borrar/:id", verifyToken, deleteShoppingCartById);
router.post("/checkout", verifyToken, checkout);

module.exports = router;
