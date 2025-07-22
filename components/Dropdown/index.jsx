//Core
import React, { useState } from 'react';
//Helpers

const Dropdown = () => {
  const [selectedCurrency, setselectedCurrency] = useState('eur');

  return (
    <select onChange={() => setselectedCurrency()} value={selectedCurrency}>
      <option value='eur'>Eur</option>
      <option value='dollar'>Dollar</option>
    </select>
  );
};

export default Dropdown;
