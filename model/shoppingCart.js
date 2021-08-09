class ShoppingCart {
  constructor(id, timestamp) {
    this.id = id;
    this.timestamp = timestamp;
    this.productos = [];
  }
}

module.exports = ShoppingCart;
