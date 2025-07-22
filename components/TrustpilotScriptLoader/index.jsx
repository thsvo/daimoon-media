import Script from 'next/script';
import { loadTrustpilotScript } from '/hooks/useTrustpilot';

/**
 * Global Trustpilot Script Loader
 * Include this once in your _app.js to load Trustpilot script globally
 * This prevents multiple script loads and improves reliability
 */
const TrustpilotScriptLoader = () => {
  return (
    <Script
      id="trustpilot-script"
      src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        // Dispatch custom event to signal Trustpilot has loaded
        window.dispatchEvent(new Event('trustpilot-loaded'));
        console.log('Trustpilot script loaded successfully');
      }}
      onError={() => {
        console.warn('Trustpilot script failed to load, attempting retry...');
        // Retry with fallback loading
        loadTrustpilotScript()
          .then(() => {
            console.log('Trustpilot script loaded via fallback');
          })
          .catch(() => {
            // Final fallback after 3 seconds
            setTimeout(() => {
              loadTrustpilotScript()
                .then(() => {
                  console.log('Trustpilot script loaded via final fallback');
                })
                .catch((error) => {
                  console.error('All Trustpilot loading attempts failed:', error);
                });
            }, 3000);
          });
      }}
    />
  );
};

export default TrustpilotScriptLoader;
