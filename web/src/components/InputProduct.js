import React from "react";
import { apiProducto } from "../utils/api";

const InputProduct = ({ cb, prodToEdit }) => {
  const inputTitle = document.querySelector("#title");
  const inputDesc = document.querySelector("#description");
  const inputCode = document.querySelector("#code");
  const inputPrice = document.querySelector("#price");
  const inputStock = document.querySelector("#stock");
  const inputUrl = document.querySelector("#url");

  const handleAddProduct = async () => {
    const prod = {
      nombre: inputTitle.value,
      descripcion: inputDesc.value,
      codigo: inputCode.value,
      foto: inputUrl.value,
      precio: inputPrice.value,
      stock: inputStock.value,
    };

    await apiProducto.agregar(prod).then((resp) => {
      cb("product-edited");
      if (!resp.hasOwnProperty("error"))
        document.getElementById("input-product-form").style.display = "none";
    });
  };

  const handleEditProduct = async () => {
    const prod = {
      id: prodToEdit.id,
      nombre: inputTitle.value,
      descripcion: inputDesc.value,
      codigo: inputCode.value,
      foto: inputUrl.value,
      precio: inputPrice.value,
      stock: inputStock.value,
    };

    await apiProducto.actualizar(prod).then((resp) => {
      cb("product-edited");
      if (!resp.hasOwnProperty("error"))
        document.getElementById("input-product-form").style.display = "none";
    });
  };

  return (
    <div id="input-product-form" class="div-input input-product">
      <form>
        <label for="title">Producto</label>
        <input
          type="text"
          id="title"
          name="nombre"
          placeholder="Nombre del producto..."
          defaultValue={prodToEdit ? prodToEdit.nombre : ""}
        />
        <label for="description">Descripcion</label>
        <input
          type="text"
          id="description"
          name="descripcion"
          placeholder="Descripcion del producto"
          defaultValue={prodToEdit ? prodToEdit.descripcion : ""}
        />
        <label for="code">Código</label>
        <input
          type="number"
          id="code"
          name="codigo"
          placeholder="Codigo del producto"
          defaultValue={prodToEdit ? prodToEdit.codigo : ""}
        />
        <label for="price">Precio</label>
        <input
          type="number"
          id="price"
          name="precio"
          placeholder="Precio"
          defaultValue={prodToEdit ? prodToEdit.precio : ""}
        />
        <label for="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          placeholder="Stock"
          defaultValue={prodToEdit ? prodToEdit.stock : ""}
        />
        <label for="url">Imagen</label>
        <input
          type="url"
          id="url"
          name="url"
          placeholder="Url foto"
          defaultValue={prodToEdit ? prodToEdit.foto : ""}
        />
        <div class="row">
          <div
            class={prodToEdit ? "btn edit column" : "btn add column"}
            type="submit"
            value="Submit"
            onClick={prodToEdit ? handleEditProduct : handleAddProduct}
          >
            {prodToEdit ? "Editar" : "Agregar"}
          </div>
          <div
            onClick={() => {
              document.getElementById("input-product-form").style.display =
                "none";
              cb("cancel");
            }}
            class="btn cancel column"
          >
            Cancelar
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputProduct;
