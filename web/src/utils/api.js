import config from "./config";

const apiProducto = {
  agregar: async (p) => await post("/producto/agregar", p),
  listar: async (filter) =>
    await get(`/producto/listar`, filter ? filter : null),
  actualizar: async (p) => await put(`/producto/actualizar/${p.id}`, p),
  borrar: async (id) => await del(`/producto/borrar/${id}`),
};

const apiCarrito = {
  checkout: async (data) => await post(`/carrito/checkout`, data),
  crear: async (user_id, products) =>
    await post(`/carrito/crear/${user_id}`, products),
  agregar: async (user_id, products) =>
    await put(`/carrito/agregar/${user_id}`, products),
  listar: async (user_id) => await get(`/carrito/listar/${user_id}`),
  actualizar: async (user_id, items) =>
    await put(`/carrito/agregar/${user_id}`, items),
  eliminar: async (id) => await del(`/carrito/borrar/${id}`),
};

const apiLogin = {
  prefix: async () => {
    const result = await fetch(`${HOST}/prefix`);
    const data = await result.json();
    return data;
  },
  login: async (credentials) => {
    try {
      const result = await fetch(`${HOST}/auth/user/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "Application/Json" },
      });
      const data = await result.json();
      return data;
    } catch (err) {}
  },
  register: async (form) => {
    try {
      const result = await fetch(`${HOST}/auth/user/register`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "Application/Json" },
      });
      const response = await result.json();
      return response;
    } catch (err) {
      console.log(form);
      console.log("error " + err);
    }
  },
  user: async () => {
    let data;
    try {
      const result = await fetch(`${HOST}/auth/user`, {
        credentials: "include",
      });
      data = await result.json();
      return data;
    } catch (err) {
      console.log(data);
      console.log("error" + err);
    }
  },
  whoami: async (token) => {
    let data;
    try {
      const result = await fetch(`${HOST}/auth/whoami`, {
        headers: { authorization: `bearer ${token}` },
      });
      data = await result.json();
      return data.content;
    } catch (err) {
      console.log(data);
      console.log("error" + err);
    }
  },
};

const { HOST, PORT } = config;
const baseUrl = `${HOST}`;

const get = async (endpoint, filter) => {
  const token = sessionStorage.getItem("token");
  let params = "";
  if (filter) {
    params = new URLSearchParams(filter);
  }
  try {
    const result = await fetch(`${baseUrl}${endpoint}?` + params, {
      headers: { authorization: `bearer ${token}` },
    });
    const data = await result.json();
    return data;
  } catch (err) {
    return { error: `${endpoint}: no se ha podido efectuar la operación` };
  }
};
const put = async (endpoint, body) => {
  const token = sessionStorage.getItem("token");
  try {
    const data = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "Application/Json",
        authorization: `bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return {
      error: `${endpoint}: no se ha podido efectuar la operación`,
    };
  }
};
const post = async (endpoint, body) => {
  const token = sessionStorage.getItem("token");
  try {
    const data = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "Application/Json",
        authorization: `bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return {
      error: `${endpoint}: no se ha podido efectuar la operación`,
    };
  }
};
const del = async (endpoint) => {
  const token = sessionStorage.getItem("token");
  try {
    const data = await fetch(`${baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: { authorization: `bearer ${token}` },
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

export { apiProducto, apiCarrito, apiLogin };
