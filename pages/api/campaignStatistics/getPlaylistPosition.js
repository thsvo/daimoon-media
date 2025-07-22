//https://oms.daimoon.media/api/v1/spotify/order/dashboard/3947-SP-1?email=dennisvdspek1%40gmail.com&role=admin&playlist_id=4Xry6uMb2zRtuh17Q79LpA&position=true&positions=true

import axios from 'axios';

const handler = async (req, res) => {
  const { url } = req.body;

  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_OMS_BEARER,
        'Accept-Encoding': 'null',
      },
    };
    const result = await axios.get(url, config);

    res.status(200).json(result.data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
