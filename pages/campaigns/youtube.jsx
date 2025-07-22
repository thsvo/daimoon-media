//Core
import React, { useContext } from 'react';

//Library
import ReviewVideos from '/json/VideoReviews/videos.json';
import faq from '/json/Faq/faq.json';
import Information from '/json/ProductInformation/information.json';
import Script from 'next/script';

//icons
import Headphones from '/public/icons/headphones';
import Editorial from '/public/icons/editorial';
import Follower from '/public/icons/follower';
import Reach from '/public/icons/reach';
import Ad from '/public/icons/ad';
import YoutubePlay from '/public/icons/youtube_play';
import Engagement from '/public/icons/engagement';
import Regional from '/public/icons/regional';
import Global from '/public/icons/global';

//Components
import Layout from '/components/Layout';
import OrderProcess from '/components/OrderProcess';
import CampaignInfo from '/components/CampaignInfo';
import FAQ from '/components/FAQ';
import ShopContext from '/context/Order/shop-context';

//campaignImages
import PhantomPhunk from '/public/images/campaigns/youtube/PhantomPhunk.png';
import sunrisepilot from '/public/images/campaigns/youtube/sunrisepilot.png';
import YUSIFER from '/public/images/campaigns/youtube/YUSIFER.png';

import VideoSwiper from '/components/VideoSwiper';
import Campaigns from '/components/Campaigns';
import ProductInformation from '/components/ProductInformation';

import SEO from '/components/SEO';

