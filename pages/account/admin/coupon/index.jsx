import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Router, { useRouter } from 'next/router';
import { getAllCoupons } from '/lib/Coupons';

import { Pagination } from '/components/pagination';

import CouponContainer from '/components/CouponContainer';
import Layout from '/components/Layout';

const Coupon = ({ pageCount, currentPage, coupons }) => {
  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false); //State for the loading indicator
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
        <h2>Create, edit and remove coupon codes</h2>
        <CouponContainer coupons={coupons} />
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
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const page = query.page ? query.page : 1; //if page empty we request the first page

    const coupons = await getAllCoupons(page);

    if (!coupons)
      return {
        props: {
          page: 1,
          totalCount: 0,
          pageCount: 1,
          currentPage: 1,
          perPage: 10,
          coupons: [],
        },
      };

    return {
      props: {
        page: page,
        totalCount: coupons.meta.totalCount,
        pageCount: coupons.meta.pageCount,
        currentPage: coupons.meta.currentPage,
        perPage: coupons.meta.perPage,
        coupons: coupons.result,
      },
    };
  } catch (error) {
    return {
      props: { error: { ...error } },
    };
  }
}

export default Coupon;
