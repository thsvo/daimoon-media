import { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';

import ArrowDown from '/public/icons/arrow_down';
import logo from '/public/logo/logo.png';

import ShopContext from '/context/Order/shop-context';

import styles from './releasedate.module.scss';

const ReleaseDate = (props) => {
  const { toggleReleaseDate, activeService, route, onTrackAdded } = props;
  const [maingenre, setMainGenre] = useState('HipHop');
  const context = useContext(ShopContext);
  const router = useRouter();

  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const month = [
    { i: 0, text: 'January' },
    { i: 1, text: 'February' },
    { i: 2, text: 'March' },
    { i: 3, text: 'April' },
    { i: 4, text: 'May' },
    { i: 5, text: 'June' },
    { i: 6, text: 'July' },
    { i: 7, text: 'August' },
    { i: 8, text: 'September' },
    { i: 9, text: 'Oktober' },
    { i: 10, text: 'November' },
    { i: 11, text: 'December' },
  ];

  const AddPreReleaseCampaign = async (values) => {
    const date =
      month[values.month].text.slice(0, 3) +
      '-' +
      values.day +
      '-' +
      values.year;

    const OMSDate =
      values.year + '-' + (parseInt(values.month) + 1) + '-' + values.day;

    const entry =
      context.order.campaigns.find((item) => item.service == activeService)
        .campaigns.length + 1;

    await context.addCampaign({
      name: 'Track validated',
      succes: true,
      service: activeService,
      campaignObject: {
        id: entry,
        type: 'pre-release',
        track: `Track #${entry}`,
        image: logo,
        release: { text: 'Release on ' + date, date: OMSDate },
        artist: [],
        campaign: [],
        genre: {
          main: maingenre,
          sub: values.subgenre,
          artist: [],
        },
      },
      object: {},
    });

    toggleReleaseDate(false);
    if (onTrackAdded) {
      onTrackAdded();
    } else if (route) {
      router.push(route);
    }
  };

  const color =
    activeService == 'spotify'
      ? '#1ED760'
      : activeService == 'youtube'
      ? '#FF0000'
      : activeService == 'tiktok'
      ? '#b165ed'
      : activeService == 'soundcloud' && '#FF5502';

  return (
    <div className={styles.container}>
      <span>Release date</span>
      <Formik
        initialValues={{
          day: '',
          month: '',
          name: '',
          maingenre: '',
          subgenre: '',
        }}
        onSubmit={(values) => AddPreReleaseCampaign(values)}
      >
        <Form>
          <div className={styles.date}>
            <div className={styles.item}>
              <Field as='select' name='day' required>
                <option value='' disabled selected>
                  Day
                </option>
                {days.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Field>
              <ArrowDown />
            </div>
            <div className={styles.item}>
              <Field as='select' name='month' required>
                <option value='' disabled selected>
                  Month
                </option>
                {month.map((item, index) => (
                  <option key={index} value={item.i}>
                    {item.text}
                  </option>
                ))}
              </Field>
              <ArrowDown />
            </div>
            <div className={styles.item}>
              <Field as='select' name='year' required>
                <option value='' disabled selected>
                  Year
                </option>
                <option value='2024'>2024</option>
                <option value='2025'>2025</option>
                <option value='2026'>2026</option>
              </Field>
              <ArrowDown />
            </div>
          </div>
          <div className={styles.item}>
            <Field
              onChange={(e) => setMainGenre(e.target.value)}
              as='select'
              name='maingenre'
              placeholder='Which main genre fits best?'
              required
              value={maingenre}
            >
              <option value='default' selected>
                Select genre
              </option>
              <option value='HipHop'>HipHop (Rap, RnB, Urban etc.)</option>
              <option value='Dance'>
                Dance (House, EDM, Trap, Future Bass ect.)
              </option>
              <option value='Alternative'>
                Alternative (Acoustic, Rock, Jazz, Band, Pop etc.)
              </option>
            </Field>
          </div>
          <div className={styles.item}>
            <Field
              type='text'
              name='subgenre'
              placeholder='Subgenre'
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            <div
              onClick={() => toggleReleaseDate(false)}
              className={styles.buttonBack}
              style={{ borderColor: color }}
            >
              <ArrowDown />
            </div>
            <button style={{ backgroundColor: color }} type='submit'>
              Add Track
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ReleaseDate;
