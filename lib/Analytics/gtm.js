/**
 * Google Tag Manager and Google Analytics tracking utilities
 */

import { isTrackingEnabled, debugLog, ANALYTICS_CONFIG } from './config';

// Initialize dataLayer if it doesn't exist
export const initGTM = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
};

// Generic GTM event tracking
export const gtmPushEvent = (eventName, parameters = {}) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping GTM event:', { eventName, parameters });
    return;
  }

  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
    debugLog('GTM Event pushed:', { eventName, parameters });
  } else {
    debugLog('dataLayer not available, event not sent:', { eventName, parameters });
  }
};

// Google Analytics gtag function
export const gtag = (...args) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping gtag call:', args);
    return;
  }

  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(args);
    debugLog('gtag call:', args);
  } else {
    debugLog('dataLayer not available, gtag call not made:', args);
  }
};

// Universal funnel tracking for all services (spotify, youtube, tiktok, soundcloud)
export const trackFunnelStep = (step, service, eventData = {}) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping funnel step:', { step, service, eventData });
    return;
  }

  const baseData = {
    event: 'funnel_step',
    service: service, // spotify, youtube, tiktok, soundcloud
    funnel_name: `${service}_promotion`,
    step_number: step,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
    ...eventData
  };

  // Send to GTM
  gtmPushEvent('funnel_step', baseData);

  // Send to GA4 as a custom event
  gtag('event', 'funnel_step', {
    event_category: `${service.charAt(0).toUpperCase() + service.slice(1)} Promotion`,
    event_label: `Step ${step}`,
    custom_parameter_service: service,
    custom_parameter_step: step,
    custom_parameter_funnel: `${service}_promotion`,
    ...eventData
  });

  debugLog('Universal funnel step tracked:', baseData);
};

// Track song/content search for any service
export const trackContentSearch = (searchQuery, service, searchType = 'search') => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping content search:', { searchQuery, service, searchType });
    return;
  }

  const eventData = {
    step_name: 'content_search',
    search_query: searchQuery,
    search_type: searchType, // 'search', 'paste_link', 'search_results_found'
    service: service,
  };

  trackFunnelStep(1, service, eventData);

  // Additional search-specific event
  gtmPushEvent('content_search', {
    event: 'content_search',
    service: service,
    search_query: searchQuery,
    search_type: searchType,
  });

  debugLog('Content search tracked:', eventData);
};

// Track song/content found/selected for any service
export const trackContentSelected = (contentData, service) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping content selection:', { contentData, service });
    return;
  }

  const eventData = {
    step_name: 'content_selected',
    content_title: contentData.title || '',
    content_artist: contentData.artist || '',
    content_url: contentData.url || '',
    content_id: contentData.id || '',
    service: service,
    selection_method: contentData.method || 'unknown'
  };

  trackFunnelStep(2, service, eventData);

  // Additional content selection event
  gtmPushEvent('content_selected', {
    event: 'content_selected',
    service: service,
    ...eventData,
  });

  debugLog('Content selected tracked:', eventData);
};

// Track campaign selection/configuration for any service
export const trackCampaignSelected = (campaignData, service) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping campaign selection:', { campaignData, service });
    return;
  }

  const eventData = {
    step_name: 'campaign_selected',
    campaign_type: campaignData.type || '',
    campaign_price: campaignData.price || 0,
    estimated_results: campaignData.estimatedResults || '',
    campaign_features: campaignData.features || [],
    service: service,
  };

  trackFunnelStep(3, service, eventData);

  // Additional campaign selection event
  gtmPushEvent('campaign_selected', {
    event: 'campaign_selected',
    service: service,
    ...eventData,
  });

  debugLog('Campaign selected tracked:', eventData);
};

// Track checkout initiation for any service
export const trackCheckoutStarted = (orderData, services = []) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping checkout:', { orderData, services });
    return;
  }

  // Track for each service in the order
  services.forEach(service => {
    const eventData = {
      step_name: 'checkout_started',
      total_value: orderData.total || 0,
      currency: orderData.currency || 'USD',
      items: orderData.items || [],
      order_id: orderData.orderId || '',
      service: service,
    };

    trackFunnelStep(4, service, eventData);
  });

  // Enhanced ecommerce event for GA4
  gtag('event', 'begin_checkout', {
    currency: orderData.currency || 'USD',
    value: orderData.total || 0,
    items: orderData.items || [],
  });

  // Additional checkout event for GTM
  gtmPushEvent('checkout_started', {
    event: 'checkout_started',
    services: services,
    ...orderData,
  });

  debugLog('Checkout started tracked:', { orderData, services });
};

