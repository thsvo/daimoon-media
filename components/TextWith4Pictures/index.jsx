import Image from 'next/image';

import Paragraph from '/components/Paragraph';
import Button from '/components/Button';

import styles from './textwith4pictures.module.scss';

import graph1 from '/public/images/graph1.png';
import graph2 from '/public/images/graph2.png';
import graph3 from '/public/images/graph3.png';
import graph4 from '/public/images/graph4.png';

import Soundcloud from '/public/icons/soundcloud.jsx';
import Youtube from '/public/icons/youtube.jsx';
import Spotify from '/public/icons/spotify.jsx';

import Tiktok from '/public/icons/tiktok';

const TextWith4Pictures = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.serviceContainer}>
          <div className={styles.item}>
            <Youtube />
          </div>
          <div className={styles.item}>
            <Spotify />
          </div>
          <div className={styles.item}>
            <Tiktok />
          </div>
          <div className={styles.item}>
            <Soundcloud />
          </div>
        </div>
        <Paragraph
          title={'Platform experts'}
          paragraph={
            'Having years of experience, brings quite a few benefits. We know how to make a song thrive on even the newest platforms. <br /><br/> These are a few of our latest campaign results. We could achieve the same for you - if not better.'
          }
        />
        <div className={styles.button}>
          <Button
            type='normal'
            text='Apply right now'
            to='/campaigns/spotify-promotion'
            discount={true}
          ></Button>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.imageRow}>
          <div className={styles.variant1}>
            <Image src={graph4} width={322} height={167} alt={''} />
          </div>
          <div className={styles.variant2}>
            <Image src={graph3} width={262} height={167} alt={''} />
          </div>
        </div>
        <div className={styles.imageRow}>
          <div className={styles.variant3}>
            <Image src={graph1} width={222} height={60} alt={''} />
          </div>

          <div className={styles.variant4}>
            <Image src={graph2} width={282} height={161} alt={''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextWith4Pictures;
