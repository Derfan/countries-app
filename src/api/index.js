import prepareRequest from "./prepareRequest";
import endpoints from "./endpoints";

const api = Object.keys(endpoints)
    .reduce((acc, key) => ({ ...acc, [key]: prepareRequest(endpoints[key]) }), {});

export default api;
