import { motion } from 'framer-motion';

import styles from './loading.module.scss';

const LoadingState = () => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '-100%',
    },
  };

  const loadingCircleTransition = {
    duration: 0.3,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  return (
    <motion.div
      className={styles.loadingContainer}
      variants={loadingContainerVariants}
      initial='start'
      animate='end'
    >
      <motion.span
        className={styles.loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={styles.loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={styles.loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

export default LoadingState;
