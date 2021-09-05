import config from "./config";
const apiProducto = {
  agregar: async (p) => await post("/producto/agregar", p),
  listar: async (filter) =>
    await get(`/producto/listar`, filter ? filter : null),
  actualizar: async (p) => await put(`/producto/actualizar/${p.id}`, p),
  borrar: async (id) => await del(`/producto/borrar/${id}`),
};

const apiCarrito = {
  agregar: async (id) => await post(`/carrito/agregar/${id}`, {}),
  listar: async () => await get("/carrito/listar"),
  borrar: async (id) => await del(`/carrito/borrar/${id}`),
};

const { HOST, PORT } = config;
const baseUrl = `${HOST}`;

const get = async (endpoint, filter) => {
  let params = "";
  if (filter) {
    params = new URLSearchParams(filter);
  }
  try {
    const result = await fetch(`${baseUrl}${endpoint}?` + params);
    const data = await result.json();
    return data;
  } catch (err) {
    console.log(err);
    return { error: `${endpoint}: no se ha podido efectuar la operación` };
  }
};
const put = async (endpoint, body) => {
  try {
    const data = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(body),
      headers: { "Content-Type": "Application/Json" },
    });
    return data;
  } catch (err) {
    return {
      error: `${endpoint}: no se ha podido efectuar la operación`,
    };
  }
};
const post = async (endpoint, body) => {
  try {
    const data = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: { "Content-Type": "Application/Json" },
    });
    return data;
  } catch (err) {
    console.log("error");
    return {
      error: `${endpoint}: no se ha podido efectuar la operación`,
    };
  }
};
const del = async (endpoint) => {
  try {
    const data = await fetch(`${baseUrl}${endpoint}`, {
      method: "DELETE",
    });
    return data;
  } catch (err) {
    return { error: `${endpoint}: no se ha podido efectuar la operación` };
  }
};

const toQueryString = (obj) => {
  let str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export { apiProducto, apiCarrito };
