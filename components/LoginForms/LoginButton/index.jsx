import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './loginbutton.module.scss';

const LoginButton = ({ status }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={styles.accountContainer}
    >
      <Link href='/account/campaigns?page=1' passHref={true}>
        <button className={styles.dashboard}>Dashboard</button>
      </Link>
      {/* {status === 'authenticated' ? (
        <Link href='/account/campaigns?page=1' passHref={true}>
          <button className={styles.dashboard}>Dashboard</button>
        </Link>
      ) : (
        <Link href='/login' passHref={true}>
          <button className={styles.dashboard}>Login</button>
        </Link>
      )} */}
    </motion.div>
  );
};

export default LoginButton;