// Track purchase completion for any service
export const trackPurchaseCompleted = (orderData, services = []) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping purchase:', { orderData, services });
    return;
  }

  // Track for each service in the order
  services.forEach(service => {
    const eventData = {
      step_name: 'purchase_completed',
      transaction_id: orderData.transactionId || '',
      total_value: orderData.total || 0,
      currency: orderData.currency || 'USD',
      items: orderData.items || [],
      payment_method: orderData.paymentMethod || '',
      service: service,
    };

    trackFunnelStep(5, service, eventData);
  });

  // Enhanced ecommerce purchase event for GA4
  gtag('event', 'purchase', {
    transaction_id: orderData.transactionId || '',
    value: orderData.total || 0,
    currency: orderData.currency || 'USD',
    items: orderData.items || [],
  });

  // GTM purchase event
  gtmPushEvent('purchase_completed', {
    event: 'purchase_completed',
    services: services,
    ...orderData,
  });

  debugLog('Purchase completed tracked:', { orderData, services });
};

// Track page views
export const trackPageView = (pagePath, pageTitle) => {
  if (!isTrackingEnabled() || typeof window === 'undefined') {
    debugLog('Tracking disabled or SSR, skipping page view:', { pagePath, pageTitle });
    return;
  }

  gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: pageTitle,
  });

  gtmPushEvent('page_view', {
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
  });

  debugLog('Page view tracked:', { pagePath, pageTitle });
};

// Track form interactions
export const trackFormInteraction = (formName, action, fieldName = '') => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping form interaction:', { formName, action, fieldName });
    return;
  }

  gtmPushEvent('form_interaction', {
    event: 'form_interaction',
    form_name: formName,
    form_action: action, // 'focus', 'blur', 'submit', 'error'
    field_name: fieldName,
  });

  debugLog('Form interaction tracked:', { formName, action, fieldName });
};

// Track user engagement
export const trackEngagement = (engagementType, value = 1) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping engagement:', { engagementType, value });
    return;
  }

  gtag('event', 'engagement', {
    engagement_type: engagementType,
    value: value,
  });

  debugLog('Engagement tracked:', { engagementType, value });
};

// Track custom events
export const trackCustomEvent = (eventName, eventData = {}) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping custom event:', { eventName, eventData });
    return;
  }

  gtmPushEvent(eventName, {
    event: eventName,
    ...eventData,
  });

  gtag('event', eventName, eventData);

  debugLog('Custom event tracked:', { eventName, eventData });
};

// Helper function to get current service from URL or context
export const getCurrentService = () => {
  if (typeof window === 'undefined') return null;
  
  const pathname = window.location.pathname;
  
  if (pathname.includes('spotify')) return 'spotify';
  if (pathname.includes('youtube')) return 'youtube';
  if (pathname.includes('tiktok')) return 'tiktok';
  if (pathname.includes('soundcloud')) return 'soundcloud';
  
  return null;
};

// Helper function to get services from order data
export const getServicesFromOrder = (orderData) => {
  if (!orderData || !orderData.campaigns) return [];
  
  return orderData.campaigns.map(campaign => campaign.service || campaign.type).filter(Boolean);
};

// Legacy function names for backward compatibility
// These maintain the old API but use the new universal system

export const trackSpotifyFunnelEvent = (step, eventData = {}) => {
  trackFunnelStep(step, 'spotify', eventData);
};

export const trackSongSearch = (searchQuery, searchType = 'search') => {
  trackContentSearch(searchQuery, 'spotify', searchType);
};

export const trackSongFound = (songData) => {
  trackContentSelected({
    title: songData.title,
    artist: songData.artist,
    url: songData.url,
    id: songData.id,
    method: songData.method || 'unknown'
  }, 'spotify');
};

export const trackCampaignSelection = (campaignData) => {
  trackCampaignSelected({
    type: campaignData.type,
    price: campaignData.price,
    estimatedResults: campaignData.estimatedStreams,
    features: campaignData.features
  }, 'spotify');
};

