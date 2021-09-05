const router = require("express").Router();
const {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const adminRequired = (req, res, next) => {
  req.app.get("admin")
    ? next()
    : res.status(401).send({
        error: -1,
        descripcion: `ruta ${req.url}, método ${req.method} no autorizada`,
      });
};

router.get("/listar/:id?", listProducts);
router.post("/agregar", adminRequired, addProduct);
router.put("/actualizar/:id", adminRequired, updateProduct);
router.delete("/borrar/:id", adminRequired, deleteProduct);

module.exports = router;
