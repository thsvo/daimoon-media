import { DatabaseAdapter } from '/lib/Database/Adapter/adapter';

const handler = async (req, res) => {
  const { email } = req.query;
  const adapter = DatabaseAdapter();
  try {
    if (!email) {
      return res.status(400).json({ message: '`email` required' });
    }

    const result = await adapter.getUserByEmail(email);

    if (result) {
      return res.json(result);
    } else {
      return res.json(null);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
