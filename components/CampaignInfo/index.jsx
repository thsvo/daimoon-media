import Image from 'next/image';

import styles from './info.module.scss';

import Green from '/public/Spotlights/green.png';
import Orange from '/public/Spotlights/orange.png';
import Red from '/public/Spotlights/red.png';

const CampaignInfo = (props) => {
  const { content, activeService } = props;

  const color = { color: content.color };
  return (
    <>
      <div className={[styles.container]}>
        <h2 style={color}>{content.title}</h2>
        <span>{content.sub}</span>
        <ul className={styles.campaignTypes}>
          {content.items.map((item, index) => (
            <li key={index}>
              <i>
                <item.icon color={content.color} />
              </i>              <label dangerouslySetInnerHTML={{ __html: item.title }}></label>
              <span>{item.content}</span>
            </li>
          ))}        </ul>

        <div className={styles.spotlight}>
          <Image
            alt={''}
            width={600}
            height={800}
            src={
              activeService == 'spotify'
                ? Green
                : activeService == 'soundcloud'
                ? Orange
                : activeService == 'youtube' && Red
            }
            placeholder='blur'
          />
        </div>
      </div>
    </>
  );
};

export default CampaignInfo;
