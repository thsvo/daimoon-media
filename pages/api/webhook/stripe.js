import Stripe from 'stripe';
import { query } from '/lib/Database';
import { orderConfirmation } from '/lib/MailTemplates';
import { sendMail } from '/lib/Mailing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await handleSuccessfulPayment(paymentIntent);
      break;
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleSuccessfulCheckout(session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}

async function handleSuccessfulPayment(paymentIntent) {
  try {
    console.log('Processing successful Stripe payment:', paymentIntent.id);
    
    // Extract order ID from metadata or description
    const orderId = paymentIntent.metadata?.orderId || extractOrderIdFromDescription(paymentIntent.description);
    
    if (!orderId) {
      console.error('No order ID found in payment intent');
      return;
    }

    // Get customer information from Stripe if available
    let customerInfo = {};
    if (paymentIntent.customer) {
      try {
        const customer = await stripe.customers.retrieve(paymentIntent.customer);
        customerInfo = {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address
        };
      } catch (err) {
        console.error('Error retrieving customer:', err);
      }
    }

    await processSuccessfulOrder(orderId, paymentIntent.id, {
      ...paymentIntent,
      customer_info: customerInfo
    });
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleSuccessfulCheckout(session) {
  try {
    console.log('Processing successful Stripe checkout:', session.id);
    
    // Extract order ID from metadata
    const orderId = session.metadata?.orderId;
    
    if (!orderId) {
      console.error('No order ID found in checkout session');
      return;
    }

    // Get the payment intent from the session
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    
    // Get customer information from the session
    let customerInfo = {};
    if (session.customer_details) {
      customerInfo = {
        name: session.customer_details.name,
        email: session.customer_details.email,
        phone: session.customer_details.phone,
        address: session.customer_details.address
      };
    }
    
    await processSuccessfulOrder(orderId, session.id, {
      ...paymentIntent,
      checkout_session_id: session.id,
      payment_method_types: session.payment_method_types,
      customer_info: customerInfo
    });
  } catch (error) {
    console.error('Error handling successful checkout:', error);
  }
}

async function processSuccessfulOrder(orderId, paymentReference, stripePaymentObject) {
  try {
    const obj = await query(
      `SELECT * FROM orders WHERE order_id = ? AND status = ?`,
      [orderId, 'open']
    );

    if (obj.length === 0) {
      console.error('Failed to locate order in DB:', orderId);
      return;
    }

    const campaigns = obj[0].body.campaigns;

    campaigns.map((service) => {
      service.total > 0 &&
        service.campaigns.map((campaign) => {
          campaign.id = '#' + orderId + '-' + campaign.id;
        });
    });

    const orderObject = {
      ...obj[0].body,
      campaigns: campaigns,
      tstamp: Math.floor(Date.now() / 1000),
      order_id: orderId,
      totalPriceDetails: {
        ...obj[0].body.totalPriceDetails,
        paymentReference: paymentReference,
        stripePaymentObject: stripePaymentObject,
        // Keep compatibility with existing code that expects molliePaymentObject
        molliePaymentObject: {
          id: stripePaymentObject.id,
          status: 'paid',
          amount: {
            value: (stripePaymentObject.amount / 100).toFixed(2),
            currency: stripePaymentObject.currency.toUpperCase()
          },
          method: stripePaymentObject.payment_method_types?.[0] || 'card',
          description: stripePaymentObject.description || `Order #${orderId}`,
          createdAt: new Date(stripePaymentObject.created * 1000).toISOString()
        }
      },
    };

    // Check if coupon has been used
    if (orderObject.totalPriceDetails.coupons?.length > 0) {
      orderObject.totalPriceDetails.coupons.map((coupon) => {
        query(
          `UPDATE coupon_codes SET used = used + 1 WHERE name = ?`,
          [coupon.result.name]
        );
      });
    }

    // Extract customer info from Stripe payment object if available
    const customerInfo = stripePaymentObject.customer_info;
    let contact_name = obj[0].contact_name;
    let contact_email = obj[0].contact_email;
    
    // Use Stripe customer info if available and form data is missing or empty
    if (customerInfo) {
      if ((!contact_name || contact_name === '') && customerInfo.name) {
        contact_name = customerInfo.name;
      }
      if ((!contact_email || contact_email === '') && customerInfo.email) {
        contact_email = customerInfo.email;
      }
    }

    // Update DB entry with payment info and customer details
    const result = await query(
      `UPDATE orders SET payment_reference = ?, status = ?, body = ?, contact_name = ?, contact_email = ? WHERE order_id = ?`,
      [
        paymentReference,
        'paid',
        JSON.stringify(orderObject),
        contact_name,
        contact_email,
        orderId,
      ]
    );

    // Send order confirmation email
    const email = await orderConfirmation(
      orderId,
      contact_name,
      contact_email,
      orderObject
    );

    await sendMail({
      to: contact_email,
      subject: `Order Confirmation - #${orderId}`,
      html: email,
    });

    console.log(`Stripe order processed successfully: ${orderId}`);
  } catch (error) {
    console.error('Error processing successful order:', error);
  }
}

function extractOrderIdFromDescription(description) {
  if (!description) return null;
  
  // Try to extract order ID from description like "Order #12345" or "#12345"
  const match = description.match(/#(\d+)/);
  return match ? match[1] : null;
}

// Disable body parsing for webhook
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};