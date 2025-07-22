import React, { useState, useRef } from 'react';

import ReviewVideos from '/json/VideoReviews/videos.json';
import ServicesCTA from '/components/ServicesCTA';

import Layout from '/components/Layout';
import CaseStudyHero from '/components/CaseStudyHero';
import Results from '/components/ResultsCTA';
import SearchCTA from '/components/SearchCTA';
import Title from '/components/Title';
import Achievements from '/components/Achievements';

import VideoSwiper from '/components/VideoSwiper';

const CaseStudy = (props) => {
  const { reviews } = props;
  const resultsRef = useRef(null);

  return (
    <>
      <Layout>
        <CaseStudyHero
          resultsRef={resultsRef}
          contentlabel='Case study'
          title='Watch The Case Study Here'
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

        <div
          style={{ flexDirection: 'column' }}
          className={['wrapper'].join(' ')}
        >
          <Title
            title='Want To Hear What Artists Like Yourself Have To Say About Us?'
            sub='On a united mission to help you reach your full potential'
            left
          />
          {reviews && (
            <VideoSwiper service={'spotify'} reviews={reviews} loop={true} />
          )}
        </div>
        <Achievements />
        <div id='services'>
          <Title
            title='How Can We Help You?'
            sub='Select the platform where you want to grow'
            center
          />
          <ServicesCTA />
        </div>
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

export default CaseStudy;
