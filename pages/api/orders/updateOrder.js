import { query } from '/lib/Database';

const handler = async (req, res) => {
  const { contact_name, contact_email, body, id } = req.body;

  try {
    const results = await query(
      `UPDATE orders SET contact_name = ?, contact_email = ?, body = ? WHERE order_id = ?`,
      [contact_name, contact_email, JSON.stringify(body), id]
    );

    return res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
