import { useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';

const searchParams = new URLSearchParams(window.location.search);
const initialValues = {
    filter: searchParams.get('filter') || "",
    search: searchParams.get('search') || "",
};

const CONTROL_FILED_CHANGE = 'CONTROL_FILED_CHANGE';

const reducer = (state, action) => {
    switch (action.type) {
        case CONTROL_FILED_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        default:
            return state;
    };
};

export const useControls = () => {
    const [state, dispatch] = useReducer(reducer, initialValues);
    const [searchParams, setSearchParams] = useSearchParams();

    const changeHandler = (name, value) => {
        setSearchParams({ ...Object.fromEntries([...searchParams]), [name]: value });
        dispatch({ type: CONTROL_FILED_CHANGE, payload: { name, value } });
    }

    return { values: state, changeHandler };
};