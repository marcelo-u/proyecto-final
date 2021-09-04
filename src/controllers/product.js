const ProductService = require("../services/products");

const service = new ProductService();

exports.listProducts = async (req, res, next) => {
  const { id } = req.params;
  res.send(
    id ? await service.getProductById(id) : await service.getAllProducts()
  );
};

exports.addProduct = async (req, res, next) => {
  const { ts, nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const productCreated = await service.addProduct({
    ts,
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  });
  res.send(productCreated);
};

exports.updateProduct = async (req, res, next) => {
  const {
    body: payload,
    params: { id },
  } = req;
  const productUpdated = await service.updateProduct(id, payload);
  res.send(productUpdated);
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  console.log("id");
  console.log(req.params);
  console.log(id);
  const productDeleted = await service.deleteProduct(id);
  res.send(productDeleted);
};
