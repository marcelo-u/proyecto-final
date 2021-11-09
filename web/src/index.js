import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { CartContextProvider } from "./store/cart-context";

ReactDOM.render(
  <AuthContextProvider>
    <CartContextProvider value={{}}>
      <App />
    </CartContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
