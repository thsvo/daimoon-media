import { query } from '/lib/Database';

const handler = (req, res) => {
  const { email, page, status, role } = req.body;

  const pageNumber = parseInt(page);

  let offset = pageNumber * 10 - 10;

  return new Promise(async (resolve) => {
    try {
      let rows;
      let rowCount;
      let results;
      if (role == 'admin') {
        rows = await query(
          `
            SELECT COUNT(order_id)
            FROM orders WHERE status = ?
          `,
          [status]
        );

        rowCount = rows[0]['COUNT(order_id)'];

        results = await query(
          `
            SELECT *
            FROM orders
            WHERE status = ? ORDER BY order_id DESC LIMIT ?,? 
          `,
          [status, offset, 10]
        );
      } else {
        rows = await query(
          `
            SELECT COUNT(order_id)
            FROM orders WHERE contact_email = ? and status = ?
          `,
          [email, status]
        );

        rowCount = rows[0]['COUNT(order_id)'];

        results = await query(
          `
            SELECT *
            FROM orders
            WHERE contact_email = ? AND status = ? ORDER BY order_id DESC LIMIT ?,? 
          `,
          [email, status, offset, 10]
        );
      }

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
      } else {
        res.json({ message: 'no orders found' });
      }
      resolve();
    } catch (e) {
      res.status(500).json({ message: e.message });
      resolve();
    }
  });
};

export default handler;
