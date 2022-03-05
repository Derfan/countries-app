const BASE_URL = "https://restcountries.com/v2";

const prepareRequest = (request) => {
    return async (params, options = {}) => {
        const url = request(params);
        let search = '';

        if (options.fields) {
            search += `?fields=${options.fields.join(',')}`
        }

        const response = await fetch(`${BASE_URL}${url}${search}`, options);
        const data = await response.json();

        return data;
    }
};

export default prepareRequest;
