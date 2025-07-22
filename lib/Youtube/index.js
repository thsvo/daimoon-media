//Helpers
import axios from 'axios';
import Image from 'next/image';

import styles from './youtube.module.scss';

const getData = async (url) => {
  const response = axios({
    method: 'get',
    url: url,
  })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return {};
    });
  return response;
};

const validateTrackYoutube = async (query) => {
  if (query) {
    const id = query.split('https://www.youtube.com/watch?v=').pop();
    const trackObject = await getData(
      'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=' +
        id +
        '&key=' +
        process.env.NEXT_PUBLIC_YOUTUBE_API_ID
    );

    if (trackObject) {
      return trackObject.items[0];
    } else {
      return 'Not found';
    }
  }
};

const searchTrackYoutube = async (query) => {
  if (query) {
    const trackObject = await getData(
      'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' +
        query +
        '&key=' +
        process.env.NEXT_PUBLIC_YOUTUBE_API_ID +
        '&type=video'
    );

    if (trackObject) {
      return trackObject.items;
    } else {
      return 'Not found';
    }
  }
};

const YoutubeResults = (props) => {
  const { results, addTrack } = props;

  return results.length != 0 ? (
    <ul className={styles.list}>
      {results &&
        results.map((result, index) => {
          return (
            <li
              key={index}
              onClick={() => addTrack({ service: 'youtube', result })}
            >
              <Image
                alt='cover'
                width='40'
                height='40'
                src={result.snippet.thumbnails.default.url}
                lazy
              />

              <div className={styles.trackDetails}>
                <span>
                  <b>{result.snippet.title.substring(0, 25)}</b>
                </span>
                <span>{result.snippet.channelTitle}</span>
              </div>
            </li>
          );
        })}
    </ul>
  ) : null;
};

export { searchTrackYoutube, validateTrackYoutube, YoutubeResults };
