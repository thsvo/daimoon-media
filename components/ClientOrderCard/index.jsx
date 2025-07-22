import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { generateInvoice } from '/lib/Invoice';

import ArrowNext from '/public/icons/arrow_next';
import Download from '/public/icons/download';

import styles from './clientOrderCard.module.scss';

const ClientOrderCard = (props) => {
  const { item } = props;
  const [loading, setLoading] = useState(false);

  const downloadInvoice = async (data) => {
    setLoading(true);
    await generateInvoice(data);
    setLoading('done');
  };

  return (
    <li className={[styles.container].join(' ')}>
      <div className={styles.orderInfo}>
        <div className={styles.CampaignInfo}>
          <label className={styles.orderNumber}>
            Order ID #{item.order_id}
          </label>
          <label>{item.updated_tstamp.split('T')[0]}</label>
        </div>
        <div className={styles.Campaigns}>
          {item.body.campaigns.map(
            (campaign, index) =>
              campaign.total >= 1 && (
                <label
                  key={index}
                  style={{
                    backgroundColor:
                      campaign.service == 'spotify'
                        ? '#1ed760'
                        : campaign.service == 'soundcloud'
                        ? '#f50'
                        : '#e00',
                  }}
                  className={styles.serviceLabel}
                >
                  <b>{campaign.service} promotion </b>({campaign.total}x)
                </label>
              )
          )}
        </div>
      </div>
      <div className={styles.CampaignActions}>
        {loading == false ? (
          <label onClick={() => downloadInvoice(item.body)}>
            Download receipt <Download />
          </label>
        ) : loading == true ? (
          <span>Generating invoice</span>
        ) : (
          <span>Invoice downloaded</span>
        )}

        {/* <label>
            Details <ArrowNext color={'#FFFFFF'} />
          </label> */}
      </div>
    </li>
  );
};

export default ClientOrderCard;
