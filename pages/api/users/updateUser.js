import { query } from '/lib/Database';

const handler = async (req, res) => {
  const { fields, id } = req.body;
  try {
    if (!fields) {
      return res.status(400).json({ message: '`fields` required' });
    }

    const columns = [];

    Object.keys(fields).map((e) => {
      columns.push(e + '=?');
    });

    const results = await query(`UPDATE users SET ${columns} WHERE id = ?`, [
      ...Object.values(fields),
      id,
    ]);

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
