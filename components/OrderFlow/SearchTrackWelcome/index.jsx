import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Search from '/components/Search';
import ReleaseDate from '/components/ReleaseDate';
import styles from './search.module.scss';

const SearchTrack = (props) => {
  const { activeService, setModal, text, title } = props;
  const [results, setResults] = useState();
  const [releaseDate, toggleReleaseDate] = useState(false);

  const color = {
    color:
      activeService == 'spotify'
        ? '#1db954'
        : activeService == 'youtube'
        ? '#e00'
        : activeService == 'tiktok'
        ? '#ff0050'
        : activeService == 'soundcloud' && '#f50',
  };

  const searchPlaceholder =
    activeService == 'spotify'
      ? `Start here - Search song or paste Spotify link`
      : activeService == 'soundcloud'
      ? 'Start here - paste SoundCloud link'
      : activeService == 'youtube'
      ? 'Start here - Search video or paste YouTube link'
      : activeService == 'tiktok' && 'Start here - Paste TikTok link';

  const searchAltText =
    activeService == 'spotify'
      ? `My release is not live yet`
      : activeService == 'soundcloud'
      ? 'My release is not live yet'
      : activeService == 'youtube'
      ? 'My video is not live yet'
      : activeService == 'tiktok' && 'My link is not live yet';

  const animationVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.2,
      transition: { duration: 0.1 },
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.2,
      transition: { ease: 'easeOut', duration: 0.15 },
    },
    hover: { scale: 1.05, transition: { duration: 0.1 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        Layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="flex justify-center items-center w-full"
      >
        <div className="flex flex-col items-center text-center max-w-[600px] w-full">
          {releaseDate ? (
            <motion.div
              variants={animationVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              className="w-full flex justify-center"
            >
              <ReleaseDate
                toggleReleaseDate={toggleReleaseDate}
                activeService={activeService}
              />
            </motion.div>
          ) : (
            <>
              <span className='text-[18px] text-center mb-4'>
                <b>{title}</b>
              </span>
              <p className="text-center mb-6" dangerouslySetInnerHTML={{ __html: text }}></p>
              <div className="flex flex-col items-center w-full">
                <h2 className="text-center mb-4 text-3xl font-bold">
                  {activeService == 'youtube'
                    ? 'Step 1: Search your Video'
                    : activeService == 'tiktok'
                    ? 'Step 1: Paste TikTok video URL'
                    : activeService == 'soundcloud'
                    ? 'Step 1: Paste your URL'
                    : 'Step 1: Search your Track'}
                </h2>
                <p>Before you’re able to select your exclusive deal, you’ll need to find your track first.
                <br /> <br />Are you ready to get the ground shaking, partner? 🤝</p>
                <div className="flex flex-col items-center w-full">
                  <Search
                    setModal={setModal}
                    setResults={setResults}
                    results={results}
                    activeService={activeService}
                    placeholder={searchPlaceholder}
                  />
                  <p
                    onClick={() => toggleReleaseDate(true)}
                    style={color}
                    className="text-center font-bold mt-2 cursor-pointer"
                  >
                    <u>{searchAltText} </u>👋
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchTrack;
