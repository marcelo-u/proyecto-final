const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  address: String,
  age: Number,
  phone: String,
});

userSchema.set("toJSON", { virtuals: true });

module.exports = model("User", userSchema);
