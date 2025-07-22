const HealthyHeart = (props) => {
  const { color } = props;
  return (
    <svg
      width='30px'
      height='30px'
      version='1.1'
      x='0px'
      y='0px'
      viewBox='0 0 64 64'
      enableBackground='new 0 0 64 64'
      xmlSpace='preserve'
    >
      <g>
        <g>
          <path
            fill={color}
            d='M64,20.3C64,11.3,56.6,4,47.4,4c-7,0-13,4.3-15.4,10.3C29.6,8.3,23.6,4,16.6,4C7.4,4,0,11.3,0,20.3c0,0.1,0,0.9,0,1.2
			C0,38.3,33.2,60,33.2,60S64,38.3,64,21.5C64,21.2,64,20.5,64,20.3z'
          />
        </g>
      </g>
    </svg>
  );
};

export default HealthyHeart;
