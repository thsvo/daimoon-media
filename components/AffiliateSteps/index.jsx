import Image from 'next/image';
import Button from '/components/Button';

import TouchTap from '/public/icons/touch_tap';
import Advertisement from '/public/icons/advertisement';
import MoneyBag from '/public/icons/moneybag';

import Spotlight3 from '/public/Spotlights/spotlight-3.png';

import styles from './affiliatesteps.module.scss';

const AffiliateSteps = () => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.step}>1</div>
          <div className={styles.itemContent}>
            <TouchTap />
            <span>Join our affilliate program</span>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.step}>2</div>
          <div className={styles.itemContent}>
            <Advertisement />
            <span>Advertise your referral link</span>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.step}>3</div>
          <div className={styles.itemContent}>
            <MoneyBag />
            <span>Earn money</span>
          </div>
        </div>
      </div>

      <Button
        type={'normal'}
        text={'Apply right now'}
        to={'/b2b/affiliates/register/artist'}
        className={styles.modifiedButton}
      />
      <div className={styles.spotlight}>
        <Image
          alt={''}
          width={600}
          height={600}
          src={Spotlight3}
          placeholder='blur'
        />
      </div>
    </div>
  );
};

export default AffiliateSteps;
