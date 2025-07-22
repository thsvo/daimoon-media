import { useEffect, useState } from 'react';

/**
 * Custom hook to handle Trustpilot widget loading with retry mechanism
 * Ensures the widget loads reliably even if the initial script load fails
 */
export const useTrustpilot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    let retryTimeout;

    const initializeTrustpilot = () => {
      if (window.Trustpilot && window.Trustpilot.loadFromElement) {
        try {
          const widgets = document.querySelectorAll('.trustpilot-widget');
          widgets.forEach(widget => {
            // Only initialize if not already initialized
            if (!widget.querySelector('iframe')) {
              window.Trustpilot.loadFromElement(widget, true);
            }
          });
          setIsLoaded(true);
        } catch (error) {
          console.warn('Trustpilot initialization error:', error);
          if (retryCount < maxRetries) {
            retryTimeout = setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 2000);
          }
        }
      } else if (retryCount < maxRetries) {
        // Trustpilot not available, retry
        retryTimeout = setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 1000);
      }
    };

    // Initial check
    initializeTrustpilot();

    // Listen for the trustpilot load event
    const handleTrustpilotLoad = () => {
      setTimeout(initializeTrustpilot, 100);
    };

    window.addEventListener('trustpilot-loaded', handleTrustpilotLoad);

    // Cleanup
    return () => {
      window.removeEventListener('trustpilot-loaded', handleTrustpilotLoad);
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [retryCount]);

  return { isLoaded, retryCount };
};

/**
 * Function to load Trustpilot script with retry mechanism
 * Call this in your Script component's onLoad and onError handlers
 */
export const loadTrustpilotScript = () => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.Trustpilot) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
    script.async = true;
    
    script.onload = () => {
      // Dispatch custom event
      window.dispatchEvent(new Event('trustpilot-loaded'));
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Trustpilot script'));
    };
    
    document.head.appendChild(script);
  });
};

export default useTrustpilot;
