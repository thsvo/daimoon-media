import React from 'react';
import Layout from '/components/Layout';
import { YoutubeDashboard } from '/components/ClientDetailDashboard';

const Details = ({ campaign }) => {
  return (
    <Layout>
      {campaign ? (
        campaign.error || campaign.name == 'Error' ? (
          <div>{campaign.message}</div>
        ) : (
          <YoutubeDashboard content={campaign} />
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

  const post = await response.json();

  return {
    props: {
      campaign: post.result,
    },
  };
}

export default Details;
