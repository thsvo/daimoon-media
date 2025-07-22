import Link from 'next/link';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import ShopContext from '/context/Order/shop-context';

import Soundcloud from '/public/icons/soundcloud.jsx';
import Youtube from '/public/icons/youtube.jsx';
import Spotify from '/public/icons/spotify.jsx';
import ArrowBack from '/public/icons/arrow_back';
import FullArrowNext from '/public/icons/full_arrow_next';
import Cart from '/public/icons/cart';
import Tick from '/public/icons/tick';

import styles from './cross.module.scss';

import json from '/json/OrderForm/form.json';
import { AnimatePresence, motion } from 'framer-motion';

const CrossSell = (props) => {
  const { activeService, setcrossSell, setBuilder, lastItem } = props;
  const context = useContext(ShopContext);
  const packages = json.find((o) => o.service == activeService).fields;
  const order = context.order.campaigns.find(
    (o) => o.service == activeService
  ).campaigns;
  const [promotions, setPromotions] = useState([]);
  const [number, setNumber] = useState(0);
  const [selectedPromotions, setSelectedPromotions] = useState([]);

  const services = [
    {
      service: 'spotify',
      title: 'Streams on Spotify📈',
      usp: ['Playlist support', 'Increase listeners', 'Boost algorithm'],
      description: 'Select & choose your campaign on the next step!',
      icon: Spotify,
    },
    {
      service: 'youtube',
      title: 'Views on YouTube🚀',
      usp: ['Millions of eyes', 'Artist awareness', 'Fan connection'],
      description: 'Select & choose your campaign on the next step!',
      icon: Youtube,
    },
    {
      service: 'soundcloud',
      title: 'Reposts on SoundCloud💥',
      usp: ['Channel reposts', 'Grow followers', 'Reach A&Rs'],
      description: 'Select & choose your campaign on the next step!',
      icon: Soundcloud,
    },
  ].filter(function (obj) {
    return obj.service !== activeService;
  });

  useEffect(() => {
    const array = [];
    let length = 0;

    order.map((campaign, index) => {
      const trackPromotions = [];
      campaign.campaignObject.campaign.map((type) => {
        if (packages.find((values) => values.name == type.label)) {
          const value = packages.find((values) => values.name == type.label)
            .values[type.index];

          if (value) {
            trackPromotions.push({
              label: type.label,
              promotions: value.obj.discounts,
            });
          }

          length = length + value.obj.discounts.length;
        }
      });

      array.push({
        service: activeService,
        id: campaign.id,
        name: campaign.campaignObject.track,
        image: campaign.campaignObject.image,
        promotions: trackPromotions,
      });
    });

    setPromotions(array);
    setNumber(length);
  }, [context.order.campaigns]);

  useEffect(() => {
    dataLayer.push({
      event: 'order_flow',
      service: activeService,
      form_step: 'Cross_sell',
    });
  }, [activeService]);

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <motion.div
      key={'crossSell'}
      variants={variants} // Pass the variant object into Framer Motion
      initial='hidden' // Set the initial state to variants.hidden
      animate='enter' // Animated state to variants.enter
      exit='exit' // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
      className={styles.container}
    >
      <h2>Last Step!</h2>
      {number != 0 && (
        <>
          <div className={styles.header}>
            We got <span>{number}</span> exclusive deal(s) for you:
          </div>
          {promotions.map((track, trackIndex) =>
            track.promotions.map((discount, labelIndex) => (
              <>
                <span className={styles.discountLabel} key={trackIndex}>
                  <b>
                    {discount.label == 'Campaign:' ? 'Package' : discount.label}
                  </b>
                </span>
                <div className={styles.promotionBody}>
                  {discount.promotions.map((item, index) => (
                    <Promotional
                      key={index}
                      item={item}
                      activeService={activeService}
                      discount={item}
                      discountIndex={index}
                      labelIndex={labelIndex}
                      trackId={track.id}
                      track={track}
                      selectedPromotions={selectedPromotions}
                      setSelectedPromotions={setSelectedPromotions}
                    />
                  ))}
                </div>
              </>
            ))
          )}
        </>
      )}

      <div className={styles.header}>Need anything else? </div>
      <div className={styles.services}>
        {services.map((item, index) => (
          <Link
            key={index}
            passHref={true}
            href={{
              pathname:
                item.service == 'spotify'
                  ? '/campaigns/spotify-promotion'
                  : '/campaigns/' + item.service,
            }}
          >
            <div
              onClick={() => {
                dataLayer.push({
                  event: 'order_flow',
                  service: activeService,
                  form_step: 'Clicked on Cross-' + item.service,
                });
              }}
              className={styles.item}
            >
              <i
                className={
                  item.service == 'spotify'
                    ? styles.spotify
                    : item.service == 'soundcloud'
                    ? styles.soundcloud
                    : item.service == 'youtube' && styles.youtube
                }
              >
                <item.icon />
              </i>

              <div className={styles.content}>
                <h4>{item.title}</h4>
                <span>{item.description}</span>
              </div>
              <FullArrowNext />
            </div>
          </Link>
        ))}
      </div>
      <motion.div>
        <Link href='/campaigns/checkout' passHref={true}>
          <div>
            <AnimatePresence mode='wait' initial={false}>
              {selectedPromotions == false ? (
                <motion.div
                  key={'cart'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0 }}
                  onClick={() =>
                    dataLayer.push({
                      event: 'order_flow',
                      service: activeService,
                      form_step: 'Checkout',
                    })
                  }
                  className={styles.finish}
                >
                  <i>
                    <Cart />
                  </i>
                  <h4>No thanks, Direct Checkout</h4>

                  <FullArrowNext />
                </motion.div>
              ) : (
                <motion.div
                  key={'success'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0 }}
                  onClick={() =>
                    dataLayer.push({
                      event: 'order_flow',
                      service: activeService,
                      form_step: 'Checkout',
                    })
                  }
                  className={styles.finish}
                >
                  <i>
                    <Tick fill={'#1ED760'} />
                  </i>
                  <h4 style={{ color: '#1ED760' }}>
                    Great choice! Go to checkout
                  </h4>

                  <FullArrowNext />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
        <span
          className={styles.returnButton}
          onClick={() => (
            setcrossSell(false),
            setBuilder({ toggle: true, index: lastItem - 1 })
          )}
        >
          <ArrowBack />
          Edit Campaign(s)
        </span>
      </motion.div>
    </motion.div>
  );
};

