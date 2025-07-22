import React, { useState, useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

import logo from '/public/logo/logo.png';
import loader from '/public/icons/loader.gif';

import styles from './search.module.scss';

import Link from '/public/icons/link.jsx';
import Checkmark from '/public/icons/checkmark.jsx';
import Cross from '/public/icons/cross.jsx';

import ShopContext from '/context/Order/shop-context';

// Import tracking functions
import { trackContentSearch, trackContentSelected } from '/lib/Analytics/gtm';
import { trackSpotifySongSearch, trackSpotifySongSelected } from '/lib/Analytics/spotifyAnalytics';

//Link validations
import {
  searchTrack,
  validateTrack,
  SpotifyResults,
  getGenre,
} from '/lib/Spotify';
import {
  searchTrackYoutube,
  validateTrackYoutube,
  YoutubeResults,
} from '/lib/Youtube';
import {
  SearchSoundcloud,
  ValidateSoundcloud,
  SoundcloudResults,
} from '/lib/Soundcloud';

const Search = (props) => {
  const {
    placeholder,
    activeService,
    setModal,
    activeField,
    redirect = true,
    campaign = false,
    callback = false,
  } = props;
  const router = useRouter();
  const [validate, setValidate] = useState();
  const [loading, setLoading] = useState(false);
  const searchEl = useRef(null);
  const [results, setResults] = useState({ service: activeService, items: [] });
  const [inputValue, setinputValue] = useState('');
  const [clickedItem, setclickedItem] = useState();
  const [animation, toggleAnimation] = useState(true);
  const [error, setError] = useState();

  const context = useContext(ShopContext);

  useEffect(() => {
    activeField == true && searchEl.current.focus();
  }, [activeField]);

  //emptying state when activeservice changes
  useEffect(() => {
    setinputValue('');
    setResults({ service: activeService, items: [] });
  }, [activeService]);
  useEffect(() => {
    if (inputValue != '') {
      setLoading(true);
      
      // Track search initiation with service-specific tracking
      if (activeService === 'spotify') {
        trackSpotifySongSearch(inputValue, inputValue.includes('https://') ? 'url_paste' : 'text_search');
      } else {
        trackContentSearch(inputValue, activeService, inputValue.includes('https://') ? 'paste_link' : 'search');
      }
      
      const delayDebounceFn = setTimeout(() => {
        switch (activeService) {
          case 'spotify':
            const timerSpotify = setTimeout(async () => {
              if (inputValue.includes('https://open.spotify')) {
                const value = await validateTrack(inputValue);                if (value) {
                  // Track successful content validation/selection with service-specific tracking
                  if (activeService === 'spotify') {
                    trackSpotifySongSelected({
                      title: value.track || '',
                      artist: value.artist?.[0]?.name || '',
                      url: value.trackURL || inputValue,
                      id: value.id || '',
                    }, 'paste_link');
                  } else {
                    trackContentSelected({
                      title: value.track || '',
                      artist: value.artist?.[0]?.name || '',
                      url: value.trackURL || inputValue,
                      id: value.id || '',
                      method: 'paste_link'
                    }, activeService);
                  }

                  if (value.length > 0) {
                    context.addAlbum(value, campaign);
                  } else {
                    context.addCampaign(value, campaign);
                  }

                  setModal({
                    visible: true,
                    status: 'succes',
                    message: 'Song found!',
                  });

                  callback && callback(value);

                  setinputValue('');
                  if (redirect.redirect == true && redirect.url) {
                    router.push(redirect.url);
                  } else {
                    if (
                      !router.pathname.includes('/campaigns/') &&
                      !router.pathname.includes('/welcome')
                    ) {
                      router.push('/campaigns/spotify-promotion');
                    }
                  }
                } else {
                  setValidate(value);
                  setModal({
                    visible: true,
                    status: 'Failed!',
                    message: 'We could not find your song.',
                  });
                }
              } else {                const data = await searchTrack(inputValue);                if (data.length != 0) {
                  // Track successful search results with service-specific tracking
                  if (activeService === 'spotify') {
                    trackSpotifySongSearch(inputValue, 'search_results_found', { results_count: data.length });
                  } else {
                    trackContentSearch(inputValue, activeService, 'search_results_found');
                  }
                  setResults({ service: activeService, items: data });
                } else {
                  if (inputValue !== '') {
                    setModal({
                      visible: true,
                      status: 'Failed!',
                      message: 'We could not find your song.',
                    });
                  }

                  setResults({ service: activeService, items: [] });
                }
              }
              setLoading(false);
            }, 200);
            return () => clearTimeout(timerSpotify);
          case 'soundcloud':
            const timerSoundcloud = setTimeout(async () => {
              if (
                inputValue.includes('soundcloud.com') ||
                inputValue.includes('soundcloud.app.goo.gl')
              ) {
                //Modify values to match soundcoud URL
                context.addCampaign(
                  {
                    name: 'Track validated',
                    succes: true,
                    service: 'soundcloud',
                    campaignObject: {
                      id: inputValue,
                      track: inputValue.split('&')[0],
                      trackURL: inputValue,
                      image: logo,
                      artist: [{ name: 'Various' }],
                      campaign: [],
                    },
                    object: {},
                  },
                  campaign
                );
                if (redirect.redirect == true && redirect.url) {
                  router.push(redirect.url);
                } else {
                  if (!router.pathname.includes('/campaigns/')) {
                    router.push(
                      '/campaigns/' +
                        (activeService == 'spotify'
                          ? 'spotify-promotion'
                          : activeService)
                    );
                  }
                }
              } else {
                setError({
                  message:
                    'Whoops! Could you give us a SoundCloud track link instead?',
                });
              }
              setLoading(false);
            }, 400);
            return () => clearTimeout(timerSoundcloud);
          case 'youtube':
            const timerYoutube = setTimeout(async () => {
              if (inputValue.includes('youtube.com')) {
                const value = await validateTrackYoutube(inputValue);
                if (value) {
                  context.addCampaign(
                    {
                      name: 'Track validated',
                      succes: true,
                      service: 'youtube',
                      campaignObject: {
                        id: value.id,
                        track: value.snippet.title,
                        trackURL: 'https://www.youtube.com/watch?v=' + value.id,
                        image: value.snippet.thumbnails.medium.url,
                        artist: [{ name: value.snippet.channelTitle }],
                        campaign: [],
                      },
                      object: value,
                    },
                    campaign
                  );

                  setModal({
                    visible: true,
                    status: 'succes',
                    message: 'Song found!',
                  });

                  if (redirect.redirect == true && redirect.url) {
                    router.push(redirect.url);
                  } else {
                    if (!router.pathname.includes('/campaigns/')) {
                      router.push(
                        '/campaigns/' +
                          (activeService == 'spotify'
                            ? 'spotify-promotion'
                            : activeService)
                      );
                    }
                  }
                } else {
                  setValidate(value);
                }
              } else {
                const data = await searchTrackYoutube(inputValue);
                if (data && data.length != 0) {
                  setResults({ service: activeService, items: data });
                } else {
                  if (inputValue !== '') {
                    setModal({
                      visible: true,
                      status: 'Failed!',
                      message: 'We could not find your song.',
                    });
                  }

                  setResults({ service: activeService, items: [] });
                }
              }
              setLoading(false);
            }, 200);
            return () => clearTimeout(timerYoutube);
          case 'tiktok':
            const timerTiktok = setTimeout(async () => {
              if (inputValue.includes('tiktok.com')) {
                //Modify values to match soundcoud URL
                context.addCampaign(
                  {
                    name: 'Track validated',
                    succes: true,
                    service: 'tiktok',
                    campaignObject: {
                      id: inputValue,
                      track: inputValue.split('&')[0],
                      trackURL: inputValue,
                      image: logo,
                      artist: [{ name: 'Various' }],
                      campaign: [],
                    },
                    object: {},
                  },
                  campaign
                );
                if (redirect.redirect == true && redirect.url) {
                  router.push(redirect.url);
                } else {
                  if (!router.pathname.includes('/campaigns/')) {
                    router.push(
                      '/campaigns/' +
                        (activeService == 'spotify'
                          ? 'spotify-promotion'
                          : activeService)
                    );
                  }
                }
              } else {
                setError({
                  message:
                    'Whoops! Could you give us your TikTok link instead? ',
                });
              }
              setLoading(false);
            }, 400);
            return () => clearTimeout(timerTiktok);
        }
      }, 200);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [inputValue]);
  useEffect(() => {
    let selectedEntry;
    if (clickedItem) {
      window.scrollTo(0, 0); // Scroll to top when an item is clicked
      (async () => {
        switch (clickedItem.service) {
          case 'spotify':
            const genres = await getGenre(clickedItem.result.artists);

            selectedEntry = {
              name: 'Track validated',
              succes: true,
              service: clickedItem.service,
              campaignObject: {
                id: clickedItem.result.id,
                track: clickedItem.result.name,
                trackURL: clickedItem.result.external_urls.spotify,
                image: clickedItem.result.album.images[0].url,
                artist: clickedItem.result.album.artists,
                genre: genres,
                campaign: [],
              },
              object: clickedItem.result,
            };
            
            // Track content selection from search results with service-specific tracking
            if (activeService === 'spotify') {
              trackSpotifySongSelected({
                title: clickedItem.result.name,
                artist: clickedItem.result.album.artists?.[0]?.name || '',
                url: clickedItem.result.external_urls.spotify,
                id: clickedItem.result.id,
                duration_ms: clickedItem.result.duration_ms,
                popularity: clickedItem.result.popularity
              }, 'search_result_click');
            } else {
              trackContentSelected({
                title: clickedItem.result.name,
                artist: clickedItem.result.album.artists?.[0]?.name || '',
                url: clickedItem.result.external_urls.spotify,
                id: clickedItem.result.id,
                method: 'search_result_click'
              }, activeService);
            }

            await context.addCampaign(selectedEntry, campaign);

            callback && callback(selectedEntry);

            break;
          case 'youtube':
            await context.addCampaign(
              {
                name: 'Track validated',
                succes: true,
                service: clickedItem.service,
                campaignObject: {
                  id: clickedItem.result.id.videoId,
                  track: clickedItem.result.snippet.title,
                  trackURL:
                    'https://www.youtube.com/watch?v=' +
                    clickedItem.result.id.videoId,
                  image: clickedItem.result.snippet.thumbnails.high.url,
                  artist: [{ name: clickedItem.result.snippet.channelTitle }],
                  genre: {},
                  campaign: [],
                },
                object: clickedItem.result,
              },
              campaign
            );
            break;
          case 'soundcloud':
            await context.addCampaign(
              {
                name: 'Track validated',
                succes: true,
                service: clickedItem.service,
                campaignObject: {
                  id: clickedItem.result.id,
                  track: clickedItem.result.title,
                  trackURL: clickedItem.result.permalink_url,
                  image: clickedItem.result.artwork_url
                    ? clickedItem.result.artwork_url
                    : logo,
                  artist: [{ name: clickedItem.result.user.username }],
                  genre: {},
                  campaign: [],
                },
                object: clickedItem.result,
              },
              campaign
            );
            break;
        }

        if (redirect == true) {
          if (redirect.url) {
            router.push(redirect.url);
          } else {
            if (!router.pathname.includes('/campaigns/')) {
              router.push(
                '/campaigns/' +
                  (activeService == 'spotify'
                    ? 'spotify-promotion'
                    : activeService)
              );
            }
          }
        }

        setclickedItem('');
        setModal({
          visible: true,
          status: 'succes',
          message: 'Song found!',
        });

        //execute callback when it is defined
        callback && callback();
      })();
      setResults({ service: activeService, items: [] });
      setinputValue('');
    }
  }, [clickedItem]);

  return (
    <>
      <div
        className={styles.trackUrl}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='relative w-full'>
          {validate != undefined && validate.succes == true ? (
            <i className={[styles.icon, styles.validated__spotify].join(' ')}>
              <Checkmark />
            </i>
          ) : validate != undefined && validate.succes == false ? (
            <i className={[styles.icon, styles.validated__failed].join(' ')}>
              <Cross />
            </i>
          ) : (
            <i
              style={{
                backgroundColor:
                  activeService == 'spotify'
                    ? '#1db954'
                    : activeService == 'soundcloud'
                    ? '#ff5502'
                    : activeService == 'youtube'
                    ? '#ff0000'
                    : activeService == 'tiktok' && '#ff0050',
              }}
              className={[styles.icon, activeService].join(' ')}
            >
              <Link />
            </i>
          )}

          <div
            className={styles.animationContainer}
            onClick={() => (toggleAnimation(false), searchEl.current.focus())}
          >
            <input
              ref={searchEl}
              onChange={(event) => setinputValue(event.target.value)}
              value={inputValue}
              className={[
                styles.spotifySearch,
                validate != undefined &&
                  validate.succes == true &&
                  styles.validated,
              ].join(' ')}
              placeholder={!animation ? placeholder : null}
            />
            {animation && (
              <TypeAnimation
                className={styles.animation}
                cursor={true}
                sequence={[placeholder, 1000]}
                wrapper='p'
              />
            )}
            {loading == true && (
              <div className={styles.loaderContainer}>
                <Image width={25} height={25} src={loader} alt={''} />
              </div>
            )}
          </div>
        </div>
        {error?.message && (
          <em className={[styles.result, , 'text-red-600'].join(' ')}>
            {error.message}
          </em>
        )}

        {validate && (
          <em className={[styles.result].join(' ')}>{validate.track}</em>
        )}
        {results.service == activeService &&
          results.items.length != 0 &&
          (activeService == 'spotify' ? (
            <SpotifyResults addTrack={setclickedItem} results={results.items} />
          ) : (
            activeService == 'youtube' && (
              <YoutubeResults
                addTrack={setclickedItem}
                results={results.items}
              />
            )
          ))}
      </div>
    </>
  );
};

export default Search;
