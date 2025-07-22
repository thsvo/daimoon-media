import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

import styles from './countdown.module.scss';

const Countdown = () => {
  return (
    <div className={styles.container}>
      <FlipClockCountdown
        to={new Date('2023-12-03'.replace(/-/g, '/')).getTime()}
        labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
        labelStyle={{
          fontSize: 10,
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
        digitBlockStyle={{ width: 30, height: 50, fontSize: 30 }}
        dividerStyle={{ color: 'rgb(38, 37, 37)', height: 1 }}
        separatorStyle={{ color: 'rgb(38, 37, 37)', size: '6px' }}
        duration={0.5}
      />
    </div>
  );
};

export default Countdown;
