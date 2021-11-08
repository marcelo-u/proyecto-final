import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import Search from "./components/Search";
import Card from "./components/Card";
import Cart from "./components/Cart";
import InputProduct from "./components/InputProduct";
import { apiCarrito, apiProducto, apiLogin } from "./utils/api";
import config from "./utils/config";
import LoginForm from "./components/Auth/LoginForm";
import AuthContext from "./store/auth-context";
import CartContext from "./store/cart-context";

const App = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  useEffect(async () => {
    const getUser = async () => {
      const token = sessionStorage.getItem("token");
      const data = await apiLogin.whoami(token);

      authCtx.onLogin(data, token);
    };
    if (sessionStorage.getItem("token")) {
      await getUser();
    }
  }, []);

  const handleLogout = () => {
    authCtx.onLogout();
  };

  const [filter, setFilter] = useState({});
  const [admin, setAdmin] = useState([false]);
  const [prods, setProds] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [flag, setFlag] = useState("load");
  const [prodToEdit, setProdToEdit] = useState(false);

  const fetchProduct = async () => {
    setAdmin(config.admin);
    switch (flag) {
      case "load": {
        const resultProds = await apiProducto.listar(filter);
        setProds(resultProds.hasOwnProperty("error") ? [] : resultProds);
        const resultSc = await apiCarrito.listar(authCtx.user["id"]);
        cartCtx.loadItems(resultSc.products || []);
        cartCtx.addId(resultSc.id);

        setCarrito(resultSc.products || []);
        break;
      }
      case "load-carrito": {
        const resultSc = await apiCarrito.listar(authCtx.user["id"]);
        cartCtx.loadItems(resultSc.products || []);
        setCarrito(resultSc.products || []);
        cartCtx.addId(resultSc.id);
        console.log(resultSc);
        break;
      }
      case "updated": {
        setFlag("load-carrito");
        break;
      }
      case "product-updated": {
        setProdToEdit(false);
        setFlag("load");
        break;
      }
      case "product-edited": {
        setProdToEdit(false);
        setFlag("load");
        break;
      }
      case "cancel": {
        setProdToEdit(false);
        setFlag("load");
        break;
      }
      case "checkout": {
        setCarrito([]);
        cartCtx.addId(null);
        setFlag("load");
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    authCtx.user && fetchProduct();
  }, [authCtx.user, flag]);

  return (
    <React.Fragment>
      {!authCtx.isLoggedIn && <LoginForm />}
      {authCtx.isLoggedIn && (
        <div className="App">
          {admin ? (
            <div
              class="btn add"
              style={{ width: "120px" }}
              onClick={(e) => {
                document.getElementById("input-product-form").style.display =
                  "flex";
              }}
            >
              Agregar producto
            </div>
          ) : (
            ""
          )}
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>

          {prodToEdit ? (
            <InputProduct cb={setFlag} prodToEdit={prodToEdit} />
          ) : (
            <InputProduct cb={setFlag} prodToEdit={false} />
          )}
          {prodToEdit
            ? (document.getElementById("input-product-form").style.display =
                "flex")
            : ""}

          <div class="row">
            <div class="column">
              <h2>Productos</h2>
              <Search cb={setFlag} setFilter={setFilter} />
              {prods.map((prod) => (
                <div key={prod.id}>
                  <Card
                    content={prod}
                    cb={setFlag}
                    admin={admin}
                    edit={setProdToEdit}
                  />
                </div>
              ))}
            </div>
            <div class="column">
              <h2>Carrito</h2>
              <Cart items={carrito} cb={setFlag} />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default App;
