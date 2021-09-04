const fs = require("fs");
const file = "src/db/products.txt";

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
    console.log("not able to catch the file", err);
    return [];
  }
};

module.exports = { writeProducts, readProducts };
