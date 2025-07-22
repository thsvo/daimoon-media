const Heart = (props) => {
  const { color } = props;

  return (
    <svg width='22' height='19' viewBox='0 0 20 20' fill={color}>
      <path
        d='M21 8.99998C21 12.7539 15.7156 17.9757 12.5857 20.5327C12.2416 20.8137 11.7516 20.8225 11.399 20.5523C8.26723 18.1523 3 13.1225 3 8.99998C3 2.00001 12 2.00002 12 8C12 2.00001 21 1.99999 21 8.99998Z'
        fill={color}
      />
    </svg>
  );
};

export default Heart;
