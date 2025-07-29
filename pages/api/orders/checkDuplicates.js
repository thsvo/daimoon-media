import { query } from '/lib/Database';

const handler = async (req, res) => {
  try {
    // Find all duplicate order IDs
    const duplicates = await query(`
      SELECT order_id, COUNT(*) as count, 
             GROUP_CONCAT(id) as internal_ids,
             MIN(created_at) as first_created,
             MAX(created_at) as last_created
      FROM orders 
      GROUP BY order_id 
      HAVING COUNT(*) > 1
      ORDER BY count DESC, order_id ASC
    `);

    // Get detailed information for each duplicate
    const detailedDuplicates = [];
    
    for (const duplicate of duplicates) {
      const details = await query(`
        SELECT id, order_id, contact_email, status, created_at, payment_reference
        FROM orders 
        WHERE order_id = ?
        ORDER BY created_at ASC
      `, [duplicate.order_id]);
      
      detailedDuplicates.push({
        order_id: duplicate.order_id,
        count: duplicate.count,
        first_created: duplicate.first_created,
        last_created: duplicate.last_created,
        records: details
      });
    }

    const totalDuplicateOrders = duplicates.reduce((sum, dup) => sum + dup.count, 0);
    const totalUniqueOrderIds = duplicates.length;

    res.json({
      summary: {
        total_duplicate_order_ids: totalUniqueOrderIds,
        total_duplicate_records: totalDuplicateOrders,
        examples: duplicates.slice(0, 10).map(d => d.order_id)
      },
      duplicates: detailedDuplicates
    });

  } catch (e) {
    console.error('Error checking duplicates:', e);
    res.status(500).json({ message: e.message });
  }
};

export default handler;
