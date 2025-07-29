# GTM Tracking Events from PaymentForm

## Overview
The PaymentForm component now sends multiple GTM events throughout the checkout process, providing detailed tracking of user behavior and form submissions.

## Events Triggered

### 1. `checkout_step_completed` - Personal Details
**Triggered when:** User completes personal details step and moves to billing
**Data sent:**
```javascript
{
  event: 'checkout_step_completed',
  step_name: 'personal_details',
  step_number: 1,
  form_data: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    has_phone: true,
    has_birthday: true
  },
  timestamp: '2025-01-01T12:00:00.000Z'
}
```

### 2. `checkout_step_completed` - Billing Details  
**Triggered when:** User completes billing details step and moves to payment
**Data sent:**
```javascript
{
  event: 'checkout_step_completed',
  step_name: 'billing_details',
  step_number: 2,
  form_data: {
    address: '123 Main St',
    city: 'Amsterdam',
    postal_code: '1012AB',
    country: 'NL',
    is_business: false,
    has_vat_number: false,
    terms_accepted: true
  },
  timestamp: '2025-01-01T12:00:00.000Z'
}
```

### 3. `payment_method_selected`
**Triggered when:** User selects a payment method
**Data sent:**
```javascript
{
  event: 'payment_method_selected',
  step_name: 'payment_method_selection',
  step_number: 3,
  payment_method: 'Credit card',
  payment_method_id: 'creditcard',
  extra_cost_factor: 1.0282,
  order_total: 99.99,
  timestamp: '2025-01-01T12:00:00.000Z'
}
```

### 4. `checkout_form_submitted`
**Triggered when:** User submits the final payment form
**Data sent:**
```javascript
{
  event: 'checkout_form_submitted',
  form_step: 'payment_submission',
  customer_info: {
    email: 'john@example.com',
    phone: '+1234567890',
    first_name: 'John',
    last_name: 'Doe',
    address: '123 Main St',
    country: 'Netherlands',
    city: 'Amsterdam',
    postal_code: '1012AB',
    date_of_birth: '1990-01-01'
  },
  order_info: {
    total: 99.99,
    currency: 'EUR',
    payment_method: 'creditcard',
    order_id: '12345',
    items: [
      {
        item_id: 'campaign_123',
        item_name: 'My Song - Spotify Promotion',
        category: 'spotify',
        price: 49.99,
        quantity: 1
      }
    ]
  },
  timestamp: '2025-01-01T12:00:00.000Z'
}
```

## How to View in GTM

### Step-by-Step GTM Configuration

#### 1. Create Custom Event Triggers

**A. Create `checkout_step_completed` Trigger:**
1. In GTM, go to **Triggers** → **New**
2. **Trigger Configuration** → **Custom Event**
3. **Event name:** `checkout_step_completed`
4. **This trigger fires on:** All Custom Events
5. **Name:** "Checkout Step Completed"
6. **Save**

**B. Create `payment_method_selected` Trigger:**
1. **Triggers** → **New**
2. **Trigger Configuration** → **Custom Event**
3. **Event name:** `payment_method_selected`
4. **This trigger fires on:** All Custom Events
5. **Name:** "Payment Method Selected"
6. **Save**

**C. Create `checkout_form_submitted` Trigger:**
1. **Triggers** → **New**
2. **Trigger Configuration** → **Custom Event**
3. **Event name:** `checkout_form_submitted`
4. **This trigger fires on:** All Custom Events
5. **Name:** "Checkout Form Submitted"
6. **Save**

#### 2. Create Data Layer Variables

**A. Step Tracking Variables:**
1. Go to **Variables** → **New**
2. **Variable Configuration** → **Data Layer Variable**
3. **Data Layer Variable Name:** `step_name`
4. **Name:** "Step Name"
5. **Save**

Repeat for:
- `step_number` → "Step Number"
- `timestamp` → "Event Timestamp"

