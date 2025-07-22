import { DatabaseAdapter } from '/lib/Database/Adapter/adapter';

const handler = async (req, res) => {
  const { resellerId } = req.body;
  const adapter = DatabaseAdapter();

  try {
    if (!resellerId) {
      return res.status(400).json({ message: '`resellerId` required' });
    }

    const result = await adapter.getResellerPackageById(resellerId);

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
