import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';

import Bin from '/public/icons/bin.jsx';
import Pencil from '/public/icons/pencil.jsx';

import Search from '/components/Search';

import logo from '/public/logo/logo.png';

import ShopContext from '/context/Order/shop-context';

import Soundcloud from '/public/icons/soundcloud.jsx';
import Youtube from '/public/icons/youtube.jsx';
import Spotify from '/public/icons/spotify.jsx';
import Explanation from '/public/icons/explanation.jsx';

import Modal from '/components/Modal';
import ReleaseDate from '/components/ReleaseDate';
import ToolTipCustom from '/components/Tooltip';

import styles from './dashboard.module.scss';

const ServiceDashboard = (props) => {
  const { activeService, setBuilder, isFromCampaignPage } = props;
  const router = useRouter();
  const { service } = router.query;
  const context = useContext(ShopContext);
  const [releaseDate, toggleReleaseDate] = useState(false);
  const [blink, ToggleBlink] = useState(false);
  const [activeField, setActiveField] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    status: 'succes',
    message: 'Song found!',
  });

  const campaigns = context.order.campaigns.find(
    (e) => e.service === activeService
  );
  
  // Auto-trigger campaign builder when coming from campaign page and campaigns exist
  useEffect(() => {
    if (isFromCampaignPage && campaigns.campaigns.length > 0) {
      // Find the first campaign that needs configuration
      const unfinishedIndex = campaigns.campaigns.findIndex((i) => i.campaignObject.campaign.length == 0);
      if (unfinishedIndex !== -1) {
        // Use setTimeout to make it immediate but avoid blocking the render
        setTimeout(() => {
          setBuilder({
            toggle: true,
            index: unfinishedIndex
          });
        }, 0);
      }
    }
  }, [isFromCampaignPage, campaigns.campaigns, setBuilder]);

  // Check if we should skip rendering Step 2 entirely
  const shouldSkipStep2 = isFromCampaignPage && campaigns.campaigns.length > 0 && campaigns.campaigns.some(c => c.campaignObject.campaign.length === 0);

  const removeCampaign = async (id, activeService) => {
    await context.removeCampaign(id, activeService);
  };

  const toggleSearchField = () => {
    ToggleBlink(true);
    setActiveField(true);
  };

  const color =
    activeService == 'spotify'
      ? '#1ED760'
      : activeService == 'youtube'
      ? '#FF0000'
      : activeService == 'soundcloud' && '#FF5502';

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

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  // Don't render Step 2 if we should skip it
  if (shouldSkipStep2) {
    return null; // This will be handled by the parent component's builder state
  }

  return (
    <motion.div
      key={'overview'}
      variants={variants} // Pass the variant object into Framer Motion
      initial='hidden' // Set the initial state to variants.hidden
      animate='enter' // Animated state to variants.enter
      exit='exit' // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
      className={styles.dashboardContainer}
    >
      {releaseDate == false ? (
        <>
          {service ? (
            <h2 className='my-4'>Search Your Song</h2>
          ) : isFromCampaignPage ? (
            <h2 className='my-4'>Step 2: Confirm or Add More Songs</h2>
          ) : (
            <h2 className='my-4'>Step 2: Confirm or Add More Songs</h2>
          )}

          <motion.div
            animate={
              blink == true && {
                boxShadow: [
                  '0 0 0' + color,
                  '0 0 17px ' + color,
                  '0 0 0px ' + color,
                ],
                border: color + ' 2px solid',
              }
            }
            transition={{ duration: 0.7, repeat: 1 }}
            className={[styles.searchContainer]}
          >
            <Search
              activeField={activeField}
              setModal={setModal}
              activeService={activeService}
              placeholder={`Add more ${
                activeService == 'spotify'
                  ? '- Search song or paste Spotify'
                  : activeService == 'soundcloud'
                  ? '- Paste Soundcloud'
                  : activeService == 'youtube'
                  ? '- Search song or paste Youtube'
                  : activeService == 'tiktok' && '- Paste TikTok'
              } link`}
            />
          </motion.div>

          <p
            onClick={() => toggleReleaseDate(true)}
            style={{
              color:
                activeService == 'spotify'
                  ? '#1db954'
                  : activeService == 'soundcloud'
                  ? '#ff5502'
                  : activeService == 'youtube' && '#ff0000',
            }}
            className={[styles.altText, 'mt-2'].join(' ')}
          >
            <u>I have (more) upcoming releases</u>⏰
            <ToolTipCustom
              label={''}
              text={
                activeService == 'spotify'
                  ? 'Pre-order a promotion for your unreleased song or if you want your promotion to begin later. We’ll contact you on your scheduled day!'
                  : activeService == 'youtube'
                  ? 'Pre-order a promotion for your unreleased video(s) or if you want your promotion to begin later. We’ll contact you on your scheduled day!'
                  : activeService == 'soundcloud' &&
                    'Pre-order a promotion for your unreleased track or if you want your promotion to begin later. We’ll contact you on your scheduled day!'
              }
            >
              <Explanation />
            </ToolTipCustom>
          </p>
        </>
      ) : (
        <AnimatePresence>
          <motion.div
            variants={animationVariants}
            initial='initial' // Starting animation
            animate='animate' // Values to animate to
            exit='exit' // Target to animate to when removed from the tree
          >
            <ReleaseDate
              toggleReleaseDate={toggleReleaseDate}
              activeService={activeService}
            />
          </motion.div>
        </AnimatePresence>
      )}

      <motion.div className={styles.campaignGrid}>
        <AnimatePresence>
          {campaigns.campaigns &&
            campaigns.campaigns.map((item, index) => (
              //Remove loadingscreen

              <motion.div
                layout
                variants={animationVariants}
                initial='initial' // Starting animation
                animate='animate' // Values to animate to
                exit='exit' // Target to animate to when removed from the tree
                key={index}
                className={[
                  styles.CampaignBox,
                  activeService == 'spotify'
                    ? styles.CampaignBox__Spotify
                    : activeService == 'youtube'
                    ? styles.CampaignBox__Youtube
                    : activeService == 'tiktok'
                    ? styles.CampaignBox__Tiktok
                    : activeService == 'soundcloud' &&
                      styles.CampaignBox__Soundcloud,
                  Object.keys(item.campaignObject.campaign).length !== 0
                    ? styles.CampaignBox__campaignSelected
                    : '',
                ].join(' ')}
              >
                <div className={[styles.trackThumbNail].join(' ')}>
                  <Image
                    className={[
                      item.campaignObject.type == 'pre-release' &&
                        styles.pre_release,
                      styles.image,
                    ].join(' ')}
                    fill
                    src={
                      item.campaignObject.image
                        ? item.campaignObject.image
                        : logo
                    }
                    alt='Album Image'
                  />

                  <div
                    className={[
                      styles.trackThumbNail__label,
                      activeService == 'spotify'
                        ? styles.spotify
                        : activeService == 'youtube'
                        ? styles.youtube
                        : activeService == 'soundcloud' && styles.soundcloud,
                    ].join(' ')}
                  >
                    {activeService == 'spotify' ? (
                      <Spotify />
                    ) : activeService == 'youtube' ? (
                      <Youtube />
                    ) : (
                      activeService == 'soundcloud' && <Soundcloud />
                    )}
                  </div>
                </div>
                <div className={styles.trackDetails}>
                  <h5>
                    {item.campaignObject.track.length >= 25
                      ? item.campaignObject.track.substring(0, 20) + ' ...'
                      : item.campaignObject.track}
                  </h5>
                  {item.campaignObject.release && (
                    <span>{item.campaignObject.release.text}</span>
                  )}
                  {item.campaignObject.artist.map((item, index) => (
                    <span key={index}>{item.name}</span>
                  ))}
                </div>
                <div className={styles.trackEdit}>
                  {item.campaignObject.campaign.length != 0 && (
                    <div
                      onClick={() => setBuilder({ toggle: true, index: index })}
                    >
                      <Pencil />
                    </div>
                  )}
                  <div onClick={() => removeCampaign(item.id, activeService)}>
                    <Bin />
                  </div>
                </div>
              </motion.div>
            ))}
          <motion.div
            layout
            className={[styles.CampaignBox, styles.CampaignBox__dummy].join(
              ' '
            )}
            onClick={() => toggleSearchField()}
          >
            <div className={styles.addCampaignContent}>
              <div className={styles.addCampaign}>+</div>
              <div className={styles.textContainer}>
                <span>
                  {activeService == 'spotify'
                    ? 'Add song'
                    : activeService == 'youtube'
                    ? 'Add video'
                    : activeService == 'soundcloud' && 'Add track'}
                </span>
                <ToolTipCustom
                  label={''}
                  text={
                    activeService == 'spotify'
                      ? 'Add multiple songs to build all of your campaigns in a single session!'
                      : activeService == 'youtube'
                      ? 'Add multiple videos to build all of your campaigns in a single session!'
                      : activeService == 'soundcloud' &&
                        'Add multiple tracks to build all of your campaigns in a single session!'
                  }
                >
                  <Explanation />
                </ToolTipCustom>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {campaigns.total != campaigns.campaigns.length ? (
        <button
          onClick={() => (
            dataLayer.push({
              event: 'order_flow',
              service: activeService,
              form_step: 'Builder',
            }),
            setBuilder({
              toggle: true,
              index: campaigns.campaigns.findIndex(
                (i) => i.campaignObject.campaign.length == 0
              ),
            })
          )}
          className={[
            styles.button,
            activeService == 'spotify'
              ? styles.button__spotify
              : activeService == 'youtube'
              ? styles.button__youtube
              : activeService == 'tiktok'
              ? styles.button__tiktok
              : activeService == 'soundcloud' && styles.button__soundcloud,
          ].join(' ')}
        >
          Start building campaign(s)
        </button>
      ) : (
        <Link href='/campaigns/checkout' passHref={true}>
          <button
            className={[
              styles.button,
              activeService == 'spotify'
                ? styles.button__spotify
                : activeService == 'youtube'
                ? styles.button__youtube
                : activeService == 'tiktok'
                ? styles.button__tiktok
                : activeService == 'soundcloud' && styles.button__soundcloud,
            ].join(' ')}
          >
            {'Save & continue'}
          </button>
        </Link>
      )}
      <Modal show={modal} />
    </motion.div>
  );
};

export default ServiceDashboard;
