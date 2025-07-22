import React from 'react';

const SoundCloud = (props) => {
  const color = props.color ? props.color : '#FDFDFD';
  return (
    <svg
      style={props}
      width='24'
      height='13'
      viewBox='0 0 24 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.4917 13H11.1362V1.31237C12.003 0.493828 13.1257 0 14.3522 0C17.0662 0 19.2721 2.41829 19.3214 5.42225C19.6874 5.27832 20.0813 5.2 20.4917 5.2C22.4293 5.2 24 6.94608 24 9.1C24 11.2539 22.4293 13 20.4917 13Z'
        fill={color}
      />
      <path d='M10.2857 2.36364H9.14286V13H10.2857V2.36364Z' fill={color} />
      <path d='M6.85715 3.54545H8.00001V13H6.85715V3.54545Z' fill={color} />
      <path d='M5.71429 5.90909H4.57143V13H5.71429V5.90909Z' fill={color} />
      <path d='M2.28572 4.72727H3.42857V13H2.28572V4.72727Z' fill={color} />
      <path d='M1.14286 7.09091H0V13H1.14286V7.09091Z' fill={color} />
    </svg>
  );
};

export default SoundCloud;
