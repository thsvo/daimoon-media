import axios from 'axios';
import Image from 'next/image';

import styles from './soundcloud.module.scss';

const SearchSoundcloud = async (query) => {
  if (query) {
    const response = axios({
      method: 'post',
      url: '/api/validation/soundcloud/searchTrack?q=' + query,
    })
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });

    return response;
  } else {
    return [];
  }
};

const ValidateSoundcloud = async (query) => {
  const response = axios({
    method: 'post',
    url: '/api/validation/soundcloud/validateTrack',
    data: { link: query },
  })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  return response;
};

const SoundcloudResults = (props) => {
  const { results, addTrack } = props;

  return results.length != 0 ? (
    <ul className={styles.list}>
      {results &&
        results.map((result, index) => {
          return (
            <li
              key={index}
              onClick={() => addTrack({ service: 'soundcloud', result })}
            >
              {result.artwork_url && (
                <Image
                  alt='cover'
                  width='40'
                  height='40'
                  src={result.artwork_url}
                  lazy
                />
              )}

              <div className={styles.trackDetails}>
                <span>
                  <b>{result.title.substring(0, 25)}</b>
                </span>
                <span key={index}>{result.user.username}</span>
              </div>
            </li>
          );
        })}
    </ul>
  ) : null;
};

export { SearchSoundcloud, ValidateSoundcloud, SoundcloudResults };
