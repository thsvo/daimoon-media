import { query } from '/lib/Database';

const handler = async (req, res) => {
  const { customerCurrency } = req.query;
  try {
    const result = await query(
      `SELECT code, conversionrate FROM exchangerates WHERE code = ?`,
      customerCurrency
    );

    res.status(200).json(result[0]);
  } catch (e) {
    res.status(500).json({ message: 'Cant find Currency', server: e.message });
  }
};
export default handler;
