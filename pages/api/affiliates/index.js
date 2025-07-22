import axios from 'axios';

const handler = async (req, res) => {
  const { randomString, orderObject } = req.body;

  try {
    const orderData = {
      cart_id: randomString,
      order_id: '#' + orderObject.order_id,

      currency_code: 'EUR',

      items: [
        {
          price: orderObject.totalPriceDetails.amount_EUR_incl_vat,
          quantity: 1,
          sku: 'Campaign',
          name: 'Campaign',
        },
      ],
    };

    const json_data = JSON.stringify(orderData);

    axios({
      method: 'post',
      url: 'https://inbound-webhooks.refersion.com/tracker/orders/paid',
      data: json_data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': json_data.length,
        'Refersion-Public-Key': process.env.NEXT_PUBLIC_REF_PUBLIC_KEY,
        'Refersion-Secret-Key': process.env.NEXT_PUBLIC_REF_SECRET_KEY,
      },
    }).then(
      (response) => {
        res.status(200).json(response.data);
      },
      (error) => {
        res.status(500).json(error.data);
      }
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
