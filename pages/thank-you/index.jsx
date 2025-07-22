//Core
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie-player';
import Script from 'next/script';
//Helpers

//Library
import ShopContext from '/context/Order/shop-context';

import Layout from '/components/Layout';
import Thankyou from '/components/Thankyou';
import Error from '/components/ErrorInPayment';

// Import tracking functions
import { trackPurchaseCompleted, trackFunnelStep, trackPageView, getServicesFromOrder } from '/lib/Analytics/gtm';

import fireworkAnimation from '/public/animations/fireworks.json';

const ThankYou = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();
  const [failed, setFailed] = useState(false);
  const [firework, setFirework] = useState(false);
  const context = useContext(ShopContext);
  useEffect(() => {
    if (!data) {
      const decryptedId = window.atob(id).replace('#', '');

      fetch('/api/orders/getOrderById/' + decryptedId, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then(async (res) => {
          if (res.status == 'paid') {
            const body = res.body;

            setFirework(true);
            setData({ ...res, body: body });
              // Track purchase completion
            if (body && body.campaigns) {
              const services = getServicesFromOrder(body);

              if (services.length > 0) {
                const orderData = {
                  transactionId: decryptedId,
                  total: parseFloat(body.totalPriceDetails?.amount_local_incl_vat || 0),
                  currency: body.currency?.code || 'EUR',
                  items: body.campaigns.flatMap(service => 
                    service.campaigns.map(campaign => ({
                      item_id: campaign.id,
                      item_name: campaign.campaignObject?.track || campaign.campaignObject?.name || '',
                      category: service.service,
                      price: parseFloat(campaign.totalPrice || 0),
                      quantity: 1
                    }))
                  ),
                  paymentMethod: body.paymentMethod || 'unknown'
                };

                // Track purchase completion
                trackPurchaseCompleted(orderData, services);
                
                // Track final funnel step for each service
                services.forEach(service => {
                  trackFunnelStep(5, service, {
                    step_name: 'purchase_completed',
                    transaction_id: decryptedId,
                  });
                });

                trackPageView(window.location.pathname, 'Purchase Complete');
              }
            }
            
            //setFailed(false);
          } else {
            setFailed(true);
          }
        });
    }
  });

  return (
    <div>
      {/* <!-- BOEI: BEGIN --> */}
      <Script
        src='https://app.boei.help/embed/k/841bbf5b-222a-4536-bbbe-2db69638fc80'
        id='boei'
        strategy='afterInteractive'
      ></Script>
      {/* <!-- BOEI: END --> */}

      <Layout>
        {failed == false && (
          <>
            <div className={'wrapper'}>
              <Thankyou data={data} encryptedId={id} />
            </div>
            {firework && (
              <Lottie
                style={{
                  position: 'absolute',
                  backgroundColor: 'black',
                  top: 0,
                  zIndex: 10,
                  width: '100%',
                  height: '100vh',
                  overflow: 'hidden',
                }}
                loop={false}
                animationData={fireworkAnimation}
                onComplete={() => setFirework(false)}
                play
              />
            )}
          </>
        )}
        {failed == true && <Error />}
      </Layout>
    </div>
  );
};

export default ThankYou;
