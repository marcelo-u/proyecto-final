const ShoppingCart = require("../model/shoppingCart");
const shoppingCartController = require("../controllers/logic/shoppingCart");

const productos = [];
const router = require("express").Router();

router.get("/listar/:id?", async (req, res) => {
  const respuesta = await shoppingCartController.getShoppingCart();
  res.send(respuesta);
});

router.post("/agregar/:id_producto", async (req, res) => {
  const respuesta = await shoppingCartController.addProduct(
    req.params.id_producto
  );
  res.send(true);
});

router.delete("/borrar/:id", async (req, res) => {
  const fruta = await shoppingCartController.deleteProduct(req.params.id);
  res.send(true);
});

module.exports = router;
