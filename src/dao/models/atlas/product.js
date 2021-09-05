const { Schema, model } = require("mongoose");
const ShoppingCartItemSchema = require("./shoppingCartItem");

const productSchema = new Schema({
  timestamp: String,
  nombre: String,
  descripcion: String,
  codigo: String,
  foto: String,
  precio: String,
  stock: String,
});
productSchema.set("toJSON", { virtuals: true });

module.exports = model("Product", productSchema);
