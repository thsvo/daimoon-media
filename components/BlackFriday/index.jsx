import styles from './blackfriday.module.scss';
import Countdown from '/components/Countdown';

const BlackFriday = () => {
  return (
    <>
      <div className={styles.container}>
        <h3>30% discount on all orders above 150 USD</h3>

        <div>
          <Countdown />
        </div>
      </div>
    </>
  );
};

export default BlackFriday;
