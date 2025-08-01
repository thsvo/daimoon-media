import { withTransaction } from '/lib/Database';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { campaigns, totalPriceDetails } = req.body;

  if (!campaigns || !totalPriceDetails) {
    return res.status(400).json({ 
      success: false,
      message: 'Missing required fields: campaigns and totalPriceDetails' 
    });
  }

  try {
    const result = await withTransaction(async (connection) => {
      // Create order body without contact details
      const orderBody = {
        campaigns,
        totalPriceDetails,
        tstamp: Math.floor(Date.now() / 1000)
      };

      // Insert the new order with empty contact details (they'll be populated from Stripe after payment)
      const insertResult = await connection.query(
        `
        INSERT INTO orders (contact_name, contact_email, body, status)
        VALUES (?, ?, ?, ?)
        `,
        ['', '', JSON.stringify(orderBody), 'open']
      );

      const orderId = insertResult[0].insertId;
      
      // Verify the order was created and get the actual order_id
      const verifyResult = await connection.query(
        'SELECT order_id FROM orders WHERE order_id = ?',
        [orderId]
      );
      
      if (!verifyResult[0] || verifyResult[0].length === 0) {
        throw new Error('Failed to verify order creation');
      }
      
      const actualOrderId = verifyResult[0][0].order_id;
      
      console.log(`Express checkout order created - Internal ID: ${orderId}, Order ID: ${actualOrderId}`);
      
      return actualOrderId;
    });

    return res.status(200).json({ 
      success: true,
      orderId: result 
    });
  } catch (e) {
    console.error('Express checkout order creation error:', e);
    res.status(500).json({ 
      success: false,
      message: e.message,
      error: 'Failed to create express checkout order'
    });
  }
};

export default handler;