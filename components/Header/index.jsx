//Core
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ShopContext from '/context/Order/shop-context';

import Tiktok from '/public/icons/tiktok';
import Spotify from '/public/icons/spotify';
import Youtube from '/public/icons/youtube';
import Soundcloud from '/public/icons/soundcloud';
import Rocket from '/public/icons/rocket';

import Manager from '/public/icons/manager';
import Record from '/public/icons/record';
import Dollar from '/public/icons/dollar';
import Outlink from '/public/icons/outlink';

import QuestionMark from '/public/icons/questionmark';
import Mail from '/public/icons/mail';
import Megaphone from '/public/icons/megaphone';

import Speaker2 from '/public/icons/speaker2';
import Cog from '/public/icons/cog';
import Order from '/public/icons/order';
import Logoff from '/public/icons/logoff';

//Components
import LoginButton from '/components/LoginForms/LoginButton';
import CartModal from '/components/CartModal';
import HoverOverlay from '/components/HoverOverlay';
import daimoon_diamond from '/public/logo/logo.png';
import DaimoonIcon from '/public/icons/daimoon_icon';

import ArrowDown from '/public/icons/arrow_down';
import Cross from '/public/icons/cross';
import Cart from '/public/icons/cart';
import Hamburger from '/public/icons/hamburger-menu';
import VerifiedCheck from '/public/icons/verified_check';
import Diamond from '/public/icons/diamond';
import ShakingHands from '/public/icons/hands';
import ConversationBubble from '/public/icons/conversation_bubble';
import styles from './header.module.scss';
import account from './account.module.scss';

