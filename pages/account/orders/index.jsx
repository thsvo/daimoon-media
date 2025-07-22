import React, { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth/next';
import { GetPaidOrdersByEmail } from '/lib/ExistingOrder';
import { authOptions } from '/pages/api/auth/[...nextauth]';

import { Pagination } from '/components/pagination';
import ClientDashboard from '/components/ClientDashboard';
import Layout from '/components/Layout';

import Router, { useRouter } from 'next/router';

const Orders = (props) => {
  const { totalCount, pageCount, currentPage, perPage, posts, page } = props;

  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const router = useRouter();

  useEffect(() => {
    //After the component is mounted set router event handlers
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  const pagginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.page = page.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <Layout>
      <div style={{ width: '100%' }}>
        <h2>My Orders</h2>

        {posts && posts.length == 0 ? (
          'No orders found'
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ClientDashboard orders={posts} type={'orders'} />
            {pageCount >= 1 && (
              <div className='flex center my-5'>
                <Pagination
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  pageCount={pageCount}
                  onPageChange={pagginationHandler}
                  pageRangeDisplayed={5}
                  breakLabel={'...'}
                  pageLinkClassName='px-3 py-2 sm:py-1 text-white bg-inherit border-0 cursor-pointer'
                  previousClassName='px-2 sm:px-3 py-2 sm:px-2 sm:py-1 text-white bg-inherit border-none cursor-pointer'
                  nextClassName='px-2 py-2 sm:py-1 text-white bg-inherit border-none cursor-pointer'
                  disabledClassName={'cursor-not-allowed disabled-pagination'}
                  breakClassName={'break-me px-2 py-2 sm:px-1'}
                  containerClassName={'react-paginate text-sm leading-tight'}
                  activeClassName={'text-white border-b-2 border-[#b165ed]'}
                  forcePage={currentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, query, res }) {
  const user = await getServerSession(req, res, authOptions);

  try {
    const page = query.page || 1; //if page empty we request the first page

    const posts = await GetPaidOrdersByEmail(
      user.user.email,
      page,
      user.user.userRole
    );

    if (posts.length == 0 || !posts)
      return {
        props: {
          page: 1,
          totalCount: 0,
          pageCount: 1,
          currentPage: 1,
          perPage: 10,
          posts: [],
        },
      };

    return {
      props: {
        page: page,
        totalCount: posts.meta.totalCount,
        pageCount: posts.meta.pageCount,
        currentPage: posts.meta.currentPage,
        perPage: posts.meta.perPage,
        posts: posts.result,
      },
    };
  } catch (error) {
    return {
      props: { error: { ...error } },
    };
  }
}

export default Orders;
