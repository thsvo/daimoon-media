import { useContext, useState } from 'react';
import Image from 'next/image';

import SearchTrack from '/components/OrderFlow/SearchTrackWelcome';
import CampaignOverview from '/components/OrderFlow/CampaignOverview';
import Modal from '/components/Modal';

import styles from './process.module.scss';

import Green from '/public/Spotlights/green.png';
import Orange from '/public/Spotlights/orange.png';
import Red from '/public/Spotlights/red.png';

import ShopContext from '/context/Order/shop-context';
import { motion, AnimatePresence } from 'framer-motion';

const OrderProcess = (props) => {
  const { activeService, basic } = props;

  const context = useContext(ShopContext);
  const [modal, setModal] = useState({
    visible: false,
    status: 'succes',
    message: 'Song found!',
  });

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <AnimatePresence
      mode='wait'
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <div
        className={[
          'wrapper',
          activeService.value == 'tiktok' && '!w-full !justify-center',
        ].join(' ')}
      >
        {activeService.value != 'tiktok' && (
          <div className={styles.spotlight}>
            <Image
              width={600}
              height={600}
              alt={'service-spotlight'}
              src={
                activeService.value == 'spotify'
                  ? Green
                  : activeService.value == 'soundcloud'
                  ? Orange
                  : activeService.value == 'youtube' && Red
              }
              placeholder='blur'
            />
          </div>
        )}

        {basic != true &&
        context.crossSell == false &&
        context.order.campaigns[activeService.key].campaigns.length == 0 ? (
          <motion.div
            key={'trackSearch'}
            variants={variants} // Pass the variant object into Framer Motion
            initial='hidden' // Set the initial state to variants.hidden
            animate='enter' // Animated state to variants.enter
            exit='exit' // Exit state (used later) to variants.exit
            transition={{ type: 'linear' }} // Set the transition to linear
            className='w-full'
          >
            <SearchTrack
              setModal={setModal}
              activeService={activeService.value}
              label={activeService.label}
              title={activeService.title}
              text={activeService.searchText}
              builder={activeService.builder}
            />
          </motion.div>
        ) : (
          <CampaignOverview activeService={activeService.value} />
        )}

        <Modal show={modal} />
      </div>
    </AnimatePresence>
  );
};

export default OrderProcess;
