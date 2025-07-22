import { useState } from 'react';
import { signIn } from 'next-auth/react';

import LoadingState from '/components/LoadingStates';

import styles from './spotify.module.scss';

const SpotifyLogin = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => signIn('spotify')}>Testing</button>
    </div>
  );
};

export default SpotifyLogin;
