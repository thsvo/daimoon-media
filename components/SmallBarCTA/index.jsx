import Link from 'next/link';

import Button from '/components/Button';
import styles from './smallbarcta.module.scss';

const SmallBarCTA = (props) => {
  const { subText, to, title, newTab = true } = props;

  return (
    <div className={styles.container}>
      <div className={styles.containerCTA}>
        {title ? (
          <h4 dangerouslySetInnerHTML={{ __html: title }}></h4>
        ) : (
          <h4>Ready to become a Reseller? Awesome!</h4>
        )}

        <Button
          type={'normal'}
          text={'Apply Now!'}
          to={to ? to : false}
          className={styles.button}
          newTab={newTab}
        />
      </div>
      <div className={styles.containerText}>
        {subText ? (
          <p dangerouslySetInnerHTML={{ __html: subText }}></p>
        ) : (
          <p>
            We’ll ask you some questions. Once you got approved, we’ll proceed
            with the onboarding call. <br /> Questions? You can always reach out{' '}
            <a
              href={'/contact?key=customer&form=other'}
              target='_blank'
              rel='noreferrer'
            >
              HERE
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default SmallBarCTA;
