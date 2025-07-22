//Core
import React, { useEffect } from 'react';

import Layout from '/components/Layout';
import Checkout from '/components/Checkout';

const CheckoutPage = () => {
  useEffect(() => {
    let titleInterval;

    function handleVisibilityChange() {
      if (document.hidden) {
        let titles = ['Come back! Almost finished', 'Checkout | DaimoonMedia'];
        let currentTitleIndex = 0;

        titleInterval = setInterval(() => {
          document.title = titles[currentTitleIndex];
          currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        }, 2000);
      } else {
        clearInterval(titleInterval);
        document.title = 'Checkout | DaimoonMedia';
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function to remove event listener when component is unmounted
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(titleInterval);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <>
      <Layout>
        <Checkout />
      </Layout>
    </>
  );
};

export default CheckoutPage;
