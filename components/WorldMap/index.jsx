import Explanation from '/public/icons/explanation.jsx';
import ToolTipCustom from '/components/Tooltip';

import Map from '/public/worldmap/map';

import styles from './map.module.scss';

const WorldMap = (props) => {
  const { region, values } = props;
  const views =
    values && values.values.length != 0 ? values.values[0].value.streams : 0;

  return (
    <section className={styles.container}>
      <div className={styles.graphLabels}>
        <div className={styles.item}>
          <div>
            <span>
              {views / 1000}K to {Math.floor((views + views / 4) / 1000)}K
            </span>
            <sub>Estimated Views</sub>
          </div>

          <ToolTipCustom
            label={''}
            text={
              'The total number of views we expect to gain on your video considering your budget and territory targeting. Actual results may differ, but this is usually accurate.'
            }
          >
            <Explanation />
          </ToolTipCustom>
        </div>
        {/* <div className={styles.item}>
          <div>
            <span></span>
            <sub>Est. Playlist Follower Reach</sub>
          </div>
          <div>
            <Explanation />
          </div>
        </div> */}
      </div>
      <div className={styles.map}>
        <Map region={region} />
        <div className={styles.disclaimer}>
          *Disclaimer: All statistics are estimates & your actual results may
          differ.
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
