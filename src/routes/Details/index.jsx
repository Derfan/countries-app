import { memo, useReducer, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components';
import { Controls, InfoBlock } from './components';
import api from '../../api';

const LOAD_DETAILS_INIT = 'LOAD_DETAILS_INIT';
const LOAD_DETAILS_SUCCESS = 'LOAD_DETAILS_SUCCESS';
const LOAD_DETAILS_FAILURE = 'LOAD_DETAILS_FAILURE';

const initialState = {
    data: null,
    isLoading: false,
    error: null,
};

const normalizePayload = ({ countryDetails, borderCountries }) =>
    Object.keys(countryDetails).reduce((acc, key) => {
        let value = countryDetails[key];

        if (key === 'borders' && borderCountries) value = borderCountries.map(country => ({ name: country.name, countryCode: country.alpha3Code }));
        if (key === 'currencies') value = countryDetails.currencies.map(currency => currency.name);
        if (key === 'languages') value = countryDetails.languages.map(language => language.name);

        return { ...acc, [key]: value };
    }, {});

const reducer = (state, action) => {
    switch (action.type) {
        case LOAD_DETAILS_INIT:
            return { ...state, isLoading: true };
        case LOAD_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: normalizePayload(action.payload),
            };
        case LOAD_DETAILS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

const FIELDS = ['flag', 'name', 'nativeName', 'population', 'region', 'subregion', 'capital', 'topLevelDomain', 'currencies', 'languages', 'borders'];

const useCountryDetails = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchDetails = useCallback(async ({ countryCode }) => {
        dispatch({ type: LOAD_DETAILS_INIT });

        try {
            const countryDetails = await api.getCountryDetails({ countryCode }, { fields: FIELDS });
            let borderCountries = null;

            if (countryDetails?.borders.length) {
                borderCountries = await api.searchCounttriesByCodes(
                    { countryCodes: countryDetails?.borders.join(',').toLowerCase() },
                );
            }

            dispatch({ type: LOAD_DETAILS_SUCCESS, payload: { countryDetails, borderCountries } });
        } catch (error) {
            dispatch({ type: LOAD_DETAILS_FAILURE, payload: error });
        }
    }, []);

    return { ...state, fetchDetails };
};

export const Details = memo(() => {
    const { countryCode } = useParams();
    const { data, fetchDetails } = useCountryDetails();

    useEffect(() => {
        fetchDetails({ countryCode });
    }, [countryCode]);

    return (
        <Layout>
            <Controls />

            {data && (
                <div className="flex flex-col gap-10 md:gap-x-28 md:flex-row md:items-center">
                    <div
                        className="bg-no-repeat bg-cover bg-center w-full h-60 md:w-1/2 md:h-96"
                        style={{ backgroundImage: `url(${data.flag})` }}
                    />

                    <InfoBlock {...data} />
                </div>
            )}
        </Layout>
    );
});
