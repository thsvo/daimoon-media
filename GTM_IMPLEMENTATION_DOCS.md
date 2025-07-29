# Enhanced GTM Purchase Tracking Implementation

## Overview
This implementation adds comprehensive customer details and order information to Google Tag Manager (GTM) purchase events, including data for multiple advertising platforms (Google Ads, Facebook, TikTok, Pinterest, Snapchat).

## Files Modified

### 1. `/lib/Analytics/gtm.js`
- **Added:** `trackPurchaseWithCustomerDetails()` function
- **Purpose:** Sends enhanced purchase data to GTM with full customer details and multi-platform tracking

### 2. `/pages/thank-you/index.jsx`
- **Modified:** Updated import to include new tracking function
- **Modified:** Enhanced purchase tracking logic to extract and send customer details
- **Purpose:** Tracks completed purchases with full customer and order data

### 3. `/components/PaymentForm/index.jsx`
- **Added:** Console logging of customer details during form submission
- **Purpose:** Debug and verify customer data is being captured correctly

### 4. `/pages/api/analytics/trackPurchase.js` (New)
- **Purpose:** API endpoint for server-side logging of purchase tracking data

### 5. `/pages/test-gtm.jsx` (New)
- **Purpose:** Test page to validate GTM tracking implementation

## Data Structure Sent to GTM

The enhanced purchase event includes:

```javascript
{
  event: 'purchase',
  client_id: 'client_timestamp',
  event_id: 'purchase_orderID',
  time_stamp: '2025-01-01T12:00:00.000Z',
  time_stamp_unix: 1704110400,
  page_location: 'https://yourdomain.com/thank-you',
  page_path: '/thank-you',
  page_hostname: 'yourdomain.com',
  fired_from: 'custom_event',
  
  customer_info: {
    email: 'customer@example.com',
    phone: '+1234567890',
    first_name: 'John',
    last_name: 'Doe',
    address1: '123 Main St',
    country: 'Netherlands',
    city: 'Amsterdam',
    postal_code: '1012AB',
    date_of_birth: '1990-01-01'
  },
  
  ecommerce: {
    transaction_id: 'ORDER123',
    tax: 19.99,
    shipping: 0,
    value: 99.99,
    currency: 'EUR',
    payment_gateway: 'mollie',
    items: [
      {
        item_id: 'campaign_id',
        item_name: 'Song Title - Service Promotion',
        category: 'spotify', // or youtube, tiktok, soundcloud
        price: 49.99,
        quantity: 1
      }
    ]
  },
  
  google_ads: {
    remarketing: [
      {
        item_id: 'campaign_id',
        google_business_vertical: 'retail'
      }
    ]
  },
  
  facebook: {
    content_type: 'product_group',
    content_ids: ['campaign_id'],
    content_name: ['Song Title'],
    content_category: ['spotify'],
    value: 99.99,
    currency: 'EUR',
    num_items: 1,
    contents: [
      {
        id: 'campaign_id',
        quantity: 1,
        category: 'spotify',
        content_name: 'Song Title',
        content_type: 'product'
      }
    ]
  },
  
  tiktok: {
    content_type: 'product_group',
    content_id: ['campaign_id'],
    content_name: ['Song Title'],
    content_category: ['spotify'],
    value: 99.99,
    currency: 'EUR',
    quantity: 1,
    contents: [
      {
        content_id: 'campaign_id',
        content_type: 'product',
        content_name: 'Song Title',
        content_category: 'spotify',
        quantity: 1,
        price: 49.99
      }
    ]
  },
  
  pinterest: {
    product_ids: ['campaign_id'],
    product_names: ['Song Title'],
    value: 99.99,
    product_quantity: 1,
    product_category: ['spotify'],
    line_items: [
      {
        product_id: 'campaign_id',
        product_name: 'Song Title',
        product_category: 'spotify',
        product_price: 49.99,
        product_quantity: 1
      }
    ]
  },
  
  snapchat: {
    item_ids: ['campaign_id'],
    item_category: ['spotify'],
    price: 99.99,
    number_items: 1
  }
}
```

## Customer Data Fields Captured

The following customer information is extracted from `req.body` and sent to GTM:

- **email** - Customer's email address
- **phone** - Customer's phone number  
- **first_name** - Customer's first name
- **last_name** - Customer's last name
- **address1** - Customer's street address
- **country** - Customer's country
- **city** - Customer's city
- **postal_code** - Customer's postal/zip code
- **date_of_birth** - Customer's date of birth

## Order Data Fields Captured

- **transaction_id** - Unique order ID
- **value** - Total order value
- **currency** - Order currency (EUR)
- **tax** - Tax amount
- **shipping** - Shipping cost
- **payment_gateway** - Payment method used
- **items** - Array of purchased items with:
  - item_id (campaign ID)
  - item_name (song title + service)
  - category (service type: spotify, youtube, etc.)
  - price (item price)
  - quantity (always 1)

## How to Test

1. Visit `/test-gtm` page on your website
2. Open browser Developer Tools (F12)
3. Enable GTM Preview mode if available
4. Click the test button
5. Check console logs and GTM preview for the purchase event

## Console Logging

All tracking events are logged to the browser console for debugging:
- Enhanced Purchase Event data
- Customer Details
- Order Data
- Services array

## Integration Points

1. **Thank You Page** - Main tracking on successful payment
2. **Payment Form** - Debug logging during form submission
3. **API Endpoint** - Server-side logging for additional analytics
4. **Test Page** - Validation and testing interface

## Backwards Compatibility

The original `trackPurchaseCompleted()` function is still called alongside the new enhanced tracking to maintain compatibility with existing analytics setups.

## Error Handling

- Safe fallbacks for missing customer data
- Console warnings for failed API calls
- Graceful degradation if GTM is not available

## Security Notes

- No sensitive data (passwords, payment details) is sent to GTM
- Customer data is only sent on successful purchase completion
- All data is logged client-side for transparency
