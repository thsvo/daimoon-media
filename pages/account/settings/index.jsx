import React, { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth/next';

import AccountSettings from '/components/AccountSettings';
import Layout from '/components/Layout';
import { authOptions } from '/pages/api/auth/[...nextauth]';

const Settings = (props) => {
  const { user } = props;

  return (
    <Layout>
      <div style={{ width: '100%' }}>
        <h2>My Settings</h2>
        {user && <AccountSettings details={user.user} />}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, query, res }) {
  const user = await getServerSession(req, res, authOptions);

  try {
    return {
      props: {
        user: user,
      },
    };
  } catch (error) {
    return {
      props: { error: { ...error } },
    };
  }
}

export default Settings;
