import { useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import styles from './overlay.module.scss';

const HoverOverlay = ({ overlay, children }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const options = {
      reserveScrollBarGap: true,
    };

    overlay == true
      ? disableBodyScroll(popupRef, options)
      : enableBodyScroll(popupRef);
  }, [overlay]);

  return overlay == true ? (
    <div ref={popupRef} className={styles.overlay}>
      {children}
    </div>
  ) : null;
};

export default HoverOverlay;
