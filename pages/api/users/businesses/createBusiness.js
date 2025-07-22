import { authOptions } from '/pages/api/auth/[...nextauth]';

const handler = async (req, res) => {
  const { createBusiness } = authOptions.adapter;

  return new Promise(async (resolve) => {
    try {
      const test = await createBusiness();
      res.status(200).json(test);
      resolve();
    } catch (e) {
      res.status(200).json({ message: e.message });
      return resolve();
    }
  });
};

export default handler;
