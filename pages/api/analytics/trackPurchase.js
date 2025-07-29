/**
 * API endpoint to receive purchase data from frontend and optionally 
 * forward to other analytics services if needed
 */

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderData, customerDetails, services } = req.body;

    // Log the received data for debugging
    console.log('Purchase tracking data received:');
    console.log('Order Data:', JSON.stringify(orderData, null, 2));
    console.log('Customer Details:', JSON.stringify(customerDetails, null, 2));
    console.log('Services:', services);

    // Here you can add any server-side analytics tracking if needed
    // For example, sending to server-side analytics services, databases, etc.

    // For now, we'll just log and return success
    // The actual GTM tracking happens on the frontend

    res.status(200).json({ 
      success: true, 
      message: 'Purchase tracking data logged successfully' 
    });

  } catch (error) {
    console.error('Error processing purchase tracking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process purchase tracking data',
      error: error.message 
    });
  }
};

export default handler;
