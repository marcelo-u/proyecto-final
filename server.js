const app = require("express")();
const { json, urlencoded } = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const routerProducto = require("./routers/product");
const routerShoppingCart = require("./routers/shoppingCart");
const ShoppingCart = require("./model/shoppingCart");

app.use(cors());
app.use(json());
app.use(urlencoded());
app.use("/producto", routerProducto);
app.use("/carrito", routerShoppingCart);

app.listen(PORT, () => {
  console.log(`server's up in port ${PORT}`);
});
