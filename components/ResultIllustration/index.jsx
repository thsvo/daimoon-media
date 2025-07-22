import Image from 'next/image';

import Paragraph from '/components/Paragraph';
import Button from '/components/Button';

import styles from './resultIllustration.module.scss';

import ArtistsFlowIllu from '/public/images/ArtistsFlowIllu.png';

const ResultIllustration = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image src={ArtistsFlowIllu} alt={''} />
        </div>

        <div className={'wrapper'}>
          <div className={styles.textContainer}>
            <Paragraph
              title={'These results could be yours'}
              paragraph={
                'Having years of experience, brings quite a few benefits. We know how to make a song thrive on even the newest platforms. <br /><br/> These are a few of our latest campaign results. We could achieve the same for you - if not better.'
              }
            />
            <div className={styles.button}>
              <Button
                type='normal'
                text='Apply right now'
                to='/campaigns/spotify-promotion'
                discount={true}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultIllustration;
