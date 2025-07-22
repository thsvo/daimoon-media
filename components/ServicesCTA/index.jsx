import Image from 'next/image';

import styles from './servicescta.module.scss';

import Spotlight2 from '/public/Spotlights/spotlight-2.png';

import Parallax from '/components/Parallax';
import Button from '/components/Button';

const Affiliate = () => {
  return (
    <div className={[styles.container, 'wrapper'].join(' ')}>
      <div className={styles.spotlight}>
        <Parallax offset={200}>
          <Image
            width={700}
            height={700}
            src={Spotlight2}
            placeholder='blur'
            alt={'spotlight'}
          />
        </Parallax>
      </div>
      <div className={[styles.content].join(' ')}>
        <Button
          className={styles.button}
          type='tiktok'
          text='TikTok'
          to='/campaigns/tiktok'
          discount={true}
          newService={true}
        ></Button>
        <Button
          className={styles.button}
          type='spotify'
          text='Spotify Playlist Marketing'
          to='/campaigns/spotify-promotion'
          discount={true}
        ></Button>
        <Button
          className={styles.button}
          type='youtube'
          text='YouTube Advertising'
          to='/campaigns/youtube'
          discount={true}
        ></Button>
        <Button
          className={styles.button}
          type='soundcloud'
          text='SoundCloud Reposts'
          to='/campaigns/soundcloud'
          discount={true}
        ></Button>
      </div>
    </div>
  );
};

export default Affiliate;
