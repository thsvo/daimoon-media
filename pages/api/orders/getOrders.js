import { query } from '/lib/Database';

const handler = async (_, res) => {
  try {
    const results = await query(`
      SELECT * FROM orders
  `);

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
