import { useState } from 'react';

import ClientCampaignCard from '/components/ClientCampaignCard';
import ClientOrderCard from '/components/ClientOrderCard';

import styles from './clientDashboard.module.scss';

const ClientDashboard = (props) => {
  const { orders, type } = props;

  return (
    <div className={styles.container}>
      <ul className={styles.itemList}>
        {type == 'orders' &&
          orders.map((e, index) => <ClientOrderCard key={index} item={e} />)}
        {type == 'campaigns' &&
          orders.map((item, index) => (
            <ClientCampaignCard key={index} item={item} />
          ))}
      </ul>
    </div>
  );
};

export default ClientDashboard;
