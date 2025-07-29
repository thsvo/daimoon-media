import { withTransaction } from '/lib/Database';

const handler = async (req, res) => {
  const { contact_name, contact_email, body, status } = req.body;

  try {
    const result = await withTransaction(async (connection) => {
      // Insert the new order
      const insertResult = await connection.query(
        `
        INSERT INTO orders (contact_name, contact_email, body, status)
        VALUES (?, ?, ?, ?)
        `,
        [contact_name, contact_email, JSON.stringify(body), status]
      );

      const orderId = insertResult[0].insertId;
      
      // Verify the order was created and get the actual order_id
      const verifyResult = await connection.query(
        'SELECT order_id FROM orders WHERE id = ?',
        [orderId]
      );
      
      if (!verifyResult[0] || verifyResult[0].length === 0) {
        throw new Error('Failed to verify order creation');
      }
      
      const actualOrderId = verifyResult[0][0].order_id;
      
      // Check if this order_id already exists in another record
      const duplicateCheck = await connection.query(
        'SELECT COUNT(*) as count FROM orders WHERE order_id = ? AND id != ?',
        [actualOrderId, orderId]
      );
      
      if (duplicateCheck[0][0].count > 0) {
        console.warn(`WARNING: Duplicate order_id detected during creation: ${actualOrderId}`);
        // You might want to implement additional logic here
      }
      
      console.log(`Order created successfully - Internal ID: ${orderId}, Order ID: ${actualOrderId}`);
      
      return actualOrderId;
    });

    return res.status(200).json({ orderId: result });
  } catch (e) {
    console.error('Order creation error:', e);
    res.status(500).json({ 
      message: e.message,
      error: 'Failed to create order safely'
    });
  }
};

export default handler;
