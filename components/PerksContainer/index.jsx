import Link from 'next/link';
import styles from './resellercontainer.module.scss';

import Upsell from '/public/icons/upsell';
import Discount from '/public/icons/discount';
import PrioCommunication from '/public/icons/prioCommunication';
import Branded from '/public/icons/branded';
import Lighting from '/public/icons/lightning';
import Follower from '/public/icons/follower';

const PerksContainer = (props) => {
  const { title, sub } = props;
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>{title}</h3>
        <span>{sub}</span>
      </div>
      <a
        href={'https://calendly.com/daimoonmedia/reseller-onboarding-call'}
        target={'_blank'}
        rel='noreferrer'
      >
        <div className={styles.perksContainer}>
          <div className={styles.item}>
            <Upsell />
            <div>
              <h3>
                Use & Resell <br /> Our Resources
              </h3>
              <span>
                {`Don't`} like our website packages? No problem! You can create
                your own packages/sizes. Resell our resources in your own way.{' '}
              </span>
            </div>
          </div>
          <div className={styles.item}>
            <Discount />
            <div>
              <h3>
                Get Reseller <br />
                Discounts
              </h3>
              <span>
                All resellers not only benefit from custom packages, but also
                huge reseller discounts!
              </span>
            </div>
          </div>
          <div className={styles.item}>
            <PrioCommunication />
            <div>
              <h3>
                Priority Reseller
                <br /> Communication
              </h3>
              <span>
                Problems with a campaign? Our dedicated account managers offers
                solutions within 24 hours, 7 days a week.{' '}
              </span>
            </div>
          </div>
          <div className={styles.item}>
            <Branded color={'#B165ED'} />
            <div>
              <h3>
                Branded or White
                <br /> Label Reselling
              </h3>
              <span>
                Want to make use of our brand? Do it! Want to keep us under the
                radar for your clients? No problem neither.
              </span>
            </div>
          </div>

          <div className={styles.item}>
            <Lighting />
            <div>
              <h3>
                Super Fast
                <br /> Delivery
              </h3>
              <span>
                Did you know our campaigns get their playlist support within an
                average of 3 days?
              </span>
            </div>
          </div>

          <div className={styles.item}>
            <Follower color={'#b165ed'} />
            <div>
              <h3>
                Trustworthy
                <br /> Partner
              </h3>
              <span>
                We only seek long term partnerships, which is only possible
                through transparancy. Therefore, trust is our #1 company value.
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PerksContainer;
