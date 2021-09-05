const {
  listShoppingCartItems,
  addShoppingCartItem,
  deleteShoppingCartItem,
} = require("../controllers/shoppingCartItem");

const router = require("express").Router();

const prodExists = async (req, res, next) => {
  // const found = await productController.getProducts(req.params.id_producto);
  // Object.entries(found).length !== 0
  //   ? next()
  //   : res.status(404).send({ error: 0, descripcion: "elemento no encontrado" });
  next();
};

const elementExists = async (req, res, next) => {
  // const found = await shoppingCartController.getShoppingCart(req.params.id);
  // Object.entries(found).length !== 0
  //   ? next()
  //   : res.status(404).send({ error: 0, descripcion: "elemento no encontrado" });
  next();
};

router.get("/listar/:id?", elementExists, listShoppingCartItems);
router.post("/agregar/:id_producto", addShoppingCartItem);
router.delete("/borrar/:id", elementExists, deleteShoppingCartItem);

module.exports = router;
