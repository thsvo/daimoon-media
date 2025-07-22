import React, { useRef } from 'react';

//components
import SEO from '/components/SEO';
import Layout from '/components/Layout';
import HomeHero from '/components/HomeHero';
import Title from '/components/Title';
import AffiliateSteps from '/components/AffiliateSteps';
import BullitListPicture from '/components/BullitListPicture';
import CompanyList from '/components/CompanyList';
import BlockGridSmall from '/components/BlockGridSmall';
import SmallBarCTA from '/components/SmallBarCTA';
import VideoSwiper from '/components/VideoSwiper';

import ReviewVideos from '/json/VideoReviews/videos.json';

import Headphones from '/public/icons/headphones.jsx';
import Audience from '/public/icons/audience.jsx';
import Money from '/public/icons/money.jsx';

import logo from '/public/logo/logo.png';

const Affiliates = (props) => {
  const { reviews } = props;
  const howItWorks = useRef(null);

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
          imageVariant={3}
          label={'Affiliates'}
          title={'Spread the word about Daimoon'}
          subTitle={'...and make money with<br/> every order'}
          buttons={[
            {
              type: 'normal',
              text: 'Find out more',
              to: false,
              onClick: howItWorks,
            },
            {
              type: 'transparent',
              text: 'Login',
              to: true,
              url: 'https://www.refersion.com/affiliate/login',
            },
          ]}
          bullets={[
            {
              text: 'Artists',
              icon: Headphones,
            },
            {
              text: 'Organisations',
              icon: Audience,
            },
            {
              text: 'Hustlers',
              icon: Money,
            },
          ]}
          smallCTA={false}
          centerContent={true}
        />
        <div ref={howItWorks}></div>
        <Title
          title={'Promoting made easy'}
          sub={'Be smart, earn hard!'}
          center={true}
        />
        <div className={'wrapper mt100'}>
          <AffiliateSteps />
        </div>
        <div className={['wrapper mt100'].join(' ')}>
          <BullitListPicture />
        </div>
        <Title
          title={'You’re in good company'}
          sub={'Supported by many'}
          center={true}
        />
        <div className={'wrapper mt100'}>
          <CompanyList />
        </div>
        <Title
          title={'How can you promote?'}
          sub={'All your favourite channels'}
          center={true}
        />

        <div className={'wrapper mt100'}>
          <BlockGridSmall />
        </div>
        <div className={'wrapper'}>
          <SmallBarCTA
            title={'Ready to start making a side income?'}
            to={'/b2b/affiliates/register/artist'}
          />
        </div>
        <div
          style={{ flexDirection: 'column' }}
          className={['wrapper'].join(' ')}
        >
          <Title
            title={'We thrive on trust'}
            sub={
              'Not convinced about our service yet? <br/> Let our artists tell you all about it!'
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

export default Affiliates;
