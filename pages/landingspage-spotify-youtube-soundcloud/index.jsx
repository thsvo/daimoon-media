import React, { useState, useRef } from 'react';

import ReviewVideos from '/json/VideoReviews/videos.json';

import Layout from '/components/Layout';
import AffiliateHero from '/components/AffiliateHero';
import Results from '/components/ResultsCTA';
import SearchCTA from '/components/SearchCTA';
import Title from '/components/Title';
import ReviewGrid from '/components/ReviewGrid';
import Achievements from '/components/Achievements';
import SEO from '/components/SEO';

import VideoSwiper from '/components/VideoSwiper';

const AffiliateLanding = (props) => {
  const { reviews } = props;
  const resultsRef = useRef(null);
  const [service, setService] = useState('spotify');

  // Filter reviews for the selected service
  const filteredReviews = reviews.filter((r) => r.service === service);

  return (
    <>
      <Layout>
        <AffiliateHero
          resultsRef={resultsRef}
          contentlabel='Welcome'
          title='Your partner in promotion'
        />
        <div ref={resultsRef}>
          <Results />
          <Title
            title='Need growth? Try it out!'
            sub='Search your song & view all campaigns'
            center
          />
          <SearchCTA />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
          <button
            onClick={() => setService('spotify')}
            style={{
              background: service === 'spotify' ? '#1ED760' : 'transparent',
              color: service === 'spotify' ? '#fff' : '#1ED760',
              border: '1px solid #1ED760',
              borderRadius: 6,
              padding: '8px 18px',
              marginRight: 8,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Spotify
          </button>
          <button
            onClick={() => setService('youtube')}
            style={{
              background: service === 'youtube' ? '#FF0000' : 'transparent',
              color: service === 'youtube' ? '#fff' : '#FF0000',
              border: '1px solid #FF0000',
              borderRadius: 6,
              padding: '8px 18px',
              marginRight: 8,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            YouTube
          </button>
          <button
            onClick={() => setService('soundcloud')}
            style={{
              background: service === 'soundcloud' ? '#FF5502' : 'transparent',
              color: service === 'soundcloud' ? '#fff' : '#FF5502',
              border: '1px solid #FF5502',
              borderRadius: 6,
              padding: '8px 18px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            SoundCloud
          </button>
        </div>
        <div
          style={{ flexDirection: 'column' }}
          className={['wrapper'].join(' ')}
        >
          {filteredReviews.length > 0 && (
            <VideoSwiper service={service} reviews={filteredReviews} loop={true} />
          )}
        </div>
        <Achievements />
        <Title
          title='Try now & start growing'
          sub='Search your song & view all campaigns'
          center
        />
        <SearchCTA />
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  let reviews = [];
  let spotify = ReviewVideos.find((item) => item.service == 'spotify');
  let youtube = ReviewVideos.find((item) => item.service == 'youtube');
  let soundcloud = ReviewVideos.find((item) => item.service == 'soundcloud');

  spotify.reviews.map((review) => {
    reviews.push({
      service: 'spotify',
      review: review,
    });
  });
  youtube.reviews.map((review) => {
    reviews.push({
      service: 'youtube',
      review: review,
    });
  });
  soundcloud.reviews.map((review) => {
    reviews.push({
      service: 'soundcloud',
      review: review,
    });
  });

  let currentIndex = reviews.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [reviews[currentIndex], reviews[randomIndex]] = [
      reviews[randomIndex],
      reviews[currentIndex],
    ];
  }

  return {
    props: { reviews }, // will be passed to the page component as props
  };
}

export default AffiliateLanding;