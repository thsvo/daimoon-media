import styles from './tooltip.module.scss';

const ToolTipCustom = (props) => {
  const { text, children, label } = props;
  return (
    <div className={styles.tooltip}>
      {children}
      <div className={styles.tooltiptext}>
        <label>{label}</label>
        {text}
      </div>
    </div>
  );
};

export default ToolTipCustom;
