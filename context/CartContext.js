import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateItemQuantity = (index, newCount) => {
    const updatedCart = [...cart];
    updatedCart[index].count = newCount;
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