**B. Customer Info Variables:**
Create these Data Layer Variables:
- `customer_info.first_name` → "Customer First Name"
- `customer_info.last_name` → "Customer Last Name"  
- `customer_info.email` → "Customer Email"
- `customer_info.phone` → "Customer Phone"
- `customer_info.address` → "Customer Address"
- `customer_info.country` → "Customer Country"
- `customer_info.city` → "Customer City"
- `customer_info.postal_code` → "Customer Postal Code"
- `customer_info.date_of_birth` → "Customer Date of Birth"

**C. Order Info Variables:**
- `order_info.total` → "Order Total"
- `order_info.currency` → "Order Currency"
- `order_info.payment_method` → "Payment Method"
- `order_info.order_id` → "Order ID"
- `payment_method` → "Selected Payment Method"
- `payment_method_id` → "Payment Method ID"

**D. Form Data Variables:**
- `form_data.is_business` → "Is Business Customer"
- `form_data.has_vat_number` → "Has VAT Number"
- `form_data.terms_accepted` → "Terms Accepted"
- `form_data.has_phone` → "Has Phone Number"
- `form_data.has_birthday` → "Has Birthday"

#### 3. Configure Tags to Send Data

**A. Google Analytics 4 Event Tag:**

1. **Tags** → **New**
2. **Tag Configuration** → **Google Analytics: GA4 Event**
3. **Configuration Tag:** Select your GA4 Configuration tag
4. **Event Name:** `checkout_step_completed`
5. **Event Parameters:**
   ```
   step_name: {{Step Name}}
   step_number: {{Step Number}}
   customer_email: {{Customer Email}}
   customer_first_name: {{Customer First Name}}
   customer_last_name: {{Customer Last Name}}
   customer_country: {{Customer Country}}
   customer_city: {{Customer City}}
   payment_method: {{Payment Method}}
   order_total: {{Order Total}}
   currency: {{Order Currency}}
   is_business: {{Is Business Customer}}
   ```
6. **Triggering:** Select "Checkout Step Completed" trigger
7. **Name:** "GA4 - Checkout Step Completed"
8. **Save**

**B. Facebook Pixel Event Tag:**

1. **Tags** → **New**
2. **Tag Configuration** → **Custom HTML**
3. **HTML:**
   ```html
   <script>
   if (typeof fbq !== 'undefined') {
     fbq('track', 'InitiateCheckout', {
       content_name: 'Checkout Step: ' + {{Step Name}},
       content_category: 'checkout_funnel',
       value: {{Order Total}},
       currency: {{Order Currency}},
       email: {{Customer Email}},
       fn: {{Customer First Name}},
       ln: {{Customer Last Name}},
       country: {{Customer Country}},
       ct: {{Customer City}}
     });
   }
   </script>
   ```
4. **Triggering:** Select "Checkout Step Completed" trigger
5. **Name:** "Facebook - Checkout Step"
6. **Save**

**C. Google Ads Conversion Tag:**

1. **Tags** → **New**
2. **Tag Configuration** → **Google Ads Conversion Tracking**
3. **Conversion ID:** Your Google Ads Conversion ID
4. **Conversion Label:** Your conversion label
5. **Conversion Value:** `{{Order Total}}`
6. **Currency Code:** `{{Order Currency}}`
7. **Triggering:** Select "Checkout Form Submitted" trigger
8. **Name:** "Google Ads - Checkout Conversion"
9. **Save**

#### 4. Test Your Setup

**A. Enable Preview Mode:**
1. Click **Preview** in GTM
2. Enter your website URL
3. Navigate to checkout page

**B. Test Events:**
1. Fill out checkout form step by step
2. In GTM Preview, look for your custom events:
   - `checkout_step_completed`
   - `payment_method_selected`
   - `checkout_form_submitted`

**C. Verify Data:**
1. Click on each event in GTM Preview
2. Check **Data Layer** tab to see all variables
3. Check **Tags Fired** to see which tags triggered

#### 5. Advanced Configuration Examples

