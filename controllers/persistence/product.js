const fs = require("fs");
const file = "db/products.txt";

const writeProducts = async (products) => {
  try {
    await fs.promises.writeFile(file, JSON.stringify(products, null, "\t"));
  } catch (err) {
    console.error("Error on file saving", err);
  }
};

const readProducts = async () => {
  try {
    const arr = await fs.promises.readFile(file);
    return JSON.parse(arr);
  } catch (err) {
    console.log("empty");
    return [];
  }
};

module.exports = { writeProducts, readProducts };
