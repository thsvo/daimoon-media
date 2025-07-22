import { query } from '/lib/Database';

const handler = async (req, res) => {
  try {
    const result = await query(
      `SELECT code, conversionrate FROM exchangerates`
    );

    const currencies = [];

    Object.values(result).forEach(function (item) {
      currencies.push({
        code: item.code,
        conversion: item.conversionrate,
      });
    });

    res.status(200).json(currencies);
  } catch (e) {
    res.status(500).json(e);
  }
};
export default handler;
