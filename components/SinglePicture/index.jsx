import Image from 'next/image';

import styles from './singlepicture.module.scss';

const SinglePicture = (props) => {
  const { image } = props;
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          layout={'fill'}
          src={image}
          alt='DaimoonGif'
          placeholder='blur'
        />
      </div>
    </div>
  );
};

export default SinglePicture;
