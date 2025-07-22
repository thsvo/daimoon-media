import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import placeholderImage from '/public/logo/logo.png';
import { GetPlaylistTracks } from '/lib/Spotify';

import styles from './playlist.module.scss';

const PlaylistCard = ({
  playlist,
  placeholder = false,
  track_id = null,
  averagePosition,
  setAveragePosition,
}) => {
  const { state, name, followers, image, url } = playlist;
  const [position, setPosition] = useState(0);
  const [streams, setStreams] = useState(0);

  fetch(`/api/campaignStatistics/getPlaylistPosition`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: playlist.position,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      setPosition(data.position);
    });

  playlist?.streams?.length != 0 &&
    fetch(`/api/campaignStatistics/getPlaylistStreams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: playlist.streams,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStreams(data.streams);
      });

  return placeholder == true ? (
    <a rel='noopener noreferrer'>
      <div className={[styles.card, styles.card_pending].join(' ')}>
        <div className={styles.imageContainer}>
          <Image src={placeholderImage} layout={'fill'} alt={'playlistCover'} />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <h4>Playlists</h4>
            <span
              style={{
                color: '#FFCC00',
              }}
            >
              T.B.A.
            </span>
          </div>
          <span></span>
        </div>
      </div>
    </a>
  ) : (
    <a target='_blank' href={url} rel='noopener noreferrer'>
      <div
        className={[
          styles.card,
          state == 'Accepted'
            ? styles.card_approved
            : state == 'pending'
            ? styles.card_pending
            : state == 'unpitched' && styles.card_unpitched,
        ].join(' ')}
      >
        <div className={styles.imageContainer}>
          <Image src={image} layout={'fill'} alt={'playlistCover'} />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <h4>
              {name?.length > 20 ? name.substring(0, 20) + ' ... ' : name}
            </h4>
            <span
              style={{
                color:
                  state == 'Accepted'
                    ? '#1ED760'
                    : state == 'pending' && '#FFCC00',
              }}
            >
              {state}
            </span>
          </div>
          <span>Position: {position}</span>
          <span>Streams: {streams == 0 ? 'N.A.' : streams}</span>
          <span>{followers} Followers</span>
        </div>
      </div>
    </a>
  );
};

const Loading = ({ isLoading = true }) => {
  return (
    <div
      className={clsx('rounded-2xl bg-gray-900/80 p-4', {
        'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent':
          isLoading,
      })}
    >
      <div className='flex gap-4'>
        <div className='w-14 h-14 rounded-lg bg-gray-700 flex-none' />
        <div className='h-14 w-full flex-col flex-1 space-y-3'>
          <div className='h-7 rounded-lg bg-gray-700 flex-1 ' />
          <div className='h-3 flex-1 flex gap-3 w-3/4'>
            <div className='h-3 rounded-lg bg-gray-700 w-3/4' />
            <div className='h-3 rounded-lg bg-gray-700 w-3/4' />
            <div className='h-3 rounded-lg bg-gray-700 w-3/4' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
