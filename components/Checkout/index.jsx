import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './checkout.module.scss';

import Image from 'next/image';

import ShopContext from '/context/Order/shop-context';

import ProductCard from '/components/ProductCard';
import PaymentForm from '/components/PaymentForm';
import ImportantNotice from '/components/ImportantNotice';

// Import tracking functions
import { trackFunnelStep, trackCheckoutStarted, trackPageView, getServicesFromOrder } from '/lib/Analytics/gtm';
import { trackSpotifyCheckoutStarted, trackSpotifyFunnelStep } from '/lib/Analytics/spotifyAnalytics';

import loader from '/public/icons/loader.gif';
import ArrowDown from '/public/icons/arrow_down.jsx';
import ArrowNext from '/public/icons/arrow_next.jsx';

import Soundcloud from '/public/icons/soundcloud.jsx';
import Youtube from '/public/icons/youtube.jsx';
import Spotify from '/public/icons/spotify.jsx';

import Tiktok from '/public/icons/tiktok';
import Instagram from '/public/icons/instagram';
import Trustpilot from '../Trustpilot';

const Checkout = () => {
  const router = useRouter();
  const { step } = router.query;
  const context = useContext(ShopContext);
  const CouponField = useRef(null);
  const [loading, setLoading] = useState(false);
  const [CouponActive, ToggleCoupon] = useState(false);
  const [coupon, setCoupon] = useState();
  const [breadcrumb, setBreadcrumb] = useState('personal');
  const [loadCoupon, setLoadCoupon] = useState(false);
  const [couponAnimation, setAnimation] = useState();
  const [couponResult, setCouponResult] = useState();
  const [allMethods, setAllMethods] = useState();
  const [checkUnfinishedCampaign, setCheckUnfinishedCampaign] = useState(false);
  const [unfinishedCampaignsArray, setUnfinishedCampaignsArray] = useState([]);
  useEffect(() => {    // Extract campaign IDs from cart
    const campaignIds = context.order.campaigns
      .flatMap((e) => e.campaigns)
      .map((campaign) => campaign.id);

    // Get all services in the order
    const services = getServicesFromOrder(context.order);

    // Enhanced tracking for checkout steps with service-specific tracking
    if (services.length > 0) {
      const orderData = {
        total: context.order.totalPriceDetails.amount_local_incl_vat,
        currency: context.order.currency.code,
        items: context.order.campaigns.flatMap(service => 
          service.campaigns.map(campaign => ({
            item_id: campaign.id,
            item_name: campaign.campaignObject.track || campaign.campaignObject.name,
            category: service.service,
            price: campaign.totalPrice || 0,
            quantity: 1
          }))
        ),
        orderId: context.order.id
      };

      // Track checkout step for each service with service-specific tracking
      services.forEach(service => {
        if (service === 'spotify') {
          trackSpotifyFunnelStep('checkout', {
            checkout_step: breadcrumb,
          });
        } else {
          trackFunnelStep(4, service, {
            step_name: 'checkout_step',
            checkout_step: breadcrumb,
          });
        }
      });

      // Track checkout started when on personal details step
      if (breadcrumb === 'personal') {
        if (services.includes('spotify')) {
          trackSpotifyCheckoutStarted(orderData);
        } else {
          trackCheckoutStarted(orderData, services);
        }
        trackPageView(window.location.pathname, 'Checkout Started');
      }
    }

    // Existing dataLayer push
    dataLayer.push({
      event: 'checkout_form',
      form_step: breadcrumb,
      content_ids: campaignIds,
      content_type: 'campaign',
      value: context.order.totalPriceDetails.amount_local_incl_vat,
      currency: context.order.currency.code,
    });
  }, [breadcrumb, context.order]);

  useEffect(() => {
    if (checkUnfinishedCampaign == false) {
      const array = [];
      // Commented out the unfinished campaigns check to prevent warning
      // context.order.campaigns.map((e) => {
      //   e.campaigns.map((item, index) => {
      //     let totalValue = 0;
      //     item.campaignObject.campaign.map((campaign) => {
      //       totalValue = totalValue + campaign.value.value;
      //     });

      //     if (totalValue == 0) {
      //       array.push(item);
      //     }
      //   });
      // });

      setCheckUnfinishedCampaign(true);
      setUnfinishedCampaignsArray(array);
    }
  }, [context.order.campaign]);

  useEffect(() => {
    fetch('/api/payments/mollie/getMethods', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billingCountry:
          context.order.customerDetails.country &&
          context.order.customerDetails.country.countryCode,
        value: context.order.totalPriceDetails.amount_local_incl_vat.toString(),
        currency: 'EUR',
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        setAllMethods(data);
      });
  }, [context.order]);

  useEffect(() => {
    if (coupon) {
      setLoadCoupon(true);
      //If statement are to handle the special, hardcoded coupon codes
      if (
        (coupon.length > 0 && coupon === 'UpgradeMySongWith50') ||
        (coupon.length > 0 && coupon === 'RichIsTheBest50')
      ) {
        //Upgrade p[ackages within this statement with a 50% increase of estimated values
        (async () => {
          if (context.order.totalPriceDetails.coupons.length == 0) {
            setCouponResult('Coupon has already been added');
            await context.upgradeEstimates(1.5);
            CouponField.current.value = ' ';
            setAnimation({ scale: [1.25, 1.5, 1.25, 1], color: '#b165ed' });
            setCouponResult('All packages have been upgraded');
          }
        })();
      } else {
        if (
          (coupon.length > 0 && coupon === 'DamonSharpe30') ||
          (coupon.length > 0 && coupon === 'RichYouAreTheBest30')
        ) {
          (async () => {
            if (
              context.order.totalPriceDetails.coupons.length == 0 &&
              context.order.totalPriceDetails.amount_local_excl_vat >= 150
            ) {
              await context.addDiscount({
                result: {
                  name: coupon,
                  discount:
                    context.order.totalPriceDetails.amount_local_excl_vat,
                  amount: '30%',
                  stackable: 1,
                },
              });
              CouponField.current.value = ' ';
              setAnimation({ scale: [1.25, 1.5, 1.25, 1], color: '#b165ed' });
            } else {
              setCouponResult('The order value needs to be above $150.');
            }
          })();
        } else {
          fetch('/api/orders/validateCoupon', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              coupon: coupon,
            }),
          })
            .then((response) => response.json())
            .then(async (data) => {
              data.status == 200
                ? (await context.order.totalPriceDetails.coupons.find(
                    (item) => item.result?.name == coupon
                  ))
                  ? setCouponResult('Coupon has already been added')
                  : //check if added coupon or coupon being added are stackable
                  (await context.order.totalPriceDetails.coupons.find(
                      (item) => item.result?.stackable == 1
                    )) || data.result?.stackable == 1
                  ? (await context.addDiscount(data),
                    (CouponField.current.value = ' '),
                    setAnimation({
                      scale: [1.25, 1.5, 1.25, 1],
                      color: '#b165ed',
                    }))
                  : //if no coupon has been added yet:
                  context.order.totalPriceDetails.coupons.length == 0
                  ? (await context.addDiscount(data),
                    (CouponField.current.value = ' '),
                    setAnimation({
                      scale: [1.25, 1.5, 1.25, 1],
                      color: '#b165ed',
                    }))
                  : setCouponResult('This coupon cannot be stacked')
                : setCouponResult(data.message);
            });
        }
      }
    }
  }, [coupon]);

  const cleanCampaigns = async () => {
    await context.removeUnfinishedCampaigns();
    setCheckUnfinishedCampaign(false);
    setUnfinishedCampaignsArray([]);
  };

  return (
    <>
      <div className={['wrapper', styles.container].join(' ')}>
        {loading ? (
          <div className={styles.processContainer}>
            <Image width={50} height={50} src={loader} alt={''} />
            <span className={styles.processPayment}>Processing payment...</span>
          </div>
        ) : (
          <>
            <div className={styles.content}>
              {/* <ImportantNotice /> */}
              <Trustpilot></Trustpilot>
              <br/><br/>
              <h3>Your Campaigns</h3>
              <section className={styles.cart}>
                <div className={styles.cartContent}>
                  {context.order.totalPriceDetails.amount_local_incl_vat ==
                  0 ? (
                    <div className={styles.emptyCartText}>
                      <span>No campaigns created</span>
                    </div>
                  ) : (
                    context.order.campaigns.map(
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
                              checkout={false}
                              key={index}
                              content={item}
                            />
                          </section>
                        ))
                    )
                  )}
                </div>
                <div className={styles.additionalContent}>
                  <h3>
                    {context.order.totalPriceDetails.amount_local_incl_vat ==
                    0 ? (
                      <>Get started</>
                    ) : (
                      'More Campaigns?'
                    )}
                  </h3>
                  <div className={styles.services}>
                    <div className={styles.SelectorContainer}>
                      <Link
                        passHref={true}
                        href='/campaigns/overview?service=spotify'
                      >
                        <div
                          id={'spotify'}
                          className={[styles.item, styles.item_spotify].join(
                            ' '
                          )}
                        >
                          <Spotify />
                        </div>
                      </Link>

                      <Link
                        passHref={true}
                        href='/campaigns/overview?service=soundcloud'
                      >
                        <div
                          id={'soundcloud'}
                          className={[styles.item, styles.item_soundcloud].join(
                            ' '
                          )}
                        >
                          <Soundcloud />
                        </div>
                      </Link>
                      <Link
                        passHref={true}
                        href='/campaigns/overview?service=youtube'
                      >
                        <div
                          id={'youtube'}
                          className={[styles.item, styles.item_youtube].join(
                            ' '
                          )}
                        >
                          <Youtube />
                        </div>
                      </Link>
                      <Link passHref={true} href='/campaigns/tiktok'>
                        <div
                          id={'tiktok'}
                          className={[styles.item, styles.item_tiktok].join(
                            ' '
                          )}
                        >
                          <Tiktok />
                        </div>
                      </Link>
                    </div>
                    <div
                      className={[
                        styles.SelectorContainer,
                        styles.SelectorContainer__disabled,
                      ].join(' ')}
                    >
                      <div
                        id={'instagram'}
                        className={[styles.item, styles.item_instagram].join(
                          ' '
                        )}
                      >
                        <Instagram />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.checkout}>
                  <div className={styles.totalAmount}>
                    <AnimatePresence>
                      <div className={styles.couponContainer}>
                        <motion.div
                          initial={{ opacity: 0, y: -0 }}
                          exit={{ opacity: 0, y: -0 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={styles.coupon}
                        >
                          <input
                            className={styles.input}
                            id='coupon'
                            name='coupon'
                            type='coupon'
                            ref={CouponField}
                            placeholder={'I have a coupon code'}
                          />
                          <div
                            className={styles.button}
                            onClick={() =>
                              setCoupon(CouponField.current.value.trim())
                            }
                          >
                            <ArrowNext />
                          </div>
                        </motion.div>
                        <div className={styles.euroNotice}>
                          <span>{couponResult}</span>
                        </div>
                        {context.order.totalPriceDetails.coupons.length !=
                          0 && (
                          <>
                            <div className={styles.couponContainer}>
                              {context.order.totalPriceDetails.coupons.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    className={styles.couponItem}
                                  >
                                    <div className={styles.info}>
                                      <span className={styles.couponInfo}>
                                        {item.result.name} ({item.result.amount}{' '}
                                        Discount)
                                      </span>
                                      <span className={styles.discount}>
                                        {'- ' +
                                          item.result.discount +
                                          ' ' +
                                          context.order.currency.code}
                                      </span>
                                    </div>

                                    <span
                                      onClick={() =>
                                        context.removeDiscount(item.result.name)
                                      }
                                      className={styles.removeCoupon}
                                    >
                                      Remove
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      {context.order.customerDetails.company == true &&
                        context.order.customerDetails.company_details
                          .validated == true && (
                          <div>
                            <span className={styles.vatLabel}>
                              Total (incl. VAT)
                            </span>

                            <span className={styles.vat}>
                              {context.order.totalPriceDetails
                                .amount_local_excl_vat *
                                1.21 +
                                ' ' +
                                context.order.currency.code}
                            </span>
                          </div>
                        )}

                      {(context.order.customerDetails.country &&
                        context.order.customerDetails.country.eu) == true && (
                        <div>
                          <span className={styles.vatLabel}>
                            {context.order.totalPriceDetails.VAT != 1
                              ? '21% VAT'
                              : '21% VAT Shifted'}
                          </span>

                          <span className={styles.vat}>
                            {context.order.totalPriceDetails.VAT != 1
                              ? ' ' +
                                (
                                  context.order.totalPriceDetails
                                    .amount_local_incl_vat -
                                  context.order.totalPriceDetails
                                    .amount_local_excl_vat
                                ).toFixed(2) +
                                ' ' +
                                context.order.currency.code
                              : '-' +
                                (
                                  (context.order.totalPriceDetails
                                    .amount_local_incl_vat /
                                    100) *
                                  21
                                ).toFixed(2) +
                                ' ' +
                                context.order.currency.code}
                          </span>
                        </div>
                      )}

                      {context.order.totalPriceDetails.discountInUSD != 0 ? (
                        <>
                          <div className={styles.totalDiscount}>
                            <span>{`Your`} discount 💸</span>
                            <span
                              style={{
                                color: '#B165ED',
                                textDecoration: 'underline',
                              }}
                            >
                              -{' '}
                              {Math.round(
                                context.order.totalPriceDetails.discountInUSD
                              ) +
                                ' ' +
                                context.order.currency.code}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontWeight: 'normal' }}>
                              {context.order.totalPriceDetails &&
                              context.order.totalPriceDetails.VAT == 1.21
                                ? 'Total (incl. VAT):'
                                : 'Total (excl. VAT)'}
                            </span>
                            <span style={{ fontWeight: 'normal' }}>
                              {Math.round(
                                context.order.totalPriceDetails
                                  .amount_local_incl_vat
                              ) +
                                ' ' +
                                context.order.currency.code}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* <div className={styles.totalDiscount}>
                            <span>Needed For Discount 🤏</span>
                            <span style={{ textDecoration: 'underline' }}>
                              {Math.round(
                                150 -
                                  context.order.totalPriceDetails
                                    .amount_local_incl_vat
                              ) +
                                ' ' +
                                context.order.currency.code}
                            </span>
                          </div> */}
                          <div>
                            <span style={{ fontWeight: 'normal' }}>
                              {context.order.totalPriceDetails &&
                              context.order.totalPriceDetails.VAT == 1.21
                                ? 'Total (incl. VAT):'
                                : 'Total (excl. VAT)'}
                            </span>
                            <motion.span
                              animate={couponAnimation}
                              transition={{ duration: 0.5 }}
                              style={{ fontWeight: 'normal' }}
                            >
                              {Math.round(
                                context.order.totalPriceDetails
                                  .amount_local_incl_vat * 100
                              ) /
                                100 +
                                ' ' +
                                context.order.currency.code}
                            </motion.span>
                          </div>
                        </>
                      )}

                      {context.order.currency.code != 'EUR' && (
                        <div className={styles.euroNotice}>
                          <span>Payment will be made in EUR</span>

                          <motion.span
                            animate={couponAnimation}
                            transition={{ duration: 0.5 }}
                          >
                            {Math.round(
                              context.order.totalPriceDetails
                                .amount_EUR_incl_vat
                            ) +
                              ' ' +
                              'EUR'}
                          </motion.span>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </section>
            </div>

            <div className={styles.paymentForm}>
              {context.order.totalPriceDetails.amount_local_incl_vat == 0 && (
                <div className={styles.overlay}>
                  <p>
                    Check-out unavailable.
                    <br />
                    <Link
                      href='/landingspage-spotify-youtube-soundcloud'
                      passHref={true}
                    >
                      <span>
                        <b>Start building a campaign</b>
                      </span>
                    </Link>{' '}
                    to continue.
                  </p>
                </div>
              )}
              <div className={styles.breadcrumb}>
                <label>
                  <span
                    className={breadcrumb == 'personal' && styles.active}
                    //onClick={() => setBreadcrumb('personal')}
                  >
                    Introduce yourself
                  </span>{' '}
                  /{' '}
                  <span
                    className={breadcrumb == 'billing' && styles.active}
                    //onClick={() => setBreadcrumb('billing')}
                  >
                    Address information
                  </span>{' '}
                  /{' '}
                  <span
                    className={breadcrumb == 'payment' && styles.active}
                    //onClick={() => setBreadcrumb('payment')}
                  >
                    Payment methods
                  </span>
                </label>
              </div>
              <h2>
                {breadcrumb == 'personal'
                  ? 'Checkout: Introduce yourself'
                  : breadcrumb == 'billing'
                  ? 'Checkout: Address information'
                  : 'How would you like to pay?'}
              </h2>

              {breadcrumb == 'payment' && (
                <span className={styles.extraCostsNotice}>
                  Depending on your payment option, additional (exchange) costs
                  may apply
                </span>
              )}

              <PaymentForm
                breadcrumb={breadcrumb}
                setBreadcrumb={setBreadcrumb}
                setLoading={setLoading}
                methods={allMethods}
              />
            </div>
          </>
        )}
      </div>
      {unfinishedCampaignsArray.length != 0 && (
        <div className={styles.unfinishedCampaignsContainer}>
          <div className={styles.content}>
            <h3>Unfinished Campaigns</h3>
            <p className={styles.warning}>
              <span>Warning:</span> Your following campaigns have no targets.
              Start building to prevent the loss of these campaigns
            </p>
            <section className={styles.cart}>
              {unfinishedCampaignsArray.map((item, index) => (
                <section
                  key={index}
                  className={[
                    styles.serviceSection,
                    item.service == 'spotify'
                      ? styles.serviceSection_spotify
                      : item.service == 'youtube'
                      ? styles.serviceSection_youtube
                      : item.service == 'tiktok'
                      ? styles.serviceSection_tiktok
                      : item.service == 'soundcloud' &&
                        styles.serviceSection_soundcloud,
                  ].join(' ')}
                >
                  <span className={styles.serviceSection__title}>
                    {item.service}
                  </span>
                  <ProductCard
                    service={item.service}
                    checkout={false}
                    key={index}
                    content={item}
                  />
                </section>
              ))}
            </section>
            <div className={styles.buttonContainer}>
              <Link
                passHref={true}
                href={{
                  pathname: '/campaigns/overview',
                  query: {
                    service: unfinishedCampaignsArray[0].service,
                    id: unfinishedCampaignsArray[0].id,
                    unfinishedCampaigns: true,
                  },
                }}
              >
                <button>Continue Building</button>
              </Link>

              <span onClick={() => cleanCampaigns()}>
                Remove Campaign & Proceed
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;