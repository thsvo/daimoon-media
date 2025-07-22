import axios from 'axios';

const handler = (req, res) => {
  const { id, list } = req.body;

  try {
    axios({
      method: 'post',
      url:
        'https://a.klaviyo.com/api/lists/' + list + '/relationships/profiles',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Klaviyo-API-Key ' + process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY,
        revision: '2024-05-15',
      },
      data: JSON.stringify({
        data: [{ type: 'profile', id: id }],
      }),
    })
      .then((response) => {
        console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch((e) => {
        console.log('error', e);
        res.status(200).json({ message: 'Failed to subscribe', e });
      });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
