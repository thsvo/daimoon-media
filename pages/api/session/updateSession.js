import { query } from '/lib/Database';

const handler = async (req, res) => {
  const { session_id, body } = req.body;

  try {
    const results = await query(
      `UPDATE active_sessions SET body = ? WHERE session_id = ?`,
      [JSON.stringify(body), session_id]
    );

    return res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
