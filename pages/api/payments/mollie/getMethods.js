import createMollieClient from '@mollie/api-client';

const handler = async (req, res) => {
  const { billingCountry, value, currency } = req.body;

  return new Promise((resolve) => {
    const mollieClient = createMollieClient({
      apiKey: process.env.NEXT_PUBLIC_Test_API_key,
    });

    try {
      mollieClient.methods
        .list({
          resource: 'payments',
          includeWallets: 'applepay',
          billingCountry: billingCountry,
          locale: 'en_US',
          amount: {
            value: value,
            currency: currency,
          },
        })

        .then((results) => {
          res.status(200).json(results);
          resolve();
        })
        .catch((error) => {
          res.status(500).json({ message: error });
          resolve();
        });
    } catch (e) {
      res.status(500).json({ message: e.message });
      resolve();
    }
  });
};

export default handler;
