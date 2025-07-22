import Image from 'next/image';
import Tick from '/public/icons/tick.jsx';

import Button from '/components/Button';

import DaimoonFace from '/public/images/daimoon-head.png';

import styles from './bullitlistbig.module.scss';

const BullitListBig = () => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.item}>
          <label>Priority Campaigns</label>
          <ul>
            <li>
              <Tick fill={'#b165ed'} /> Heavy monitoring 3x per week{' '}
            </li>
            <li>
              <Tick fill={'#b165ed'} />
              Heavy monitoring 3x per week{' '}
            </li>
            <li>
              <Tick fill={'#b165ed'} />
              Heavy monitoring 3x per week{' '}
            </li>
            <li>
              <Tick fill={'#b165ed'} />
              Heavy monitoring 3x per week{' '}
            </li>
            <li>
              <Tick fill={'#b165ed'} />
              Heavy monitoring 3x per week{' '}
            </li>
          </ul>
        </div>
        <div className={styles.item}>
          <label>Priority Campaigns</label>
          <ul>
            <li>
              <Tick fill={'#b165ed'} /> Heavy monitoring 3x per week{' '}
            </li>
            <li>
              <Tick fill={'#b165ed'} />
              Heavy monitoring 3x per week{' '}
            </li>
            <li>
              <Tick fill={'#b165ed'} />
              Heavy monitoring 3x per week{' '}
            </li>
            <li>
              <Tick fill={'#b165ed'} />
              Heavy monitoring 3x per week{' '}
            </li>
            <li>
              <Tick fill={'#b165ed'} />
              Heavy monitoring 3x per week{' '}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          type='normal'
          text='Spotify Promotions'
          to='/campaigns/spotify-promotion'
          discount={true}
        ></Button>
      </div>
      <div className={styles.faceContainer}>
        <Image
          alt={''}
          layout={'fill'}
          objectFit={'cover'}
          src={DaimoonFace}
          className={styles.daimoonFace}
        />
      </div>
    </div>
  );
};

export default BullitListBig;
