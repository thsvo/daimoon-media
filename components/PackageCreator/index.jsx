import { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { validateTrack } from '/lib/Spotify';

import ArrowDown from '/public/icons/arrow_down';

import styles from './packagecreator.module.scss';

import ShopContext from '/context/Order/shop-context';

const TableRow = ({
  serviceIndex,
  item,
  packages,
  allSelectedItems,
  allSelectedPackages,
  allStreams,
  allFollowers,
  index,
}) => {
  const [selectedItem, setSelectedItems] = useState(false);
  const [price, setPrice] = useState(0);
  const [streams, setStreams] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [selectedPackage, setPackage] = useState(0);
  const context = useContext(ShopContext);

  useEffect(() => {
    if (allSelectedItems == true) {
      setSelectedItems(true);
    } else {
      setSelectedItems(false);
    }
  }, [allSelectedItems]);

  useEffect(() => {
    if (selectedItem == true) {
      changePackage(allSelectedPackages);
    }
  }, [allSelectedPackages]);

  // //Setting package based on filtervalue
  // useEffect(() => {
  //   selectedItem == true && setPackage(allSelectedPackages),

  // }, [allSelectedPackages]);

  // //Setting streams based on filter and package
  // useEffect(() => {
  //   selectedItem == true &&
  //     packages[selectedPackage].custom == true &&
  //     setStreams(allStreams);
  // }, [allStreams]);

  useEffect(() => {
    packages[selectedPackage].custom == false &&
      setStreams(packages[selectedPackage].streams),
      setFollowers(packages[selectedPackage].followers),
      setPrice(parseInt(packages[selectedPackage].costInEuro));
  }, [selectedPackage]);

  const changePackage = (packageIndex) => {
    setPackage(packageIndex);

    const track = context.order.campaigns[serviceIndex].campaigns.find(
      (e) => e.campaignObject.id == item.id
    );

    context.editCampaign(track, [
      {
        label: 'Campaign:',
        index: 0,
        value: {
          baseCostExcl: packages[packageIndex].costInEuro,
          budget: 0,
          cost: packages[packageIndex].costInEuro,
          costEUR: packages[packageIndex].costInEuro,
          max_followers: packages[packageIndex].followers,
          max_streams: packages[packageIndex].streams,
          min_followers: packages[packageIndex].followers,
          min_streams: packages[packageIndex].streams,
          playlists: 0,
          streams: packages[packageIndex].streams,
          text: `Reseller Package - ` + packages[packageIndex].name,
          value: packages[packageIndex].streams,
        },
      },
    ]);
  };

  return (
    <tr>
      <td>
        <input
          checked={selectedItem}
          onClick={() => setSelectedItems(!selectedItem)}
          type={'checkbox'}
        ></input>
      </td>

      <td>
        <a
          href={item.campaignObject.trackURL}
          target={'_blank'}
          rel='noreferrer'
        >
          {item.campaignObject.trackURL}
        </a>
      </td>
      <td>{item.campaignObject.track}</td>
      <td>{item.campaignObject.artist.map((artist) => artist.name)}</td>
      <td className={styles.selectBox}>
        <select onChange={(e) => changePackage(e.target.selectedIndex)}>
          {packages.map((i, index) => (
            <option selected={selectedPackage} value={index} key={index}>
              {i.name}
            </option>
          ))}
        </select>
        <ArrowDown />
      </td>
      {packages[selectedPackage].custom == true ? (
        <>
          <td>
            <input
              value={streams}
              onChange={(e) => setStreams(e.currentTarget.value)}
            ></input>
          </td>
          <td>
            <input
              value={followers}
              onChange={(e) => setFollowers(e.currentTarget.value)}
            ></input>
          </td>
        </>
      ) : (
        <>
          <td>{streams}</td>
          <td>{followers}</td>
        </>
      )}

      <td>{price}</td>
    </tr>
  );
};

const PackageCreator = ({ packages }) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [tracks, setTracks] = useState([]);
  const [enableCheckout, setEnableCheckout] = useState(false);
  const [allSelectedPackages, setAllSelectedPackages] = useState(0);
  const [allSelectedItems, setAllSelectedItems] = useState(false);
  const [allStreams, setAllStreams] = useState(0);
  const [allFollowers, setAllFollowers] = useState(0);
  const context = useContext(ShopContext);
  const defaultPackage = packages.find((i) => i.custom == false);

  useEffect(() => {
    const value = textAreaValue.replace(/(\r\n|\n|\r)/gm, '');

    const array = value.split('https://');
    array.shift();

    const results = array.map(async (url) => {
      const result = await validateTrack(url);

      console.log('result', result);

      setEnableCheckout(true);

      const track = {
        ...result,
        campaignObject: {
          ...result.campaignObject,
          campaign: [
            {
              label: 'Campaign:',
              index: 0,
              value: {
                baseCostExcl: defaultPackage.costInEuro,
                budget: 0,
                cost: defaultPackage.costInEuro,
                costEUR: (
                  defaultPackage.costInEuro /
                  context.order.currency.conversionrate
                ).toFixed(2),
                max_followers: defaultPackage.followers,
                max_streams: defaultPackage.streams,
                min_followers: defaultPackage.followers,
                min_streams: defaultPackage.streams,
                playlists: 0,
                streams: defaultPackage.streams,
                text: `Reseller Package - ` + defaultPackage.name,
                value: defaultPackage.streams,
              },
            },
          ],
        },
      };

      if (result.succes == true) {
        await context.addCampaign(track);
      }
      return track;
    });

    Promise.all(results).then((values) => {
      const filteredValues = values.filter((value) => value.succes == true);

      setTracks(filteredValues);
    });
  }, [textAreaValue]);

  const animationVariants = {
    initial: {
      opacity: 0,
      scale: 0.2,
      transition: { duration: 0.1 },
    },
    animate: {
      opacity: 1,

      scale: 1,
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.trackValidationContainer}>
        <textarea
          placeholder={
            'Copy all the required Spotify links. Only Track URLS are supported.'
          }
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.currentTarget.value)}
          onKey={(event) => event.keyCode == 13 && event.preventDefault()}
        ></textarea>
        <div className={styles.header}>
          <div className={styles.filter}>
            <div>
              <label>Select all</label>
              <input
                onChange={() => setAllSelectedItems(!allSelectedItems)}
                type={'checkbox'}
              ></input>
            </div>
            <div>
              <label>Select package</label>
              <select
                onChange={(e) => setAllSelectedPackages(e.target.selectedIndex)}
              >
                {packages.map((i, index) => (
                  <option
                    selected={allSelectedPackages == index && true}
                    value={index}
                    key={index}
                  >
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <AnimatePresence>
            <div className={styles.buttonContainer}>
              {enableCheckout == true && (
                <motion.div
                  variants={animationVariants}
                  initial='initial' // Starting animation
                  animate='animate' // Values to animate to
                >
                  <Link href={'/campaigns/checkout'} className={styles.button}>
                    Go to Checkout
                  </Link>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>

        <div className={styles.table}>
          <table>
            <tr className={styles.tableHeader}>
              <th></th>
              <th>Link</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Package</th>
              <th>Streams</th>
              <th>Followers</th>
              <th>Price</th>
            </tr>
            <tbody>
              {tracks.map((item, key) => (
                <TableRow
                  serviceIndex={context.order.campaigns.findIndex(
                    (i) => i.service == item.service
                  )}
                  allSelectedPackages={allSelectedPackages}
                  allSelectedItems={allSelectedItems}
                  allStreams={allStreams}
                  allFollowers={allFollowers}
                  key={key}
                  index={key}
                  item={item}
                  packages={packages}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PackageCreator;
