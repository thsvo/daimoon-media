import styles from './socials.module.scss';

import Tiktok from '/public/icons/tiktok';
import Instagram from '/public/icons/instagram';
import Facebook from '/public/icons/facebook';

const SocialsContainer = () => {
  return (
    <div className={styles.social_container}>
      <a
        target='_blank'
        rel='noreferrer'
        href={'https://www.tiktok.com/@daimoonmedia'}
      >
        <div className={styles.item}>
          <Tiktok />
        </div>
      </a>

      <a
        target='_blank'
        rel='noreferrer'
        href={'https://www.instagram.com/daimoonmedia/'}
      >
        <div className={styles.item}>
          <Instagram />
        </div>
      </a>

      <a
        target='_blank'
        rel='noreferrer'
        href={'https://www.facebook.com/daimoonmedia/'}
      >
        <div className={styles.item}>
          <Facebook />
        </div>
      </a>
    </div>
  );
};

export default SocialsContainer;
