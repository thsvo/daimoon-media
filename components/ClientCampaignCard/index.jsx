import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import ArrowNext from '/public/icons/arrow_next';

import styles from './clientcampaigncard.module.scss';

const ClientCampaignCard = (props) => {
  const { item } = props;
  const router = useRouter();

  console.log('item.track_name', item.track_name);

  return (
    <Link
      passHref={true}
      href={
        router.pathname + '/' + item.service.toLowerCase() + '/' + item.order_id
      }
    >
      <li className={[styles.container].join(' ')}>
        <div className={styles.CampaignInfo}>
          <div className={styles.imageContainer}>
            <Image
              src={item.image}
              layout={'fill'}
              objectFit={'cover'}
              alt={'art-cover'}
            />
          </div>
          <div className={styles.contentContainer}>
            <div>
              <label
                style={{
                  backgroundColor:
                    item.service == 'Spotify'
                      ? '#1ed760'
                      : item.service == 'SoundCloud'
                      ? '#f50'
                      : '#e00',
                }}
                className={styles.serviceLabel}
              >
                {item.service} promotion
              </label>
            </div>

            <h4>
              {item?.track_name?.length > 25
                ? item?.track_name?.substring(0, 25 - 3) + ' ...'
                : item?.track_name?.substring(0, 25)}
            </h4>

            <span className={styles.artist}>{item.track_artist}</span>
            <span className={styles.campaignId}>
              Campaign ID: {item.order_id}
            </span>
          </div>
        </div>
        <div className={styles.campaignDetails}>
          <span>{item.package}</span>
          {/* {item.campaignObject.campaign.map((campaign, index) => (
            <div key={index}>
              {campaign.value.text && item.service == 'spotify' ? (
                <>
                  <span>{campaign.value.text}</span>
                  <div className={styles.campaignTargets}>
                    <span>
                      Followers: {nFormatter(campaign.value.min_followers)} -{' '}
                      {nFormatter(campaign.value.max_followers)}
                    </span>
                    <span>
                      Streams: {nFormatter(campaign.value.min_streams)} -{' '}
                      {nFormatter(campaign.value.max_streams)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  
                </>
              )}
            </div>
          ))} */}
        </div>
        <div className={styles.CampaignDashboard}>
          <span>
            Go to Dashboard <ArrowNext color={'#FFFFFF'} />
          </span>
        </div>
      </li>
    </Link>
  );
};

export default ClientCampaignCard;
