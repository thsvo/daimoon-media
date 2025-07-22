import React from 'react';

const ArrowBack = (props) => {
  const { color } = props;
  return (
    <svg width='40' height='20' viewBox='0 0 10 18' fill={color}>
      <path
        d='M0.0507812 8.99991L8.06411 17.0132L9.94945 15.1279L3.81611 8.99457L9.94945 2.86124L8.06411 0.986572L0.0507812 8.99991Z'
        fill={color}
      />
    </svg>
  );
};

export default ArrowBack;
