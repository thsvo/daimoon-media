import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './modal.module.scss';

const notificationVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.2,
    transition: { duration: 0.1 },
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    transition: { ease: 'easeOut', duration: 0.15 },
  },
  hover: { scale: 1.05, transition: { duration: 0.1 } },
};

const Modal = (props) => {
  const { show } = props;
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (show.visible == true) {
      setActive(true);
      setTimeout(async () => {
        setActive(false);
      }, 3000);
    }
  }, [show]);

  return (
    <AnimatePresence initial={false} onExitComplete={() => setActive(false)}>
      {active == true && (
        <motion.div
          positiontransition
          variants={notificationVariants} // Defined animation states
          whileHover='hover' // Animation on hover gesture
          initial='initial' // Starting animation
          animate='animate' // Values to animate to
          exit='exit' // Target to animate to when removed from the tree
          className={[
            styles.container,

            show.status == 'succes'
              ? styles.container__valid
              : styles.container__failed,
          ].join(' ')}
        >
          <div className={styles.content}>
            <span>
              <b>{show.status == 'succes' ? 'Success!' : 'Failed!'}</b>
            </span>
            <span>{show.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
