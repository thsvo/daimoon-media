import react, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Review from '/components/ReviewItem';

import styles from './grid.module.scss';

import Spotlight4 from '/public/Spotlights/spotlight-4.png';

import PlayerProvider from '/context/videoPlayer/PlayerProvider';

const Grid = (props) => {
  const { reviews } = props;

  return (
    <>
      <div className={[styles.gridContainer, 'wrapper'].join(' ')}>
        <div className={styles.content}>
          <h1>Why Us?</h1>
          <span>Thousands of artists love growing with DaimoonMedia.</span>
        </div>
        <div className={styles.reviews}>
          <PlayerProvider>
            {reviews.map((review, key) => {
              return (
                <Review
                  key={key}
                  entry={key}
                  service={review.service}
                  content={review.review}
                />
              );
            })}
          </PlayerProvider>
        </div>
        <div className={styles.spotlight}>
          <Image
            width={600}
            height={800}
            src={Spotlight4}
            placeholder='blur'
            alt={''}
          />
        </div>
        {/* <Link href='/reviews'>
          <a className={styles.reviewLink}>Still not impressed?</a>
        </Link> */}
      </div>
    </>
  );
};

export default Grid;
