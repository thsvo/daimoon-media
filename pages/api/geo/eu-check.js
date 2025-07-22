const requestIp = require('request-ip');
import axios from 'axios';

const EU_COUNTRIES = [
  'AT', 'Austria',
  'BE', 'Belgium',
  'BG', 'Bulgaria',
  'HR', 'Croatia',
  'CY', 'Cyprus',
  'CZ', 'Czech Republic',
  'DK', 'Denmark',
  'EE', 'Estonia',
  'FI', 'Finland',
  'FR', 'France',
  'DE', 'Germany',
  'GR', 'Greece',
  'HU', 'Hungary',
  'IE', 'Ireland',
  'IT', 'Italy',
  'LV', 'Latvia',
  'LT', 'Lithuania',
  'LU', 'Luxembourg',
  'MT', 'Malta',
  'NL', 'Netherlands', 'The Netherlands',
  'PL', 'Poland',
  'PT', 'Portugal',
  'RO', 'Romania',
  'SK', 'Slovakia',
  'SI', 'Slovenia',
  'ES', 'Spain',
  'SE', 'Sweden'
];

const EEA_AND_UK_COUNTRIES = [
  'IS', 'Iceland',
  'LI', 'Liechtenstein',
  'NO', 'Norway',
  'GB', 'United Kingdom'
];

// Combined list of countries where cookie banner should be shown
const COOKIE_BANNER_COUNTRIES = [...EU_COUNTRIES, ...EEA_AND_UK_COUNTRIES];

const CookiesHandler = (req, res) => {
  return new Promise((resolve) => {
    try {
      const clientIp =
        requestIp
          .getClientIp(req)
          .replace('::ffff:', '')
          .replace('::1', '')
          .replace('127.0.0.1', '') || '2a02:a44c:3212:1:fd8f:26c6:b152:5586';

      // Get geo information from ip-api
      axios
        .get('http://ip-api.com/json/' + clientIp + '?fields=10547007')
        .then((resp) => {
          const geoData = resp.data;
          const userCountry = geoData.country;
          
          // Check if user is from EU/EEA/UK
          const isEuEeaCountry = COOKIE_BANNER_COUNTRIES.includes(userCountry);
          const showCookieBanner = isEuEeaCountry;
          
          // Categorize the country type
          let countryType = 'other';
          if (EU_COUNTRIES.includes(userCountry)) {
            countryType = 'eu';
          } else if (EEA_AND_UK_COUNTRIES.includes(userCountry)) {
            countryType = 'eea_uk';
          }

          const result = {
            geo: geoData,
            ip: clientIp,
            forwarded: req.headers['x-forwarded-for'],
            showCookieBanner: showCookieBanner,
            isEuEeaCountry: isEuEeaCountry,
            countryType: countryType,
            cookieCompliance: {
              required: showCookieBanner,
              reason: showCookieBanner ? 
                `GDPR compliance required for ${countryType.toUpperCase()} country: ${userCountry}` : 
                `No cookie compliance required for: ${userCountry}`,
              allowedCountries: COOKIE_BANNER_COUNTRIES.length,
              userCountry: userCountry
            }
          };
          
          res.status(200).json(result);
          resolve();
        })
        .catch((error) => {
          console.error('Geo API Error:', error);
          // Fallback response if geo service fails
          res.status(200).json({
            geo: null,
            ip: clientIp,
            forwarded: req.headers['x-forwarded-for'],
            showCookieBanner: true, // Show by default if we can't determine location
            isEuEeaCountry: true,
            countryType: 'unknown',
            cookieCompliance: {
              required: true,
              reason: 'Unable to determine location - showing cookie banner for safety',
              allowedCountries: COOKIE_BANNER_COUNTRIES.length,
              userCountry: 'unknown'
            },
            error: 'Geo service unavailable'
          });
          resolve();
        });
    } catch (e) {
      console.error('Handler Error:', e);
      res.status(500).json({ 
        message: e.message,
        showCookieBanner: true, // Show by default on error
        error: 'Internal server error'
      });
      resolve();
    }
  });
};

export default CookiesHandler;
