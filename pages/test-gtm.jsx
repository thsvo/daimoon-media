import React from 'react';
import { trackPurchaseWithCustomerDetails } from '/lib/Analytics/gtm';

const GTMTestPage = () => {
  const testPurchaseTracking = () => {
    // Sample order data
    const orderData = {
      transactionId: 'TEST123456',
      total: 99.99,
      currency: 'EUR',
      tax: 19.99,
      shipping: 0,
      items: [
        {
          item_id: 'spotify_campaign_001',
          item_name: 'My Test Song - Spotify Promotion',
          category: 'spotify',
          price: 49.99,
          quantity: 1
        },
        {
          item_id: 'youtube_campaign_002',
          item_name: 'My Test Song - YouTube Promotion',
          category: 'youtube',
          price: 50.00,
          quantity: 1
        }
      ],
      paymentMethod: 'credit_card'
    };

    // Sample customer data
    const customerDetails = {
      email: 'test@example.com',
      phone: '+1234567890',
      first_name: 'John',
      last_name: 'Doe',
      address: '123 Test Street',
      country: 'Netherlands',
      city: 'Amsterdam',
      postal_code: '1012AB',
      date_of_birth: '1990-01-01'
    };

    const services = ['spotify', 'youtube'];

    // Track the test purchase
    trackPurchaseWithCustomerDetails(orderData, customerDetails, services);

    alert('Test purchase event sent to GTM! Check the browser console and GTM preview mode.');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>GTM Enhanced Purchase Tracking Test</h1>
      <p>This page allows you to test the enhanced GTM purchase tracking implementation.</p>
      
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Test Data:</h3>
        <ul>
          <li><strong>Transaction ID:</strong> TEST123456</li>
          <li><strong>Total:</strong> €99.99</li>
          <li><strong>Customer:</strong> John Doe (test@example.com)</li>
          <li><strong>Services:</strong> Spotify, YouTube</li>
          <li><strong>Items:</strong> 2 promotion campaigns</li>
        </ul>
      </div>

      <button 
        onClick={testPurchaseTracking}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007cba',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Test Enhanced GTM Purchase Tracking
      </button>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Open your browser's Developer Tools (F12)</li>
          <li>Go to the Console tab</li>
          <li>If you have GTM Preview mode enabled, open that as well</li>
          <li>Click the button above</li>
          <li>Check the console for logged data</li>
          <li>Check GTM Preview for the 'purchase' event</li>
        </ol>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '5px' }}>
        <h3>Expected Data Structure:</h3>
        <p>The GTM event will include:</p>
        <ul>
          <li>Customer info (email, phone, name, address, etc.)</li>
          <li>Ecommerce transaction details</li>
          <li>Google Ads remarketing data</li>
          <li>Facebook, TikTok, Pinterest, Snapchat tracking data</li>
          <li>Timestamp and page information</li>
        </ul>
      </div>
    </div>
  );
};

export default GTMTestPage;
