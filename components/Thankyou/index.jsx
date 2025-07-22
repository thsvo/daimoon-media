import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'universal-cookie';

import SocialsContainer from '/components/SocialsContainer';

import ProductCard from '/components/ProductCard';
import DaimoonHead from '/public/images/daimoon-head.png';
import spotlight from '/public/Spotlights/spotlight-5.png';
import { generateInvoice } from '/lib/Invoice';

// Import tracking functions
import { trackSpotifyPurchaseCompleted } from '/lib/Analytics/spotifyAnalytics';
import { trackPurchaseCompleted, getServicesFromOrder } from '/lib/Analytics/gtm';

import Tick from '/public/icons/tick';

import styles from './thankyou.module.scss';

const Thankyou = (props) => {
  const { data, encryptedId } = props;
  const [currency, setCurrency] = useState();
  const [invoice, setInvoice] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    if (data) {
      fetch('/api/affiliates', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          randomString: encryptedId,
          orderObject: data.body,
        }),
      });

      // if (AddShoppersConversion) {
      //   AddShoppersConversion = {
      //     order_id: '{{ecommerce.transaction_id}}', // replace everything inside the quotes with your GTM order id variable
      //     value: '{{ecommerce.value}}', // replace with your GTM variable for order subtotal (tax and shipping not included)
      //     currency: '{{ecommerce.currency}}', // replace with your GTM variable for order currency in USD
      //     email: '{{ecommerce.affiliation}}', // replace with your GTM variable for user email address
      //     offer_code: '{{ecommerce.coupon}}', // replace with your GTM variable for offer code
      //   };
      // }

      if (r) {
        r.addTrans({
          order_id: data.body.order_id,
          shipping: '0',
          tax: '0',
          discount: '0',
          discount_code: '',
          currency_code: 'EUR',
          is_subscription: false,
          subscription_id: '',
        });

        r.addCustomer({
          first_name: data.body.customerDetails.fname,
          last_name: data.body.customerDetails.lname,
          email: data.body.customerDetails.email,
          ip_address: data.body.customerDetails.geoLocation.ip,
        });

        r.addItems({
          sku: 'Total Promotion Value',
          quantity: '1',
          price: data.body.totalPriceDetails.molliePaymentObject.amount.value,
        });

        r.sendConversion();
      }

      //Tapfiliate register Conversion
      cookies.get('tapfilliate_conversion_id') &&
        fetch('/api/tapfilliate/trackConversion', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: data.body.order_id,
            amount: data.body.totalPriceDetails.amount_EUR_incl_vat,
            click_id: cookies.get('tapfilliate_conversion_id'),
          }),
        }).then((response) => {
          response.status == 200 && cookies.remove('tapfilliate_conversion_id');
        });

      const campaigns = [];
      data.body.campaigns.map((service) => {
        service.total > 0 &&
          service.campaigns.map((campaign) => {
            campaign.campaignObject.campaign.map((item) => {
              campaigns.push({
                item_name: item.label == 'Campaign:' ? 'Streams' : item.label,
                item_id: campaign.id,
                price: item.value.costEUR,
                item_brand: campaign.service,
                item_category:
                  item.label == 'Campaign:' ? 'Package' : item.label,
                quantity:
                  item.label == 'Reach Target'
                    ? item.value.value
                    : item.value.streams,
              });
            });
          });
      });

      cookies.get('orderId') &&
        dataLayer.push({
          event: 'purchase',
          ecommerce: {
            currency: 'EUR',
            value: data.body.totalPriceDetails.amount_EUR_incl_vat,
            tax: 0,
            shipping: 0,
            affiliation: 'DaimoonMedia',
            transaction_id: data.body.order_id,
            coupon:
              data.body.totalPriceDetails.coupons[0] &&
              data.body.totalPriceDetails.coupons[0].result.name,
            items: campaigns,
          },
        });

      // Track purchase completion with service-specific tracking
      const services = getServicesFromOrder(data.body);
      const purchaseData = {
        transactionId: data.body.order_id,
        total: data.body.totalPriceDetails.amount_EUR_incl_vat,
        currency: 'EUR',
        items: campaigns,
        paymentMethod: data.body.molliePaymentObject?.method || 'unknown'
      };

      if (services.includes('spotify')) {
        trackSpotifyPurchaseCompleted(purchaseData);
      } else {
        trackPurchaseCompleted(purchaseData, services);
      }

      cookies.remove('orderId', { path: '/' });

      setCurrency(data.body.currency.code);
    }
  }, [data]);

  const downloadInvoice = async (data) => {
    await generateInvoice(data);
    setInvoice(true);
  };

  return (
    <>
      {data && (
        <>
          <div className={styles.container}>
            <div className={styles.spotlightContainer}>
              <Image
                width={700}
                height={700}
                src={spotlight}
                alt={'spotlight'}
              />
            </div>

            <div className={styles.heroText}>
              <h3>Congratulations on your campaign!</h3>
              <p>
                We’re getting started right away. Within 3 days, you’ll start
                receiving campaign updates via email and your personal dashboard
                will be updated at all times. While we kick off your campaign,
                be sure to benefit your special opportunities listed below!
              </p>
              <span className={styles.labelText}>
                Reminder: Check <b>{data.contact_email}</b> to ensure you’re
                receiving our updates.
              </span>
            </div>
            <div className={styles.steps}>
              <div className={styles.item}>
                <div className={styles.fulfilled}>
                  <Tick />
                </div>
                <span className={styles.item_text}>
                  Received your <br /> campaign(s)
                </span>
              </div>
              <div className={styles.item}>
                <div className={styles.partially}></div>
                <span className={styles.item_text}>
                  Listening & taking <br /> first steps
                </span>
              </div>
              <div className={styles.item}>
                <div className={styles.next}></div>
                <span className={styles.item_text}>
                  Experience your <br /> music growth
                </span>
              </div>
            </div>
            <div className={styles.mainBody}>
              <div className={styles.cart}>
                <div className={styles.cartHeading}>
                  <h4>Your order</h4>
                  <span>#{data.order_id}</span>
                </div>
                <div className={styles.cartBody}>
                  {data.body.campaigns.map(
                    (e) =>
                      e.campaigns != 0 &&
                      e.campaigns.map((item, index) => (
                        <section
                          key={index}
                          className={[
                            styles.serviceSection,
                            e.service == 'spotify'
                              ? styles.serviceSection_spotify
                              : e.service == 'youtube'
                              ? styles.serviceSection_youtube
                              : e.service == 'tiktok'
                              ? styles.serviceSection_tiktok
                              : e.service == 'soundcloud' &&
                                styles.serviceSection_soundcloud,
                          ].join(' ')}
                        >
                          <span className={styles.serviceSection__title}>
                            {e.service}
                          </span>
                          <ProductCard
                            service={e.service}
                            checkout={true}
                            key={index}
                            content={item}
                          />
                        </section>
                      ))
                  )}
                </div>
                <div className={styles.cartTotal}>
                  {data.body.totalPriceDetails.coupons.length != 0 && (
                    <div className={styles.discount}>
                      <span>Discount</span>
                      {data.body.totalPriceDetails.coupons.map(
                        (code, index) => (
                          <div key={index} className={styles.couponContainer}>
                            <span>{code.result.name}</span>
                            <span>
                              {code.result.discount + ' ' + currency}{' '}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {data.body.totalPriceDetails.discountInUSD != 0 && (
                    <div className={styles.total}>
                      <span>{`Your`} discount 💸</span>
                      <span>
                        -{' '}
                        {data.body.totalPriceDetails.discountInUSD +
                          ' ' +
                          currency}
                      </span>
                    </div>
                  )}

                  <div className={styles.total}>
                    <span>Total investment</span>
                    <span>
                      {data.body.totalPriceDetails.amount_local_incl_vat +
                        ' ' +
                        currency}
                    </span>
                  </div>
                  <div className={styles.taxes}>
                    <span>VAT</span>
                    <span>
                      {(
                        data.body.totalPriceDetails.amount_local_incl_vat -
                        data.body.totalPriceDetails.amount_local_incl_vat /
                          data.body.totalPriceDetails.VAT
                      ).toFixed(2) +
                        ' ' +
                        currency}
                    </span>
                  </div>
                </div>
                {invoice == false ? (
                  <div
                    onClick={() => downloadInvoice(data.body)}
                    className={styles.invoice}
                  >
                    Download invoice
                  </div>
                ) : (
                  <div className={styles.invoice}>
                    Invoice created! Download will start shortly.
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <h4>Earn back your money 💵</h4>
                  <p>
                    Refer a friend and earn up to 20% of their promotion value,
                    cash. Become an official ambassador by recommending our
                    service.
                  </p>
                  <Link passHref={true} href={'/b2b/affiliates'}>
                    <div className={styles.button}>Get Access</div>
                  </Link>
                </div>
                <div className={styles.infoItem}>
                  <h4>Making the most out of your campaign? 🚀</h4>
                  <p>
                    We’ve prepared some tips and best practices to get the most
                    out of your DaimoonMedia campaign and artist career.
                    Discover the expert articles and get ahead of the game.
                  </p>
                  <Link passHref={true} href={'/blogs'}>
                    <div className={styles.button}>Read More</div>
                  </Link>
                </div>
                <div className={styles.infoItem}>
                  <h4> If you’re truly committed…</h4>
                  <p>
                    Grow fast and stay current via bite-sized expert music
                    marketing and industry knowledge. Subscribe to our Instagram
                    or TikTok and absorb industry secrets on a weekly basis.
                  </p>
                  <SocialsContainer />
                </div>
              </div>
            </div>

            <div className={styles.imageContainer}>
              <Image src={DaimoonHead} alt={'DaimoonHead'} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Thankyou;
