import React from "react";

const Search = ({ cb, setFilter }) => {
  const inputName = document.querySelector("#search-title");
  const inputCode = document.querySelector("#search-code");
  const inputPrice = document.querySelector("#search-price");
  const inputStock = document.querySelector("#search-stock");
  const inputPriceMax = document.querySelector("#search-price-max");
  const inputStockMax = document.querySelector("#search-stock-max");

  const handleFilter = () => {
    const filter = {};
    if (inputName.value) filter.nombre = inputName.value;
    if (inputCode.value) filter.codigo = inputCode.value;
    if (inputPrice.value) filter.precio = inputPrice.value;
    if (inputStock.value) filter.stock = inputStock.value;
    if (inputPriceMax.value) filter.precioMax = inputPriceMax.value;
    if (inputStockMax.value) filter.stockMax = inputStockMax.value;
    setFilter(filter);
    cb("product-updated");
  };

  return (
    <div>
      <div class="row">
        <div class="column">
          <input
            id="search-title"
            type="text"
            placeholder="Nombre"
            defaultValue=""
          ></input>
          <input
            id="search-code"
            type="number"
            placeholder="Codigo"
            defaultValue=""
          ></input>
        </div>
        <div class="column">
          <div class="column">
            <input
              id="search-price"
              type="number"
              placeholder="Precio Mín"
              defaultValue=""
            ></input>
            <input
              id="search-stock"
              type="number"
              placeholder="Stock Mín"
              defaultValue=""
            ></input>
          </div>
          <div class="column">
            <input
              id="search-price-max"
              type="number"
              placeholder="Precio Máx"
              defaultValue=""
            ></input>
            <input
              id="search-stock-max"
              type="number"
              placeholder="Stock Máx"
              defaultValue=""
            ></input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="btn add" style={{ width: "120px" }} onClick={handleFilter}>
          Buscar
        </div>
      </div>
    </div>
  );
};

export default Search;
