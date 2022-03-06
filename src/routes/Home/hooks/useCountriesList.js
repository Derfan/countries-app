import { useCallback, useReducer } from 'react';

import api from '../../../api';

const LOAD_COUNTRIES_INIT = 'LOAD_COUNTRIES_INIT';
const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
const LOAD_COUNTRIES_FAILURE = 'LOAD_COUNTRIES_FAILURE';
const APPLY_FILTERS = 'APPLY_FILTERS';

const initialState = {
    data: null,
    countriesList: null,
    isLoading: false,
    error: null,
};

const filters = {
    byName: search => country => country.name.toLowerCase().includes(search),
    byRegion: filter => country => country.region.toLowerCase() === filter,
    all: filters => country => country.region.toLowerCase() === filters.filter && country.name.toLowerCase().includes(filters.search),
};

const reducer = (state, action) => {
    switch (action.type) {
        case LOAD_COUNTRIES_INIT:
            return { ...state, isLoading: true };
        case LOAD_COUNTRIES_SUCCESS:
            return { ...state, isLoading: false, countriesList: action.payload };
        case LOAD_COUNTRIES_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case APPLY_FILTERS: {
            if (!state.countriesList) return state;

            const { filter, search } = action.payload;

            if (!filter && !search) return { ...state, data: state.countriesList };
            if (!filter) return { ...state, data: state.countriesList.filter(filters.byName(search)) };
            if (!search) return { ...state, data: state.countriesList.filter(filters.byRegion(filter)) };

            return {
                ...state,
                data: state.countriesList.filter(filters.all(action.payload)),
            };
        }
        default:
            return state;
    }
};

const FIELDS = ['alpha3Code', 'flag', 'name', 'population', 'region', 'capital'];

export const useCountriesList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = useCallback(async ({ filters }) => {
        dispatch({ type: LOAD_COUNTRIES_INIT });

        try {
            const data = await api.getAllCountries(null, { fields: FIELDS });

            dispatch({ type: LOAD_COUNTRIES_SUCCESS, payload: data });
            dispatch({ type: APPLY_FILTERS, payload: filters });
        } catch (error) {
            dispatch({ type: LOAD_COUNTRIES_FAILURE, payload: error });
        }
    }, []);
    const applyFilters = useCallback((filters) => dispatch({ type: APPLY_FILTERS, payload: filters }), []);

    return { ...state, fetchData, applyFilters };
};
