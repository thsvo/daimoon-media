import { useState, useEffect } from "react";
import CookieSettingsModal from "./CookieSettingsModal"; // Import the modal

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    const checkGeoAndConsent = async () => {
      try {
        // Check if user is from EU/EEA/UK countries
        const response = await fetch('/api/geo/eu-check');
        const geoData = await response.json();
        console.log(`country check ${geoData.cookieCompliance?.userCountry}`)
        // Only proceed with cookie banner logic if user is from allowed countries
        if (!geoData.showCookieBanner) {
          console.log(`No cookie compliance needed for: ${geoData.cookieCompliance?.userCountry || 'unknown location'}`);
          setShowBanner(false);
          return;
        }

        // User is from EU/EEA/UK - check consent status
        const consentStatus = localStorage.getItem("cookieConsentStatus");
        if (!consentStatus) {
          setShowBanner(true);
          // Initialize Google Consent Mode with default denied state
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function() { dataLayer.push(arguments); };
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'granted', // Assuming necessary for site function
            'personalization_storage': 'denied',
            'security_storage': 'granted' // Assuming necessary for security
          });
        } else {
          // If consent already given, update GTM (e.g., on subsequent page loads)
          const preferences = JSON.parse(localStorage.getItem('cookiePreferences')) || {};
          updateGtmConsent(preferences);
        }
      } catch (error) {
        console.error('Geo check failed:', error);
        // Fallback: show cookie banner if geo check fails (safety first)
        const consentStatus = localStorage.getItem("cookieConsentStatus");
        if (!consentStatus) {
          setShowBanner(true);
          // Initialize Google Consent Mode with default denied state
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function() { dataLayer.push(arguments); };
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'granted',
            'personalization_storage': 'denied',
            'security_storage': 'granted'
          });
        }
      }
    };

    checkGeoAndConsent();
  }, []);

  const updateGtmConsent = (preferences) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function() { dataLayer.push(arguments); };
    
    const consentState = {
      'functionality_storage': 'granted',
      'security_storage': 'granted',
      'ad_storage': preferences.tracking ? 'granted' : 'denied',
      'ad_user_data': preferences.tracking ? 'granted' : 'denied',
      'ad_personalization': preferences.tracking ? 'granted' : 'denied',
      'analytics_storage': preferences.analytical ? 'granted' : 'denied',
      // 'personalization_storage': can be tied to analytical or tracking, or be separate
    };

    gtag('consent', 'update', consentState);
    //dataLayer.push({'event': 'consent_update'}); // Optional: custom event for GTM triggers
  };

  const handleAcceptAll = () => {
    const preferences = { analytical: true, tracking: true, necessary: true };
    localStorage.setItem("cookieConsentStatus", "acceptedAll");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    updateGtmConsent(preferences);
    setShowBanner(false);
    setIsSettingsModalOpen(false);
  };

  const handleOpenSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const handleSavePreferences = (preferences) => {
    localStorage.setItem("cookieConsentStatus", "customized");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    updateGtmConsent(preferences);
    setShowBanner(false);
    setIsSettingsModalOpen(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-[#121212] border-2 border-[#A855F7] rounded-3xl shadow-2xl p-8 max-w-md w-full text-white">
        <h2 className="text-xl font-bold mb-2">
          Cookies? Yes, but make them useful.
        </h2>
          <p className="mb-4 text-sm text-gray-300 ">
            We use cookies to make your experience smoother, smarter, and more
            personalized. By clicking &quot;Accept All&quot;, you agree to our use of cookies
            for analytics, content, and marketing. You can also manage your preferences.
            <br />
            <a
              href="/cookie-policy" // Make sure this page exists or create it
              className="underline text-white hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <br/>
              Read our cookie statement here.
            </a>
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
            <button
              onClick={handleOpenSettingsModal}
              className="px-6 py-2 lg:pl-[70px] rounded-xl font-semibold bg-transparent  text-white  hover:text-white transition w-full sm:w-auto"
            >
              Settings
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-12 py-3 rounded-xl font-semibold bg-[#A855F7] border border-[#A855F7] hover:bg-[#9333EA] text-white transition w-full sm:w-auto"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
      <CookieSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettingsModal}
        onSavePreferences={handleSavePreferences}
        onAcceptAll={handleAcceptAll} // Use the same accept all logic
      />
    </>
  );
}
