import React from 'react';

const CustomerContext = React.createContext();

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useCustomer() {
  const context = React.useContext(CustomerContext);
  if (!context) throw new Error('useCustomer must be used in CustomerProvider');
  return context;
}

function CustomerProvider(props) {
  const [state, setState] = React.useReducer(reducer, {
    customerLocation,
    customerIP,
  });
  const value = React.useMemo(() => [state, setState], [state]);
  return <CustomerContext.Provider value={value} {...props} />;
}

function updateCustomer(setState, customerLocation, customerIP) {
  setState({
    customerLocation: customerLocation,
    customerIP: customerIP,
  });
}

export { CustomerProvider, useCustomer, updateCustomer };
