// import React, { createContext, useState } from 'react';

// export const CustomerProvider = ({ children }) => {
//   const [customerData, setCustomerData] = useState({
//     idCard: '',
//     name: '',
//     email: '',
//     address: '',
//     phoneNumber: '',
//     option: 'Invoice'
//   });

//   const updateCustomerData = (data) => {
//     setCustomerData((prevData) => ({ ...prevData, ...data }));
//   };

//   return (
//     <CustomerContext.Provider value={{ customerData, updateCustomerData }}>
//       {children}
//     </CustomerContext.Provider>
//   );
// };
