const router = require("express").Router();

router.all("*", (req, res) =>
  res.send({
    error: -2,
    descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`,
  })
);

module.exports = router;
