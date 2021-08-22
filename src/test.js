const ProductDAO = require("./models/dao/product/product");
const ShoppingCartDAO = require("./models/dao/shoppingCart/shoppingCart");
const ProductService = require("./services/product/product");

//testProductServiceUpdate(1629429469680, { nombre: `editado ${Date.now()}` });
testDeleteProduct(1629593654873);
//testProductDAO();
//testShoppingCartDAO();
//testProductService();
//testProductServiceGetProductById(1629429470329);
//testProductGetAllProducts();

/* let item = {
  nombre: "name_test",
  categoria: "category_test",
  id: 1629429458527,
};
console.log(item);
const payload = { categoria: "editado", nombre: "nombre editado" };

item = { ...item, ...payload };
console.log(item); */

async function testProductDAO() {
  try {
    const productDAO = new ProductDAO();
    const val = await productDAO.readProduct();
    console.log(val);
  } catch (err) {
    console.log(err);
  }
}

async function testShoppingCartDAO() {
  try {
    const scDAO = new ShoppingCartDAO();
    const val = await scDAO.readShoppingCart();
    console.log(val);
  } catch (err) {
    console.log(err);
  }
}

async function testProductService() {
  const productService = new ProductService();
  const val = await productService.createProduct({
    nombre: "name_test",
    categoria: "category_test",
  });
  console.log(val);
}

async function testProductServiceGetProductById(id) {
  const productService = new ProductService();
  const val = await productService.findProduct(id);
  console.log("get product by id test");
  console.log(val);
}

async function testProductGetAllProducts() {
  const productService = new ProductService();
  console.log("get all products test");
  console.log(await productService.getAllProducts());
}

async function testProductServiceUpdate(id, payload) {
  const productService = new ProductService();
  console.log("product update test");
  const result = await productService.updateProduct(id, payload);
  console.log(result);
}

async function testDeleteProduct(id) {
  const productService = new ProductService();
  console.log("product delete test");
  const result = await productService.deleteProduct(id);
  console.log(result);
}
