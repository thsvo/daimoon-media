//components
import SEO from '/components/SEO';
import Layout from '/components/Layout';
import HomeHero from '/components/HomeHero';
import TextWith4Pictures from '/components/TextWith4Pictures';
import ResultIllustration from '/components/ResultIllustration';
import BigArtistsInfoGraphic from '/components/BigArtistsInfoGraphic';
import BullitListBig from '/components/BullitListBig';
import Title from '/components/Title';
import BlockGridSmall from '/components/BlockGridSmall';
import CompanyList from '/components/CompanyList';

import VideoSwiper from '/components/VideoSwiper';
import SmallBarCTA from '/components/SmallBarCTA';

import ReviewVideos from '/json/VideoReviews/videos.json';

import Headphones from '/public/icons/headphones.jsx';
import Audience from '/public/icons/audience.jsx';
import Money from '/public/icons/money.jsx';

import logo from '/public/logo/logo.png';

const bigArtists = (props) => {
  const { reviews } = props;

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
          imageVariant={4}
          label={'Affiliates'}
          title={'Spread the word about Daimoon'}
          subTitle={'...and make money with<br/> every order'}
          buttons={[
            {
              type: 'normal',
              text: 'Find out more',
              to: false,
              onClick: false,
            },
            {
              type: 'transparent',
              text: 'Login',
              to: false,
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
        <div className={['wrapper mt200'].join(' ')}>
          <TextWith4Pictures />
        </div>

        <div className={['mt400'].join(' ')}>
          <ResultIllustration />
        </div>

        <div className={['wrapper mt300'].join(' ')}>
          <BigArtistsInfoGraphic />
        </div>
        <div className={['mt100'].join(' ')}>
          <BullitListBig />
        </div>
        <Title
          title={'How can you promote?'}
          sub={'All your favourite channels'}
          center={true}
        />
        <div className={'wrapper mt100'}>
          <BlockGridSmall smallCTA={true} />
        </div>
        <Title
          title={'You’re in good company'}
          sub={'Supported by many'}
          center={true}
        />
        <div className={'wrapper mt100'}>
          <CompanyList />
        </div>
        <div
          style={{ flexDirection: 'column' }}
          className={['wrapper mt200'].join(' ')}
        >
          {reviews && (
            <VideoSwiper service={'spotify'} reviews={reviews} loop={true} />
          )}
        </div>
        <div className={'wrapper mt100'}>
          <SmallBarCTA
            subText={' '}
            title={'Ready to start making a side income?'}
          />
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

export default bigArtists;
