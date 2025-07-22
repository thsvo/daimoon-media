import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import Triangle from '/public/icons/triangle';

import styles from './question.module.scss';

const Question = (props) => {
  const { item, service, color } = props;
  const [toggle, setToggle] = useState(false);
  const MotionTriangle = motion(Triangle);

  return (
    <div
      onClick={() => setToggle(!toggle)}
      className={[
        styles.container,
        toggle == true && styles.container_active,
        service == 'spotify'
          ? styles.container_spotify
          : service == 'youtube'
          ? styles.container_youtube
          : service == 'soundcloud' && styles.container_soundcloud,
      ].join(' ')}
    >
      <div className={styles.question}>
        <span>Q: {item.Q}</span>
        <AnimatePresence>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: toggle ? 180 : 0 }}
          >
            <MotionTriangle color={color} />
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {toggle && (
          <motion.div
            Layout
            animate={{ height: 'auto', opacity: 1 }}
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
            className={styles.answer}
          >
            <text dangerouslySetInnerHTML={{ __html: item.A }}></text>
            {item.CTA && (
              <Link passHref={true} href={item.CTA.URL}>
                <span style={{ color: color }}>{item.CTA.text}</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Question;
