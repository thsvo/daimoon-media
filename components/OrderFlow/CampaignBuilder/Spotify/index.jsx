import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import TrustpilotMini from '/components/Trustpilot/TrustpilotMini';

import TikTokBuilder from '/components/OrderFlow/CampaignBuilder/Tiktok';
import YoutubeBuilder from '/components/OrderFlow/CampaignBuilder/Youtube';

import Graph from '/components/Graph';
import WorldMap from '/components/WorldMap';

import ShopContext from '/context/Order/shop-context';
import Image from 'next/image';

import CampaignSlider from '/components/OrderFlow/CampaignBuilder/Slider';
import CampaignCheckbox from '/components/OrderFlow/CampaignBuilder/Checkbox';

// Import tracking functions
import { trackFunnelStep, trackCampaignSelected, trackPageView } from '/lib/Analytics/gtm';
import { trackSpotifyCampaignSelected, trackSpotifyFunnelStep } from '/lib/Analytics/spotifyAnalytics';

import ArrowBack from '/public/icons/arrow_back';
import ArrowDown from '/public/icons/arrow_down';
import Pencil from '/public/icons/pencil';
import Tick from '/public/icons/tick';

import { Visa, MasterCard, AmericanExpress } from '/public/icons/creditcards';

import styles from './builder.module.scss';
import builder from './builderitem.module.scss';

import json from '/json/OrderForm/form.json';
import Genres from '/json/Genres/genres';

