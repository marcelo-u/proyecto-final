const shoppingCartController = require("../controllers/logic/shoppingCart");
const productController = require("../controllers/logic/product");

const productos = [];
const router = require("express").Router();

const prodExists = async (req, res, next) => {
  const found = await productController.getProducts(req.params.id_producto);
  Object.entries(found).length !== 0
    ? next()
    : res.status(404).send({ error: 0, descripcion: "elemento no encontrado" });
};

const elementExists = async (req, res, next) => {
  const found = await shoppingCartController.getShoppingCart(req.params.id);
  Object.entries(found).length !== 0
    ? next()
    : res.status(404).send({ error: 0, descripcion: "elemento no encontrado" });
};

router.get("/listar/:id?", elementExists, async (req, res) => {
  const respuesta = await shoppingCartController.getShoppingCart(req.params.id);
  res.send(respuesta);
});

router.post("/agregar/:id_producto", prodExists, async (req, res) => {
  const respuesta = await shoppingCartController.addProduct(
    req.params.id_producto
  );
  res.send(true);
});

router.delete("/borrar/:id", elementExists, async (req, res) => {
  const resp = await shoppingCartController.deleteProduct(req.params.id);
  res.send(resp);
});

module.exports = router;
