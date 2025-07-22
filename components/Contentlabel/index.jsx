import styles from './label.module.scss';

const Contentlabel = (props) => {
  const { style, children } = props;
  return (
    <label style={style} className={styles.label}>
      {children}
    </label>
  );
};

export default Contentlabel;
