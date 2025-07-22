import React from 'react';
import Link from 'next/link';

import styles from './button.module.scss';

import Soundcloud from '/public/icons/soundcloud.jsx';
import Youtube from '/public/icons/youtube.jsx';
import Spotify from '/public/icons/spotify.jsx';
import TikTok from '/public/icons/tiktok.jsx';
import { New } from '/public/icons/new';

const Button = (props, { children }) => {
  const {
    type,
    className,
    onHover,
    onHoverLeave,
    text,
    to,
    onClick,
    newTab,
    discount,
    newService = false,
  } = props;

  return to == false ? (
    <button
      onClick={() => onClick()}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
      className={[className, styles.container, styles[type]].join(' ')}
    >
      {type == 'tiktok' && <TikTok marginRight='30px' />}
      {type == 'soundcloud' && <Soundcloud marginRight='30px' />}
      {type == 'youtube' && <Youtube marginRight='30px' />}
      {type == 'spotify' && <Spotify marginRight='30px' />}
      <label className={styles.text}>{text}</label>
    </button>
  ) : (
    <Link
      href={`${to}`}
      target={newTab == true ? '_blank' : null}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
      className={[className, styles.container, styles[type]].join(' ')}
    >
      <>
        {type == 'tiktok' && <TikTok marginRight='30px' />}
        {type == 'soundcloud' && <Soundcloud marginRight='30px' />}
        {type == 'youtube' && <Youtube marginRight='30px' />}
        {type == 'spotify' && <Spotify marginRight='30px' />}
        <label className={styles.text}>{text}</label>
      </>
      {newService && <New />}
    </Link>
  );
};

export default Button;
