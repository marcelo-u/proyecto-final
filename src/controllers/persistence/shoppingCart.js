const fs = require("fs");
const file = "src/db/shoppingCart.txt";

const writeShoppingCart = async (sc) => {
  try {
    await fs.promises.writeFile(file, JSON.stringify(sc, null, "\t"));
  } catch (err) {
    console.error("Error on file saving", err);
  }
};

const readShoppingCart = async () => {
  try {
    const arr = await fs.promises.readFile(file);
    return JSON.parse(arr);
  } catch (err) {
    return [];
  }
};

module.exports = { writeShoppingCart, readShoppingCart };
