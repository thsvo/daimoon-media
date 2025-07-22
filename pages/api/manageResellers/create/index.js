import { DatabaseAdapter } from '/lib/Database/Adapter/adapter';

const handler = async (req, res) => {
  const { id } = req.body;
  const adapter = DatabaseAdapter();

  try {
    if (!id) {
      return res.status(400).json({ message: '`id` required' });
    }

    const result = await adapter.createReseller({ userId: id });

    return res.json(result);
  } catch (e) {
    const result = await adapter.getResellerByUserId(id);

    return res.json(result);
  }
};

export default handler;
