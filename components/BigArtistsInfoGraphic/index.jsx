import GraphCandles from '/public/icons/graphCandles';
import Pie from '/public/icons/pie';

import ArrowDown from '/public/icons/arrow_down';

import styles from './inforgraphic.module.scss';

const BigArtistsInfoGraphic = () => {
  return (
    <div className={styles.container}>
      <h3>We help music experts with:</h3>
      <div className={styles.categories}>
        <div className={styles.item}>
          <div className={styles.heading}>
            <GraphCandles />
            <span>Priority Campaigns</span>
          </div>
          <p className={styles.subText}>
            Above-average sized stand-alone campaigns with big-size discounts &
            extra attention for maximum impact.
          </p>
        </div>
        <div className={styles.item}>
          <div className={styles.heading}>
            <Pie />
            <span>
              Strategies <b>(7/10 partner slots available)</b>
            </span>
          </div>
          <p className={styles.subText}>
            Combine priority-campaigns in a strategic order for maximum leverage
            on algorithms devided over different platforms.
          </p>
        </div>
      </div>
      <div className={styles.containerCTA}>
        <span>Read more</span>
        <div className={styles.cta}>
          <ArrowDown color={'#b165ed'} />
        </div>
      </div>
    </div>
  );
};

export default BigArtistsInfoGraphic;
