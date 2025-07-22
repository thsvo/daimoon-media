import React, { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth/next';

import PackageCreator from '/components/PackageCreator';
import Layout from '/components/Layout';

import { authOptions } from '/pages/api/auth/[...nextauth]';
import { DatabaseAdapter } from '/lib/Database/Adapter/adapter';

const Resellers = ({ error, reseller: { reseller, packages } }) => {
  console.log('reseller', reseller);
  return (
    <Layout>
      <div style={{ width: '100%' }}>
        {error && <span>{error.message}</span>}
        {reseller && <PackageCreator reseller={reseller} packages={packages} />}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, query, res }) {
  const { user } = await getServerSession(req, res, authOptions);
  const adapter = DatabaseAdapter();

  try {
    if (user?.userRole == 'admin') {
      const reseller = await adapter.getResellerByUserId(user.id);

      return {
        props: {
          role: user?.userRole,
          reseller: JSON.parse(JSON.stringify(reseller)),
        },
      };
    }
    if (user?.userRole == 'reseller') {
      const reseller = await adapter.getResellerByUserId(user.id);

      return {
        props: {
          role: user?.userRole,
          reseller: JSON.parse(JSON.stringify(reseller)),
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/account/campaigns?page=1',
        },
      };
    }
  } catch (error) {
    return {
      props: {
        error: { message: 'No reseller profile found' },
        role: user?.userRole,
      },
    };
  }
}

export default Resellers;
