import { useCallback, useReducer } from 'react';

import api from '../../../api';

const LOAD_COUNTRIES_INIT = 'LOAD_COUNTRIES_INIT';
const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
const LOAD_COUNTRIES_FAILURE = 'LOAD_COUNTRIES_FAILURE';
const SEARCH_INPUT_CHANGE = 'SEARCH_INPUT_CHANGE';
const FILTER_INPUT_CHANGE = 'FILTER_INPUT_CHANGE';

const initialState = {
    data: null,
    countriesList: null,
    isLoading: false,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case LOAD_COUNTRIES_INIT:
            return { ...state, isLoading: true };
        case LOAD_COUNTRIES_SUCCESS:
            return { ...state, isLoading: false, countriesList: action.payload, data: action.payload };
        case LOAD_COUNTRIES_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case SEARCH_INPUT_CHANGE:
            return {
                ...state,
                data: state.countriesList.filter(
                    country => country.name.toLowerCase().includes(action.payload)
                ),
            };
        case FILTER_INPUT_CHANGE:
            return {
                ...state,
                data: action.payload
                    ? state.countriesList.filter(country => country.region.toLowerCase() === action.payload)
                    : state.countriesList,
            };
        default:
            return state;
    }
};

const FIELDS = ['alpha3Code', 'flag', 'name', 'population', 'region', 'capital'];

export const useCountriesList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = useCallback(async () => {
        dispatch({ type: LOAD_COUNTRIES_INIT });

        try {
            const data = await api.getAllCountries(null, { fields: FIELDS });

            dispatch({ type: LOAD_COUNTRIES_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: LOAD_COUNTRIES_FAILURE, payload: error });
        }
    }, []);
    const handleSearch = (value) => dispatch({ type: SEARCH_INPUT_CHANGE, payload: value });
    const handleFilter = (value) => dispatch({ type: FILTER_INPUT_CHANGE, payload: value });

    return { ...state, fetchData, handleSearch, handleFilter };
};