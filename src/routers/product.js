const router = require("express").Router();
const {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { verifyToken } = require("../middlewares/tokenVerifier");

const adminRequired = (req, res, next) => {
  req.app.get("admin")
    ? next()
    : res.status(401).send({
        error: -1,
        descripcion: `ruta ${req.url}, método ${req.method} no autorizada`,
      });
};

router.get("/listar/:id?", verifyToken, listProducts);
router.post("/agregar", verifyToken, adminRequired, addProduct);
router.put("/actualizar/:id", verifyToken, adminRequired, updateProduct);
router.delete("/borrar/:id", verifyToken, adminRequired, deleteProduct);

module.exports = router;
