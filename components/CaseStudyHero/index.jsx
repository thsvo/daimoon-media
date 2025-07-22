import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './caseStudy.module.scss';

import Button from '/components/Button';
import Contentlabel from '/components/Contentlabel';
import Bulletin from '/components/Bulletin';
import BlackFriday from '/components/BlackFriday';

import Video from '/components/Video';
import Playbutton from '/public/icons/playbutton.jsx';
import videoThumbnail from '/public/images/videoThumbnail.png';

import Headphones from '/public/icons/headphones.jsx';
import HealthyHeart from '/public/icons/healthy-heart.jsx';
import Audience from '/public/icons/audience.jsx';

import WhiteArrow from '/public/images/white-arrow-transparent-png-10.png';
import stars from '/public/blackFriday/stars-daimoon.png';
import TrustWidget from '/public/blackFriday/Trust-widget.png';

import { Visa, MasterCard, AmericanExpress } from '/public/icons/creditcards';

import Spotlight1 from '/public/Spotlights/spotlight-1.png';

const CaseStudyHero = ({ resultsRef, contentlabel, title }) => {
  const [play, setPlay] = useState(false);
  const [methods, setAllMethods] = useState([]);

  return (
    <>
      <div className={[styles.HeroContainer, 'wrapper '].join(' ')}>
        <div className={styles.campaignPreviews}>
          <div className={styles.spotlight}>
            <Image
              width={600}
              height={600}
              src={Spotlight1}
              placeholder='blur'
              alt={''}
            />
          </div>
        </div>
        <div onClick={() => setPlay(true)} className={styles.videoContainer}>
          <div className={[styles.videoWrapper].join(' ')}>
            {/* <div>
              <BlackFriday />
            </div> */}
            {!play ? (
              <div className={[styles.videoOverlay].join(' ')}>
                <Image
                  className={styles.image}
                  fill
                  alt={'Videocover'}
                  objectFit='cover'
                  src={'/posters/case-study/case-study.png'}
                />
                <div className={styles.playButton}>
                  <Playbutton />
                </div>
              </div>
            ) : (
              <video
                className='w-full h-full'
                autoPlay={true}
                muted={false}
                controls={true}
                poster='/posters/case-study/case-study.png'
                loop={false}
              >
                <source
                  src={
                    'https://videos.daimoon.media/CaseStudy/CaseStudy_0324.mp4'
                  }
                  type='video/webm'
                />
              </video>
            )}
          </div>
        </div>

        <div className={[styles.campaignCTA, 'relative'].join(' ')}>
          <Image src={WhiteArrow} className={styles.whiteArrow}></Image>
          <div className={styles.contentContainer}>
            <Contentlabel>{contentlabel}</Contentlabel>
            <h1>{title}</h1>
            <span className={styles.underText}>
              Like what you see? Maybe we can partner up together💪
            </span>
            <div className={styles.bulletins}>
              <Bulletin
                bullets={[
                  {
                    text: 'Built for <br /> artists',
                    icon: Headphones,
                  },
                  {
                    text: 'Reach <br /> millions',
                    icon: Audience,
                  },
                  {
                    text: 'Real people. <br /> With ears.',
                    icon: HealthyHeart,
                  },
                ]}
              />
            </div>
            <div className={[styles.buttonContainer].join(' ')}>
              <span
                className='border-2 border-white border-solid rounded-[15px] text-center p-[15px] cursor-pointer'
                onClick={() => {
                  const element = document.getElementById('services');
                  window.scrollTo({
                    top: element.offsetTop - 100,
                    behavior: 'smooth',
                  });
                }}
              >
                Check What We Can Do For You
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <Image src={TrustWidget} className='object-contain w-full'></Image>
      </div> */}
    </>
  );
};

export default CaseStudyHero;
