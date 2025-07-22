import Image from 'next/image';
import Link from 'next/link';

import spotlight from '/public/Spotlights/spotlight-5.png';
import DaimoonHead from '/public/images/daimoon-head.png';

import styles from './error.module.scss';

const Error = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spotlightContainer}>
        <Image width={700} height={700} src={spotlight} alt={'spotlight'} />
      </div>

      <div className={styles.heroText}>
        <h3>Oops, something went wrong.</h3>
        <p>
          {`It seems like your payment didn't went through. Want to give it
          another try?`}
        </p>
        <span className={styles.labelText}>
          Go{' '}
          <Link href='/campaigns/checkout' passHref={true}>
            <b>BACK</b>
          </Link>
        </span>
      </div>

      <div className={styles.imageContainer}>
        <Image src={DaimoonHead} alt={'DaimoonHead'} />
      </div>
    </div>
  );
};

export default Error;
