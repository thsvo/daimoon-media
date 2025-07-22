import { DatabaseAdapter } from '/lib/Database/Adapter/adapter';

const handler = async (req, res) => {
  const { id } = req.body;

  const adapter = DatabaseAdapter();

  try {
    const result = await adapter.deletePackage(id);

    return res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
