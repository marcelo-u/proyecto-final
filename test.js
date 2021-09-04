const { create } = require("./src/dao/models/atlas/product");
const ProductService = require("./src/services/products");

const test = async () => {
  const productService = new ProductService();
  const elems = await productService.getAllProducts();
  console.log(elems);
  const elem = await productService.getProductById("6132deba7343e8780f15f423");
  console.log(elem);
  const product = {
    timestamp: "99988877766",
    nombre: "test added " + Date.now(),
    descripcion: "description added",
    codigo: 112233,
    foto: "fotulis",
    precio: 45,
    stock: 1000,
  };

  const created = await productService.addProduct(product);
  console.log(created);
  const payload = {
    descripcion: "edited 23441",
    stock: 40210,
  };
  const updated = await productService.updateProduct(
    "61338b069f7f3026df8d9557",
    payload
  );
  console.log(updated);
  const elemUpdated = await productService.getProductById(
    "61338b069f7f3026df8d9557"
  );
  console.log(elemUpdated);
};
const deleteTest = async () => {
  const productService = new ProductService();
  const deleted = await productService.deleteProduct(
    "61338c31b14559533b586421"
  );
  console.log(deleted);
};

//deleteTest();
// test();

const req = {
  body: {
    name: "marcelo",
    lastName: "Urreli",
  },
  params: { id: 1 },
};

console.log(payload, id);