**A. Enhanced Ecommerce for GA4:**

Create a tag for detailed ecommerce tracking:
```javascript
// Tag Type: GA4 Event
// Event Name: begin_checkout
// Parameters:
currency: {{Order Currency}}
value: {{Order Total}}
items: {{Order Items}} // You'll need to create this as a Custom JavaScript variable
```

**B. Custom JavaScript Variable for Items Array:**

1. **Variables** → **New**
2. **Variable Configuration** → **Custom JavaScript**
3. **Custom JavaScript:**
   ```javascript
   function() {
     var orderInfo = {{order_info}};
     if (orderInfo && orderInfo.items) {
       return orderInfo.items.map(function(item) {
         return {
           item_id: item.item_id,
           item_name: item.item_name,
           item_category: item.category,
           price: item.price,
           quantity: item.quantity
         };
       });
     }
     return [];
   }
   ```
4. **Name:** "Order Items Array"
5. **Save**

#### 6. Debug Common Issues

**Problem:** Variables showing as "undefined"
- **Solution:** Check Data Layer Variable names match exactly
- Verify events are firing with correct data structure

**Problem:** Tags not firing
- **Solution:** Check trigger conditions
- Verify event names match exactly (`checkout_step_completed` not `checkout_step_complete`)

**Problem:** GA4 events not showing
- **Solution:** Check GA4 Configuration tag is set up
- Verify GA4 Measurement ID is correct
- Allow 24-48 hours for data to appear in GA4

#### 7. Publish Your Changes

1. Click **Submit** in GTM
2. Add **Version Name:** "Checkout Funnel Tracking v1.0"
3. Add **Version Description:** "Added checkout step tracking, payment method selection, and form submission events"
4. Click **Publish**
```javascript
// Step tracking variables
step_name -> Data Layer Variable: step_name
step_number -> Data Layer Variable: step_number

// Customer info variables
customer_first_name -> Data Layer Variable: customer_info.first_name
customer_last_name -> Data Layer Variable: customer_info.last_name
customer_email -> Data Layer Variable: customer_info.email
customer_phone -> Data Layer Variable: customer_info.phone
customer_address -> Data Layer Variable: customer_info.address
customer_country -> Data Layer Variable: customer_info.country
customer_city -> Data Layer Variable: customer_info.city
customer_postal_code -> Data Layer Variable: customer_info.postal_code

// Order info variables
order_total -> Data Layer Variable: order_info.total
order_currency -> Data Layer Variable: order_info.currency
payment_method -> Data Layer Variable: payment_method
order_id -> Data Layer Variable: order_info.order_id
```

### 3. Test the Implementation

#### Using the Test Button (Development Mode)
1. In development mode, you'll see a green "Test PaymentForm GTM" button
2. Click it to send test events to GTM
3. Check browser console and GTM Preview mode

#### Testing Real Flow
1. Go through the checkout process step by step
2. Each step completion will trigger GTM events
3. Check GTM Preview mode to see events fire in real-time

## Console Logging

All GTM events are also logged to the browser console for debugging:
```javascript
console.log('Testing PaymentForm GTM tracking...');
console.log('GTM test events sent! Check your browser console and GTM preview.');
```

## Integration with Existing Analytics

These PaymentForm events complement the purchase completion tracking from the thank-you page:

1. **PaymentForm Events** → Track checkout funnel progression
2. **Thank You Page Events** → Track final purchase completion with full details

This gives you complete visibility into:
- Where users drop off in the checkout process
- Which payment methods are most popular
- Customer demographic data at each step
- Complete purchase funnel analytics

## Event Flow Example

```
1. User fills personal details → checkout_step_completed (personal_details)
2. User fills billing details → checkout_step_completed (billing_details)  
3. User selects payment method → payment_method_selected
4. User submits form → checkout_form_submitted
5. Payment completes → purchase (from thank-you page)
```

This provides complete funnel tracking from start to finish!