const YoutubePromo = (props) => {
  const { reviews, questions } = props;
  const context = useContext(ShopContext);

  const youtube = {
    key: 2,
    value: 'youtube',
    label: 'A UNIQUE APPROACH ON',
    title: `That turns Ads into Thousands of Views!`,
    searchText: `After all effort that went into your video, you only deserve the best YouTube music promotion on the internet. Have our agency set up a custom tailored YouTube ad campaign that drives thousands of views. Select your package now & get amazed by all the incoming <br/><b>Views & Engagement</b> on your video`,
    builder: 'youtube',
  };

  const color = '#e00';

  const CampaignData = {
    color: color,
    title: 'Our View Campaigns',
    sub: 'Millions of eyes are waiting for you.',
    items: [
      {
        icon: Global,
        title: 'Worldwide',
        content:
          'Our top priority will be reaching the most relevant viewers across the globe.',
        bullits: [
          { valid: 'true', name: 'Gain views & awareness' },
          { valid: 'true', name: 'Reach a broad audience' },
          { valid: 'true', name: 'Lower advertising costs' },
          { valid: 'true', name: 'All artist video types' },
          { valid: 'false', name: 'Potential language mismatch' },
        ],
      },
      {
        icon: Regional,
        title: 'Territory',
        content:
          'Our top priority will be reaching the most relevant viewers in one or more territories.',
        bullits: [
          { valid: 'true', name: 'Gain views & awareness' },
          { valid: 'true', name: 'Choose your countries' },
          { valid: 'true', name: 'Higher advertising costs' },
          { valid: 'true', name: 'All artist video types' },
          { valid: 'true', name: 'Better fan accuracy' },
        ],
      },
      // {
      //   icon: Engagement,
      //   title: 'Profile Follower Growth',
      //   content: 'Make people listen to your music on a daily basis.',
      //   bullits: [
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //   ],
      // },
      // {
      //   icon: Editorial,
      //   title: 'Editorial <br /> pitching',
      //   content: 'Get your song pitched to top-of-the-line playlists.',
      //   bullits: [
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //   ],
      // },
      // {
      //   icon: Ad,
      //   title: 'Spotify Advertising Campaigns',
      //   content: 'Make people listen to your music on a daily basis.',
      //   bullits: [
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //     { valid: 'true', name: 'Lorem ipsum' },
      //   ],
      // },
    ],
  };

  const campaignExamples = [
    {
      ripple: 'youtube',
      type: 'youtube',
      artistInfo: {
        name: 'Phantom Phunk',
        extraName: '- Phantom Phunk',
        quote:
          '“We have being very satisfied with your promotional service and will contact you for our next track.”',
        picture: PhantomPhunk,
      },
      campaign: {
        campaign: {
          campaignName: 'Target',
          campaignSize: '100k views',
        },
        trackUrl: 'https://www.youtube.com/watch?v=4WYxWSv19i4&t=2s',
        trackName: 'A Week Ago',
        results: [
          {
            icon: YoutubePlay,
            text: '112.400 views',
          },
        ],
      },
    },
    {
      ripple: 'youtube',
      type: 'youtube',
      artistInfo: {
        name: 'Sunrise Pilot',
        extraName: '- Sunrise Pilot',
        quote:
          '“DaimoonMedia delivers the organic YouTube views I’m looking for.”',
        picture: sunrisepilot,
      },
      campaign: {
        campaign: {
          campaignName: 'Target',
          campaignSize: '25k views',
        },
        trackUrl: 'https://www.youtube.com/watch?v=F098Yq4c20U',
        trackName: 'This Is Summer',
        results: [
          {
            icon: YoutubePlay,
            text: '28.200 views',
          },
        ],
      },
    },
    {
      ripple: 'youtube',
      type: 'youtube',
      artistInfo: {
        name: 'YUCIFER',
        extraName: '- DaimoonMedia',
        quote:
          '“We helped experimental hip hop artist YUCIFER grow his biggest music video yet”',
        picture: YUSIFER,
      },
      campaign: {
        campaign: {
          campaignName: 'Target',
          campaignSize: '10k views',
        },
        trackUrl: 'https://www.youtube.com/watch?v=rvjTAMR2mvM',
        trackName: 'RACKS',
        results: [
          {
            icon: YoutubePlay,
            text: '11.051 views',
          },
        ],
      },
    },
  ];

  return (
    <>
      <SEO
        title={'YouTube Promotion | Promote Your music Video'}
        description={
          'Use our YouYube Promotion to boost views, likes, comments, and subscribers. Join 7000+ artists experiencing targeted growth.'
        }
      />
      <Layout>
        {/* <!-- Chaty Code --> */}
        <Script
          id='boeiyoutube'
          strategy='afterInteractive'
          src='https://app.boei.help/embed/k/841bbf5b-222a-4536-bbbe-2db69638fc80?spa=true'
        ></Script>
        <OrderProcess activeService={youtube} />
        {context.breadcrumb.find((e) => e.service === 'youtube').step ===
          'search' && (
          <div
            style={{ flexDirection: 'column' }}
            className={['wrapper mt200'].join(' ')}
          >
            <CampaignInfo
              activeService={youtube.value}
              content={CampaignData}
            />
            {reviews && (
              <VideoSwiper
                service={'youtube'}
                reviews={reviews}
                loop={true}
                CTA={true}
              />
            )}
            <ProductInformation
              title={'Music Promotion That Works'}
              sub={`Careers are taking off thanks to Daimoon. With over <span style="color:${color}">7000 artists helped</span>, we understand how to succeed.`}
              service={'youtube'}
              content={Information[1]}
            />
            <Campaigns data={campaignExamples} service={'youtube'} />
            {questions && (
              <FAQ
                title={'Frequently Asked'}
                sub={'We’ve prepared some answers.'}
                color={color}
                service={'youtube'}
                questions={questions.types}
              />
            )}
          </div>
        )}
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  let reviews = [];

  ReviewVideos.find(
    (item) =>
      item.service === 'youtube' &&
      item.reviews.map((review) => {
        reviews.push({
          service: item.service,
          review: review,
        });
      })
  );

  for (let i = reviews.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = reviews[i];
    reviews[i] = reviews[j];
    reviews[j] = temp;
  }

  const questions = faq.find((item) => item.service === 'youtube');

  if (reviews.length == 0) {
    return {
      props: {
        reviews: [],
        questions,
      },
    };
  }

  return {
    props: { reviews, questions }, // will be passed to the page component as props
  };
}

export default YoutubePromo;
