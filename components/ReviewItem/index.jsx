import { useRef, useContext } from 'react';
import Image from 'next/image';

import TrustPilot from '/public/icons/trust_pilot.jsx';
import Soundcloud from '/public/icons/soundcloud.jsx';
import Youtube from '/public/icons/youtube.jsx';
import Spotify from '/public/icons/spotify.jsx';

import Star from '/public/icons/star.jsx';

import styles from './review.module.scss';

const Review = ({ service, content, className, color, swiper }) => {
  const video = useRef(null);
  const stars = [];

  const startVideo = () => {
    swiper.current.swiper.autoplay.stop();
    if (video.current.paused) video.current.play();
    else video.current.pause();
  };

  for (var i = 0; i < content.stars; i++) {
    stars.push(<Star opacity={1} />);
  }

  for (var i = stars.length; i < 5; i++) {
    stars.push(<Star opacity={0.3} />);
  }

  return service != 'trustpilot' ? (
    <div className={styles.reviewContainer}>
      <div className={[styles.videoReview, service].join(' ')}>
        <video
          ref={video}
          onClick={() => startVideo()}
          src={process.env.NEXT_PUBLIC_VIDEOS_URL + content.videolink}
          poster={'/' + content.poster}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }} //object-fit:cover
          playsInline
        ></video>
        {service == 'spotify' && <Spotify />}
        {service == 'youtube' && <Youtube />}
        {service == 'soundcloud' && <Soundcloud />}
        <div className={styles.artistDetails}>
          {content.userinfo.picture && (
            <Image
              className={styles.artistCover}
              src={content.userinfo.picture}
              alt='Artist picture'
            />
          )}
          <div className={styles.credentials}>
            <div>
              <b>{content.userinfo.name}</b>
            </div>
            <div style={color} className={[styles.title].join(' ')}>
              <b>{content.userinfo.title}</b>
            </div>
          </div>
          {/* <div className={styles.speakerContainer}>
            <Speaker marginRight={'5px'} />
            {ismuted && <Cross width='10px' height='10px' />}
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    service == 'trustpilot' && (
      <div className={[styles.trustPilot, className].join(' ')}>
        {/* <a
          className={styles.trustpilotLogo}
          target='_blank'
          rel='noreferrer'
          href='https://nl.trustpilot.com/review/daimoon.media?stars=5&stars=4&languages=all'
        >
          <TrustPilot />
        </a> */}
        <b>{content.title}</b>
        <p className={styles.description}>{content.description}</p>

        <div className={styles.artistDetails}>
          <div className={styles.credentials}>
            <div>
              <b>{content.userinfo.name}</b>
            </div>
            <div style={color} className={styles.title}>
              <a target='_blank' rel='noreferrer' href={content.userinfo.link}>
                <b>Read full review</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Review;
