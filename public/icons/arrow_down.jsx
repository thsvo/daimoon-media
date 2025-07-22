import React from 'react';

const ArrowDown = (props) => {
  const { color } = props;
  return (
    <svg
      {...props}
      width='20px'
      height='20px'
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='angle-down'
      role='img'
      viewBox='0 0 320 512'
    >
      <path
        fill={color ? color : 'currentColor'}
        d='M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z'
      ></path>
    </svg>
  );
};

export default ArrowDown;
