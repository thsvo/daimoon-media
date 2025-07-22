import React from 'react';

import styles from './bulletin.module.scss';

const Bulletin = (props) => {
  const { bullets, centered } = props;
  return (
    <ul className={styles.list}>
      {bullets &&
        bullets.map((item, index) => (
          <li
            key={index}
            className={[
              styles.item,
              centered == true && styles.item__centered,
            ].join(' ')}
          >
            <item.icon color={'#B165ED'} fill={'#B165ED'} />
            <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
          </li>
        ))}
    </ul>
  );
};

export default Bulletin;
