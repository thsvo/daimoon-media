/**
 * Analytics Configuration
 * Update these IDs with your actual tracking IDs
 */

export const ANALYTICS_CONFIG = {
  // Google Tag Manager Container ID
  GTM_ID: 'GTM-KMMWDTX', // Replace with your GTM container ID
  
  // Google Analytics 4 Measurement ID
  GA_MEASUREMENT_ID: 'G-S3H7X2NYZP', // Replace with your GA4 measurement ID
  
  // Environment settings
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  
  // Enable/disable tracking in development
  ENABLE_IN_DEV: true,
  
  // Debug mode
  DEBUG: process.env.NODE_ENV === 'development',
};

// Check if tracking should be enabled
export const isTrackingEnabled = () => {
  if (typeof window === 'undefined') return false;
  
  if (ANALYTICS_CONFIG.ENVIRONMENT === 'development' && !ANALYTICS_CONFIG.ENABLE_IN_DEV) {
    return false;
  }
  
  return true;
};

// Log debug information
export const debugLog = (message, data = null) => {
  if (ANALYTICS_CONFIG.DEBUG && typeof console !== 'undefined') {
    console.log(`[Analytics Debug] ${message}`, data || '');
  }
};
