const fs = require("fs");
const file = "src/models/db/products.txt";

module.exports = class ProductDAO {
  async createProduct(products) {
    try {
      await fs.promises.writeFile(file, JSON.stringify(products, null, "\t"));
      return true;
    } catch (err) {
      throw new CustomIOException(products, file, err);
    }
  }

  async readProduct() {
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
