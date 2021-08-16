const Product = require("../model/product");
const productController = require("../controllers/logic/product");

const router = require("express").Router();

const adminRequired = (req, res, next) => {
  req.app.get("admin")
    ? next()
    : res.status(401).send({
        error: -1,
        descripcion: `ruta ${req.url}, método ${req.method} no autorizada`,
      });
};

const elementExists = async (req, res, next) => {
  const found = await productController.getProducts(req.params.id);
  Object.entries(found).length !== 0
    ? next()
    : res.status(404).send({ error: 0, descripcion: "elemento no encontrado" });
};

router.get("/listar/:id?", elementExists, async (req, res) => {
  const id = req.params.id;
  res.send(await productController.getProducts(id));
});

router.post("/agregar", adminRequired, (req, res) => {
  const ts = Date.now();
  const prod = new Product(
    ts,
    ts,
    req.body.nombre,
    req.body.descripcion,
    req.body.codigo,
    req.body.foto,
    req.body.precio,
    req.body.stock
  );
  productController.addProduct(prod);
  res.send("ok");
});

router.put(
  "/actualizar/:id",
  adminRequired,
  elementExists,
  async (req, res) => {
    const ts = Date.now();
    const prod = new Product(
      req.body.id,
      ts,
      req.body.nombre,
      req.body.descripcion,
      req.body.codigo,
      req.body.foto,
      req.body.precio,
      req.body.stock
    );
    await productController.updateProduct(prod);
    res.send(true);
  }
);

router.delete("/borrar/:id", adminRequired, elementExists, async (req, res) => {
  await productController.deleteProduct(req.params.id);
  res.send(true);
});

(module.exports = router), elementExists;
