import styles from './quote.module.scss';

const Quote = (props) => {
  const { quote } = props;

  return <p className={styles.quote}>{quote}</p>;
};

export default Quote;
