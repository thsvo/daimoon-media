import { query } from '/lib/Database';

const handler = async (req, res) => {
  const { contact_name, contact_email, body, status } = req.body;

  try {
    const results = await query(
      `
      INSERT INTO orders (contact_name, contact_email, body, status)
      VALUES (?, ?, ?, ?)
      `,
      [contact_name, contact_email, JSON.stringify(body), status]
    );

    return res.status(200).json({ orderId: results.insertId });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
