import { query } from '/lib/Database';

const handler = (req, res) => {
  const { hash } = req.query;

  return new Promise(async (resolve) => {
    try {
      if (!hash) {
        res.status(400).json({ message: '`hash` required' });
        resolve();
      }

      const results = await query(
        `
      SELECT *
      FROM orders
      WHERE hash = ?
    `,
        [hash]
      );

      if (results[0]) {
        res.json(results[0]);
      } else {
        res.json({ message: 'no order found' });
      }
      resolve();
    } catch (e) {
      res.status(500).json({ message: e.message });
      resolve();
    }
  });
};

export default handler;
