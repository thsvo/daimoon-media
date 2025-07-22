import React from 'react';

const Hamburger = (props) => {
  return (
    <svg
      {...props}
      width='30'
      height='28'
      viewBox='0 0 20 18'
      fill='white'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='2' fill='white'></rect>
      <rect y='8' width='20' height='2' fill='white'></rect>
      <rect y='16' width='20' height='2' fill='white'></rect>
    </svg>
  );
};

export default Hamburger;
