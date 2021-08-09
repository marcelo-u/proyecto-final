const ShoppingCart = require("../model/shoppingCart");
const shoppingCartController = require("../controllers/logic/shoppingCart");

const productos = [];
const router = require("express").Router();

const shoppingCart = new ShoppingCart(1, Date.now(), []);

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

router.delete("/borrar/:id", (req, res) => {});

module.exports = router;
