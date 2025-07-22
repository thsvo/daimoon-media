import { query } from '/lib/Database';

const handler = async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) {
      return res.status(400).json({ message: '`email` required' });
    }

    const results = await query(
      `
      SELECT *
      FROM orders
      WHERE contact_email = ?
    `,
      email
    );

    if (results[0]) {
      return res.json(results);
    } else {
      return res.json({ message: 'no order found' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
