import { query } from '/lib/Database';

const handler = (req, res) => {
  const { id } = req.query;

  return new Promise(async (resolve) => {
    try {
      if (!id) {
        res.status(400).json({ message: '`id` required' });
        resolve();
        return;
      }
      
      const parsedId = parseInt(id.toString());
      if (isNaN(parsedId)) {
        res.status(400).json({ message: '`id` must be a valid number' });
        resolve();
        return;
      }

      console.log('Fetching order with ID:', parsedId);
      
      const results = await query(
        `
      SELECT *
      FROM orders
      WHERE order_id = ?
      ORDER BY id DESC
      LIMIT 1
    `,
        [parsedId]
      );

      console.log('Query results count:', results?.length);
      
      // Check for duplicate order IDs
      const duplicateCheck = await query(
        `
      SELECT COUNT(*) as count
      FROM orders
      WHERE order_id = ?
    `,
        [parsedId]
      );
      
      if (duplicateCheck[0]?.count > 1) {
        console.warn(`WARNING: Duplicate order_id found: ${parsedId} (${duplicateCheck[0].count} instances)`);
      }

      if (results && results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'no order found' });
      }
      resolve();
    } catch (e) {
      console.error('Database error:', e);
      res.status(500).json({ message: e.message, error: e.toString() });
      resolve();
    }
  });
};

export default handler;
