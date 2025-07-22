import ArrowDown from '/public/icons/arrow_down.jsx';

import styles from './notice.module.scss';

const ImportantNotice = () => {
  return (
    <>
      <div className={styles.container}>
        <span>Important notice!</span>
        <p>
          Spotify campaigns tend to fluctuate between 3 days and 1.5 weeks to
          secure playlists. {`We're`} working hard to improve delivery speed!
          For questions/updates, please email us at support@daimoon.media
        </p>
      </div>
    </>
  );
};

export default ImportantNotice;
