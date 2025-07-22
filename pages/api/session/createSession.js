import { query } from '/lib/Database';

const handler = async (req, res) => {
  const { session_id, body } = req.body;

  try {
    const results = await query(
      `
      INSERT INTO active_sessions (session_id, body)
      VALUES (?, ?)
      `,
      [session_id, JSON.stringify(body)]
    );

    return res.status(200).json({ orderId: results.insertId });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
