import jwtFetch from "./jwt";

export const GET_SEARCH_RESULTS = 'search/searchResults';
export const CLEAR_SEARCH_RESULTS = 'search/clearSearchResults';

export const receiveSearchResults = searchResults => ({
    type: GET_SEARCH_RESULTS,
    searchResults
});
export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});

export const fetchSearchResults = (query) => async dispatch => {
    //res route may need to change
    const res = await jwtFetch(`/api/emails/search?query=${query}`);
    // debugger
    const emails = await res.json();
    dispatch(receiveSearchResults(emails));
}


const searchReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            // debugger
            return {...action.searchResults};
        case CLEAR_SEARCH_RESULTS:
            return {};
        default:
            return newState;
    }
};

export default searchReducer;
