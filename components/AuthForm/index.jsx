import Image from 'next/image';

import MagicLinkLogin from '/components/LoginForms/MagicLink';

import Spotlight2 from '/public/Spotlights/spotlight-2.png';
import Spotlight1 from '/public/Spotlights/spotlight-1.png';

import styles from './authform.module.scss';

const AuthForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spotlight2}>
        <Image
          width={400}
          height={400}
          src={Spotlight1}
          placeholder='blur'
          alt={''}
        />
      </div>
      <div className={styles.section}>
        <MagicLinkLogin />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.section}>
        <h3>Enter using nothing but your email</h3>
        <p>
          {`We'll send you an email containing a Magic Link. This link is valid for 24 hours and will automatically log you in once clicked. `}
        </p>
        <span>No account needed.</span>
      </div>
      <div className={styles.spotlight}>
        <Image
          width={200}
          height={200}
          src={Spotlight2}
          placeholder='blur'
          alt={''}
        />
      </div>
    </div>
  );
};

export default AuthForm;
