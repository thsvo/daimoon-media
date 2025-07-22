import { query } from '/lib/Database';

const handler = (req, res) => {
  const {
    values: { name, code, amount, type, stackable, reusable },
  } = req.body;

  let deal = '';

  if (type == '%') {
    deal = amount + '%';
  } else {
    deal = amount;
  }

  return new Promise(async (resolve) => {
    if (req.headers.authorisation == process.env.NEXTAUTH_SECRET) {
      try {
        await query(
          `INSERT INTO coupon_codes (name, code, amount, stackable, reusable) VALUES(
                ?,?,?,?,?
              )`,
          [name, code, deal, stackable, reusable]
        );
        res.status(200).json({ message: 'succes' });
        resolve();
      } catch (e) {
        res.status(500).json({ message: e.message });
        resolve();
      }
    } else {
      res.status(401).json({ message: 'Not authorised' });
      resolve();
    }
  });
};

export default handler;
