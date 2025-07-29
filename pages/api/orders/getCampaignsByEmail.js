import axios from 'axios';

const handler = (req, res) => {
  const { email, pageNumber, status, role } = req.body;

  return new Promise(async (resolve) => {
    try {
      var config = {
        method: 'get',
        url: `https://oms.daimoon.media/api/v1/orders_by_email2${
          role == 'admin' ? `?role=admin` : `?email=${email}`
        }&pp=10&p=${pageNumber}`,
        headers: {
          'Accept-Encoding': 'null',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_OMS_BEARER,
        },
      };

      const results = await axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return [];
        });

      if (results) {
        res.status(200).json(results);
        // res.json({
        //   meta: {
        //     success: true,
        //     totalCount: rowCount,
        //     pageCount: Math.round(rowCount / 10),
        //     currentPage: 1,
        //     perPage: 10,
        //   },
        //   result: results,
        // });
      } else {
        res.json({ message: 'no orders found' });
      }
      resolve();
    } catch (e) {
      res.status(500).json({ message: e.message, result: [] });
      resolve();
    }
  });
};

export default handler;