const app = require("express")();
const { json, urlencoded } = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const routerProducto = require("./routers/product");
const routerShoppingCart = require("./routers/shoppingCart");
const routerInvalid = require("./routers/routerInvalid");
const { ADMIN } = require("./config/globals");

//admin true o false
const admin = true;

app.set("admin", ADMIN);

app.use(cors());
app.use(json());
app.use(urlencoded());
app.use("/producto", routerProducto);
app.use("/carrito", routerShoppingCart);
app.use("*", routerInvalid);

app.listen(PORT, () => {
  console.log(`server's up in port ${PORT}`);
  if (app.get("admin")) console.log("*** Admin mode ***");
});
