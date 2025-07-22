/**
 * Spotify-specific GA4 Analytics tracking
 * Custom events for Spotify funnel tracking
 */

import { gtag, gtmPushEvent } from './gtm';
import { isTrackingEnabled, debugLog, ANALYTICS_CONFIG } from './config';

/**
 * Track Spotify funnel step - Main funnel tracking
 * @param {string} step - The funnel step (search, song_selection, campaign_config, checkout, completion)
 * @param {object} eventData - Additional event data
 */
export const trackSpotifyFunnelStep = (step, eventData = {}) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping Spotify funnel step:', { step, eventData });
    return;
  }

  const stepMapping = {
    search: 1,
    song_selection: 2,
    campaign_config: 3,
    checkout: 4,
    completion: 5
  };

  const baseData = {
    service: 'spotify',
    funnel_name: 'spotify_promotion',
    step_name: step,
    step_number: stepMapping[step] || 0,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
    ...eventData
  };

  // Send only to GA4 with exact event name
  gtag('event', 'spotify_funnel_step', {
    event_category: 'Spotify Promotion',
    event_label: `Step ${stepMapping[step]}: ${step}`,
    service: 'spotify',
    step_name: step,
    step_number: stepMapping[step],
    funnel_name: 'spotify_promotion',
    ...eventData
  });

  debugLog('Spotify funnel step tracked:', baseData);
};

/**
 * Track Spotify song search interactions
 * @param {string} searchQuery - The search query or URL
 * @param {string} searchType - Type of search (text_search, url_paste, voice_search)
 * @param {object} additionalData - Additional search data
 */
export const trackSpotifySongSearch = (searchQuery, searchType = 'text_search', additionalData = {}) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping Spotify song search:', { searchQuery, searchType });
    return;
  }

  const eventData = {
    search_query: searchQuery,
    search_type: searchType,
    search_method: searchQuery.includes('spotify.com') ? 'url_paste' : 'text_search',
    service: 'spotify',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
    ...additionalData
  };

  // Send only to GA4 with exact event name
  gtag('event', 'spotify_song_search', {
    event_category: 'Spotify Promotion',
    event_label: 'Song Search',
    search_term: searchQuery,
    service: 'spotify',
    search_type: searchType,
    search_method: eventData.search_method,
    ...additionalData
  });

  debugLog('Spotify song search tracked:', eventData);
};

/**
 * Track Spotify song selection
 * @param {object} songData - Song data (title, artist, url, etc.)
 * @param {string} selectionMethod - How the song was selected
 */
export const trackSpotifySongSelected = (songData, selectionMethod = 'click') => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping Spotify song selection:', { songData, selectionMethod });
    return;
  }

  const eventData = {
    song_title: songData.title || songData.name || '',
    song_artist: songData.artist || songData.artists?.[0]?.name || '',
    song_url: songData.url || songData.external_urls?.spotify || '',
    song_id: songData.id || '',
    song_duration: songData.duration_ms || 0,
    song_popularity: songData.popularity || 0,
    selection_method: selectionMethod,
    service: 'spotify',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString()
  };

  // Send only to GA4 with exact event name
  gtag('event', 'spotify_song_selected', {
    event_category: 'Spotify Promotion',
    event_label: 'Song Selected',
    service: 'spotify',
    song_title: eventData.song_title,
    song_artist: eventData.song_artist,
    selection_method: selectionMethod,
    value: 1
  });

  debugLog('Spotify song selected tracked:', eventData);
};

/**
 * Track Spotify campaign selection/configuration
 * @param {object} campaignData - Campaign configuration data
 */
