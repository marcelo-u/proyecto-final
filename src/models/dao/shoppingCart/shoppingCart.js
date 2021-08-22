const fs = require("fs");
const file = "src/models/db/shoppingCart.txt";

module.exports = class ShoppingCartDAO {
  async createShoppingCart(sc) {
    try {
      await fs.promises.writeFile(file, JSON.stringify(sc, null, "\t"));
    } catch (err) {
      throw new CustomIOException(sc, file, err);
    }
  }

  async readShoppingCart() {
    try {
      const arr = await fs.promises.readFile(file);
      return JSON.parse(arr);
    } catch (err) {
      throw new CustomIOException(null, file, err);
    }
  }
};

class CustomIOException {
  constructor(content, file, err) {
    this.message = `there was an error on access file: ${file} ${
      content ? "with content " + content : ""
    } error: ${err} `;
  }
}
