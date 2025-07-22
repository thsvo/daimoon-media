import styles from './paragraph.module.scss';

const Paragraph = (props) => {
  const { title, paragraph } = props;

  return (
    <div className={[styles.container].join(' ')}>
      <h3>{title}</h3>
      <p dangerouslySetInnerHTML={{ __html: paragraph }}></p>
    </div>
  );
};

export default Paragraph;
