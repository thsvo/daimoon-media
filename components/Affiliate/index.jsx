import Image from 'next/image';
import Link from 'next/link';

import affiliates from '/public/images/affiliates.png';
import styles from './affiliate.module.scss';

import Parallax from '/components/Parallax';
import Spotlight2 from '/public/Spotlights/spotlight-2.png';

import Sparkle from '/public/icons/sparkle';
import PiggyBank from '/public/icons/piggyBank';
import Graph from '/public/icons/graph';
import FullArrowNext from '/public/icons/full_arrow_next';

const Affiliate = () => {
  return (
    <div className={[styles.container, 'wrapper'].join(' ')}>
      <div className={styles.spotlight}>
        <Parallax offset={200}>
          <Image
            width={700}
            height={700}
            src={Spotlight2}
            placeholder='blur'
            alt={''}
          />
        </Parallax>
      </div>
      <div className={[styles.content].join(' ')}>
        <div className={styles.text}>
          <div>
            <h4>
              <b>Need bigger campaigns? 🚀</b>
            </h4>
            <p>
              Apply as a partner and get access to bigger campaigns. For
              established artists, record labels, managers and agencies.
            </p>
          </div>
          <div className={styles.info}>
            <Link href='/contact?key=customer&form=priority' passHref={true}>
              <div className={styles.item}>
                <Sparkle />
                <span>
                  Exclusive <br /> services
                </span>
              </div>
            </Link>

            <Link href='/contact?key=customer&form=priority' passHref={true}>
              <div className={styles.item}>
                <PiggyBank />
                <span>
                  Adaptive
                  <br /> pricing
                </span>
              </div>
            </Link>

            <Link href='/contact?key=customer&form=priority' passHref={true}>
              <div className={styles.item}>
                <Graph />
                <span>
                  Bigger
                  <br /> numbers
                </span>
              </div>
            </Link>
          </div>
          <Link href='/contact?key=customer&form=priority' passHref={true}>
            <button className={styles.button}>
              <FullArrowNext /> Priority Campaigns
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
