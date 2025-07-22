import { query } from '/lib/Database';

const handler = (req, res) => {
  const { id } = req.query;

  return new Promise(async (resolve) => {
    try {
      if (!id) {
        res.status(400).json({ message: '`id` required' });
        resolve();
      }
      if (typeof parseInt(id.toString()) !== 'number') {
        res.status(400).json({ message: '`id` must be a number' });
        resolve();
      }

      const results = await query(
        `
      SELECT *
      FROM orders
      WHERE order_id = ?
    `,
        [id]
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
