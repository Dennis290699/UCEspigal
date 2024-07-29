import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Verifica si el artículo ya existe en el carrito por el código
    const existingItemIndex = cart.findIndex(cartItem => cartItem.code === item.code);
    
    if (existingItemIndex > -1) {
      // Actualiza la cantidad si el artículo ya existe en el carrito
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].count = (updatedCart[existingItemIndex].count || 1) + 1;
      setCart(updatedCart);
    } else {
      // Agrega el artículo al carrito si no existe
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  const removeFromCart = (code) => {
    // Elimina el artículo del carrito por el código
    setCart(cart.filter(cartItem => cartItem.code !== code));
  };

  const updateItemQuantity = (code, newCount) => {
    // Actualiza la cantidad del artículo en el carrito por el código
    const updatedCart = cart.map(cartItem => 
      cartItem.code === code ? { ...cartItem, count: newCount } : cartItem
    );
    setCart(updatedCart);
  };

  const resetCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateItemQuantity, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};
