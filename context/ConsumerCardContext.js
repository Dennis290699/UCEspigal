import React, { createContext, useState } from 'react';
export const ConsumerCardContext = createContext();

export const ConsumerCardProvider = ({ children }) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvc: '',
    cardHolderName: ''
  });

  const resetCardData = () => {
    setCardData({
      cardNumber: '',
      expirationDate: '',
      cvc: '',
      cardHolderName: ''
    });
  };

  return (
    <ConsumerCardContext.Provider value={{ cardData, setCardData, resetCardData }}>
      {children}
    </ConsumerCardContext.Provider>
  );
};
