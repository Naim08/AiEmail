export const UPDATE_USER_PREFERENCES = "UPDATE_USER_PREFERENCES";

//action creator
export const updateUserPreferences = (formData) => ({
    type: UPDATE_USER_PREFERENCES,
    payload: formData
});


const initialState = {
    max_tokens: 255,
    presence_penalty: 0,
    frequency_penalty: 0,
    temperature: 1,
    userMessage: ""
};

const userPreferenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_PREFERENCES:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default userPreferenceReducer;
