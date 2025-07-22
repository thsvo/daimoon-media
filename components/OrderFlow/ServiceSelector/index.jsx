import styles from './service.module.scss';

import { motion, AnimatePresence } from 'framer-motion';

import Soundcloud from '/public/icons/soundcloud.jsx';
import Youtube from '/public/icons/youtube.jsx';
import Spotify from '/public/icons/spotify.jsx';
import Tiktok from '/public/icons/tiktok.jsx';

const serviceSelector = (props) => {
  const { setService, service } = props;

  const handleState = (service) => {
    setService(service);
  };

  return (
    <div className={styles.container}>
      <div className={styles.SelectorContainer}>
        <AnimatePresence>
          <motion.div
            id={'spotify'}
            className={[
              styles.item,
              service == 'spotify' && styles.item_spotify,
            ].join(' ')}
            onClick={() => handleState('spotify')}
          >
            <Spotify />
          </motion.div>
          <motion.div
            id={'soundcloud'}
            className={[
              styles.item,
              service == 'soundcloud' && styles.item_soundcloud,
            ].join(' ')}
            onClick={() => handleState('soundcloud')}
          >
            <Soundcloud />
          </motion.div>
          <motion.div
            id={'youtube'}
            className={[
              styles.item,
              service == 'youtube' && styles.item_youtube,
            ].join(' ')}
            onClick={() => handleState('youtube')}
          >
            <Youtube />
          </motion.div>
          <motion.div
            id={'tiktok'}
            className={[
              styles.item,
              service == 'tiktok' && styles.item_tiktok,
            ].join(' ')}
            onClick={() => handleState('tiktok')}
          >
            <Tiktok />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default serviceSelector;
