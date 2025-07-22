import { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './affiliateHero.module.scss';

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

import stars from '/public/blackFriday/stars-daimoon.png';
import TrustWidget from '/public/blackFriday/Trust-widget.png';

import { Visa, MasterCard, AmericanExpress } from '/public/icons/creditcards';

import Spotlight1 from '/public/Spotlights/spotlight-1.png';

const AffiliateHero = ({ resultsRef, contentlabel, title }) => {
  const [play, setPlay] = useState(false);
  const [methods, setAllMethods] = useState([]);

  // useEffect(() => {
  //   methods.length == 0 &&
  //     fetch('/api/payments/mollie/getMethods', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         billingCountry: 'NL',
  //         value: '500.00',
  //         currency: 'EUR',
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then(async (data) => {
  //         setAllMethods(data);
  //       });
  // });

  return (
    <>
      <div className={[styles.HeroContainer, 'wrapper'].join(' ')}>
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
                  placeholder='blur'
                  src={videoThumbnail}
                />
                <div className={styles.playButton}>
                  <Playbutton />
                </div>
              </div>
            ) : (
              <Video
                play={true}
                url={'https://www.youtube.com/watch?v=19OP4cVZNBo'}
              />
            )}
          </div>
          <div className={styles.paymentContainer}>
            <div className={styles.paymentList}>
              {methods &&
                methods.map((method, index) => {
                  if (
                    method.id == 'ideal' ||
                    method.id == 'paypal' ||
                    method.id == 'applepay'
                  ) {
                    return (
                      <Image
                        key={index}
                        alt={method.description}
                        width='40'
                        height='30'
                        src={method.image.svg}
                      />
                    );
                  }
                })}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  height: '30px',
                }}
              >
                <Visa />
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  height: '30px',
                  width: '40px',
                }}
              >
                <MasterCard />
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  height: '30px',
                  width: '40px',
                }}
              >
                <AmericanExpress />
              </div>
            </div>
            <span>100% satisfaction guaranteed ✅</span>
          </div>
        </div>
        <div className={styles.campaignCTA}>
          <div className={styles.contentContainer}>
            <Contentlabel>{contentlabel}</Contentlabel>
            <h1>{title}</h1>
            {/* <div className='flex items-center mt-5 mb-5'>
              <Image src={stars} width='100' height='25'></Image>
              <span className='text-[#ffffffa6] underline ml-5'>
                <a href={'https://www.trustpilot.com/review/daimoon.media'}>
                  view our reviews{' '}
                </a>
              </span>
            </div> */}
            <span className={styles.underText}>
              Reach Your Audience through <br />
              our Unique Growth Campaigns
            </span>
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
            <div className={[styles.buttonContainer].join(' ')}>
              <Button
                type='tiktok'
                text='TikTok'
                to='/campaigns/tiktok'
                discount={true}
                newService={true}
              ></Button>
              <Button
                className='mt20'
                type='spotify'
                text='Spotify Promotions'
                to='/campaigns/spotify-promotion'
                discount={true}
              ></Button>
              <Button
                className='mt20'
                type='youtube'
                text='YouTube Promotions'
                to='/campaigns/youtube'
                discount={true}
              ></Button>
              <Button
                className='mt20'
                type='soundcloud'
                text='SoundCloud Promotions'
                to='/campaigns/soundcloud'
                discount={true}
              ></Button>
            </div>
            <div className={'flex center'}>
              <a
                onClick={() =>
                  resultsRef.current.scrollIntoView({ block: 'center' })
                }
                className={styles.smallCta}
              >
                How does it work?
              </a>
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

export default AffiliateHero;