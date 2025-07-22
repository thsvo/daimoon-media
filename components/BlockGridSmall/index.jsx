import Image from 'next/image';

import Button from '/components/Button';

import OralPromotion from '/public/icons/oralPromotion';
import InternetIcon from '/public/icons/internet';
import NewsLetter from '/public/icons/newsLetter';
import SocialNetwork from '/public/icons/socialNetwork';

import Spotlight2 from '/public/Spotlights/spotlight-2.png';

import styles from './blockgridsmall.module.scss';

const BlockGridSmall = (props) => {
  const { items, smallCTA } = props;
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.spotlight}>
          <Image
            alt={'spotlight'}
            width={500}
            height={500}
            src={Spotlight2}
            placeholder='blur'
          />
        </div>
        <div className={styles.item}>
          <OralPromotion />
          <div className={styles.textContainer}>
            <b>Word of mouth</b>
            <sub>Tell everyone!</sub>
          </div>
        </div>
        <div className={styles.item}>
          <InternetIcon />
          <div className={styles.textContainer}>
            <b>Site or blog</b>
            <sub>Write about us</sub>
          </div>
        </div>
        <div className={styles.item}>
          <NewsLetter />
          <div className={styles.textContainer}>
            <b>Newsletter</b>
            <sub>Just add a link</sub>
          </div>
        </div>
        <div className={styles.item}>
          <SocialNetwork />
          <div className={styles.textContainer}>
            <b>Social Media</b>
            <sub>#promo #ad</sub>
          </div>
        </div>
      </div>
      {smallCTA && (
        <div className={styles.ctaContainer}>
          <span>
            <b>100% Risk free.</b> Full refund if we don’t comply with the
            statements above.
          </span>
          <Button
            type='normal'
            text='Spotify Promotions'
            to='/campaigns/spotify-promotion'
            discount={true}
          ></Button>
        </div>
      )}
    </div>
  );
};

export default BlockGridSmall;
