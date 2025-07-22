import axios from 'axios';

const handler = async (req, res) => {
  const query = req.body;

  try {
    var config = {
      method: 'get',
      url: query.link,
      headers: {
        'Accept-Encoding': 'null',
      },
    };

    const result = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        res.status(500).json(error);
      });

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
};

export default handler;
