import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Search from '/components/Search';
import ReleaseDate from '/components/ReleaseDate';

import Soundcloud from '/public/icons/soundcloud.jsx';
import Youtube from '/public/icons/youtube.jsx';
import Spotify from '/public/icons/spotify.jsx';

import styles from './searchcta.module.scss';

const SearchCTA = () => {
  const [service, setService] = useState('spotify');
  const [results, setResults] = useState();
  const [releaseDate, toggleReleaseDate] = useState(false);

  const [modal, setModal] = useState({
    visible: false,
    status: 'succes',
    message: 'Song found!',
  });

  const border = {
    borderColor:
      service == 'spotify'
        ? '#1db954'
        : service == 'youtube'
        ? '#e00'
        : service == 'soundcloud' && '#f50',
  };

  const color = {
    color:
      service == 'spotify'
        ? '#1db954'
        : service == 'youtube'
        ? '#e00'
        : service == 'soundcloud' && '#f50',
  };

  const placeholder =
    service == 'spotify'
      ? 'Search or paste your Spotify song'
      : service == 'youtube'
      ? 'Search or paste your Youtube video'
      : service == 'soundcloud' && 'Search or paste your SoundCloud track';

  const releaseDateText =
    service == 'spotify'
      ? `<u>My song isn't live yet</u> 👋`
      : service == 'youtube'
      ? `<u>My video isn't live yet</u>  👋`
      : service == 'soundcloud' &&
        `<u>My SoundCloud Track isn't live yet</u>  👋`;

  return (
    <div className='center flex column wrapper'>
      <div style={border} className={styles.serviceContainer}>
        <motion.div
          id={'spotify'}
          className={[
            styles.item,
            service == 'spotify' && styles.item__active,
          ].join(' ')}
          animate={{
            boxShadow:
              service === 'spotify'
                ? '0px 5.39182px 5.39182px rgba(0, 0, 0, 0.25)'
                : 'none',
            backgroundColor:
              service === 'spotify' ? '#1db954' : 'rgba(255, 255, 255, 0.0)',
          }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
          onClick={() => (setService('spotify'), setResults([]))}
        >
          <Spotify />
        </motion.div>
        <motion.div
          id={'soundcloud'}
          className={[
            styles.item,
            service == 'soundcloud' && styles.item__active,
          ].join(' ')}
          animate={{
            boxShadow:
              service === 'soundcloud'
                ? '0px 5.39182px 5.39182px rgba(0, 0, 0, 0.25)'
                : 'none',
            backgroundColor:
              service === 'soundcloud' ? '#ff5500' : 'rgba(255, 255, 255, 0.0)',
          }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
          onClick={() => (setService('soundcloud'), setResults([]))}
        >
          <Soundcloud />
        </motion.div>
        <motion.div
          id={'youtube'}
          className={[
            styles.item,
            service == 'youtube' && styles.item__active,
          ].join(' ')}
          animate={{
            boxShadow:
              service === 'youtube'
                ? '0px 5.39182px 5.39182px rgba(0, 0, 0, 0.25)'
                : 'none',
            backgroundColor:
              service === 'youtube' ? '#ee0000' : 'rgba(255, 255, 255, 0.0)',
          }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
          onClick={() => (setService('youtube'), setResults([]))}
        >
          <Youtube />
        </motion.div>
      </div>
      <AnimatePresence>
        <motion.div className={styles.container}>
          {releaseDate ? (
            <>
              <ReleaseDate
                toggleReleaseDate={toggleReleaseDate}
                activeService={service}
                route={
                  service == 'spotify'
                    ? '/campaigns/spotify-promotion'
                    : '/campaigns/' + service
                }
              />
            </>
          ) : (
            <>
              <Search
                results={results}
                setResults={setResults}
                setModal={setModal}
                activeService={service}
                placeholder={placeholder}
              />
              <p
                style={color}
                className={styles.altText}
                dangerouslySetInnerHTML={{ __html: releaseDateText }}
                onClick={() => toggleReleaseDate(true)}
              ></p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SearchCTA;
