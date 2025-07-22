import { DatabaseAdapter } from '/lib/Database/Adapter/adapter';

const handler = async (req, res) => {
  const { id } = req.query;
  const adapter = DatabaseAdapter();

  try {
    if (!id) {
      return res.status(400).json({ message: '`id` required' });
    }

    const result = await adapter.getResellerByUserId(id);

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
