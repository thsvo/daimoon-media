import React, { useState } from 'react';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '/pages/api/auth/[...nextauth]';

import { Pagination } from '/components/pagination';

import ClientDashboard from '/components/ClientDashboard';
import Layout from '/components/Layout';
import { useRouter } from 'next/router';

import { GetPaidCampaignsByEmail } from '/lib/ExistingOrder';

const Account = (props) => {
  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const { pageCount, currentPage, posts } = props;

  const router = useRouter();

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
    <>
      <Layout>
        <div style={{ width: '100%' }}>
          <h2>My Campaigns</h2>

          {posts && posts.length == 0 ? (
            'No orders found'
          ) : isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <ClientDashboard orders={posts} type={'campaigns'} />
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
    </>
  );
};

export async function getServerSideProps({ req, query, res }) {
  const user = await getServerSession(req, res, authOptions);

  try {
    const page = query.page ? query.page : 1; //if page empty we request the first page

    const posts = await GetPaidCampaignsByEmail(
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
        totalCount: posts.details.total_items,
        pageCount: posts.details.total_pages,
        currentPage: posts.details.current_page,
        perPage: posts.details.per_page,
        posts: posts.items,
      },
    };
  } catch (error) {
    return {
      props: { error: { ...error } },
    };
  }
}

export default Account;
