import React from 'react';
import Layout from '/components/Layout';
import { SpotifyDashboard } from '/components/ClientDetailDashboard';

const Details = ({ campaign, service }) => {
  return (
    <Layout>
      {campaign ? (
        campaign.error || campaign.name == 'Error' ? (
          <div>{campaign.message}</div>
        ) : (
          <SpotifyDashboard content={campaign} />
        )
      ) : (
        <div>Loading ...</div>
      )}
    </Layout>
  );
};

export async function getServerSideProps({ req, query, res }) {
  const response = await fetch(
    process.env.NEXTAUTH_URL + `/api/orders/getCampaignById`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie,
      },
      body: JSON.stringify({
        id: query.id,
      }),
    }
  );

  if (response.status == 200) {
    const post = await response.json();

    return {
      props: {
        campaign: post.result,
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/account/campaigns?page=1',
    },
  };
}

export default Details;
