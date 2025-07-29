import { query } from '/lib/Database';

const handler = async (req, res) => {
  const { action } = req.body; // 'analyze' or 'fix'
  
  try {
    if (action === 'analyze') {
      // Analyze duplicate orders
      const duplicates = await query(`
        SELECT 
          order_id, 
          COUNT(*) as duplicate_count,
          GROUP_CONCAT(id ORDER BY created_at) as internal_ids,
          GROUP_CONCAT(status ORDER BY created_at) as statuses,
          MIN(created_at) as first_created,
          MAX(created_at) as last_created
        FROM orders 
        WHERE order_id IN (10075, 10134, 10101)
        GROUP BY order_id
        ORDER BY order_id
      `);
      
      return res.json({
        action: 'analyze',
        specific_duplicates: duplicates,
        recommendations: [
          'Keep the earliest created record (first_created)',
          'Merge data from duplicate records if needed',
          'Update payment references to point to the kept record',
          'Archive or delete duplicate records'
        ]
      });
      
    } else if (action === 'fix') {
      // This is a dry-run fix - shows what would be done
      const fixActions = [];
      
      for (const orderId of [10075, 10134, 10101]) {
        const duplicates = await query(`
          SELECT id, order_id, status, created_at, payment_reference
          FROM orders 
          WHERE order_id = ?
          ORDER BY created_at ASC
        `, [orderId]);
        
        if (duplicates.length > 1) {
          const keepRecord = duplicates[0]; // Keep the first/earliest
          const removeRecords = duplicates.slice(1);
          
          fixActions.push({
            order_id: orderId,
            keep_record: {
              internal_id: keepRecord.id,
              created_at: keepRecord.created_at,
              status: keepRecord.status
            },
            remove_records: removeRecords.map(r => ({
              internal_id: r.id,
              created_at: r.created_at,
              status: r.status,
              payment_reference: r.payment_reference
            }))
          });
        }
      }
      
      return res.json({
        action: 'fix_preview',
        fix_actions: fixActions,
        note: 'This is a preview. No changes have been made. Implement actual fixes carefully with proper backups.'
      });
      
    } else {
      return res.status(400).json({ 
        message: 'Invalid action. Use "analyze" or "fix"' 
      });
    }
    
  } catch (e) {
    console.error('Error in duplicate fix handler:', e);
    res.status(500).json({ message: e.message });
  }
};

export default handler;
