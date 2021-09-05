const router = require("express").Router();
const {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const adminRequired = (req, res, next) => {
  //   req.app.get("admin")
  //     ? next()
  //     : res.status(401).send({
  //         error: -1,
  //         descripcion: `ruta ${req.url}, método ${req.method} no autorizada`,
  //       });
  next();
};

const elementExists = async (req, res, next) => {
  //   const found = await productController.getProducts(req.params.id);
  //   Object.entries(found).length !== 0
  //     ? next()
  //     : res.status(404).send({ error: 0, descripcion: "elemento no encontrado" });
  next();
};

router.get("/listar/:id?", elementExists, listProducts);
router.get("/listar/:nombre?&:codigo?&precio?&:stock?", listProducts);
router.post("/agregar", adminRequired, addProduct);
router.put("/actualizar/:id", adminRequired, elementExists, updateProduct);
router.delete("/borrar/:id", adminRequired, elementExists, deleteProduct);

module.exports = router;
