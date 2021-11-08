import React, { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import CartContext from "../store/cart-context";
import { apiCarrito } from "../utils/api";

const Cart = ({ items, cb }) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const handleRemove = async (id) => {
    items.splice(id, 1);
    await apiCarrito.actualizar(authCtx.user.id, items).then(() => {
      cb("updated");
    });
  };

  const checkoutHandler = async () => {
    const itemsToSend = cartCtx.items;
    console.log(cartCtx.id);
    const form = {
      items: itemsToSend,
      user: authCtx.user,
    };
    const checkout = await apiCarrito.checkout(form);
    cb("checkout");
  };

  return (
    <div class="container">
      {cartCtx.items.length > 0 && (
        <button onClick={checkoutHandler}>Enviar Orden</button>
      )}
      {authCtx.user && (
        <div>
          <h4>
            {authCtx.user.name} | {authCtx.user.address} | {authCtx.user.email}{" "}
            | {authCtx.user.phone}
          </h4>
        </div>
      )}
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th>Cod.</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Foto</th>
              <th style={{ textAlign: "center" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product, index) => (
              <tr key={index}>
                <td>{product.codigo}</td>
                <td>{product.nombre}</td>
                <td>{product.precio}</td>
                <td>
                  <img src={product.foto} alt="foto" width="100px" />
                </td>
                <td>
                  <div
                    class="btn danger"
                    onClick={handleRemove.bind(this, index)}
                  >
                    Borrar
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Cart;
