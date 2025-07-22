import { query } from '/lib/Database';

const handler = async (req, res) => {
  try {
    const results = await query(
      `
     SELECT expire_at, amount, name, reusable, used, stackable FROM coupon_codes WHERE code = ?`,
      req.body.coupon
    );

    if (results[0]) {
      //Check expiry date
      if (
        results[0].expire_at == null ||
        new Date(results[0].expire_at) > new Date()
      ) {
        if (results[0].reusable == 1) {
          res
            .status(200)
            .json({ message: 'Coupon found', result: results[0], status: 200 });
        } else {
          if (results[0].reusable == 0 && results[0].used == 0) {
            res.status(200).json({
              message: 'Coupon found',
              result: results[0],
              status: 200,
            });
          } else {
            res.status(300).json({ message: 'Coupon has already been used' });
          }
        }
      } else {
        res.status(300).json({ message: 'Coupon has expired' });
      }
    } else {
      res.status(400).json({ status: 400, message: 'No coupon found' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