const CampaignBuilderItem = (props) => {
  const {
    item,
    activeService,
    data,
    setData,
    itemIndex,
    items,
    fields,
    labels,
    color,
    setActive,
    active,
    checkOut,
    unfinishedcampaigns,
    toggleBuilder,
    setcrossSell,
    paymentMethods,
  } = props;
  const context = useContext(ShopContext);
  const campaign = item?.campaignObject;
  const [price, setPrice] = useState(0);
  const router = useRouter();
  const { service } = router.query;
  const [validValues, setValidValues] = useState(false);
  const [region, setRegion] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [genre, setGenre] = useState({
    main: campaign.genre && campaign.genre.main,
    sub: campaign.genre && campaign.genre.sub,
    artist: campaign.genre && campaign.genre.artist,
  });
  // Helper functions for tracking
  const getEstimatedStreams = (product) => {
    // Extract estimated streams from product data
    if (product?.estimatedStreams) return product.estimatedStreams;
    if (product?.description) {
      const match = product.description.match(/(\d+[\d,]*)\s*streams?/i);
      return match ? match[1] : '';
    }
    return '';
  };

  const getSelectedFeatures = (product) => {
    // Extract features from product data
    const features = [];
    if (product?.features) return product.features;
    if (product?.name) features.push(product.name);
    return features;
  };
  const saveCampaign = (length, product, skipToggle = false) => {
    // Track campaign selection with service-specific tracking
    const campaignData = {
      type: product?.name || 'Unknown Campaign',
      price: price || 0,
      estimatedStreams: getEstimatedStreams(product),
      features: getSelectedFeatures(product),
      currency: 'USD'
    };
    
    if (activeService === 'spotify') {
      trackSpotifyCampaignSelected(campaignData);
    } else {
      trackCampaignSelected(campaignData, activeService);
    }

    data.map((item) => {
      item.itemIndex == active && context.editCampaign(product, item.values);
    });

    if (length == active && !skipToggle) {
      toggleBuilder({ toggle: false, index: 0 });
    } else if (length != active) {
      setActive(active + 1);
    }
  };  // Track when campaign builder loads (Step 3)
  useEffect(() => {
    if (activeService && typeof window !== 'undefined') {
      trackFunnelStep(3, activeService, {
        step_name: 'campaign_builder_loaded',
      });
      
      trackPageView(window.location.pathname, `${activeService} - Campaign Builder`);
    }
  }, [activeService]);

  //UseEffect to update Dataset
  useEffect(() => {
    if (data.length == 0) {
      let array = [];
      items.map((track, index) => {
        let defaultValues = {
          itemIndex: index,
          values: [],
        };

        if (track.campaignObject.campaign != 0) {
          defaultValues.values = track.campaignObject.campaign;
        } else {
          const builderFields = json.find((o) => o.service == activeService);

          builderFields.fields.map((item) => {
            const value = item.values.find((e) => e.default === true);

            if (value) {
              defaultValues.values = [
                ...defaultValues.values,
                {
                  label: item.name,
                  index: value.value,
                  value: {
                    value: value.obj.value,
                    streams: value.obj.streams,
                    text: value.obj.text,
                    min_streams: value.obj.min_streams,
                    max_streams: value.obj.max_streams,
                    min_followers: value.obj.min_followers,
                    max_followers: value.obj.max_followers,
                    playlists: value.obj.playlists,
                    cost: value.obj.cost,

                    baseCostExcl: value.obj.cost,
                    budget: value.obj.budget,
                  },
                },
              ];
            }
          });
        }

        array = [...array, defaultValues];
      });

      setData([...array]);
    }
  });

  //SETTING PREVIOUS SELECTED REGIONS
  useEffect(() => {
    if (
      region &&
      activeService == 'youtube' &&
      campaign?.campaign[0]?.value.targets
    ) {
      const targets = campaign.campaign[0].value.targets.map((item) => {
        return item.index;
      });
      setRegion(targets);
    }
  }, [itemIndex]);

  useEffect(() => {
    let cost = 0;

    if (data.find((o) => o.itemIndex == itemIndex)) {
      data
        .find((o) => o.itemIndex == itemIndex)
        .values.map((item) => {
          cost = cost + item.value.cost;
        });
    }

    //Check if slidervalues are not 0
    setValidValues(false);
    data[itemIndex] &&
      data[itemIndex].values.find(
        (slider) => slider.value.value != 0 && setValidValues(true)
      );

    setPrice(Math.round(cost * 100) / 100);
  }, [data]);

  const updateGenre = (main = null, sub = null) => {
    if (main != null) {
      setGenre({ ...genre, main: main });
    }
    if (sub != null) {
      setGenre({ ...genre, sub: sub });
    }
  };

  useEffect(() => {
    item.campaignObject.genre = { ...genre };
  }, [genre]);

  return (
    <div className={builder.container}>
      <div className={builder.content}>
        {service ? (
          <h6 className={builder.title}>Choose a Campaign</h6>
        ) : (
          <h6 className={builder.title}>
            Step 2: <br />
            Choose a Campaign
          </h6>
        )}
        
        {/* Mobile Builder Photo and Song Info */}
        {width <= 768 ? (
          <div className={styles.mobileBuilderPhotoContainer}>
            <div className={styles.mobileBuilderPhoto}>
              <div className={[styles.image, styles.spotify].join(' ')}>
                <Image
                  alt={''}
                  src={campaign.image}
                  objectFit='contain'
                  fill
                />
              </div>
            </div>
            <span className={[builder.subtext, builder.spotify].join(' ')}>
              Song: <br/>{campaign.track}
            </span>
          </div>
        ) : (
          <span className={[builder.subtext, builder.spotify].join(' ')}>
            Song: {campaign.track}
          </span>
        )}
        
        {data[itemIndex] && (
          <>
            {width <= 768 && (
              <div className={builder.MobilePackageResults}>
                <Graph
                  sliderValues={data[itemIndex]}
                  activeService={activeService}
                  graphInfo={labels}
                  mobile={true}
                />
              </div>
            )}
          </>
        )}
        <div className={builder.sliders}>
          <div>
            {fields &&
              fields.map((item, index) =>
                item.type == 'slider' ? (
                  <CampaignSlider
                    items={items}
                    explanation={item.explanation}
                    previousValues={campaign.campaign}
                    service={activeService}
                    setData={setData}
                    data={data}
                    values={item.values}
                    fields={fields}
                    key={index}
                    itemIndex={itemIndex}
                    label={item.name}
                    endValue={item.values[item.values.length - 1].value}
                  />
                ) : (
                  item.type == 'list' && (
                    <CampaignCheckbox
                      previousValues={campaign.campaign}
                      explanation={item.explanation}
                      values={item.values}
                      setData={setData}
                      data={data}
                      service={activeService}
                      itemIndex={itemIndex}
                      label={item.name}
                      setRegion={setRegion}
                      region={region}
                    />
                  )
                )
              )}
          </div>
        </div>

        {data[itemIndex] && (
          <>
            <ul className={builder.benefitsContainer}>
              <li
                className={
                  data[itemIndex].values[0].index >= 0 && builder.active
                }
              >
                <Tick />
                Increase in streams
              </li>
              <li
                className={
                  data[itemIndex].values[0].index >= 1 && builder.active
                }
              >
                <Tick />
                Exponential Growth
              </li>
              <li
                className={
                  data[itemIndex].values[0].index >= 2 && builder.active
                }
              >
                <Tick />
                Multiple playlists guaranteed
              </li>
              <li
                className={
                  data[itemIndex].values[0].index >= 3 && builder.active
                }
              >
                <Tick />
                100,000+ Follower Audience
              </li>
              <li
                className={
                  data[itemIndex].values[0].index >= 4 && builder.active
                }
              >
                <Tick />
                Grow to (at least) 45,000 monthly listeners
              </li>
            </ul>
          </>
        )}

        <div className={builder.price}>
          <span>{'Total (excl. VAT)'}</span>
          <span>
            {Math.round(price * 100) / 100 + ' ' + context.order.currency.code}
          </span>
        </div>

        {/* {Genres && (
          <div className={builder.genreContainer}>
            <div className={builder.genres}>
              <div className={builder.genreField}>
                <select
                  className={builder.genre}
                  onChange={(e) => updateGenre(e.target.value, null)}
                  name='genres'
                >
                  {Genres.map((i, index) => (
                    <option
                      key={index}
                      value={i.main}
                      selected={i.main === genre.main && true}
                    >
                      {i.main}
                    </option>
                  ))}
                </select>
                <ArrowDown />
              </div>
              <div className={builder.genreField}>
                {genre.artist.length != 0 ? (
                  <>
                    <select
                      className={builder.genre}
                      onChange={(e) => updateGenre(null, e.target.value)}
                      name='Subgenre'
                    >
                      {genre.artist.map((i, index) => (
                        <option
                          key={index}
                          value={i}
                          selected={i === genre.sub && true}
                        >
                          {i}
                        </option>
                      ))}
                    </select>
                    <ArrowDown />
                  </>
                ) : (
                  <>
                    <input
                      className={builder.genre}
                      onChange={(e) => updateGenre(null, e.target.value)}
                      name='Subgenre'
                    ></input>
                    <Pencil />
                  </>
                )}
              </div>
            </div>
          </div>
        )} */}
      </div>
      <div>
        {width > 768 && (
          <Graph
            sliderValues={data[itemIndex]}
            activeService={activeService}
            graphInfo={labels}
          />
        )}

        <div className={styles.builderFooterContainer}>
          <div className={styles.container}>
            <div className={styles.buttons}>
              {validValues == true ? (
                <>
                  <button
                    style={{ borderColor: color }}
                    className={styles.back}
                    onClick={
                      active == 0
                        ? () => toggleBuilder({ toggle: false, index: 0 })
                        : () => setActive(active - 1)
                    }
                  >
                    <ArrowBack color={color} />
                  </button>
                  <div>
                    {checkOut == true && unfinishedcampaigns == 'false' ? (
                      <button
                        style={{ backgroundColor: color }}
                        onClick={() => (
                          saveCampaign(items.length - 1, items[active], true),
                          router.push('/campaigns/checkout')
                        )}
                        className={styles.next}
                        disabled={
                          !genre.main ? true : genre.main == 'invalid' && true
                        }
                      >
                        {'Back to checkout'}
                      </button>
                    ) : items.length - 1 == active ? (
                      <button
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          saveCampaign(items.length - 1, items[active], true);
                          router.push('/campaigns/checkout');
                        }}
                        className={styles.next}
                        disabled={
                          !genre.main ? true : genre.main == 'invalid' && true
                        }
                      >
                        {'Save & continue'}
                      </button>
                    ) : (
                      <button
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          saveCampaign(items.length - 1, items[active])
                        }
                        className={styles.next}
                        disabled={!genre.main && true}
                      >
                        Next Song
                      </button>
                    )}

                    {active != 0 && (
                      <span
                        onClick={() => (
                          toggleBuilder({ toggle: false, index: 0 }),
                          saveCampaign(items.length - 1, items[active])
                        )}
                        className={styles.cancel}
                      >
                        Back to song overview
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    style={{ borderColor: color }}
                    className={styles.back}
                    onClick={
                      active == 0
                        ? () => toggleBuilder({ toggle: false, index: 0 })
                        : () => setActive(active - 1)
                    }
                  >
                    <ArrowBack color={color} />
                  </button>
                  <div>
                    <button
                      style={{ backgroundColor: color }}
                      className={styles.next}
                      type='button'
                      disabled
                    >
                      Please, select valid values
                    </button>

                    <span
                      onClick={() => (
                        toggleBuilder({ toggle: false, index: 0 }),
                        saveCampaign(items.length - 1, items[active])
                      )}
                      className={styles.cancel}
                    >
                      Back to song overview
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className={styles.paymentContainer}>
              <span>We accept:</span>
              <div className={styles.paymentList}>
                {paymentMethods &&
                  paymentMethods.map((method, index) => {
                    if (
                      method.id == 'ideal' ||
                      method.id == 'paypal' ||
                      method.id == 'applepay'
                    ) {
                      return (
                        <Image
                          key={index}
                          alt={method.description}
                          width='40'
                          height='30'
                          src={method.image.svg}
                        />
                      );
                    }
                  })}
                <div
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    height: '30px',
                  }}
                >
                  <Visa />
                </div>
                <div
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    height: '30px',
                    width: '40px',
                  }}
                >
                  <MasterCard />
                </div>
                <div
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    height: '30px',
                    width: '40px',
                  }}
                >
                  <AmericanExpress />
                </div>
              </div>
            </div>
            
            {/* Mobile: Continue button below payment methods */}
            {width <= 768 && (
              <>
                <div className={styles.mobileButtonContainer}>
                  {validValues == true ? (
                    <>
                      {checkOut == true &&
                      unfinishedcampaigns == 'false' ? (
                        <button
                          style={{ backgroundColor: color }}
                          onClick={() => (
                            saveCampaign(
                              items.length - 1,
                              items[active],
                              true
                            ),
                            router.push('/campaigns/checkout')
                          )}
                          className={styles.mobileContinueButton}
                          disabled={
                            !genre.main
                              ? true
                              : genre.main == 'invalid' && true
                          }
                        >
                          {'Back to checkout'}
                        </button>
                      ) : items.length - 1 == active ? (
                        <button
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            saveCampaign(
                              items.length - 1,
                              items[active],
                              true
                            );
                            router.push('/campaigns/checkout');
                          }}
                          className={styles.mobileContinueButton}
                          disabled={
                            !genre.main
                              ? true
                              : genre.main == 'invalid' && true
                          }
                        >
                          {'Save & continue'}
                        </button>
                      ) : (
                        <button
                          style={{ backgroundColor: color }}
                          onClick={() =>
                            saveCampaign(items.length - 1, items[active])
                          }
                          className={styles.mobileContinueButton}
                          disabled={!genre.main && true}
                        >
                          Next Song
                        </button>
                      )}

                      {active != 0 && (
                        <span
                          onClick={() => (
                            toggleBuilder({ toggle: false, index: 0 }),
                            saveCampaign(items.length - 1, items[active])
                          )}
                          className={styles.cancel}
                        >
                          Back to song overview
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        style={{ backgroundColor: color }}
                        className={styles.mobileContinueButton}
                        type='button'
                        disabled
                      >
                        Please, select valid values
                      </button>

                      <span
                        onClick={() => (
                          toggleBuilder({ toggle: false, index: 0 }),
                          saveCampaign(items.length - 1, items[active])
                        )}
                        className={styles.cancel}
                      >
                        Back to song overview
                      </span>
                    </>
                  )}
                </div>
                <div style={{ marginTop: '20px' }}>
                  <TrustpilotMini />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SpotifyBuilder = ({
  activeService,
  toggleBuilder,
  setcrossSell,
  startIndex,
  checkOut,
  unfinishedcampaigns,
}) => {
  const [active, setActive] = useState(startIndex);
  const [fields, setFields] = useState([]);
  const [labels, setLabels] = useState([]);
  const [methods, setAllMethods] = useState([]);

  const [data, setData] = useState([]);
  const context = useContext(ShopContext);
  const router = useRouter();

  useEffect(() => {
    json.map((o, index) => {
      if (o.service == activeService) {
        setFields(o.fields);
        setLabels(o.labels);
      }
    });
  });

  useEffect(() => {
    methods.length == 0 &&
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
          value: '500.00',
          currency: 'EUR',
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          setAllMethods(data);
        });
  });

  const results = () => {
    const serviceItems = [];
    context.order.campaigns &&
      context.order.campaigns
        .filter((e) => e.service === activeService)
        .map((e) => e.campaigns)
        .reduce((prev, current) => prev.concat(current), [])
        .map((item, index) => serviceItems.push(item));

    return serviceItems;
  };

  const items = results();

  const color = '#1ed760';

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <motion.div
      key={'builder'}
      variants={variants} // Pass the variant object into Framer Motion
      initial='hidden' // Set the initial state to variants.hidden
      animate='enter' // Animated state to variants.enter
      exit='exit' // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
      className={styles.container}
    >
      {context.order.campaigns && (
        <>
          <>
            <div className={styles.pictures}>
              {items.map((item, index) => (
                <>
                  <div
                    key={index}
                    className={[
                      styles.image,
                      styles.spotify,
                      active == index && styles.image_active,
                    ].join(' ')}
                  >
                    <Image
                      alt={''}
                      src={item.campaignObject.image}
                      objectFit='contain'
                      fill
                    />
                  </div>
                </>
              ))}
            </div>

            <CampaignBuilderItem
              key={active}
              active={active}
              setActive={setActive}
              items={items}
              itemIndex={active}
              item={items[active]}
              activeService={activeService}
              data={data}
              setData={setData}
              fields={fields}
              labels={labels}
              color={color}
              checkOut={checkOut}
              unfinishedcampaigns={unfinishedcampaigns}
              toggleBuilder={toggleBuilder}
              setcrossSell={setcrossSell}
              paymentMethods={methods}
            />
          </>
        </>
      )}
    </motion.div>
  );
};

export default SpotifyBuilder;
