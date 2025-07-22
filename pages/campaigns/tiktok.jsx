//Core
import React from 'react';
import Script from 'next/script';

//Components
import Layout from '/components/Layout';
import OrderProcess from '/components/OrderProcess';

import SEO from '/components/SEO';


const TiktokPromo = (props) => {
  const tiktok = {
    key: 0,
    value: 'tiktok',
    label: 'Use ads for',
    title: `Promote your TikTok videos with our custom ad campaigns`,
    searchText: `Let our agency run targeted ads on your TikToks to grow in views, likes, and followers. This service tends to give the highest engagement of all streaming platforms we work with. Be prepared to have people comment & reach out to you when we take care of it. Paste your TikTok URL below and let’s get started.`,
    builder: 'tiktok',
  };

  return (
    <>
      <SEO
        title={'Tiktok Promotion Campaign | DaimoonMedia | Promote Your Music'}
        description={
          'Promote your music on Tiktok with DaimoonMedia. Get your music to go viral on Tiktok with our music promotion services.'
        }
      />
      <Layout>
        {/* <!-- Chaty Code --> */}
        <Script
          id='boeitiktok'
          strategy='afterInteractive'
          src='https://app.boei.help/embed/k/841bbf5b-222a-4536-bbbe-2db69638fc80?spa=true'
        ></Script>
        <OrderProcess activeService={tiktok} />
      </Layout>
  
    </>
  );
};

export default TiktokPromo;
