import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.code === item.code);
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].count += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  const removeFromCart = (code) => {
    setCart(cart.filter(item => item.code !== code));
  };

  const updateItemQuantity = (code, count) => {
    const updatedCart = cart.map(item => 
      item.code === code ? { ...item, count } : item
    );
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
