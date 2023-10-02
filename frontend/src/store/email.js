import jwtFetch from './jwt';

// Action Types
const EMAIL_SEND_REQUEST = 'EMAIL_SEND_REQUEST';
const EMAIL_SEND_SUCCESS = 'EMAIL_SEND_SUCCESS';
const EMAIL_SEND_FAILURE = 'EMAIL_SEND_FAILURE';

// Action Creators
export const sendEmailRequest = () => ({
  type: EMAIL_SEND_REQUEST,
});

export const sendEmailSuccess = (email) => ({
  type: EMAIL_SEND_SUCCESS,
  payload: email,
});

export const sendEmailFailure = (error) => ({
  type: EMAIL_SEND_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const sendEmail = (subject, message) => async (dispatch) => {
  dispatch(sendEmailRequest());
  try {
    const response = await jwtFetch('/api/emails/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Specify content type as JSON
      },
      body: JSON.stringify({ subject, message }),  // Use 'body' instead of 'data' and stringify the object
    });
    dispatch(sendEmailSuccess(response.data));
  } catch (error) {
    dispatch(sendEmailFailure(error.message));
  }
};

// Initial State
const initialState = {
  isSending: false,
  email: null,
  error: null,
};

// Reducer
const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_SEND_REQUEST:
      return {
        ...state,
        isSending: true,
        error: null,
      };
    case EMAIL_SEND_SUCCESS:
      return {
        ...state,
        isSending: false,
        email: action.payload,
        error: null,
      };
    case EMAIL_SEND_FAILURE:
      return {
        ...state,
        isSending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default emailReducer;
