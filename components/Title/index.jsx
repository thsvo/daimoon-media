import styles from './title.module.scss';

const Title = (props) => {
  const { title, sub, center } = props;
  return (
    <div
      className={['wrapper', styles.container, center && styles.center].join(
        ' '
      )}
    >
      <h2>{title}</h2>
      {sub && <span dangerouslySetInnerHTML={{ __html: sub }}></span>}
      
    </div>
  );
};

export default Title;
