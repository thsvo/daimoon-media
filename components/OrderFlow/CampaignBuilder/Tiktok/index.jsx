import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import nFormatter from '/lib/Formatter/number';

import ShopContext from '/context/Order/shop-context';
import Image from 'next/image';

import ArrowBack from '/public/icons/arrow_back';
import ArrowDown from '/public/icons/arrow_down';

import { Visa, MasterCard, AmericanExpress } from '/public/icons/creditcards';

import styles from './builder.module.scss';
import builder from './builderitem.module.scss';

import json from '/json/OrderForm/form.json';

const CampaignBuilderItem = (props) => {
  const {
    item,
    activeService,
    data,
    setData,
    itemIndex,
    items,
    fields,
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
  const [validValues, setValidValues] = useState(false);
  const [genre, setGenre] = useState({
    main: 'Alternative',
    sub: 'Alternative',
    artist: 'Alternative',
  });

  const selectCampaign = (index, item) => {
    const trackIndex = data.findIndex((o) => o.itemIndex == itemIndex);

    if (trackIndex == -1) {
      const campaignObject = {
        itemIndex: itemIndex,
        index: index,
        values: [
          {
            label: 'Campaign: ',
            value: { ...item.obj, baseCostExcl: item.obj.cost },
          },
        ],
      };
      setData([...data, campaignObject]);
    } else {
      data[trackIndex].values[0] = {
        label: 'Campaign: ',
        index: index,
        value: { ...item.obj, baseCostExcl: item.obj.cost },
      };
      setData([...data]);
    }
  };

  const saveCampaign = (length, product, skipToggle = false) => {
    data.map((item) => {
      item.itemIndex == active && context.editCampaign(product, item.values);
    });

    if (length == active && !skipToggle) {
      toggleBuilder({ toggle: false, index: 0 });
    } else if (length != active) {
      setActive(active + 1);
    }
  };

  useEffect(() => {
    let cost = 0;

    if (data.find((o) => o.itemIndex == itemIndex)) {
      data
        .find((o) => o.itemIndex == itemIndex)
        .values.map((item) => {
          cost = cost + item.value.cost;
        });
    }

    setPrice(Math.round(cost * 100) / 100);
  }, [data]);

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
  }, [data]);

  useEffect(() => {
    item.campaignObject.genre = { ...genre };
  }, [genre]);

  return (
    <div className={[builder.container, 'items-center'].join(' ')}>
      <div className='flex flex-col w-[85%] justify-center items-center'>
        <div className='text-center w-full'>
          <h3 className={builder.title}>Step 3: Select Your Campaign Plan</h3>
          <span
            className={[
              builder.subtext,
              activeService == 'tiktok' && builder.tiktok,
            ].join(' ')}
          >
            Song: {campaign.track}
          </span>
        </div>
        <div className='flex-col justify-between mt-16 w-full md:flex-row md:flex'>
          {fields[0]?.values?.map((item, index) => (
            <motion.div
              initial={{
                scale: 1,
                borderColor: '#5c5c5c',
                scale: 1,
                boxShadow: '0px 0px 0px 0px #000000',
                zIndex: 0,
              }}
              animate={{
                scale: data[itemIndex].values[0].index === index ? 1.1 : 0.96,
                borderColor:
                  data[itemIndex].values[0].index === index
                    ? '#ff004f'
                    : '#5c5c5c',
                boxShadow:
                  data[itemIndex].values[0].index === index
                    ? '1px 1px 50px -20px #ff004f'
                    : '0px 0px 0px 0px #000000',
                zIndex: data[itemIndex].values[0].index === index ? 1 : 0,
              }}
              key={index}
              className={clsx(
                'md:w-[339px] md:minh-[445px] w-full bg-[#121212] relative border-2 border-[#5c5c5c] border-solid rounded-xl p-4 cursor-pointer',
                item.default && 'border-[#FF004F]'
              )}
              onClick={() => selectCampaign(index, item)}
            >
              {item.default && (
                <span className='absolute bg-[#FF004F] p-2 px-4 left-0 right-0 m-auto top-0 w-fit rounded-b-lg'>
                  Most Popular
                </span>
              )}
              <div className='flex items-center text-center justify-between flex-col h-full'>
                <div>
                  <h3 className='font-normal text-3xl mb-1'>{item.obj.text}</h3>
                  <span className='font-normal text-sm'>
                    {item.obj.explanation}
                  </span>
                </div>
                <div className='mt-8'>
                  <h3 className='text-4xl mt-0'>
                    {item.obj.cost}
                    <span className='text-xs font-normal ml-[10px]'>
                      excl. VAT
                    </span>
                  </h3>
                </div>
                <div>
                  <h3 className='text-[#FF004F] mt-2 text-4xl mb-0'>
                    {nFormatter(item.obj.min_streams) + '+'}
                  </h3>
                  <span className='text-sm font-light'>
                    Guaranteed views on your video;
                  </span>
                  <p className='text-xs'>
                    Leverage our unique, tailored approach to TikTok
                    advertisement campaigns, ensuring high engagement on your
                    video posts.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className={[styles.builderFooterContainer, 'w-[85%]'].join(' ')}>
        <div className={[styles.container, 'gap-16'].join(' ')}>
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
                      onClick={() => (
                        saveCampaign(items.length - 1, items[active], true),
                        router.push('/campaigns/checkout')
                      )}
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
                      {'Next Video'}
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
                      {activeService == 'tiktok' && 'Back to video overview'}
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
                    {activeService == 'tiktok' && 'Back to video overview'}
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
        </div>
      </div>
    </div>
  );
};

const TikTokBuilder = ({
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
  }, []);

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
            color={'#ff0050'}
            checkOut={checkOut}
            unfinishedcampaigns={unfinishedcampaigns}
            toggleBuilder={toggleBuilder}
            setcrossSell={setcrossSell}
            paymentMethods={methods}
          />
        </>
      )}
    </motion.div>
  );
};

export default TikTokBuilder;
