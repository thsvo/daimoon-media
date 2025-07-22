//Core
import React, { useRef } from 'react';

//components
import SEO from '/components/SEO';
import Layout from '/components/Layout';
import HomeHero from '/components/HomeHero';
import Title from '/components/Title';

import PerksContainer from '/components/PerksContainer';
import SmallBarCTA from '/components/SmallBarCTA';
import VideoSwiper from '/components/VideoSwiper';

import TextWithPicture from '/components/TextWithPicture';

import ReviewVideos from '/json/VideoReviews/videos.json';

import logo from '/public/logo/logo.png';

import Heart from '/public/icons/healthy-heart.jsx';
import Audience from '/public/icons/audience.jsx';
import Money from '/public/icons/money.jsx';

const Resellers = (props) => {
  const { reviews } = props;
  const infoRef = useRef(null);

  return (
    <>
      <SEO
        title={'Organic Music Exposure | DaimoonMedia | Promote Your Music'}
        description={
          'Start growing! Reach new listeners, viewers and fans through proven expert Spotify, YouTube & SoundCloud promotions. Or apply for your personal growth plan.'
        }
        image={logo}
      />
      <Layout>
        <HomeHero
          onlyText={false}
          imageVariant={2}
          label={'Resellers'}
          title={'Lets work and grow together'}
          subTitle={'We can supply services for<br/> your business'}
          buttons={[
            {
              type: 'normal',
              text: 'Find out more',
              to: false,
              onClick: infoRef,
            },
            {
              type: 'transparent',
              text: 'Login',
              to: false,
            },
          ]}
          bullets={[
            {
              text: 'A partner <br />you can trust',
              icon: Heart,
            },
            {
              text: 'Custom <br />Campaigns',
              icon: Audience,
            },
            {
              text: 'Heavy <br />Discounts',
              icon: Money,
            },
          ]}
          smallCTA={false}
        />
        <div ref={infoRef}></div>
        <div className={['wrapper mt100'].join(' ')}>
          <TextWithPicture />
        </div>
        <div className={['wrapper mt100'].join(' ')}>
          <PerksContainer
            title={'Reseller Perks'}
            sub={'Enjoy exclusive benefits!'}
          />
        </div>

        <div className={['wrapper mt100'].join(' ')}>
          <SmallBarCTA
            to={'https://calendly.com/daimoonmedia/reseller-onboarding-call'}
          />
        </div>
        <div
          style={{ flexDirection: 'column' }}
          className={['wrapper'].join(' ')}
        >
          <Title
            title={'We thrive on trust'}
            sub={
              'Not convinced about our service yet? <br />Let our artists tell you all about it!'
            }
            center={true}
          />
          {reviews && (
            <VideoSwiper service={'spotify'} reviews={reviews} loop={true} />
          )}
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  let reviews = [];
  let randomized = [];
  let spotify = ReviewVideos.find((item) => item.service == 'spotify');
  let youtube = ReviewVideos.find((item) => item.service == 'youtube');
  let soundcloud = ReviewVideos.find((item) => item.service == 'soundcloud');

  reviews.push({
    service: 'spotify',
    review: spotify.reviews.shift(),
  });

  reviews.push({
    service: 'youtube',
    review: youtube.reviews.shift(),
  });

  reviews.push({
    service: 'soundcloud',
    review: soundcloud.reviews.shift(),
  });

  spotify.reviews.map((review) => {
    randomized.push({
      service: 'spotify',
      review: review,
    });
  });
  youtube.reviews.map((review) => {
    randomized.push({
      service: 'youtube',
      review: review,
    });
  });
  soundcloud.reviews.map((review) => {
    randomized.push({
      service: 'soundcloud',
      review: review,
    });
  });

  let currentIndex = randomized.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [randomized[currentIndex], randomized[randomIndex]] = [
      randomized[randomIndex],
      randomized[currentIndex],
    ];
  }

  reviews.push(...randomized);

  return {
    props: { reviews }, // will be passed to the page component as props
  };
}

export default Resellers;
