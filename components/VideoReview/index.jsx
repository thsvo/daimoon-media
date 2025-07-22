import { useState } from 'react';
import Image from 'next/image';

import Playbutton from '/public/icons/playbutton.jsx';

import Spotlight2 from '/public/Spotlights/spotlight-2.png';
import Spotlight3 from '/public/Spotlights/spotlight-3.png';

import Parallax from '/components/Parallax';
import Video from '/components/Video';
import Contentlabel from '/components/Contentlabel';
import Quote from '/components/Quote';

import videoThumbnail from '/public/images/videoThumbnail.png';

import styles from './review.module.scss';

const VideoReview = (props) => {
  const { videoUrl, name, title, desc } = props;
  const [play, setPlay] = useState(false);

  return (
    <div className={[styles.container, 'wrapper'].join(' ')}>
      <div onClick={() => setPlay(true)} className={styles.videoContainer}>
        <div className={[styles.videoWrapper].join(' ')}>
          {!play ? (
            <div className={[styles.videoOverlay].join(' ')}>
              <Image
                className={styles.image}
                fill
                src={videoThumbnail}
                alt={'videoCover'}
              />
              <div className={styles.playButton}>
                <Playbutton />
              </div>
            </div>
          ) : (
            <Video play={true} url={videoUrl} />
          )}
        </div>
      </div>
      <div className={styles.spotlight2}>
        <Image
          width={500}
          height={500}
          src={Spotlight3}
          placeholder='blur'
          alt={'spotlight'}
        />
      </div>
      <div className={styles.contentContainer}>
        <Contentlabel>{name}</Contentlabel>
        <Quote quote={title} />
        <span className={styles.description}>{desc}</span>
      </div>
      <div className={styles.spotlight}>
        <Parallax offset={200}>
          <Image
            width={800}
            height={800}
            src={Spotlight2}
            placeholder='blur'
            alt={'spotlight'}
          />
        </Parallax>
      </div>
    </div>
  );
};

export default VideoReview;
