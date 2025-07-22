import { useContext } from 'react';
import Link from 'next/link';

import styles from './productcard.module.scss';

import ShopContext from '/context/Order/shop-context';

import Bin from '/public/icons/bin.jsx';
import Pencil from '/public/icons/pencil.jsx';

const ProductCard = (props) => {
  const { content, toggleModal, checkout } = props;
  const context = useContext(ShopContext);

  let totalValue = 0;

  const builder = () => {
    if (toggleModal) {
      toggleModal(false);
    }
  };

  function nFormatter(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const removeCampaign = async (id, activeService) => {
    await context.removeCampaign(id, activeService);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerHead}>
        {content.campaignObject?.release ? (
          <>
            <span>
              {content.campaignObject.release.text} -{' '}
              {content.campaignObject.track}
            </span>
          </>
        ) : (
          <span>
            {content.campaignObject.artist.map((artist) => artist.name)} -{' '}
            {content.campaignObject.track.length > 20
              ? content.campaignObject.track.substring(0, 20 - 3) + ' ...'
              : content.campaignObject.track.substring(0, 20)}
          </span>
        )}

        {checkout == false && (
          <div className={styles.edit}>
            <Link
              passHref={true}
              href={{
                pathname: '/campaigns/overview',
                query: { service: content.service, id: content.id },
              }}
            >
              <i onClick={() => builder()}>
                <Pencil />
              </i>
            </Link>

            <i onClick={() => removeCampaign(content.id, content.service)}>
              <Bin />
            </i>
          </div>
        )}
      </div>
      {checkout == true && <div className={styles.orderId}>{content.id}</div>}
      <div className={styles.campaign}>
        {content.campaignObject.campaign.length != 0 &&
          content.campaignObject.campaign.map((item, index) =>
            content.service == 'spotify' ? (
              <>
                <div className={styles.campaign_row} key={index}>
                  <div>
                    <span>{item.value.text}</span>

                    <span>
                      {((totalValue = totalValue + item.value.cost),
                      Math.round(item.value.baseCostExcl * 100) / 100) +
                        ' ' +
                        context.order.currency.code}
                    </span>
                  </div>
                </div>

                {item.value.promotional && (
                  <div className={styles.campaign_row} key={index}>
                    <div>
                      <span>{item.value.promotional[0].promo.text}</span>

                      <span>
                        {Math.round(
                          item.value.promotional[0].promo.cost * 100
                        ) /
                          100 +
                          ' ' +
                          context.order.currency.code}
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className={styles.campaign_row} key={index}>
                  <div>
                    <label>
                      {item.label} - {nFormatter(item.value.text)}
                    </label>

                    <span>
                      {((totalValue = totalValue + item.value.cost),
                      Math.round(item.value.baseCostExcl * 100) / 100) +
                        ' ' +
                        context.order.currency.code}
                    </span>
                  </div>

                  {item.value.promotional && (
                    <div>
                      <span>{item.value.promotional[0].promo.text}</span>

                      <span>
                        {Math.round(
                          item.value.promotional[0].promo.cost * 100
                        ) /
                          100 +
                          ' ' +
                          context.order.currency.code}
                      </span>
                    </div>
                  )}

                  {item.value.targets && item.value.targets.length != 0 && (
                    <div className={styles.targetContainer}>
                      <label>
                        <b>Targets included:</b>
                      </label>
                      <ul className={styles.list}>
                        {item.value.targets.map((target, index) => (
                          <li key={index}>
                            <span>{target.text}</span> -{' '}
                            <span className={styles.price}>
                              {Math.round(target.costExcl * 100) / 100 +
                                ' ' +
                                context.order.currency.code}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )
          )}
      </div>
      {content.service == 'spotify' && content.campaignObject.campaign[0] && (
        <div className={styles.campaignValue}>
          <b>Est. Streams</b>
          <b>
            {nFormatter(content.campaignObject.campaign[0].value.min_streams)}{' '}
            to{' '}
            {nFormatter(content.campaignObject.campaign[0].value.max_streams)}{' '}
          </b>
        </div>
      )}
      <div className={styles.campaignValue}>
        <span>Total (excl. VAT) </span>
        <span>
          {Math.round(totalValue * 100) / 100 +
            ' ' +
            context.order.currency.code}
        </span>
      </div>
      {totalValue == 0 && (
        <div className={styles.overlay}>
          <p>
            No campaign saved. <br />
            <span>
              <Link
                passHref={true}
                href={{
                  pathname: '/campaigns/overview',
                  query: { service: content.service, id: content.id },
                }}
              >
                <i onClick={() => builder()}>Start building</i>
              </Link>
            </span>{' '}
            to continue.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
