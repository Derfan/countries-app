const endpoinds = {
    getAllCountries: () => '/all',
    getCountryDetails: ({ countryCode }) => `/alpha/${countryCode}`,
    searchCounttriesByCodes: ({ countryCodes }) => `/alpha/?codes=${countryCodes}`,
    getCountriesByContinent: ({ continent }) => `/continent/${continent}`,
};

export default endpoinds;
