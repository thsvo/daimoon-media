import React, { useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import ShopContext from '/context/Order/shop-context';
import styles from './ExpressCheckout.module.scss';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ExpressCheckout = () => {
  const context = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [googlePayReady, setGooglePayReady] = useState(false);
  const [applePayReady, setApplePayReady] = useState(false);

  // Get price + VAT from context
  const price = context?.order?.totalPriceDetails?.amount_local_incl_vat || 0;
  const currency = 'EUR';

  useEffect(() => {
    // Check Google Pay availability
    if (window.google && window.google.payments) {
      const paymentsClient = new window.google.payments.api.PaymentsClient({
        environment: 'TEST' // Change to 'PRODUCTION' for live
      });

      paymentsClient.isReadyToPay({
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA']
          }
        }]
      }).then(response => {
        setGooglePayReady(response.result);
      }).catch(err => {
        console.log('Google Pay not available:', err);
      });
    }

    // Check Apple Pay availability
    if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
      setApplePayReady(true);
    }
  }, []);

  // Apple Pay handler
  const handleApplePay = async () => {
    if (!window.ApplePaySession) {
      console.log('Apple Pay not supported');
      return;
    }

    setLoading(true);
    try {
      const session = new ApplePaySession(3, {
        countryCode: 'US',
        currencyCode: currency,
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: 'Daimoon Campaign',
          amount: price.toString()
        }
      });

      session.onvalidatemerchant = async (event) => {
        // This would need your Apple Pay merchant validation endpoint
        console.log('Apple Pay validation needed');
        session.abort();
      };

      session.onpaymentauthorized = async (event) => {
        console.log('Apple Pay authorized:', event.payment);
        session.completePayment(ApplePaySession.STATUS_SUCCESS);
        // Process payment here
        window.location.href = '/thank-you';
      };

      session.begin();
    } catch (error) {
      console.error('Apple Pay error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Google Pay handler
  const handleGooglePay = async () => {
    if (!window.google || !window.google.payments) {
      console.log('Google Pay not available');
      return;
    }

    setLoading(true);
    try {
      const paymentsClient = new window.google.payments.api.PaymentsClient({
        environment: 'TEST' // Change to 'PRODUCTION' for live
      });

      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'stripe',
              'stripe:version': '2020-08-27',
              'stripe:publishableKey': process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            }
          }
        }],
        merchantInfo: {
          merchantId: 'BCR2DN4T2C6RFPQB', // Replace with your Google Pay merchant ID
          merchantName: 'Daimoon'
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: price.toString(),
          currencyCode: currency
        }
      };

      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      console.log('Google Pay payment data:', paymentData);
      
      // Process the payment token with your backend
      const response = await fetch('/api/payments/stripe/process-google-pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentData,
          amount: price,
          currency
        })
      });

      if (response.ok) {
        window.location.href = '/thank-you';
      }
    } catch (error) {
      console.error('Google Pay error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Stripe Link handler (redirect to Stripe)
  const handleStripeLink = async (method) => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/stripe/create-express-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: price,
          currency,
          method,
        }),
      });
      const data = await res.json();
      console.log('Express Checkout Data Sent:', { amount: price, currency, method });
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Express Checkout Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.expressCheckoutContainer}>
      <div className={styles.header}>Express checkout</div>
      <div className={styles.buttonRow}>
        <button
          className={styles.applePay}
          onClick={handleApplePay}
          disabled={loading || !applePayReady}
          style={{ opacity: applePayReady ? 1 : 0.5 }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M13.3 10.1C13.2 8.2 14.7 7.3 14.8 7.2C13.9 5.9 12.5 5.7 12 5.7C10.6 5.6 9.4 6.6 8.7 6.6C7.9 6.6 6.9 5.7 5.7 5.7C3.2 5.8 0.5 7.9 0.5 12.1C0.5 13.3 0.7 14.6 1.1 15.9C1.6 17.6 2.9 20.1 4.4 20C5.6 20 6.3 19.2 7.7 19.2C9.1 19.2 9.7 20 11 20C12.5 19.9 13.7 17.7 14.2 16C15.9 15.2 16.6 13.4 16.6 13.3C16.6 13.3 13.3 12 13.3 10.1ZM11.2 3.7C11.8 2.9 12.2 1.8 12.1 0.7C11.2 0.8 10.1 1.4 9.4 2.2C8.8 2.9 8.3 4 8.4 5.1C9.4 5.2 10.5 4.6 11.2 3.7Z" fill="white"/>
          </svg>
          <span>Pay</span>
        </button>
        <button
          className={styles.linkPay}
          onClick={() => handleStripeLink('link')}
          disabled={loading}
        >
          <span>Pay with</span>
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <path d="M7.05 0H0V16H7.05V0Z" fill="white"/>
            <path d="M8.4 0V16H15.45V0H8.4Z" fill="white"/>
            <path d="M16.8 0V16H23.85V0H16.8Z" fill="white"/>
            <path d="M25.2 0V16H32.25V0H25.2Z" fill="white"/>
          </svg>
          <span>link</span>
        </button>
        <button
          className={styles.googlePay}
          onClick={handleGooglePay}
          disabled={loading || !googlePayReady}
          style={{ opacity: googlePayReady ? 1 : 0.5 }}
        >
          <span>Buy with</span>
          <svg width="44" height="18" viewBox="0 0 44 18" fill="none">
            <path d="M19.7 9.2H25.9C25.7 10.7 25 11.9 23.9 12.7L27.6 15.6C29.8 13.6 31 10.6 31 7C31 6.4 30.9 5.8 30.8 5.2H19.7V9.2Z" fill="#4285F4"/>
            <path d="M10.7 10.7L9.6 11.6L6.2 14.2C8.5 18.6 12.9 21.5 19.7 21.5C23.1 21.5 25.9 20.4 27.6 15.6L23.9 12.7C22.9 13.3 21.5 13.7 19.7 13.7C16.4 13.7 13.6 11.6 12.7 8.7L10.7 10.7Z" fill="#34A853"/>
            <path d="M6.2 3.8C5.2 5.7 5.2 8.3 6.2 10.2V14.2C6.2 14.2 12.7 8.7 12.7 8.7C12.4 7.8 12.2 6.9 12.2 5.9C12.2 4.9 12.4 4 12.7 3.1L6.2 3.8Z" fill="#FBBC05"/>
            <path d="M19.7 4.3C21.7 4.3 23.5 5 24.9 6.3L28.1 3.1C25.9 1.1 23.1 0 19.7 0C12.9 0 8.5 2.9 6.2 7.3L12.7 11.1C13.6 8.2 16.4 6.1 19.7 6.1V4.3Z" fill="#EA4335"/>
          </svg>
          <span>Pay</span>
        </button>
      </div>
      <div className={styles.note}>
        *By using express checkout, we&apos;ll use your contact details from that provider
      </div>
      <div className={styles.divider}>
        <span>or pay another way</span>
      </div>
    </div>
  );
};

export default ExpressCheckout;