// Enhanced purchase tracking with full customer details for GTM
export const trackPurchaseWithCustomerDetails = (orderData, customerDetails, services = []) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping enhanced purchase:', { orderData, customerDetails, services });
    return;
  }

  if (typeof window === 'undefined') {
    debugLog('Server-side rendering, skipping enhanced purchase tracking');
    return;
  }

  // Generate timestamp
  const timestamp = new Date().toISOString();
  const timestampUnix = Math.round(new Date().getTime() / 1000);

  // Prepare items array for the purchase
  const itemsArray = orderData.items || [];
  
  // Calculate totals
  const total = orderData.total || 0;
  const currency = orderData.currency || 'EUR';
  const totalQuantity = itemsArray.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Prepare content arrays for different platforms
  const contentId = itemsArray.map(item => item.item_id || '');
  const contentName = itemsArray.map(item => item.item_name || '');
  const contentCategory = itemsArray.map(item => item.category || '');

  // Facebook items
  const fbItems = itemsArray.map(item => ({
    id: item.item_id || '',
    quantity: item.quantity || 1,
    category: item.category || '',
    content_name: item.item_name || '',
    content_type: 'product'
  }));

  // TikTok items
  const tiktokItems = itemsArray.map(item => ({
    content_id: item.item_id || '',
    content_type: 'product',
    content_name: item.item_name || '',
    content_category: item.category || '',
    quantity: item.quantity || 1,
    price: item.price || 0
  }));

  // Pinterest items
  const pinterestItems = itemsArray.map(item => ({
    product_id: item.item_id || '',
    product_name: item.item_name || '',
    product_category: item.category || '',
    product_price: item.price || 0,
    product_quantity: item.quantity || 1
  }));

  // Google Ads items
  const gadsItems = itemsArray.map(item => ({
    item_id: item.item_id || '',
    google_business_vertical: 'retail'
  }));

  // Enhanced purchase event with customer details
  const enhancedPurchaseEvent = {
    event: 'purchase',
    client_id: `client_${Date.now()}`, // You can replace this with actual client ID if available
    event_id: `purchase_${orderData.transactionId || Date.now()}`,
    time_stamp: timestamp,
    time_stamp_unix: timestampUnix,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_hostname: window.location.hostname,
    fired_from: 'custom_event',
    customer_info: {
      email: customerDetails.email || '',
      phone: customerDetails.phone || '',
      first_name: customerDetails.first_name || customerDetails.fname || '',
      last_name: customerDetails.last_name || customerDetails.lname || '',
      address1: customerDetails.address || '',
      country: customerDetails.country || '',
      city: customerDetails.city || '',
      postal_code: customerDetails.postal_code || '',
      date_of_birth: customerDetails.date_of_birth || ''
    },
    ecommerce: {
      transaction_id: orderData.transactionId || '',
      tax: orderData.tax || 0,
      shipping: orderData.shipping || 0,
      value: total,
      currency: currency,
      payment_gateway: orderData.paymentMethod || 'unknown',
      items: itemsArray
    },
    google_ads: {
      remarketing: gadsItems
    },
    facebook: {
      content_type: 'product_group',
      content_ids: contentId,
      content_name: contentName,
      content_category: contentCategory,
      value: total,
      currency: currency,
      num_items: totalQuantity,
      contents: fbItems
    },
    tiktok: {
      content_type: 'product_group',
      content_id: contentId,
      content_name: contentName,
      content_category: contentCategory,
      value: total,
      currency: currency,
      quantity: totalQuantity,
      contents: tiktokItems
    },
    pinterest: {
      product_ids: contentId,
      product_names: contentName,
      value: total,
      product_quantity: totalQuantity,
      product_category: contentCategory,
      line_items: pinterestItems
    },
    snapchat: {
      item_ids: contentId,
      item_category: contentCategory,
      price: total,
      number_items: totalQuantity
    }
  };

  // Push to dataLayer
  if (window.dataLayer) {
    window.dataLayer.push(enhancedPurchaseEvent);
    
    // Console log for debugging
    console.log('Enhanced Purchase Event sent to GTM:', enhancedPurchaseEvent);
    console.log('Customer Details:', customerDetails);
    console.log('Order Data:', orderData);
    console.log('Services:', services);

    // Send to analytics API for server-side logging (optional)
    fetch('/api/analytics/trackPurchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderData,
        customerDetails,
        services
      })
    }).catch(error => {
      console.warn('Failed to send analytics data to server:', error);
    });
  }

  debugLog('Enhanced purchase tracking completed:', {
    orderData,
    customerDetails,
    services,
    enhancedPurchaseEvent
  });
};
