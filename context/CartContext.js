import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].count += item.count;
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, agregarlo
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateItemQuantity = (index, newCount) => {
    const updatedCart = [...cart];
    updatedCart[index].count = newCount;
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
