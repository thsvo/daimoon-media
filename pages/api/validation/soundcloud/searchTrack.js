import axios from 'axios';

const handler = async (req, res) => {
  const query = req.query.q;

  try {
    // if (!email) {
    //   return res.status(400).json({ message: '`email` required' });
    // }

    const url =
      'https://api-v2.soundcloud.com/search/tracks?q=' +
      query +
      '&client_id=VTKLSwABA4j1BsEj138QHEgxVWJHdobj&limit=20&offset=0&linked_partitioning=1&app_version=1653914350&app_locale=en';

    await axios
      .get(url)

      .then(({ data }) => {
        res.status(200).json(data.collection);
      })
      .catch(({ e }) => {
        res.status(500).json({ message: e.message });
      });
  } catch (e) {
    res.status(500).json([]);
  }
};

export default handler;
