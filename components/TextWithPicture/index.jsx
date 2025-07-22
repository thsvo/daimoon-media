import Paragraph from '/components/Paragraph';
import SinglePicture from '/components/SinglePicture';

import styles from './textwithpicture.module.scss';

import reseller2 from '/public/images/reseller2.png';

const TextWithPicture = () => {
  return (
    <div className={styles.container}>
      <Paragraph
        title={'When is this beneficial for you?'}
        paragraph={
          'If you offer services to artists, you have a unique opportunity to become a reseller. You may have a website or rent a studio for artists. When you want to help artists by facilitating them in their PR efforts, you can increase your revenue & profits! '
        }
      />
      <SinglePicture image={reseller2} />
    </div>
  );
};

export default TextWithPicture;
