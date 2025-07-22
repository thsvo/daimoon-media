import React, { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth/next';

import Layout from '/components/Layout';
import UserManagement from '/components/UserManagement';

import { authOptions } from '/pages/api/auth/[...nextauth]';

const Users = ({ role, userId }) => {
  const [isLoading, setLoading] = useState(false); //State for the loading indicator

  return (
    <Layout>
      <div style={{ width: '100%' }}>
        <h2>Manage Users</h2>
        <UserManagement />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const { user } = await getServerSession(req, res, authOptions);

  try {
    if (user?.userRole == 'admin') {
      return {
        props: {
          role: user?.userRole,
          userId: user?.id,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        error: { message: 'Not Authorised' },
        role: user?.userRole,
      },
    };
  }
}

export default Users;
