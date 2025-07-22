/**
 * Example usage of Spotify-specific GA4 Analytics tracking
 * This file demonstrates how to use the Spotify analytics functions
 */

import {
  trackSpotifyFunnelStep,
  trackSpotifySongSearch,
  trackSpotifySongSelected,
  trackSpotifyCampaignSelected,
  trackSpotifyCheckoutStarted,
  trackSpotifyPurchaseCompleted,
  trackSpotifyPageView,
  trackSpotifyInteraction
} from '/lib/Analytics/spotifyAnalytics';

// Example usage in different scenarios:

// 1. Track main funnel steps
export const exampleFunnelTracking = () => {
  // When user lands on search page
  trackSpotifyFunnelStep('search', {
    step_name: 'search_page_loaded',
    page_title: 'Spotify Promotion'
  });

  // When user completes song selection
  trackSpotifyFunnelStep('song_selection', {
    step_name: 'song_selected',
    song_title: 'Example Song',
    song_artist: 'Example Artist'
  });

  // When user configures campaign
  trackSpotifyFunnelStep('campaign_config', {
    step_name: 'campaign_configured',
    campaign_type: 'Premium Package',
    campaign_price: 199
  });

  // When user starts checkout
  trackSpotifyFunnelStep('checkout', {
    step_name: 'checkout_initiated',
    total_value: 199
  });

  // When purchase is completed
  trackSpotifyFunnelStep('completion', {
    step_name: 'purchase_completed',
    transaction_id: 'order_12345'
  });
};

// 2. Track song search interactions
export const exampleSearchTracking = () => {
  // Text search
  trackSpotifySongSearch('Blinding Lights', 'text_search', {
    search_source: 'main_search_bar'
  });

  // URL paste
  trackSpotifySongSearch('https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b', 'url_paste', {
    search_source: 'main_search_bar'
  });

  // Search with results found
  trackSpotifySongSearch('The Weeknd', 'search_results_found', {
    results_count: 20
  });
};

// 3. Track song selection
export const exampleSongSelection = () => {
  const songData = {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    url: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b',
    id: '0VjIjW4GlUZAMYd2vXMi3b',
    duration_ms: 200040,
    popularity: 95
  };

  // From search results
  trackSpotifySongSelected(songData, 'search_result_click');

  // From pasted URL
  trackSpotifySongSelected(songData, 'paste_link');
};

// 4. Track campaign selection
export const exampleCampaignSelection = () => {
  const campaignData = {
    type: 'Premium Package',
    price: 199,
    estimatedStreams: 50000,
    estimatedReach: 200000,
    features: ['Playlist Placement', 'Blog Features', 'Social Media'],
    duration: 30,
    currency: 'USD'
  };

  trackSpotifyCampaignSelected(campaignData);
};

// 5. Track checkout process
export const exampleCheckoutTracking = () => {
  const orderData = {
    total: 199,
    currency: 'USD',
    items: [
      {
        id: 'spotify_premium_001',
        name: 'Spotify Premium Promotion',
        price: 199,
        quantity: 1
      }
    ],
    orderId: 'order_12345'
  };

  trackSpotifyCheckoutStarted(orderData);
};

// 6. Track purchase completion
export const examplePurchaseTracking = () => {
  const purchaseData = {
    transactionId: 'txn_12345',
    total: 199,
    currency: 'USD',
    items: [
      {
        id: 'spotify_premium_001',
        name: 'Spotify Premium Promotion',
        price: 199,
        quantity: 1
      }
    ],
    paymentMethod: 'credit_card',
    customerId: 'cust_67890'
  };

  trackSpotifyPurchaseCompleted(purchaseData);
};

// 7. Track page views
export const examplePageViewTracking = () => {
  trackSpotifyPageView('/campaigns/spotify-promotion', 'Spotify Promotion Landing Page');
  trackSpotifyPageView('/campaigns/spotify-promotion/builder', 'Spotify Campaign Builder');
  trackSpotifyPageView('/checkout', 'Spotify Checkout');
};

// 8. Track user interactions
export const exampleInteractionTracking = () => {
  // Button clicks
  trackSpotifyInteraction('button_click', {
    button_name: 'start_campaign',
    button_location: 'hero_section'
  });

  // Form submissions
  trackSpotifyInteraction('form_submit', {
    form_name: 'contact_form',
    form_step: 'completion'
  });

  // Video plays
  trackSpotifyInteraction('video_play', {
    video_title: 'Success Story - Artist Name',
    video_duration: 120
  });
};

// Real-world integration examples:

// In a React component button click handler
export const handleStartCampaignClick = () => {
  trackSpotifyInteraction('button_click', {
    button_name: 'start_campaign',
    button_location: 'hero_section'
  });
  
  // Navigate to campaign builder
  // router.push('/campaigns/spotify-promotion/builder');
};

// In a search component
export const handleSearchSubmit = (searchQuery) => {
  trackSpotifySongSearch(searchQuery, 'text_search', {
    search_source: 'main_search_bar'
  });
  
  // Perform actual search
  // performSearch(searchQuery);
};

// In a song selection component
export const handleSongSelect = (song) => {
  trackSpotifySongSelected({
    title: song.name,
    artist: song.artists[0].name,
    url: song.external_urls.spotify,
    id: song.id,
    duration_ms: song.duration_ms,
    popularity: song.popularity
  }, 'search_result_click');
  
  // Add song to campaign
  // addSongToCampaign(song);
};

// In a campaign builder component
export const handleCampaignSave = (campaign) => {
  trackSpotifyCampaignSelected({
    type: campaign.type,
    price: campaign.price,
    estimatedStreams: campaign.estimatedStreams,
    features: campaign.features
  });
  
  // Save campaign
  // saveCampaign(campaign);
};
