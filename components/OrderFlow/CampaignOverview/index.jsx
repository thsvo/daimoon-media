import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

import CrossSell from '/components/OrderFlow/CrossSell';
import ShopContext from '/context/Order/shop-context';
import CampaignBuilder from '/components/OrderFlow/CampaignBuilder';
import ServiceSelector from '/components/OrderFlow/ServiceSelector';
import ServiceDashboard from '/components/OrderFlow/ServiceDashboard';

import styles from './overview.module.scss';

const CampaignOverview = (props) => {
  const { activeService } = props;

  const [crossSell, setcrossSell] = useState(false);
  const context = useContext(ShopContext);
  const router = useRouter();
  
  // Check if user is coming from a campaign page
  const isFromCampaignPage = router.pathname.includes('/campaigns/') && !router.pathname.includes('/campaigns/overview') && !router.pathname.includes('/campaigns/checkout');

  const startIndex = context.order.campaigns
    .find((o) => o.service == activeService)
    .campaigns.findIndex((i) => i.id == router.query.id);

  // Check if we should immediately show builder for campaign pages
  const shouldShowBuilder = () => {
    if (startIndex != -1) return true;
    if (isFromCampaignPage) {
      const serviceCampaigns = context.order.campaigns.find((o) => o.service == activeService);
      return serviceCampaigns && serviceCampaigns.campaigns.length > 0;
    }
    return false;
  };

  const [builder, setBuilder] = useState({
    toggle: shouldShowBuilder(),
    index: startIndex != -1 ? startIndex : 0,
  });

  const [service, setService] = useState(
    activeService ? activeService : 'spotify'
  );

  // Auto-transition to builder when campaigns are added from campaign pages
  useEffect(() => {
    if (isFromCampaignPage && !builder.toggle) {
      const serviceCampaigns = context.order.campaigns.find((o) => o.service == activeService);
      if (serviceCampaigns && serviceCampaigns.campaigns.length > 0) {
        const unfinishedIndex = serviceCampaigns.campaigns.findIndex((i) => i.campaignObject.campaign.length === 0);
        if (unfinishedIndex !== -1) {
          setBuilder({
            toggle: true,
            index: unfinishedIndex
          });
        }
      }
    }
  }, [isFromCampaignPage, context.order.campaigns, builder.toggle, activeService]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [breadcrumb]);

  return (
    <AnimatePresence
      mode='wait'
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      {builder.toggle == false ? (
        <div className={styles.overviewContainer}>
          {router.pathname.includes('/campaigns/overview') && (
            <div className={styles.serviceSelector}>
              <ServiceSelector service={service} setService={setService} />
            </div>
          )}
          {!router.pathname.includes('/campaigns/overview') &&
          crossSell == true ? (
            <CrossSell
              setcrossSell={setcrossSell}
              setBuilder={setBuilder}
              activeService={activeService}
              lastItem={
                context.order.campaigns.find((o) => o.service == activeService)
                  .campaigns.length
              }
            />
          ) : (
            <ServiceDashboard
              crossSell={crossSell}
              activeService={service}
              setBuilder={setBuilder}
              isFromCampaignPage={isFromCampaignPage}
            />
          )}
        </div>
      ) : (
        <CampaignBuilder
          unfinishedcampaigns={
            router.query.unfinishedCampaigns == true ? true : false
          }
          checkOut={router.query.id && true}
          startIndex={builder.index}
          setcrossSell={setcrossSell}
          activeService={service}
          toggleBuilder={setBuilder}
        />
      )}
    </AnimatePresence>
  );
};

export default CampaignOverview;
