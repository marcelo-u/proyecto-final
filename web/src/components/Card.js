import React from "react";
import { apiProducto, apiCarrito } from "../utils/api";

const Card = ({ content, cb, admin, edit }) => {
  const handleAdd = async () => {
    await apiCarrito.agregar(content.id).then(() => cb("updated"));
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
          <div>{admin ? content.id : ""}</div>
        </div>
        <div class="card-column center">
          <h4>
            <b>{content.nombre}</b>
          </h4>
          <p>Desc: {content.descripcion}</p>
          <p>Cod: {content.codigo}</p>
          <p>Precio: ARS {content.precio}</p>
          <p>Stock: {content.stock}</p>
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
