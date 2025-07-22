import createMollieClient from '@mollie/api-client';

const handler = async (req, res) => {
  const {
    id,
    orderId,
    method,
    currency,
    amount,
    updatedDetails: {
      fullname,
      email,
      company,
      address,
      city,
      country,
      countryCode,
      postal_code,
    },
  } = req.body;

  return new Promise((resolve) => {
    try {
      const mollieClient = createMollieClient({
        apiKey: process.env.NEXT_PUBLIC_Test_API_key,
      });

      mollieClient.payments
        .create({
          amount: {
            value: amount.toString(),
            currency: currency,
          },
          method: method,
          billingAddress: {
            streetAndNumber: address,
            city: city,
            country: countryCode ? countryCode : 'nl',
            postalCode: postal_code,
          },
          description:
            '#' + orderId + ' | ' + 'customer: ' + fullname + ' - ' + email,
          webhookUrl: process.env.NEXT_PUBLIC_BASE_URL_MOLLIE + 'api/webhook',
          redirectUrl:
            process.env.NEXT_PUBLIC_BASE_URL_MOLLIE + 'thank-you?id=' + id,
        })
        .then((payment) => {
          res.status(200).json(payment);
          resolve();
        })
        .catch((error) => {
          res.status(500).json({ message: error });
          return resolve();
        });
    } catch (e) {
      res.status(500).json({ message: e.message });
      return resolve();
    }
  });
};

export default handler;