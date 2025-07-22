import { query } from '/lib/Database';

const handler = (req, res) => {
  const { page, secret } = req.query;

  const pageNumber = parseInt(page);

  let offset = pageNumber * 10 - 10;

  return new Promise(async (resolve) => {
    if (req.headers.authorisation == process.env.NEXTAUTH_SECRET) {
      try {
        let rows;
        let rowCount;
        let results;

        rows = await query(
          `
            SELECT COUNT(*)
            FROM coupon_codes
          `
        );

        rowCount = rows[0]['COUNT(*)'];

        results = await query(
          `
            SELECT *
            FROM coupon_codes
            ORDER BY created_at DESC LIMIT ?,? 
          `,
          [offset, 10]
        );

        if (results) {
          res.json({
            meta: {
              success: true,
              totalCount: rowCount,
              pageCount: Math.round(rowCount / 10),
              currentPage: 1,
              perPage: 10,
            },
            result: results,
          });
          resolve();
        } else {
          res.status(418).json({ message: 'Not authorised' });
          resolve();
        }
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
