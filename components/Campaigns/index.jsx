//Core
import React from 'react';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import Button from '/components/Button';
import ArrowBack from '/public/icons/arrow_back';
import ArrowNext from '/public/icons/arrow_next';

//Ripples
import youtube from '/public/ripple/youtube.png';
import spotify from '/public/ripple/spotify.png';
import soundcloud from '/public/ripple/soundcloud.png';

import Green from '/public/Spotlights/green.png';
import Orange from '/public/Spotlights/orange.png';
import Red from '/public/Spotlights/red.png';

//Style
import styles from './campaigns.module.scss';

const Campaigns = (props) => {
  const { service, data } = props;

  const color = {
    color:
      service == 'spotify'
        ? '#1ED760'
        : service == 'youtube'
        ? '#FF0000'
        : service == 'soundcloud' && '#FF5502',
  };

  return (
    <div className={styles.section_container}>
      <div className={styles.section_header}>
        <h2 className={styles.section_title}>Successful campaigns</h2>
        <span>They were here before you</span>
      </div>

      <div className={styles.SwiperAnimationContainer}>
        <Swiper
          className={styles.container}
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          grabCursor={true}
          // loop={true}
          effect={'coverflow'}
          direction={'vertical'}
          navigation={{
            prevEl: '.buttonPrev',
            nextEl: '.buttonNext',
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 310,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          slidesPerView={1}
        >
          <div
            className={[styles.buttonNav, styles.buttonPrev, 'buttonPrev'].join(
              ' '
            )}
          >
            <ArrowBack color={color.color} />
          </div>
          <div
            className={[styles.buttonNav, styles.buttonNext, 'buttonNext'].join(
              ' '
            )}
          >
            <ArrowNext color={color.color} />
          </div>
          {data.map((item, key) => (
            <>
              <SwiperSlide key={key} className={styles.slide}>
                {({ isActive }) =>
                  isActive && (
                    <>
                      <div className={styles.background_image}>
                        <Image
                          alt={''}
                          fill
                          src={
                            item.ripple == 'soundcloud'
                              ? soundcloud
                              : item.ripple == 'youtube'
                              ? youtube
                              : item.ripple == 'spotify' && spotify
                          }
                        />
                      </div>

                      <div className={styles.content}>
                        <div>
                          <h3>{item.campaign.trackName}</h3>
                          <span>by {item.artistInfo.name}</span>
                        </div>
                        <div className={styles.campaignInfo}>
                          <div className={styles.campaignsDetails}>
                            <span>{item.campaign.campaign.campaignName}: </span>
                            <span className={'textColor-' + item.type}>
                              {item.campaign.campaign.campaignSize}
                            </span>
                          </div>

                          <ul className={styles.results}>
                            <label>Results:</label>
                            {item.campaign.results.map((item, key) => (
                              <li key={key}>
                                <item.icon color={color.color} />
                                <span>{item.text}</span>
                              </li>
                            ))}
                          </ul>
                          <div className={styles.buttonContainer}>
                            <Button
                              to={false}
                              className={styles.primaryButton}
                              type={item.type}
                              text={item.type + ' Promotions'}
                              onClick={() =>
                                window.scrollTo({
                                  top: 0,
                                  behavior: 'smooth',
                                })
                              }
                            ></Button>

                            <a
                              className={styles.alternative}
                              href={item.campaign.trackUrl}
                              target={'_blank'}
                              rel={'noreferrer'}
                            >
                              Go to song
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className={styles.imageContainer}>
                        <div className={styles.spotlightContainer}>
                          <Image
                            width={'700px'}
                            height={'700px'}
                            alt={'Campaign spotlight'}
                            src={
                              service == 'spotify'
                                ? Green
                                : service == 'youtube'
                                ? Red
                                : service == 'soundcloud' && Orange
                            }
                          />
                        </div>
                        <div className={styles.artistCover}>
                          <Image
                            src={item.artistInfo.picture}
                            alt=''
                            objectFit={'contain'}
                          />
                          <div className={styles.imageTitle}>
                            <em>{item.artistInfo.quote}</em>
                            <span>{item.artistInfo.extraName}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
      <div className={['pagination', styles.pagination].join(' ')}></div>
    </div>
  );
};

export default Campaigns;
