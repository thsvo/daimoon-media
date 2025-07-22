import { useContext } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import daimoon_diamond from '/public/logo/daimoon-diamond.svg';
import Cross from '/public/icons/cross';

import ShopContext from '/context/Order/shop-context';

import ProductCard from '/components/ProductCard';

import styles from './cart.module.scss';

const CartModal = (props) => {
  const { setModal } = props;
  const context = useContext(ShopContext);

  const dropIn = {
    hidden: {
      x: '100vh',
      opacity: 0,
    },
    visible: {
      x: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      x: '100vh',
      opacity: 0,
    },
  };

  return (
    <div className={styles.modal}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setModal(false)}
        className={styles.overlay}
      ></motion.div>
      <motion.div
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        className={styles.container}
      >
        <div className={styles.content}>
          <div className={styles.header}>
            <h4>Your Campaigns</h4>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setModal(false)}
            >
              <Cross />
            </motion.div>
          </div>

          <section className={styles.cart}>
            <div className={styles.cartContent}>
              <div className={styles.cartLogo}>
                <Image fill src={daimoon_diamond} alt='DaimoonLogo' />
              </div>
              {context.order.totalPriceDetails.amount_local_incl_vat == 0 ? (
                <div className={styles.emptyCartText}>
                  <span>No campaigns in cart</span>
                </div>
              ) : (
                <div className={styles.campaigns}>
                  {context.order.campaigns.map(
                    (e) =>
                      e.campaigns != 0 &&
                      e.campaigns.map((item, index) => (
                        <section
                          key={index}
                          className={[
                            styles.serviceSection,
                            e.service == 'spotify'
                              ? styles.serviceSection_spotify
                              : e.service == 'youtube'
                              ? styles.serviceSection_youtube
                              : e.service == 'tiktok'
                              ? styles.serviceSection_tiktok
                              : e.service == 'soundcloud' &&
                                styles.serviceSection_soundcloud,
                          ].join(' ')}
                        >
                          <span className={styles.serviceSection__title}>
                            {e.service}
                          </span>

                          <ProductCard
                            service={e.service}
                            checkout={false}
                            toggleModal={setModal}
                            key={index}
                            content={item}
                          />
                        </section>
                      ))
                  )}
                </div>
              )}
            </div>
            <div className={styles.checkout}>
              {context.order.totalPriceDetails.discountInUSD != 0 ? (
                <>
                  <div className={styles.totalDiscount}>
                    <span>{`Your`} discount 💸</span>
                    <span
                      style={{ color: '#B165ED', textDecoration: 'underline' }}
                    >
                      -{' '}
                      {Math.round(
                        context.order.totalPriceDetails.discountInUSD
                      ) +
                        ' ' +
                        context.order.currency.code}
                    </span>
                  </div>
                  <div className={styles.totalAmount}>
                    <span style={{ fontWeight: 'normal' }}>
                      {context.order.totalPriceDetails &&
                      context.order.totalPriceDetails.VAT == 1.21
                        ? 'Total (incl. VAT):'
                        : 'Total (excl. VAT)'}
                    </span>
                    <span style={{ fontWeight: 'normal' }}>
                      {Math.round(
                        context.order.totalPriceDetails.amount_local_incl_vat
                      ) +
                        ' ' +
                        context.order.currency.code}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* <div className={styles.totalDiscount}>
                    <span>Needed For Discount 🤏</span>
                    <span style={{ textDecoration: 'underline' }}>
                      {Math.round(
                        150 -
                          context.order.totalPriceDetails.amount_local_incl_vat
                      ) +
                        ' ' +
                        context.order.currency.code}
                    </span>
                  </div> */}
                  <div className={styles.totalAmount}>
                    <span style={{ fontWeight: 'normal' }}>
                      {context.order.totalPriceDetails &&
                      context.order.totalPriceDetails.VAT == 1.21
                        ? 'Total (incl. VAT):'
                        : 'Total (excl. VAT)'}
                    </span>
                    <span style={{ fontWeight: 'normal' }}>
                      {Math.round(
                        context.order.totalPriceDetails.amount_local_incl_vat *
                          100
                      ) /
                        100 +
                        ' ' +
                        context.order.currency.code}
                    </span>
                  </div>
                </>
              )}

              <Link href='/campaigns/checkout' passHref={true}>
                <button
                  disabled={
                    context.order.totalPriceDetails.amount_local_incl_vat == 0
                      ? true
                      : false
                  }
                  className={styles.checkoutButton}
                  onClick={() => setModal(false)}
                >
                  Finish Order
                </button>
              </Link>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default CartModal;