const AffiliateHeader = () => {
  return (
    <>
      <div
        style={{ justifyContent: 'center' }}
        className={['wrapper'].join(' ')}
      >
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Link href='/' passHref={true}>
              <div className={styles.logo_shadow} />
              <DaimoonIcon />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const BuilderHeader = ({ service, orders, scroll }) => {
  const [overlay, setOverlay] = useState(false);
  const [modal, setModal] = useState();
  const { data: session } = useSession();
  const context = useContext(ShopContext);
  const router = useRouter();
  const [price, setPrice] = useState(
    context.order.totalPriceDetails.amount_local_incl_vat
  );

  useEffect(() => {
    setPrice(context.order.totalPriceDetails.amount_local_incl_vat);

    const timer = setTimeout(() => {
      setPrice(0);
    }, 2500);
    return () => clearTimeout(timer);
  }, [context.order.totalPriceDetails.amount_local_incl_vat]);

  const style =
    service == 'spotify'
      ? '2px solid #1db954'
      : service == 'youtube'
      ? '2px solid #ff0000'
      : service == 'soundcloud' && '2px solid #ff5502';

  return (
    <>
      <div className={['wrapper py-2'].join(' ')}>
        <div className={styles.container}>
          {!router.pathname.includes('/account/') ? (
            <div
              className={styles.logoContainer}
              onClick={() => setOverlay(true)}
            >
              <div className={styles.logo}>
                <div className={styles.logo_shadow} />
                <DaimoonIcon />
              </div>
            </div>
          ) : (
            <div className={styles.logoContainer}>
              <div className={styles.logo}>
                <Link href='/' passHref={true}>
                  <div className={styles.logo_shadow} />
                  <DaimoonIcon />
                </Link>
              </div>
            </div>
          )}

          <div className={styles.navigation}>
            {session && (
              <div>
                <div className='text-[14px] font-[500]'>
                  Welcome{' '}
                  <span className='text-[#b165ed] inline mr-5'>
                    {session.user.email}
                  </span>
                  <span>|</span>
                  <span
                    onClick={() => signOut()}
                    className='cursor-pointer ml-5 mr-5 capitalize'
                  >
                    Logout
                  </span>
                </div>
              </div>
            )}
            <div></div>
            <i className={styles.cartIcon} onClick={() => setModal(!modal)}>
              <Cart />

              {orders != 0 && (
                <>
                  <div className={styles.hasCampaign}>
                    <span>{orders}</span>
                  </div>
                  <AnimatePresence>
                    {price != 0 && (
                      <motion.small
                        initial={{ opacity: 0 }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: 0.5,
                          },
                        }}
                        animate={{
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                          },
                        }}
                        className={styles.total}
                      >
                        {price + ' ' + context.order.currency.code}
                      </motion.small>
                    )}
                  </AnimatePresence>
                </>
              )}
            </i>
          </div>
          {modal && <CartModal setModal={setModal} />}
        </div>
      </div>

      <HoverOverlay overlay={overlay}>
        {overlay == true && (
          <div onClick={() => setOverlay(false)} className={styles.overlay}>
            <div className={styles.warning}>
              <p>
                You are about to leave the campaign builder and go back to the
                homepage. Would you like to continue?
              </p>
              <div className={styles.buttons}>
                <div
                  className={styles.button}
                  style={{ border: style }}
                  onClick={() => setOverlay(false)}
                >
                  No
                </div>
                <Link onClick={() => setOverlay(false)} href='/'>
                  <div className={styles.button}>Yes</div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </HoverOverlay>
    </>
  );
};

const NormalHeader = ({ orders, isScrolled }) => {
  const { data: session, status } = useSession();
  const [overlay, setOverlay] = useState(false);
  const [modal, setModal] = useState();
  const [accountNavigation, setAccountNavigation] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [partners, setPartners] = useState(false);
  const [about, setAbout] = useState(false);
  const [menu, setMenu] = useState(false);

  const MotionCartModal = motion(CartModal);

  useEffect(() => {
    if (campaign == true || partners == true || about == true) {
      setOverlay(true);
    } else {
      setOverlay(false);
    }
  }, [campaign, partners, about]);

  return (
    <>
      <div className={'wrapper py-2'}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Link href='/' passHref={true}>
              <div className={styles.logo_shadow} />
              <DaimoonIcon />
            </Link>
          </div>
        </div>

        <nav className={styles.navigation}>
          <div
            onMouseLeave={() => setCampaign(false)}
            onMouseEnter={() => setCampaign(true)}
            className={styles.category}
          >
            <li>
              Campaigns <ArrowDown />
            </li>

            {campaign && (
              <div className={styles.modal}>
                <div className='flex gap-4'>
                  <div className='flex flex-col h-[75px] justify-between'>
                    <Link href='/campaigns/tiktok' passHref={true}>
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Tiktok width={'20px'} />
                        <span>TikTok</span>
                      </div>
                    </Link>
                    <Link href='/campaigns/youtube' passHref={true}>
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Youtube width={'20px'} />
                        <span>Youtube</span>
                      </div>
                    </Link>
                  </div>
                  <div className='flex flex-col h-[75px] justify-between'>
                    <Link href='/campaigns/spotify-promotion' passHref={true}>
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Spotify width={'20px'} />
                        <span>Spotify</span>
                      </div>
                    </Link>
                    <Link href='/campaigns/soundcloud' passHref={true}>
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Soundcloud width={'20px'} />
                        <span>SoundCloud</span>
                      </div>
                    </Link>
                  </div>
                  <div className='flex flex-col h-[75px] justify-between'>
                    <Link
                      href='/contact?key=customer&form=priority'
                      passHref={true}
                    >
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Rocket width={'20px'} />
                        <span>Bigger Campaigns</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div>
                  <p className='text-xs mb-0 mt-[24px] text-[#919191]'>
                    Need help?{' '}
                    <label className='text-white'>
                      Contact our{' '}
                      <Link
                        className='underline'
                        href='/contact?key=customer&form=initial'
                      >
                        support service
                      </Link>
                    </label>
                  </p>
                </div>
              </div>
            )}
          </div>
          <div
            onMouseLeave={() => setPartners(false)}
            onMouseEnter={() => setPartners(true)}
            className={styles.category}
          >
            <li>
              Partners <ArrowDown />
            </li>

            {partners && (
              <div className={styles.modal}>
                <div className='flex gap-4'>
                  <div className='flex flex-col h-[75px] justify-between'>
                    <Link
                      href='/contact?key=customer&form=priority'
                      passHref={true}
                    >
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Manager width={'15px'} />
                        <span>Managers</span>
                      </div>
                    </Link>
                    <Link
                      href='/contact?key=customer&form=priority'
                      passHref={true}
                    >
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Record width={'20px'} />
                        <span>Record Labels</span>
                      </div>
                    </Link>
                  </div>
                  <div className='flex flex-col h-[75px] justify-between'>
                    <Link href='/b2b/resellers' passHref={true}>
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Dollar width={'20px'} />
                        <span>Resellers</span>
                      </div>
                    </Link>
                    <Link href='/b2b/affiliates' passHref={true}>
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Outlink width={'20px'} />
                        <span>Affiliates</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div>
                  <p className='text-xs mb-0 mt-[24px] text-[#919191]'>
                    Need help?{' '}
                    <label className='text-white'>
                      Contact our{' '}
                      <Link
                        className='underline'
                        href='/contact?key=customer&form=initial'
                      >
                        support service
                      </Link>
                    </label>
                  </p>
                </div>
              </div>
            )}
          </div>
          <div>
            <Link href='/blogs' passHref={true}>
              <li>Blogs</li>
            </Link>
          </div>
          <div
            onMouseLeave={() => setAbout(false)}
            onMouseEnter={() => setAbout(true)}
            className={styles.category}
          >
            <li>
              About us <ArrowDown />
            </li>

            {about && (
              <div className={styles.modal}>
                <div className='flex gap-4'>
                  <div className='flex flex-col h-[75px] justify-between'>
                    <Link href='/contact?key=faq' passHref={true}>
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <QuestionMark width={'20px'} />
                        <span>F.A.Q</span>
                      </div>
                    </Link>
                    <Link
                      href='/contact?key=customer&form=initial'
                      passHref={true}
                    >
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Mail width={'20px'} />
                        <span>Contact</span>
                      </div>
                    </Link>
                  </div>
                  <div className='flex flex-col h-[75px] justify-between'>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href='https://daimoon.market/'
                    >
                      <div
                        className={[
                          'flex items-center gap-2 font-semibold',
                          styles.navigation,
                        ].join(' ')}
                      >
                        <Megaphone width={'20px'} />
                        <span>Free Promo</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div>
                  <p className='text-xs mb-0 mt-[24px] text-[#919191]'>
                    Need help?{' '}
                    <label className='text-white'>
                      Contact our{' '}
                      <Link
                        className='underline'
                        href='/contact?key=customer&form=initial'
                      >
                        support service
                      </Link>
                    </label>
                  </p>
                </div>
              </div>
            )}
          </div>

          <LoginButton status={status} />

          {status === 'authenticated' && (
            <div
              onMouseLeave={() => setMenu(false)}
              onMouseEnter={() => setMenu(true)}
              className={styles.category}
            >
              <li>
                Account <ArrowDown />
              </li>

              {menu && (
                <div
                  className={[styles.modal, styles.modal__inverted].join(' ')}
                >
                  <div className='flex gap-4'>
                    <div className='flex flex-col h-[75px] justify-between'>
                      <Link href='/account/campaigns?page=1' passHref={true}>
                        <div
                          className={[
                            'flex items-center gap-2 font-semibold',
                            styles.navigation,
                          ].join(' ')}
                        >
                          <Speaker2 width={'20px'} />
                          <span>Campaigns</span>
                        </div>
                      </Link>
                      <Link href='/account/settings' passHref={true}>
                        <div
                          className={[
                            'flex items-center gap-2 font-semibold',
                            styles.navigation,
                          ].join(' ')}
                        >
                          <Cog width={'20px'} />
                          <span>Settings</span>
                        </div>
                      </Link>
                    </div>
                    <div className='flex flex-col h-[75px] justify-between'>
                      <Link href='/account/orders?page=1' passHref={true}>
                        <div
                          className={[
                            'flex items-center gap-2 font-semibold',
                            styles.navigation,
                          ].join(' ')}
                        >
                          <Order width={'20px'} />
                          <span>Order History</span>
                        </div>
                      </Link>
                      <div onClick={() => signOut()} className='cursor-pointer'>
                        <div
                          className={[
                            'flex items-center gap-2 font-semibold',
                            styles.navigation,
                          ].join(' ')}
                        >
                          <Logoff width={'20px'} />
                          <span>Sign Out</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className='text-xs mb-0 mt-[24px] text-[#919191]'>
                      Need help?{' '}
                      <label className='text-white'>
                        Contact our{' '}
                        <Link
                          className='underline'
                          href='/contact?key=customer&form=initial'
                        >
                          support service
                        </Link>
                      </label>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {orders != 0 && (
            <motion.i
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={styles.cartIcon}
              onClick={() => setModal(!modal)}
            >
              <Cart />
              <div className={styles.hasCampaign}>
                <span>{orders}</span>
              </div>
            </motion.i>
          )}
        </nav>
      </div>
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: -0 }}
            animate={{ x: -0 }}
            transition={{ duration: 0.2 }}
          >
            <MotionCartModal setModal={setModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const items = [
  { icon: <VerifiedCheck />, text: '100% Organic' },
  { icon: <Diamond />, text: 'Premium Campaigns' },
  { icon: <ShakingHands />, text: 'Your Music Promo Partner' },
  { icon: <ConversationBubble />, text: 'Fast Communication' },
];

const SpotifyItems = [
  { icon: <Image src="/TredingPlaylist.svg" alt="Trending" width="4" height="4" className="w-4 h-4" />, text: ' Trending Playlist' },
  { icon: <Image src="/FastDelivery.svg" alt="Fast Delivery" width="4" height="4" className="w-4 h-4" />, text: ' Fast Delivery' },
  { icon: <Image src="/SatisfactionGuarantee.svg" alt="100% Satisfaction Guarantee" width="4" height="4" className="w-4 h-4" />, text: ' 100% Satisfaction Guarantee' },
  { icon: <Image src="/FastCommunication.svg" alt="Fast Communication" width="4" height="4" className="w-4 h-4" />, text: 'Fast Communication' },
];

const MobileHeader = ({ orders, scroll, status, session }) => {
  const context = useContext(ShopContext);
  const [overlay, setOverlay] = useState(false);
  const [modal, setModal] = useState();
  const [menu, setMenu] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [partners, setPartners] = useState(false);
  const [about, setAbout] = useState(false);

  return (
    <>
      <div className={[styles.mobileHeader].join(' ')}>
        <div className={styles.hamburger} onClick={() => setMenu(true)}>
          <Hamburger />
        </div>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Link href='/' passHref={true}>
              <div className={styles.logo_shadow} />
              <DaimoonIcon />
            </Link>
          </div>
        </div>

        {orders != 0 && (
          <i className={styles.cartIcon} onClick={() => setModal(!modal)}>
            <Cart />
            <div className={styles.hasCampaign}>
              <span>{orders}</span>
            </div>
          </i>
        )}
        {modal && <CartModal setModal={setModal} />}
      </div>

      {menu == true && (
        <div>
          <div
            className={styles.menuModalOverlay}
            onClick={() => setMenu(false)}
          ></div>
          <div className={styles.menuModalContainer}>
            <div>
              {status === 'authenticated' && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={account.menu}
                >
                  <div
                    onClick={() => setAccountNavigation(!accountNavigation)}
                    className={account.imageContainer}
                  >
                    <div className={account.image}>
                      {session.user.name != null ? (
                        <span>{session.user.name.substring(0, 2)}</span>
                      ) : (
                        <span>{session.user.email.substring(0, 2)}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              <div className={styles.closeBtn} onClick={() => setMenu(false)}>
                <Cross />
              </div>
            </div>

            <div className={styles.menuItems}>
              <nav className={styles.navigation}>
                <div onClick={() => setCampaign(!campaign)}>
                  <li
                    style={{
                      color: campaign && '#b165ed',
                      backgroundColor: campaign && 'rgb(37, 37, 37)',
                    }}
                  >
                    Campaigns <ArrowDown />
                  </li>
                  {campaign && (
                    <div
                      className={styles.subItems}
                      onClick={() => setMenu(false)}
                    >
                      <Link href='/campaigns/tiktok' passHref={true}>
                        <li>TikTok</li>
                      </Link>
                      <Link href='/campaigns/spotify-promotion' passHref={true}>
                        <li>Spotify</li>
                      </Link>
                      <Link href='/campaigns/youtube' passHref={true}>
                        <li>Youtube</li>
                      </Link>
                      <Link href='/campaigns/soundcloud' passHref={true}>
                        <li>SoundCloud</li>
                      </Link>
                      <Link
                        href='/contact?key=customer&form=priority'
                        passHref={true}
                      >
                        <li>Bigger Campaigns</li>
                      </Link>
                    </div>
                  )}
                </div>
                <div onClick={() => setPartners(!partners)}>
                  <li
                    style={{
                      color: partners && '#b165ed',
                      backgroundColor: partners && 'rgb(37, 37, 37)',
                    }}
                  >
                    Partners <ArrowDown />
                  </li>
                  {partners && (
                    <div
                      className={styles.subItems}
                      onClick={() => setMenu(false)}
                    >
                      <Link
                        href='/contact?key=customer&form=priority'
                        passHref={true}
                      >
                        <li>For Managers</li>
                      </Link>
                      <Link
                        href='/contact?key=customer&form=priority'
                        passHref={true}
                      >
                        <li>For Record Labels</li>
                      </Link>
                      <Link
                        href='/contact?key=customer&form=reseller'
                        passHref={true}
                      >
                        <li>For Resellers</li>
                      </Link>
                      <Link href='/b2b/affiliates' passHref={true}>
                        <li>For Affiliates</li>
                      </Link>
                    </div>
                  )}
                </div>
                <div onClick={() => setMenu(false)}>
                  <Link href='/blogs' passHref={true}>
                    <li>Blogs</li>
                  </Link>
                </div>
                <div onClick={() => setAbout(!about)}>
                  <li
                    style={{
                      color: about && '#b165ed',
                      backgroundColor: about && 'rgb(37, 37, 37)',
                    }}
                  >
                    About us <ArrowDown />
                  </li>
                  {about && (
                    <div
                      className={styles.subItems}
                      onClick={() => setMenu(false)}
                    >
                      <Link href='/contact?key=faq' passHref={true}>
                        <li>FAQ</li>
                      </Link>
                      <Link href='/contact?key=customer' passHref={true}>
                        <li>Contact</li>
                      </Link>
                      <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://daimoon.market/'
                      >
                        <li>Free Promo</li>
                      </a>
                    </div>
                  )}
                </div>
              </nav>
              <div className={styles.buttonContainer}>
                <LoginButton status={status} />
              </div>
            </div>
          </div>
        </div>
      )}

      {overlay == true && <div className={styles.overlay}></div>}
    </>
  );
};

const Header = () => {
  const context = useContext(ShopContext);
  const { data: session, status } = useSession();
  const [orderCount, setOrderCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayItems, setDisplayItems] = useState([items[0], items[1]]); // Initialize displayItems
  const [displaySpotifyItems, setDisplaySpotifyItems] = useState([SpotifyItems[0], SpotifyItems[1]]); // Initialize displaySpotifyItems

  const [isClient, setIsClient] = useState(false);
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const router = useRouter();
  const service = router.pathname.includes('spotify-promotion')
    ? 'spotify'
    : router.pathname.replace('/campaigns/', '');

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayItems((prevItems) => {
        const nextIndex = (items.indexOf(prevItems[1]) + 1) % items.length;
        return [prevItems[1], items[nextIndex]];
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplaySpotifyItems((prevItems) => {
        const nextIndex = (SpotifyItems.indexOf(prevItems[1]) + 1) % SpotifyItems.length;
        return [prevItems[1], SpotifyItems[nextIndex]];
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsClient(true);
    if (context.order.campaigns) {
      const orders = context.order.campaigns.reduce(
        (total, item) => total + item.total,
        0
      );
      setOrderCount(orders);
    }
  }, [context.order.campaigns]);

  useEffect(() => {
    if (!isScrolled) {
      window.addEventListener('scroll', () =>
        setIsScrolled(window.scrollY > 1)
      );
    }
  }, [isScrolled]);

  const breadcrumbService = context.breadcrumb.find(
    (e) => e.service === service
  );

  const isOverviewOrAccountPath =
    service === 'overview' ||
    router.pathname.includes('checkout') ||
    router.pathname.includes('/account/');
    const isAffiliatePath = router.pathname.includes('introduction-video-scooter') ||
    router.pathname.includes('landingspage-spotify-youtube-soundcloud') || router.pathname.includes("introduction-video-nathan") || router.pathname.includes("introduction-video-jurre");

  const isMobileView = width <= 768;

  if (router.pathname.includes('welcome')) {
    return (
      <header className={`${styles.headerContainer} ${styles.header_fixed}`}>
        <BuilderHeader orders={orderCount} service={service} />
      </header>
    );
  }

  if (isClient) {
    return (
      <>
        <header
          className={`${styles.headerContainer} ${
            isScrolled ? styles.header_fixed : ''
          }`}
        >
          {/* <div className={[styles.notificationHeader__error].join(' ')}>
            <span>
              🚨 Black Friday Ends TODAY! 30% Off $150+ Orders! Code:
              YouAreTheBest30 🚨
            </span>
          </div> */}
          {isClient && (
            <>
              {isOverviewOrAccountPath ? (
                <BuilderHeader orders={orderCount} service={service} />
              ) : context.breadcrumb.find((e) => e.service === service) ? (
                context.breadcrumb.find((e) => e.service === service).step !=
                'search' ? (
                  <BuilderHeader orders={orderCount} service={service} />
                ) : !isMobileView ? (
                  <NormalHeader orders={orderCount} isScrolled={isScrolled} />
                ) : (
                  <MobileHeader status={status} session={session} />
                )
              ) : isAffiliatePath ? (
                <AffiliateHeader />
              ) : !isMobileView ? (
                <NormalHeader orders={orderCount} isScrolled={isScrolled} />
              ) : (
                <MobileHeader status={status} session={session} />
              )}
            </>
          )}
        </header>

        {!isAffiliatePath && (
          !isMobileView ? (
            !router.pathname.includes('/checkout') && (
              router.pathname.includes('/campaigns/spotify-promotion') ? ( // If IS spotify-promotion, show Trending Playlist div
                <div
                  style={{
                    backgroundImage: "linear-gradient(#242424, #2b2b2b, #242424)",
                    // transform: isScrolled ? 'translateY(-100%)' : 'translateY(0)',
                    // transition: 'all 0.2s ease-in-out',
                    //Blackfriday styling
                     marginTop: isScrolled ? '63px' : '0',
                    //overflow: 'hidden',
                  }}
                  className="h-14 px-14 flex  center gap-40 "
                >
                  <div className="flex items-center gap-2 text-[#888888]">
                    <Image
                      src="/TredingPlaylist.svg"
                      alt="Play Icon"
                      width={5}
                      height={5}
                      className="w-4 h-4"
                    />
                    Trending Playlist
                  </div>
                  <div className="flex center gap-2 text-[#888888]">
                    <Image
                      src="/FastDelivery.svg"
                      alt="Fast Delivery"
                      width={5}
                      height={5}
                      className="w-4 h-4"
                    />
                    Fast Delivery
                  </div>
                  <div className="flex center gap-2 text-[#888888]">
                    <Image
                      src="/SatisfactionGuarantee.svg"
                      alt="Fast Delivery"
                      width={5}
                      height={5}
                      className="w-4 h-4"
                    />
                    100% Satisfaction Guarantee
                  </div>
                  <div className="flex center gap-2 text-[#888888]">
                    <Image
                      src="/FastCommunication.svg"
                      alt="Fast Delivery"
                      width={5}
                      height={5}
                      className="w-4 h-4"
                    />
                    Fast Communication
                  </div>
                </div>
              ) : ( // If NOT spotify-promotion, show 100% Organic div
                <div
                  style={{
                    backgroundImage: 'linear-gradient(#242424, #2b2b2b, #242424)',
                    // transform: isScrolled ? 'translateY(-100%)' : 'translateY(0)',
                    // transition: 'all 0.2s ease-in-out',
                    //Blackfriday styling
                    marginTop: isScrolled ? '63px' : '0',
                    //overflow: 'hidden',
                  }}
                  className='h-14 px-14 flex center gap-40'
                >
                  <div className='flex center gap-2 text-[#888888]'>
                    <VerifiedCheck />
                    100% Organic
                  </div>
                  <div className='flex center gap-2 text-[#888888]'>
                    <Diamond />
                    Premium Campaigns
                  </div>
                  <div className='flex center gap-2 text-[#888888]'>
                    <ShakingHands />
                    Your Music Promo Partner
                  </div>
                  <div className='flex center gap-2 text-[#888888]'>
                    <ConversationBubble />
                    Fast Communication
                  </div>
                </div>
              )
            )
          ) : null
        )}
      </>
    );
  }
};

export default Header;