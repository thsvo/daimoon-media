//Core
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import Script from 'next/script';
//Helpers

//Library
import ShopContext from '/context/Order/shop-context';

import Layout from '/components/Layout';
import Thankyou from '/components/Thankyou';
import Error from '/components/ErrorInPayment';

// Import tracking functions
import { trackPurchaseCompleted, trackFunnelStep, trackPageView, getServicesFromOrder, trackPurchaseWithCustomerDetails } from '/lib/Analytics/gtm';

import fireworkAnimation from '/public/animations/fireworks.json';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('react-lottie-player'), { 
  ssr: false,
  loading: () => <div>Loading animation...</div>
});

const ThankYou = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();
  const [failed, setFailed] = useState(false);
  const [firework, setFirework] = useState(false);
  const context = useContext(ShopContext);
  
  useEffect(() => {
    // Only run on client side when window is available and id is present
    if (typeof window !== 'undefined' && id && !data) {
      try {
        console.log('Raw ID from URL:', id);
        
        // Determine if the ID is base64 encoded or plain
        let decryptedId;
        try {
          // Try to decode as base64 first
          const decoded = window.atob(id);
          if (decoded.startsWith('#')) {
            decryptedId = decoded.replace('#', '');
            console.log('Decoded base64 ID:', decryptedId);
          } else {
            // If decoded doesn't start with #, treat original ID as plain
            decryptedId = id.replace('#', '');
            console.log('Using plain ID:', decryptedId);
          }
        } catch (decodeError) {
          console.log('Base64 decode failed, using ID as-is:', decodeError);
          // If base64 decode fails, use the ID as-is
          decryptedId = id.replace('#', '');
          console.log('Using ID as-is:', decryptedId);
        }

        // Validate that decryptedId is a number
        if (!/^\d+$/.test(decryptedId)) {
          console.error('Invalid order ID format:', decryptedId);
          setFailed(true);
          return;
        }

        fetch('/api/orders/getOrderById/' + decryptedId, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then(async (res) => {
            console.log('API Response:', res);
            // Check if the order status is paid
            if (res.status == 'paid') {
              // Parse the body if it's a string (from database)
              let body;
              try {
                body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
              } catch (e) {
                console.error('Error parsing body:', e);
                body = res.body || res;
              }

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
                    tax: parseFloat(body.totalPriceDetails?.vat_amount || 0),
                    shipping: 0, // Add shipping if available in your data
                    items: body.campaigns.flatMap(service => 
                      service.campaigns.map(campaign => ({
                        item_id: campaign.id,
                        item_name: campaign.campaignObject?.track || campaign.campaignObject?.name || '',
                        category: service.service,
                        price: parseFloat(campaign.totalPrice || 0),
                        quantity: 1
                      }))
                    ),
                    paymentMethod: body.paymentMethod || body.method || 'unknown'
                  };

                  // Get customer details from the order
                  const customerDetails = {
                    email: body.customerDetails?.updatedDetails?.email || '',
                    phone: body.customerDetails?.updatedDetails?.phone || '',
                    first_name: body.customerDetails?.updatedDetails?.fname || '',
                    last_name: body.customerDetails?.updatedDetails?.lname || '',
                    address: body.customerDetails?.updatedDetails?.address || '',
                    country: body.customerDetails?.updatedDetails?.country || '',
                    city: body.customerDetails?.updatedDetails?.city || '',
                    postal_code: body.customerDetails?.updatedDetails?.postal_code || '',
                    date_of_birth: body.customerDetails?.updatedDetails?.date_of_birth || ''
                  };

                  // Track purchase with enhanced customer details
                  trackPurchaseWithCustomerDetails(orderData, customerDetails, services);

                  // Keep the original tracking for backwards compatibility
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
          })
          .catch((error) => {
            console.error('Error fetching order:', error);
            setFailed(true);
          });
      } catch (error) {
        console.error('Error decrypting ID:', error);
        setFailed(true);
      }
    }
  }, [id, data]); // Added dependencies

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
