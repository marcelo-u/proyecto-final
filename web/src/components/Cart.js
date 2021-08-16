import React from "react";
import { apiCarrito } from "../utils/api";

const Cart = ({ items, cb }) => {
  const handleRemove = async (id) => {
    await apiCarrito.borrar(id).then(() => {
      cb("updated");
    });
  };

  return (
    <div class="container">
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
            {items.map(({ id, producto }) => (
              <tr key={id}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>
                  <img src={producto.foto} alt="foto" width="100px" />
                </td>
                <td>
                  <div class="btn danger" onClick={handleRemove.bind(this, id)}>
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
