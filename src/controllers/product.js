const ProductService = require("../services/products");

const service = new ProductService();

exports.listProducts = async (req, res, next) => {
  const { id } = req.params;
  const { query: filter } = req;
  res.send(
    id ? await service.getProductById(id) : await service.getAllProducts(filter)
  );
};

exports.addProduct = async (req, res, next) => {
  const timestamp = Date.now().toString();
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const productCreated = await service.addProduct({
    timestamp,
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
  const productDeleted = await service.deleteProduct(id);
  res.send(productDeleted);
};
