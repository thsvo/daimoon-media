//Core
import axios from 'axios';

async function GetCountry() {
  const geo = await axios({
    url: '/api/geo',
  }).then((response) => {
    if (response.data && response.data.geo.continentCode != 'EU') {
      return {
        ip: response.data.ip,
        countryCode: response.data.geo.countryCode,
        country: response.data.geo.country,
        eu: false,
      };
    } else {
      return {
        ip: response.data.ip,
        countryCode: response.data.geo.countryCode,
        country: response.data.geo.country,
        eu: true,
      };
    }
  });

  return geo;
}

export async function GetCurrency() {
  const country = await GetCountry();

  const result = await axios({
    url: '/api/currencies/USD',
  })
    .then((response) => {
      if (
        country.countryCode == 'GB' ||
        country.countryCode == 'RU' ||
        country.countryCode == 'AL' ||
        country.countryCode == 'AD' ||
        country.countryCode == 'BY' ||
        country.countryCode == 'BA' ||
        country.countryCode == 'FO' ||
        country.countryCode == 'IS' ||
        country.countryCode == 'IM' ||
        country.countryCode == 'LI' ||
        country.countryCode == 'MK' ||
        country.countryCode == 'ME' ||
        country.countryCode == 'NO' ||
        country.countryCode == 'SM' ||
        country.countryCode == 'RS' ||
        country.countryCode == 'CH' ||
        country.countryCode == 'TR' ||
        country.countryCode == 'UA' ||
        country.countryCode == 'AX' ||
        country.countryCode == 'GG' ||
        country.countryCode == 'GI' ||
        country.countryCode == 'JE' ||
        country.countryCode == 'MD' ||
        country.countryCode == 'SJ' ||
        country.countryCode == 'VA' ||
        country.countryCode == 'XK'
      ) {
        return {
          valuta: {
            code: response.data.code,
            conversionrate: Number(response.data.conversionrate),
          },
          country: { ...country, eu: false },
        };
      }
      return {
        valuta: {
          code: response.data.code,
          conversionrate: Number(response.data.conversionrate),
        },
        country: country,
      };
    })
    .catch((e) => {
      return {
        valuta: { code: 'EUR', conversionrate: 1 },
        country: { country: 'NL', countryCode: 'NL', eu: true },
      };
    });

  return result;
}
