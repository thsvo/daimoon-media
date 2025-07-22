import axios from 'axios';

const handler = async (req, res) => {
  const { ref } = req.body;

  const json_data = JSON.stringify({
    referral_code: ref,
  });

  try {
    return new Promise(async (resolve) => {
      axios({
        method: 'post',
        url: 'https://api.tapfiliate.com/1.6/clicks/',
        data: json_data,
        headers: {
          'Api-Key': process.env.NEXT_PUBLIC_TAP_API,
          'Content-Type': 'application/json',
        },
      }).then(
        (response) => {
          res.status(200).json(response.data);
          resolve();
        },
        (error) => {
          res.status(500).json('No ref present');
          resolve();
        }
      );
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
