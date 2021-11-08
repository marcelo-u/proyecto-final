const app = require("express")();
const { json, urlencoded, Router } = require("express");
const router = Router();
const cors = require("cors");
const routerProducto = require("./routers/product");
const routerShoppingCart = require("./routers/shoppingCart");
const routerUser = require("./routers/user")(router);
//***************  START DEPENDENCIES FOR AUTH ***************
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { COOKIE_SECRET, IS_CLUSTER, PORT } = require("./config/globals");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
require("./auth/local");

//************************************************************

const routerInvalid = require("./routers/routerInvalid");
const { ADMIN } = require("./config/globals");

//admin true o false
const admin = true;
app.set("admin", ADMIN);

app.use(cors());
app.use(json());
app.use(urlencoded());

//***************  START MIDDLEWARES FOR AUTH ***************
app.use(cookieParser(COOKIE_SECRET, {}));
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 1,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/prefix", (req, res, next) => {
  const data = require("../db.json");
  res.json(data);
});
//************************************************************

app.use("/producto", routerProducto);
app.use("/carrito", routerShoppingCart);
app.use("/auth", routerUser);
app.use("*", routerInvalid);
if (cluster.isMaster && IS_CLUSTER) {
  console.log("*** SERVER RUNNING IN CLUSTER MODE *** ");
  console.log(`[${process.pid}] Parent process`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(PORT, () => {
    console.log(`server's up in port ${PORT}`);
    if (app.get("admin")) console.log("*** Admin mode ***");
  });
}
