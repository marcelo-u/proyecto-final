const Product = require("../model/product");
const productController = require("../controllers/logic/product");

const router = require("express").Router();

router.get("/listar/:id?", async (req, res) => {
  const id = req.params.id;
  res.send(await productController.getProducts(id));
});

router.post("/agregar", (req, res) => {
  const prod = new Product(
    req.body.id,
    Date.now(),
    req.body.nombre,
    req.body.descripcion,
    req.body.codigo,
    req.body.foto
  );
  productController.addProduct(prod);
  res.send(prod);
});

router.put("/actualizar/:id", async (req, res) => {
  const prod = new Product(
    req.body.id,
    Date.now(),
    req.body.nombre,
    req.body.descripcion,
    req.body.codigo,
    req.body.foto
  );
  await productController.updateProduct(prod);
  res.send(prod);
});

router.delete("/borrar/:id", async (req, res) => {
  await productController.deleteProduct(req.params.id);
  res.send(true);
});

module.exports = router;
