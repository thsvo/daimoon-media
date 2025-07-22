//Core
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Genres from '/json/Genres/genres';
//Helpers
import axios from 'axios';

import styles from './spotify.module.scss';

const GenerateToken = async () => {
  const response = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    proxy: {
      host: '207.246.124.91',
      port: 3128,
    },
    auth: {
      username: process.env.NEXT_PUBLIC_SPOTIFY_API_ID,
      password: process.env.NEXT_PUBLIC_SPOTIFY_API_SECRET,
    },

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=client_credentials',
  });

  return response.data.access_token;
};

const getData = async (url) => {
  const token = await GenerateToken();

  const response = await axios({
    method: 'get',
    url: url,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    proxy: {
      host: '207.246.124.91',
      port: 3128,
    },

    data: 'grant_type=client_credentials',
  });

  return response.data;
};

const searchTrack = async (query) => {
  if (query) {
    const trackObject = await getData(
      'https://api.spotify.com/v1/search?q=' +
        query +
        '&type=artist,track&market=NL'
    );

    if (trackObject) {
      return trackObject.tracks.items;
    } else {
      return 'Not found';
    }
  }
};

const getArtist = (artistId) => {
  return getData('https://api.spotify.com/v1/artists/' + artistId);
};

const getAllGenres = async (artists) => {
  let artistGenres = [];
  await Promise.all(
    artists.map(async (item) => {
      const artist = await getArtist(item.id);

      artist.genres.map((genre) => {
        if (artistGenres.indexOf(genre) == -1) {
          artistGenres.push(genre);
        }
      });
    })
  );
  return artistGenres;
};

const getGenre = async (artists) => {
  const allgenres = await getAllGenres(artists);

  let genre = {
    main: 'Alternative',
    sub: allgenres[0],
    artist: allgenres,
  };

  if (allgenres.length != 0) {
    Genres.map((i) => {
      if (i.subs.indexOf(genre.sub) > -1) {
        genre = {
          main: i.main,
          sub: allgenres[0],
          artist: allgenres,
        };
      } else {
        i.subs.map((sub) => {
          allgenres.find((element) => {
            if (element.includes(i.main.toLowerCase())) {
              return (genre = {
                main: i.main,
                sub: element,
                artist: allgenres,
              });
            }
          });

          if (allgenres.includes(sub.toLowerCase())) {
            genre = {
              main: i.main,
              sub: sub,
              artist: allgenres,
            };
          }
        });
      }
    });
  }

  return genre;
};

const validateTrack = async (query) => {
  let id;
  if (query && query.includes('spotify.com/track/')) {
    id = query.split('open.spotify.com/track/').pop();

    if (id) {
      const trackObject = await getData(
        'https://api.spotify.com/v1/tracks/' + id
      );

      const genres = await getGenre(trackObject.album.artists);

      if (trackObject) {
        return {
          name: 'Track validated',
          succes: true,
          service: 'spotify',
          id: id,
          campaignObject: {
            id: id,
            track: trackObject.name,
            trackURL: trackObject.external_urls.spotify,
            image: trackObject.album.images[0].url,
            artist: trackObject.album.artists,
            genre: genres,
            campaign: [],
          },
          object: trackObject,
        };
      } else {
        return {
          message: 'Not found',
          succes: false,
          track: '',
          service: 'spotify',
          object: {},
        };
      }
    }
  } else if (query && query.includes('spotify.com/album/')) {
    id = query.split('open.spotify.com/album/').pop();

    if (id) {
      const trackObject = await getData(
        'https://api.spotify.com/v1/albums/' + id
      );

      const genres = await getGenre(trackObject.artists);

      const albumEntries = [];
      trackObject.tracks.items.map((item) => {
        albumEntries.push({
          name: 'Track validated',
          succes: true,
          service: 'spotify',
          id: id,
          campaignObject: {
            id: id,
            track: item.name,
            trackURL: item.external_urls.spotify,
            image: trackObject.images[0].url,
            artist: item.artists,
            genre: genres,
            campaign: [],
          },
          object: item,
        });
      });

      return albumEntries;
    }
  } else {
    return {
      message: 'Not supported',
      succes: false,
      track: '',
      service: 'spotify',
      object: {},
    };
  }
};

const SpotifyResults = (props) => {
  const { results, addTrack } = props;

  return results.length != 0 ? (
    <ul className={styles.list}>
      {results &&
        results.map((result, index) => {
          return (
            <li
              key={index}
              onClick={() => addTrack({ service: 'spotify', result })}
            >
              <Image
                alt='cover'
                width='40'
                height='40'
                src={result.album.images?.[0]?.url ?? ''}
                lazy
              />

              <div className={styles.trackDetails}>
                <span>
                  <b>{result.name.substring(0, 25)}</b>
                </span>
                {result.artists.map((artist, index) => {
                  return <span key={index}>{artist.name}</span>;
                })}
              </div>
            </li>
          );
        })}
    </ul>
  ) : null;
};

const GetPlaylistTracks = async (id) => {
  const tracks = [];
  let next = null;

  const data = await getData(
    'https://api.spotify.com/v1/playlists/' + id + '/tracks'
  );

  next = data.next;

  tracks.push(...data.items);

  for (let amount = 0; amount < data.total; amount = amount + data.limit) {
    if (next) {
      const data = await getData(next);
      next = data.next;
      tracks.push(...data.items);
    }
  }

  return tracks;
};

export {
  searchTrack,
  SpotifyResults,
  validateTrack,
  getGenre,
  GetPlaylistTracks,
};
