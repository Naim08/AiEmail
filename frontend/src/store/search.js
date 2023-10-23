import jwtFetch from "./jwt";

export const GET_SEARCH_RESULTS = 'search/searchResults';
export const CLEAR_SEARCH_RESULTS = 'search/clearSearchResults';
export const SET_SEARCH_LOADING = 'search/setSearchLoading';

export const receiveSearchResults = searchResults => ({
    type: GET_SEARCH_RESULTS,
    searchResults
});
export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});

export const setSearchLoading = isLoading => ({
    type: SET_SEARCH_LOADING,
    isLoading
});

export const fetchSearchResults = (query) => async dispatch => {
    //res route may need to change
    // debugger
    dispatch(setSearchLoading(true));
    const res = await jwtFetch(`/api/emails/search?query=${query}`);
    // debugger
    const emails = await res.json();
    dispatch(receiveSearchResults(emails));
    dispatch(setSearchLoading(false));
}


const searchReducer = (state = { isLoading: false }, action) => {
    const newState = {...state}
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            // debugger
            return {...action.searchResults, isLoading: false };
        case CLEAR_SEARCH_RESULTS:
            return { isLoading: false };
        case SET_SEARCH_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return newState;
    }
};

export default searchReducer;
