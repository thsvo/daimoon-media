import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'EUR', method } = req.body;

    console.log('Creating express checkout session with data:', {
      amount,
      currency,
      method
    });

    // Convert amount to cents (Stripe expects amounts in smallest currency unit)
    const amountInCents = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'], // Stripe will show Apple Pay, Google Pay, and Link automatically
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Daimoon Campaign',
              description: 'Music promotion campaign',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
      automatic_tax: { enabled: false },
    });

    console.log('Stripe session created successfully:', session.id);

    res.status(200).json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ 
      message: 'Error creating payment session',
      error: error.message 
    });
  }
}
