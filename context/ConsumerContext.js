import React, { createContext, useState } from 'react';

export const ConsumerContext = createContext();

export const ConsumerProvider = ({ children }) => {
  const [clientData, setClientData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    domicilio: '',
    telefono: ''
  });

  const resetClientData = () => {
    setClientData({
      cedula: '',
      nombre: '',
      apellido: '',
      correo: '',
      domicilio: '',
      telefono: ''
    });
  };

  return (
    <ConsumerContext.Provider value={{ clientData, setClientData, resetClientData }}>
      {children}
    </ConsumerContext.Provider>
  );
};
