import { useState, useEffect } from 'react';

export default function CookieSettingsModal({ isOpen, onClose, onSavePreferences, onAcceptAll }) {
  const [analyticalCookies, setAnalyticalCookies] = useState(true);
  const [trackingCookies, setTrackingCookies] = useState(true);

  // Initialize toggles based on saved preferences or default to true
  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem('cookiePreferences'));
    if (savedPreferences) {
      setAnalyticalCookies(savedPreferences.analytical !== undefined ? savedPreferences.analytical : true);
      setTrackingCookies(savedPreferences.tracking !== undefined ? savedPreferences.tracking : true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const preferences = {
      analytical: analyticalCookies,
      tracking: trackingCookies,
      necessary: true, // Necessary cookies are always enabled
    };
    onSavePreferences(preferences);
  };

  const CookieToggle = ({ label, checked, onChange, description, subCookies }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={label.replace(/\s+/g, '-').toLowerCase()} className="text-lg font-semibold">
          {label}
        </label>
        <button
          onClick={() => onChange(!checked)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
            checked ? 'bg-[#A855F7]' : 'bg-gray-600'
          }`}
        >
          <span
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
              checked ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
      <p className="text-sm text-gray-300 mb-1">{description}</p>
      {subCookies && subCookies.length > 0 && (
        <ul className="list-disc list-inside pl-4 text-xs text-gray-400">
          {subCookies.map(sub => <li key={sub}>{sub}</li>)}
        </ul>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="bg-[#1E1E1E] border border-[#A855F7] rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full text-white max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cookie Settings</h2>
          <button onClick={onClose} className="text-2xl hover:text-gray-400">&times;</button>
        </div>

        <p className="mb-6 text-sm text-gray-300">
          Manage your cookie preferences. You can enable or disable different types of cookies below.
          Strictly necessary cookies cannot be disabled.
        </p>

        <CookieToggle
          label="Analytical Cookies"
          checked={analyticalCookies}
          onChange={setAnalyticalCookies}
          description="These cookies give us a better picture of visitor behaviour on the website. This is used to improve the user experience on the website. This processing takes place in the United States of America."
          subCookies={["Google Analytics", "Site Cookies (Registers statistical data on users' behaviour on the website. Used for internal analytics by the website operator.)"]}
        />

        <CookieToggle
          label="Tracking Cookies"
          checked={trackingCookies}
          onChange={setTrackingCookies}
          description="These cookies are used for analytical purposes and to collect data on the use of services. These insights enable improvement of services and the website. Data may also be used for personalised advertising purposes."
          subCookies={["Google (Used for analytical purposes, data collection on Google services use, and personalised advertising. Data processing in USA.)", "Klaviyo (Collects data about visitor behavior to optimize the website or register newsletter sign-ups.)"]}
        />
        
        {/* Placeholder for GTM/Google Ads specific toggles if needed later */}
        {/* For now, they are covered under Analytical/Tracking */}

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl font-semibold bg-transparent border border-[#A855F7] text-white hover:bg-[#A855F7] transition w-full sm:w-auto"
          >
            Save Preferences
          </button>
          <button
            onClick={onAcceptAll}
            className="px-6 py-3 rounded-xl font-semibold bg-[#A855F7] border border-[#A855F7] hover:bg-[#9333EA] text-white transition w-full sm:w-auto"
          >
            Accept All & Close
          </button>
        </div>
      </div>
    </div>
  );
}
