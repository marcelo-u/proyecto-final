const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  timestamp: String,
  nombre: String,
  descripcion: String,
  codigo: String,
  foto: String,
  precio: String,
  stock: String,
});
// Objeto o la clase que me da acceso a los métodos para hacer el crud
module.exports = model("Product", productSchema);
