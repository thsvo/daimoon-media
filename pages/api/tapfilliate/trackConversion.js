import axios from 'axios';
import Cookies from 'universal-cookie';

const handler = async (req, res) => {
  const { orderId, amount, click_id } = req.body;

  const json_data = JSON.stringify({
    click_id: click_id,
    external_id: orderId,
    amount: amount,
    currency: 'EUR',
  });

  try {
    return new Promise(async (resolve) => {
      axios({
        method: 'post',
        url: 'https://api.tapfiliate.com/1.6/conversions/',
        data: json_data,
        headers: {
          'Api-Key': process.env.NEXT_PUBLIC_TAP_API,
          'Content-Type': 'application/json',
        },
      }).then(
        (response) => {
          res.status(200).json('Succes!');
          resolve();
        },
        (error) => {
          res.status(500).json('Failed!');
          resolve();
        }
      );
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
