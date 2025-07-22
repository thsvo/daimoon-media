const Triangle = (props) => {
  const { color } = props;
  return (
    <svg width='21' height='11' viewBox='0 0 21 11' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.556641 0.000488281L10.6678 10.6672L20.7789 0.000488281H0.556641Z'
        fill={color}
      />
    </svg>
  );
};

export default Triangle;
