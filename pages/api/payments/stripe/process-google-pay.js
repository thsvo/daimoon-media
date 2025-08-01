import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { paymentData, amount, currency = 'EUR', orderId } = req.body;

    console.log('Processing Google Pay payment with data:', {
      amount,
      currency,
      orderId,
      paymentData: paymentData ? 'received' : 'missing'
    });

    // Convert amount to cents (Stripe expects amounts in smallest currency unit)
    const amountInCents = Math.round(amount * 100);

    // Extract the payment method from Google Pay
    const paymentMethod = paymentData.paymentMethodData.tokenizationData.token;

    // Create payment intent with the Google Pay token
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      payment_method_data: {
        type: 'card',
        card: {
          token: JSON.parse(paymentMethod).id
        }
      },
      confirm: true,
      return_url: `${req.headers.origin}/thank-you?session_id=${orderId}`,
      description: `Order #${orderId}`,
      metadata: {
        orderId: orderId,
        paymentMethod: 'google_pay'
      }
    });

    console.log('Google Pay payment intent created:', paymentIntent.id);

    res.status(200).json({
      success: true,
      paymentIntent: paymentIntent.id,
      status: paymentIntent.status
    });
  } catch (error) {
    console.error('Error processing Google Pay payment:', error);
    res.status(500).json({ 
      message: 'Error processing payment',
      error: error.message 
    });
  }
}
