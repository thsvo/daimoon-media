import Tick from '/public/icons/tick';

import styles from './list.module.scss';

const BullitList = () => {
  return (
    <div className={styles.container}>
      <h2>Why affiliate with Daimoon?</h2>
      <ul>
        <li>
          <Tick fill={'#b165ed'} />
          Commission up to <b>20%</b>
        </li>
        <li>
          {' '}
          <Tick fill={'#b165ed'} />
          Best performing website in the industry
        </li>
        <li>
          {' '}
          <Tick fill={'#b165ed'} />
          Automatic monthly payouts
        </li>
        <li>
          {' '}
          <Tick fill={'#b165ed'} />
          Your earnings: The sky is the limit
        </li>
        <li>
          {' '}
          <Tick fill={'#b165ed'} />
          Only the best & fastest service for your prospects
        </li>
      </ul>
    </div>
  );
};

export default BullitList;
