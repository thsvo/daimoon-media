//Core
import React from 'react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

//Components
import Contentlabel from '/components/Contentlabel';
import placeholder from '/public/images/placeholder.png';

import Soundcloud from '/public/icons/soundcloud.jsx';
import Youtube from '/public/icons/youtube.jsx';
import Spotify from '/public/icons/spotify.jsx';

//Style
import styles from './swiper.module.scss';

const swiper = () => {
  return (
    <>
      <div className={styles.section_container}>
        <h1 className={styles.section_title}>How we get results</h1>
        <Swiper
          className={styles.container}
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 0, // Slide rotate in degrees
            stretch: -100, // Stretch space between slides (in px)
            depth: 300, // Depth offset in px (slides translate in Z axis)
            modifier: 1, // Effect multipler
            slideShadows: false, // Enables slides shadows
          }}
          spaceBetween={70}
          slidesPerView={1}
          slideActiveClass={styles.slide_active}
          pagination={{
            clickable: true,
            el: '.pagination',
          }}
        >
          <SwiperSlide className={styles.slide}>
            <div className={styles.image}>
              <Image src={placeholder} alt='' />
            </div>
            <div className={styles.serviceContainer}>
              <Spotify margin-right='20px' />
              <Soundcloud />
            </div>
            <div className={styles.memberContent}>
              <span className={styles.quote}>“</span>
              <h2>Hi, I am Dennis</h2>
              <p>
                When you create your campaign, I will start working on your
                music within 24 to 48 hours. If you have any questions about the
                process, he will be the person you can reach out to. He is
                incredibly easy to work with.
              </p>
              <Contentlabel>Shopify Expert</Contentlabel>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <div className={styles.image}>
              <Image src={placeholder} alt='' />
            </div>
            <div className={styles.serviceContainer}>
              <Spotify margin-right='20px' />
              <Soundcloud />
            </div>
            <div className={styles.memberContent}>
              <span className={styles.quote}>“</span>
              <h2>Hi, I am Dennis</h2>
              <p>
                When you create your campaign, I will start working on your
                music within 24 to 48 hours. If you have any questions about the
                process, he will be the person you can reach out to. He is
                incredibly easy to work with.
              </p>
              <Contentlabel>Shopify Expert</Contentlabel>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <div className={styles.image}>
              <Image src={placeholder} alt='' />
            </div>
            <div className={styles.serviceContainer}>
              <Spotify margin-right='20px' />
              <Soundcloud />
            </div>
            <div className={styles.memberContent}>
              <span className={styles.quote}>“</span>
              <h2>Hi, I am Dennis</h2>
              <p>
                When you create your campaign, I will start working on your
                music within 24 to 48 hours. If you have any questions about the
                process, he will be the person you can reach out to. He is
                incredibly easy to work with.
              </p>
              <Contentlabel>Shopify Expert</Contentlabel>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <div className={styles.image}>
              <Image src={placeholder} alt='' />
            </div>
            <div className={styles.serviceContainer}>
              <Spotify margin-right='20px' />
              <Soundcloud />
            </div>
            <div className={styles.memberContent}>
              <span className={styles.quote}>“</span>
              <h2>Hi, I am Dennis</h2>
              <p>
                When you create your campaign, I will start working on your
                music within 24 to 48 hours. If you have any questions about the
                process, he will be the person you can reach out to. He is
                incredibly easy to work with.
              </p>
              <Contentlabel>Shopify Expert</Contentlabel>
            </div>
          </SwiperSlide>
          <div className={['pagination', styles.pagination].join(' ')}></div>
        </Swiper>
      </div>
    </>
  );
};

export default swiper;
