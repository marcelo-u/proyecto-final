const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const shoppingCartSchema = new Schema({
  timestamp: String,
  user: {
    type: ObjectId,
    ref: "User",
  },
  products: [],
});
shoppingCartSchema.set("toJSON", { virtuals: true });

module.exports = model("ShoppingCart", shoppingCartSchema);
