const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const shoppingCartItemSchema = new Schema({
  timestamp: String,
  product: {
    type: ObjectId,
    ref: "Product",
  },
});
shoppingCartItemSchema.set("toJSON", { virtuals: true });

module.exports = model("ShoppingCartItem", shoppingCartItemSchema);
