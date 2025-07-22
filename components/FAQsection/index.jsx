import Question from '/components/Question';

import styles from './faqsection.module.scss';

const FAQSection = (props) => {
  const { item, service, color } = props;

  return (
    <div className={[styles.container].join(' ')}>
      <h4 style={{ color: color }}>{item.category}</h4>
      <div className={styles.questionSection}>
        {item.questions.map((item, index) => (
          <>
            <Question color={color} service={service} item={item} key={index} />
          </>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
