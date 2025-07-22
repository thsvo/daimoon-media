import React from 'react';

const ArrowNext = (props) => {
  const { color } = props;
  return (
    <svg width='13' height='18' viewBox='0 0 13 18' fill={color}>
      <path
        d='M12.2503 9.00001L3.41068 17.8396L0.464844 14.8917L6.35859 9.00002L0.464843 3.10835L3.41068 0.160431L12.2503 9.00001Z'
        fill={color}
      />
    </svg>
  );
};

export default ArrowNext;
