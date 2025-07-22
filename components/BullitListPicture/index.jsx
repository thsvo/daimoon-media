import styles from './bullitlistpicture.module.scss';

import BullitList from '/components/Bullitlist';
import SinglePicture from '/components/SinglePicture';

import affiliate4 from '/public/images/affiliate4.png';

const BullitListPicture = () => {
  return (
    <div className={styles.container}>
      <BullitList />
      <SinglePicture image={affiliate4} />
    </div>
  );
};

export default BullitListPicture;
