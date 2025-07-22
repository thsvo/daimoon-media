import Image from 'next/image';

import searcher from '/public/images/searcher.png';
import dashboard from '/public/images/dashboard.png';
import sliders from '/public/images/sliders.png';
import oms from '/public/images/oms.png';

import Spotlight1 from '/public/Spotlights/spotlight-1.png';

import styles from './results.module.scss';

const Results = (props) => {
  return (
    <div id='results' className={[styles.container, 'wrapper'].join(' ')}>
      <div className={styles.head}>
        <h4>How it works</h4>
        <span>Own your music marketing in 4 simple steps.</span>
      </div>
      <div className={styles.steps}>
        <div className={styles.spotlight}>
          <Image
            width={800}
            height={800}
            src={Spotlight1}
            placeholder='blur'
            alt={'spotlight'}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.content}>
            <b>I.</b>
            <span>
              Choose your <br /> tracks & services
            </span>
            <Image alt='searcher' src={searcher} />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.content}>
            <b>II.</b>
            <span>
              Build your perfect <br /> growth campaign
            </span>
            <Image alt='sliders' src={sliders} />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.content}>
            <b>III.</b>
            <span>We create your personalized strategy</span>
            <Image alt='oms' src={oms} />
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.content}>
            <b>IV.</b>
            <span>Access dashboard & witness your growth</span>
            <Image alt='dashboard' src={dashboard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
