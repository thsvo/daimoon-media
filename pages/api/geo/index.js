const requestIp = require('request-ip');
import axios from 'axios';

const handler = (req, res) => {
  return new Promise((resolve) => {
    try {
      const clientIp =
        requestIp
          .getClientIp(req)
          .replace('::ffff:', '')
          .replace('::1', '')
          .replace('127.0.0.1', '') || '2a02:a44c:3212:1:fd8f:26c6:b152:5586';

      axios
        .get('http://ip-api.com/json/' + clientIp + '?fields=10547007')
        .then((resp) => {
          const result = {
            geo: resp.data,
            ip: clientIp,
            forwarded: req.headers['x-forwarded-for'],
          };
          res.status(200).json(result);
          resolve();
        });
    } catch (e) {
      res.status(500).json({ message: e.message });
      resolve();
    }
  });
};

export default handler;
