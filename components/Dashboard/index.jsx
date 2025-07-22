import Image from 'next/image';

import dashboard from '/public/images/dashboard-full.png';

import Clock from '/public/icons/clock.jsx';
import Playlist from '/public/icons/playlist.jsx';
import Stats from '/public/icons/stats.jsx';

import styles from './dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={[styles.container, 'wrapper'].join(' ')}>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardPreview}>
          <p className={styles.dashboardIntro}>
            We offer <b>full insight</b> in current playlist pitches, accepted
            listings, rejected listings, streams and saves.
            <b> All in an easy-to-manage dashboard</b>.
          </p>
          <div className={styles}>
            <Image src={dashboard} alt={''} />
          </div>
        </div>
        <div className={styles.benefits}>
          <div className={styles.item}>
            <Clock />
            <div>
              <span>Real time view counter</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <Playlist />
            <div>
              <span>Real time view counter</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <Stats />
            <div>
              <span>Real time view counter</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
