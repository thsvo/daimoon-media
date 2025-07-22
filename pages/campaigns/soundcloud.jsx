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

import Repost from '/public/icons/repost';
import Youtube_play from '/public/icons/youtube_play';

//campaignImages
import LUISDEMARK from '/public/images/campaigns/soundcloud/LUISDEMARK.png';
import Hco$hawty from '/public/images/campaigns/soundcloud/Hco$hawty.png';
import XShai from '/public/images/campaigns/soundcloud/XShai.png';

//Components
import Layout from '/components/Layout';
import OrderProcess from '/components/OrderProcess';
import CampaignInfo from '/components/CampaignInfo';
import FAQ from '/components/FAQ';
import ShopContext from '/context/Order/shop-context';
import ProductInformation from '/components/ProductInformation';

import VideoSwiper from '/components/VideoSwiper';
import Campaigns from '/components/Campaigns';

import SEO from '/components/SEO';

const SoundCloudPromo = (props) => {
  const { reviews, questions } = props;
  const context = useContext(ShopContext);

  const soundcloud = {
    key: 3,
    value: 'soundcloud',
    label: 'YOUR BEST SHOT ON',
    title: `Get SoundCloud Promotion through reposts by our agency`,
    searchText: `Build your repost campaign and start growing on SoundCloud! Your SoundCloud tracks will never be neglected after you decide to work together with our agency. Get ready to see your track reach new heights and gain thousands of streams. Paste your track link now to get started.`,
    builder: 'soundcloud',
  };

  const color = '#f50';

  const CampaignData = {
    color: color,
    title: 'Our Repost Campaigns',
    sub: `How'd you like to grow?`,
    items: [
      {
        icon: Repost,
        title: 'Reach Target',
        content:
          'Our top priority will be getting your song reposted by big channels, focussing on the total number of channel followers reached.',
        bullits: [
          { valid: 'true', name: 'Gain plays & engagement' },
          { valid: 'true', name: 'Reach a big audience' },
          { valid: 'true', name: 'Extensive channel reposts' },
          { valid: 'true', name: 'Massive industry awareness' },
          { valid: 'false', name: 'Resulting plays can vary' },
        ],
      },
      {
        icon: Headphones,
        title: 'Plays Target',
        content:
          'Our top priority will be getting your song reposted by popular active channels, rather than big channels.',
        bullits: [
          { valid: 'true', name: 'Gain plays & engagement' },
          { valid: 'true', name: 'Target a niche audience' },
          { valid: 'true', name: 'Highly active channels' },
          { valid: 'true', name: 'Narrow industry awareness' },
          { valid: 'true', name: 'Plays target will be achieved' },
        ],
      },
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
      ripple: 'soundcloud',
      type: 'soundcloud',
      artistInfo: {
        name: 'LUISDEMARK',
        extraName: '- DaimoonMedia',
        quote:
          '“Together with DJ & producer LUISDEMARK we got his remix for Lil Nas X and Jack Harlow to receive big attention”',
        picture: LUISDEMARK,
      },
      campaign: {
        campaign: {
          campaignName: 'Target',
          campaignSize: '2.5k plays',
        },
        trackUrl:
          'https://soundcloud.com/luisdemark/lil-nas-x-jack-harlow-industry-baby-luisdemark-remix-2',
        trackName: 'Industry Baby (remix)',
        results: [
          {
            icon: Youtube_play,
            text: '14.900 plays',
          },
          {
            icon: Reach,
            text: '2.400.000 reach',
          },
        ],
      },
    },
    {
      ripple: 'soundcloud',
      type: 'soundcloud',
      artistInfo: {
        name: 'Hco$hawty',
        extraName: '- DaimoonMedia',
        quote:
          '“With a streaming target in mind we secured enough reach to bring hip hop artist Hco the results he deserves. Mission accomplished.”',
        picture: Hco$hawty,
      },
      campaign: {
        campaign: {
          campaignName: 'Target',
          campaignSize: '2.5k plays',
        },
        trackUrl: 'https://soundcloud.com/user-132811674/24a1',
        trackName: '24',
        results: [
          {
            icon: Youtube_play,
            text: '4.500 plays',
          },
          {
            icon: Reach,
            text: '2.850.000 reach',
          },
        ],
      },
    },
    {
      ripple: 'soundcloud',
      type: 'soundcloud',
      artistInfo: {
        name: 'X-Shai',
        extraName: '- DaimoonMedia',
        quote:
          '“Ghana born artist X-Shai wanted to reach a new audience with his record Sikaa and we got to help him.”',
        picture: XShai,
      },
      campaign: {
        campaign: {
          campaignName: 'Target',
          campaignSize: '6.000.000 reach',
        },
        trackUrl: 'https://soundcloud.com/x-shai/x-shai-ft-captan-sikaa',
        trackName: 'SIKAA',
        results: [
          {
            icon: Youtube_play,
            text: '14.400 plays',
          },
          {
            icon: Reach,
            text: '6.808.000 reach',
          },
        ],
      },
    },
  ];

  return (
    <>
      <SEO
        title={'SoundCloud Promotion | Promote Your Music'}
        description={
          'Use our SoundCloud Promotion to increase plays, followers, likes, and comments. Join 7000+ artists experiencing targeted soundcloud promotion.'
        }
      />
      <Layout>
        {/* <!-- Chaty Code --> */}
        <Script
          id='boeisoundcloud'
          strategy='afterInteractive'
          src='https://app.boei.help/embed/k/841bbf5b-222a-4536-bbbe-2db69638fc80?spa=true'
        ></Script>
        <OrderProcess activeService={soundcloud} />
        {context.breadcrumb.find((e) => e.service === 'soundcloud').step ===
          'search' && (
          <div
            style={{ flexDirection: 'column' }}
            className={['wrapper mt200'].join(' ')}
          >
            <CampaignInfo
              activeService={soundcloud.value}
              content={CampaignData}
            />
            {reviews && (
              <VideoSwiper
                service={'soundcloud'}
                reviews={reviews}
                loop={true}
                CTA={true}
              />
            )}
            <ProductInformation
              title={'Music Promotion That Works'}
              sub={`Careers are taking off thanks to Daimoon. With over <span style="color:${color}">7000 artists helped</span>, we understand how to succeed.`}
              service={'soundcloud'}
              content={Information[2]}
            />
            <Campaigns data={campaignExamples} service={'soundcloud'} />
            {questions && (
              <FAQ
                title={'Frequently Asked'}
                sub={'We’ve prepared some answers.'}
                color={color}
                service={'soundcloud'}
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
      item.service === 'soundcloud' &&
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

  const questions = faq.find((item) => item.service === 'soundcloud');

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

export default SoundCloudPromo;
