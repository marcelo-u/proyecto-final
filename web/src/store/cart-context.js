import React, { useState } from "react";

const CartContext = React.createContext({
  id: null,
  items: [],
  addId: (id) => {},
  removeId: () => {},
  loadItems: (items) => {},
  addItem: (item) => {},
  removeItem: (index) => {},
});

export const CartContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [id, setId] = useState(null);

  const addIdHandler = (id) => {
    setId(id);
  };

  const removeIdHandler = () => {
    setId(null);
  };

  const addItemHandler = (item) => {
    setItems(items.push(item));
  };

  const removeItemHandler = (index) => {
    setItems(items.splice(index, 1));
  };

  const loadHandler = (items) => {
    setItems(items);
  };

  const context = {
    items: items,
    id: id,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    loadItems: loadHandler,
    addId: addIdHandler,
    removeId: removeIdHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
