import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import TikTokBuilder from '/components/OrderFlow/CampaignBuilder/Tiktok';
import YoutubeBuilder from '/components/OrderFlow/CampaignBuilder/Youtube';
import SpotifyBuilder from '/components/OrderFlow/CampaignBuilder/Spotify';
import SoundcloudBuilder from '/components/OrderFlow/CampaignBuilder/Soundcloud';

import ShopContext from '/context/Order/shop-context';

import styles from './builder.module.scss';

const CampaignBuilder = ({
  activeService,
  startIndex,
  checkOut,
  unfinishedcampaigns,
  toggleBuilder,
  setcrossSell,
}) => {
  const [methods, setAllMethods] = useState([]);

  const context = useContext(ShopContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Scroll to top when component mounts

  useEffect(() => {
    methods.length == 0 &&
      fetch('/api/payments/mollie/getMethods', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          billingCountry:
            context.order.customerDetails.country &&
            context.order.customerDetails.country.countryCode,
          value: '500.00',
          currency: 'EUR',
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          setAllMethods(data);
        });
  });

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <motion.div
      key={'builder'}
      variants={variants} // Pass the variant object into Framer Motion
      initial='hidden' // Set the initial state to variants.hidden
      animate='enter' // Animated state to variants.enter
      exit='exit' // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
      className={styles.container}
    >
      {context.order.campaigns && (
        <>
          {activeService === 'soundcloud' && (
            <SoundcloudBuilder
              activeService={'soundcloud'}
              startIndex={startIndex}
              checkOut={checkOut}
              unfinishedcampaigns={unfinishedcampaigns}
              toggleBuilder={toggleBuilder}
              setcrossSell={setcrossSell}
            />
          )}
          {activeService === 'spotify' && (
            <SpotifyBuilder
              activeService={'spotify'}
              startIndex={startIndex}
              checkOut={checkOut}
              unfinishedcampaigns={unfinishedcampaigns}
              toggleBuilder={toggleBuilder}
              setcrossSell={setcrossSell}
            />
          )}
          {activeService === 'youtube' && (
            <YoutubeBuilder
              activeService={'youtube'}
              startIndex={startIndex}
              checkOut={checkOut}
              unfinishedcampaigns={unfinishedcampaigns}
              toggleBuilder={toggleBuilder}
              setcrossSell={setcrossSell}
            />
          )}
          {activeService == 'tiktok' && (
            <TikTokBuilder
              activeService={'tiktok'}
              startIndex={startIndex}
              checkOut={checkOut}
              unfinishedcampaigns={unfinishedcampaigns}
              toggleBuilder={toggleBuilder}
              setcrossSell={setcrossSell}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default CampaignBuilder;