export default CrossSell;

const Promotional = ({
  item,
  track,
  trackId,
  activeService,
  labelIndex,
  selectedPromotions,
  setSelectedPromotions,
}) => {
  const [active, setActive] = useState(false);
  const context = useContext(ShopContext);

  const togglePromotion = async () => {
    setActive(!active);

    context.TogglePromotionalPackage({
      trackId: trackId,
      service: activeService,
      promotion: { labelIndex: labelIndex, item: item },
    });
  };

  useEffect(() => {
    setSelectedPromotions(active);
  }, [active]);

  return (
    <>
      <div
        onClick={() => togglePromotion(!active)}
        className={[
          styles.promotionItem,

          active && styles.promotionItem__active,
        ].join(' ')}
      >
        <div className={styles.promotion}>
          <div className={styles.songDetails}>
            <div
              style={{
                borderColor:
                  activeService == 'spotify'
                    ? 'rgb(30, 215, 96)'
                    : activeService == 'soundcloud'
                    ? '#f50'
                    : activeService == 'youtube' && '#e00',
              }}
              className={styles.image}
            >
              <Image fill src={track.image} alt={''} />
            </div>
            <span
              style={{
                color:
                  activeService == 'spotify'
                    ? 'rgb(30, 215, 96)'
                    : activeService == 'soundcloud'
                    ? '#f50'
                    : activeService == 'youtube' && '#e00',
              }}
            >
              Song: {track.name}
            </span>
          </div>
          <div className={styles.promotionDeal}>
            <span>{item.text}</span>
            <span className={styles.price}>
              <b>{item.cost} USD</b>
              <s>{item.full_price} USD</s>
            </span>
          </div>
        </div>
        <div className={styles.checkboxContainer}>
          <div
            style={{
              backgroundColor:
                active == true
                  ? activeService == 'spotify'
                    ? 'rgb(30, 215, 96)'
                    : activeService == 'soundcloud'
                    ? '#f50'
                    : activeService == 'youtube' && '#e00'
                  : 'transparent',
            }}
            className={[styles.checkbox].join(' ')}
          ></div>
        </div>
      </div>
    </>
  );
};
