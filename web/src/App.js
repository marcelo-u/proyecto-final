import "./App.css";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Cart from "./components/Cart";
import InputProduct from "./components/InputProduct";
import { apiCarrito, apiProducto } from "./utils/api";
import config from "./utils/config";

const App = () => {
  const [admin, setAdmin] = useState([false]);
  const [prods, setProds] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [flag, setFlag] = useState("load");
  const [prodToEdit, setProdToEdit] = useState(false);

  const fetchProduct = async () => {
    setAdmin(config.admin);
    switch (flag) {
      case "load": {
        const resultProds = await apiProducto.listar();
        setProds(resultProds.hasOwnProperty("error") ? [] : resultProds);
        const resultSc = await apiCarrito.listar();
        setCarrito(resultSc.hasOwnProperty("error") ? [] : resultSc);
        break;
      }
      case "load-carrito": {
        const resultSc = await apiCarrito.listar();
        setCarrito(resultSc.hasOwnProperty("error") ? [] : resultSc);
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
      default: {
        break;
      }
    }
  };

  useEffect(() => fetchProduct(), [flag]);

  return (
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

      {prodToEdit ? (
        <InputProduct cb={setFlag} prodToEdit={prodToEdit} />
      ) : (
        <InputProduct cb={setFlag} prodToEdit={false} />
      )}
      {prodToEdit
        ? (document.getElementById("input-product-form").style.display = "flex")
        : ""}

      <div class="row">
        <div class="column">
          <h2>Productos</h2>
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
  );
};

export default App;
