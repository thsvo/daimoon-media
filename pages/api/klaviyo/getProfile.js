import axios from 'axios';

const handler = (req, res) => {
  const { profileId } = req.body;

  try {
    axios({
      method: 'get',
      url:
        'https://a.klaviyo.com/api/v1/person/' +
        profileId +
        '?api_key=' +
        process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      (response) => {
        res.status(200).json(response.data);
      },
      (error) => {
        res.status(500).json(error);
      }
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
