//Core
import React from 'react';
import { useRouter } from 'next/router';
//Library

//Components
import Layout from '/components/Layout';
import OrderProcess from '/components/OrderProcess';

const Overview = () => {
  const router = useRouter();

  const serviceObject = [
    {
      key: 0,
      value: 'tiktok',
      title: ``,
      searchText: ``,
    },
    {
      key: 1,
      value: 'spotify',
      title: `Imagine your song on huge Spotify playlists. `,
      searchText: `We pitch your music to as many playlists in your genre as possible. This led to very good results according to many artists. Our promotion activity could exponentially grow your track using Spotify's algorithm.`,
    },
    {
      key: 2,
      value: 'youtube',
      title: `Imagine your song on huge Spotify playlists. `,
      searchText: `We pitch your music to as many playlists in your genre as possible. This led to very good results according to many artists. Our promotion activity could exponentially grow your track using Spotify's algorithm.`,
    },
    {
      key: 3,
      value: 'soundcloud',
      title: `Imagine your song on huge Spotify playlists. `,
      searchText: `We pitch your music to as many playlists in your genre as possible. This led to very good results according to many artists. Our promotion activity could exponentially grow your track using Spotify's algorithm.`,
    },
  ].filter(function (obj) {
    if (router.query.service) {
      return obj.value == router.query.service;
    } else {
      return obj.value == 'spotify';
    }
  });

  return (
    <>
      <Layout>
        {serviceObject[0] && (
          <OrderProcess basic={true} activeService={serviceObject[0]} />
        )}
      </Layout>
    </>
  );
};

export default Overview;
