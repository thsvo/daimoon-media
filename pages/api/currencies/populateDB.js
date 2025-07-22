import axios from 'axios';

import { query } from '/lib/Database';

const handler = async (req, res) => {
  const config = {
    method: 'get',
    url:
      'http://api.exchangeratesapi.io/v1/latest?access_key=' +
      process.env.NEXT_PUBLIC_CURRENCY_API_URL +
      '&base=EUR&symbols=EUR,USD',
    headers: {
      'Accept-Encoding': 'null',
    },
  };
  await axios(config)
    .then(({ data }) => {
      const rates = data.rates;

      Object.keys(rates).forEach(async function (code) {
        try {
          //If currency exists in DB; Update conversion
          const result = await query(
            `SELECT code FROM exchangerates WHERE code = ?`,
            code
          );
          if (!result.length == 0) {
            try {
              const result = await query(
                'UPDATE exchangerates SET timestamp = ' +
                  data.timestamp +
                  ',conversionrate = ' +
                  rates[code] +
                  ' WHERE code ="' +
                  code +
                  '"'
              );
            } catch (e) {
              res.status(500).json({ message: e.message });
            }
          } else {
            //Entry has not been found in DB so add it
            try {
              await query(
                `INSERT INTO exchangerates (timestamp, code, conversionrate) VALUES(
                ?,?,?
              )`,
                [data.timestamp, code, rates[code]]
              );
            } catch (e) {
              res.status(500).json({ message: e.message });
            }
          }
        } catch (e) {
          res.status(500).json({ message: e.message });
        }
      });

      res.status(200).json({ message: 'Updated database', data });
    })
    .catch(({ e }) => {
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
};
export default handler;
