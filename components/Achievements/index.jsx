import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useAnimate } from 'framer-motion';

import Parallax from '/components/Parallax';
import Spotlight2 from '/public/Spotlights/spotlight-2.png';

import styles from './achievements.module.scss';

const Achievements = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // This "li" selector will only select children
    // of the element that receives `scope`.
    animate('li,b', { opacity: 1 });
  });

  return (
    <div className={[styles.container, 'wrapper'].join(' ')}>
      <div>
        <h2
          className={[styles.sectionTitle, styles.sectionTitle__visible].join(
            ' '
          )}
        >
          THE NUMBERS
        </h2>
        <ul
          ref={scope}
          className={[styles.list, styles.list__visible].join(' ')}
        >
          <li>
            <b>10,000,000+</b>{' '}
            <span>
              Spotify Followers <br /> Reached
            </span>
          </li>
          <li>
            <b>15,000,000+</b>{' '}
            <span>
              YouTube Views <br /> Delivered
            </span>
          </li>
          <li>
            <b>30+ years</b>{' '}
            <span>
              Music Industry <br />
              Experience
            </span>
          </li>

          <li>
            <b>10,000+</b>
            <span>
              <span style={{ color: '#b165ed' }}>Artists</span> Helped
            </span>
          </li>

          {/* <Link
            href='https://www.trustpilot.com/review/daimoon.media'
            rel='nofollow'
          >
            <li>
              <b>4.8</b>
              <span>
                Average
                <span style={{ color: '#b165ed' }}> Trustpilot</span>
                <br />
                Score
              </span>
            </li>
          </Link> */}

          <div className={styles.spotlight}>
            <Parallax offset={-100}>
              <Image
                width={700}
                height={700}
                src={Spotlight2}
                placeholder='blur'
                alt={''}
              />
            </Parallax>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Achievements;