export const trackSpotifyCampaignSelected = (campaignData) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping Spotify campaign selection:', { campaignData });
    return;
  }

  const eventData = {
    campaign_type: campaignData.type || campaignData.name || '',
    campaign_price: campaignData.price || 0,
    estimated_streams: campaignData.estimatedStreams || campaignData.estimatedResults || 0,
    estimated_reach: campaignData.estimatedReach || 0,
    campaign_features: campaignData.features || [],
    campaign_duration: campaignData.duration || 0,
    currency: campaignData.currency || 'USD',
    service: 'spotify',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString()
  };

  // Send only to GA4 with exact event name
  gtag('event', 'spotify_campaign_selected', {
    event_category: 'Spotify Promotion',
    event_label: 'Campaign Selected',
    service: 'spotify',
    campaign_type: eventData.campaign_type,
    estimated_streams: eventData.estimated_streams,
    value: eventData.campaign_price,
    currency: eventData.currency
  });

  debugLog('Spotify campaign selected tracked:', eventData);
};

/**
 * Track Spotify checkout initiation
 * @param {object} orderData - Order data
 */
export const trackSpotifyCheckoutStarted = (orderData) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping Spotify checkout:', { orderData });
    return;
  }

  const eventData = {
    total_value: orderData.total || orderData.price || 0,
    currency: orderData.currency || 'USD',
    items: orderData.items || [],
    order_id: orderData.orderId || orderData.id || '',
    checkout_step: 'initiation',
    service: 'spotify',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString()
  };

  // Send only to GA4 with exact event name
  gtag('event', 'spotify_checkout_started', {
    event_category: 'Spotify Promotion',
    event_label: 'Checkout Started',
    service: 'spotify',
    value: eventData.total_value,
    currency: eventData.currency,
    items: eventData.items
  });

  debugLog('Spotify checkout started tracked:', eventData);
};

/**
 * Track Spotify purchase completion
 * @param {object} purchaseData - Purchase completion data
 */
export const trackSpotifyPurchaseCompleted = (purchaseData) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping Spotify purchase completion:', { purchaseData });
    return;
  }

  const eventData = {
    transaction_id: purchaseData.transactionId || purchaseData.orderId || '',
    total_value: purchaseData.total || purchaseData.price || 0,
    currency: purchaseData.currency || 'USD',
    items: purchaseData.items || [],
    payment_method: purchaseData.paymentMethod || '',
    customer_id: purchaseData.customerId || '',
    service: 'spotify',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString()
  };

  // Send only to GA4 with exact event name
  gtag('event', 'spotify_purchase_completed', {
    event_category: 'Spotify Promotion',
    event_label: 'Purchase Completed',
    service: 'spotify',
    payment_method: eventData.payment_method,
    transaction_id: eventData.transaction_id,
    value: eventData.total_value,
    currency: eventData.currency
  });

  debugLog('Spotify purchase completed tracked:', eventData);
};

/**
 * Helper function to track Spotify page views with service context
 * @param {string} pagePath - Page path
 * @param {string} pageTitle - Page title
 */
export const trackSpotifyPageView = (pagePath, pageTitle) => {
  if (!isTrackingEnabled() || typeof window === 'undefined') {
    debugLog('Tracking disabled or SSR, skipping Spotify page view:', { pagePath, pageTitle });
    return;
  }

  // Send only to GA4 with exact event name
  gtag('event', 'spotify_page_view', {
    event_category: 'Spotify Promotion',
    event_label: 'Page View',
    page_path: pagePath,
    page_title: pageTitle,
    service: 'spotify',
    page_category: 'Spotify Promotion'
  });

  debugLog('Spotify page view tracked:', { pagePath, pageTitle });
};

/**
 * Track Spotify user interactions (button clicks, form submissions, etc.)
 * @param {string} action - The action performed
 * @param {object} interactionData - Additional interaction data
 */
export const trackSpotifyInteraction = (action, interactionData = {}) => {
  if (!isTrackingEnabled()) {
    debugLog('Tracking disabled, skipping Spotify interaction:', { action, interactionData });
    return;
  }

  const eventData = {
    interaction_type: action,
    service: 'spotify',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
    ...interactionData
  };

  gtag('event', 'spotify_interaction', {
    event_category: 'Spotify Promotion',
    event_label: action,
    custom_parameter_service: 'spotify',
    custom_parameter_interaction_type: action,
    ...interactionData
  });

  gtmPushEvent('spotify_interaction', {
    event: 'spotify_interaction',
    ...eventData
  });

  debugLog('Spotify interaction tracked:', eventData);
};
