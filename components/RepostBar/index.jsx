import OpenExternal from '/public/icons/open_external.jsx';

import styles from './repost.module.scss';

const RepostBar = ({ timestamp, link, followers }, props) => {
  const date = new Date(timestamp * 1000);

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <span>
          Reach: <b>{followers}</b>
        </span>
        <span>
          Added on: <b>{date.toLocaleDateString('default')}</b>
        </span>
      </div>
      <a target={'_blank'} rel='noreferrer' href={link}>
        <div className={styles.scheduler}>
          Open scheduler <OpenExternal />
        </div>
      </a>
    </div>
  );
};

export default RepostBar;
