import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import CartContext from "../store/cart-context";
import { apiProducto, apiCarrito } from "../utils/api";

const Card = ({ content, cb, admin, edit }) => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const handleAdd = async () => {
    cartCtx.addItem(content);
    await apiCarrito
      .actualizar(authCtx.user.id, cartCtx.items)
      .then(() => cb("updated"));
  };

  const handleEdit = async () => {
    edit(content);
  };

  const handleDelete = async () => {
    await apiProducto.borrar(content.id).then(() => cb("product-updated"));
  };

  return (
    <div class="card">
      <div class="card-row">
        <div class="card-column left">
          <img src={content.foto} alt="Text" style={{ height: "100px" }} />
        </div>
        <div class="card-column center">
          <h4>
            <b>{content.nombre}</b>
          </h4>
          <p>Desc: {content.descripcion}</p>
          <p>Cod: {content.codigo}</p>
          <p>Precio: ARS {content.precio}</p>
          <p>Stock: {content.stock}</p>
          {admin && <p>[ID: {content.id}]</p>}
        </div>
        <div class="card-column right">
          <div class="btn add" onClick={handleAdd}>
            Agregar
          </div>
          <br />
          {admin ? (
            <div class="btn edit" onClick={handleEdit}>
              Editar
            </div>
          ) : (
            ""
          )}
          <br />
          {admin ? (
            <div class="btn danger" onClick={handleDelete}>
              Borrar
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
