import React from 'react';

const Money = (props) => {
  return (
    <svg
      {...props}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.66602 9.33268C2.66602 8.62544 2.94697 7.94716 3.44706 7.44706C3.94716 6.94697 4.62544 6.66602 5.33268 6.66602H26.666C27.3733 6.66602 28.0515 6.94697 28.5516 7.44706C29.0517 7.94716 29.3327 8.62544 29.3327 9.33268V22.666C29.3327 23.3733 29.0517 24.0515 28.5516 24.5516C28.0515 25.0517 27.3733 25.3327 26.666 25.3327H5.33268C4.62544 25.3327 3.94716 25.0517 3.44706 24.5516C2.94697 24.0515 2.66602 23.3733 2.66602 22.666V9.33268Z'
        stroke='#B165ED'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z'
        stroke='#B165ED'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.66602 11.9993C4.0805 11.9993 5.43706 11.4374 6.43725 10.4373C7.43745 9.43706 7.99935 8.0805 7.99935 6.66602'
        stroke='#B165ED'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M24 25.3333C24 23.9188 24.5619 22.5623 25.5621 21.5621C26.5623 20.5619 27.9188 20 29.3333 20'
        stroke='#B165ED'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Money;
