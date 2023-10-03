import jwtFetch from './jwt';

// Action Types
const EMAIL_CREATE_REQUEST = 'EMAIL_CREATE_REQUEST';
const EMAIL_CREATE_SUCCESS = 'EMAIL_CREATE_SUCCESS';
const EMAIL_CREATE_FAILURE = 'EMAIL_CREATE_FAILURE';

const EMAIL_READ_REQUEST = 'EMAIL_READ_REQUEST';
const EMAIL_READ_SUCCESS = 'EMAIL_READ_SUCCESS';
const EMAIL_READ_FAILURE = 'EMAIL_READ_FAILURE';

const EMAIL_UPDATE_REQUEST = 'EMAIL_UPDATE_REQUEST';
const EMAIL_UPDATE_SUCCESS = 'EMAIL_UPDATE_SUCCESS';
const EMAIL_UPDATE_FAILURE = 'EMAIL_UPDATE_FAILURE';

const EMAIL_DELETE_REQUEST = 'EMAIL_DELETE_REQUEST';
const EMAIL_DELETE_SUCCESS = 'EMAIL_DELETE_SUCCESS';
const EMAIL_DELETE_FAILURE = 'EMAIL_DELETE_FAILURE';

const EMAIL_FETCH_SINGLE_REQUEST = 'EMAIL_FETCH_SINGLE_REQUEST';
const EMAIL_FETCH_SINGLE_SUCCESS = 'EMAIL_FETCH_SINGLE_SUCCESS';
const EMAIL_FETCH_SINGLE_FAILURE = 'EMAIL_FETCH_SINGLE_FAILURE';



// Action Creators for CRUD operations

// Create
export const emailCreateRequest = () => ({
  type: EMAIL_CREATE_REQUEST,
});

export const emailCreateSuccess = (email) => ({
  type: EMAIL_CREATE_SUCCESS,
  payload: email,
});

export const emailCreateFailure = (error) => ({
  type: EMAIL_CREATE_FAILURE,
  payload: error,
});

// Fetch Single Email
export const emailFetchSingleRequest = () => ({
  type: EMAIL_FETCH_SINGLE_REQUEST,
});

export const emailFetchSingleSuccess = (email) => ({
  type: EMAIL_FETCH_SINGLE_SUCCESS,
  payload: email,
});

export const emailFetchSingleFailure = (error) => ({
  type: EMAIL_FETCH_SINGLE_FAILURE,
  payload: error,
});

// Read
export const emailReadRequest = () => ({
  type: EMAIL_READ_REQUEST,
});

export const emailReadSuccess = (emails) => ({
  type: EMAIL_READ_SUCCESS,
  payload: emails,
});

export const emailReadFailure = (error) => ({
  type: EMAIL_READ_FAILURE,
  payload: error,
});

// Update
export const emailUpdateRequest = () => ({
  type: EMAIL_UPDATE_REQUEST,
});

export const emailUpdateSuccess = (email) => ({
  type: EMAIL_UPDATE_SUCCESS,
  payload: email,
});

export const emailUpdateFailure = (error) => ({
  type: EMAIL_UPDATE_FAILURE,
  payload: error,
});

// Delete
export const emailDeleteRequest = () => ({
  type: EMAIL_DELETE_REQUEST,
});

export const emailDeleteSuccess = (id) => ({
  type: EMAIL_DELETE_SUCCESS,
  payload: id,
});

export const emailDeleteFailure = (error) => ({
  type: EMAIL_DELETE_FAILURE,
  payload: error,
});

// Thunk Actions for CRUD operations

// Create
export const createEmail = (email) => async (dispatch) => {
  dispatch(emailCreateRequest());
  try {
    const response = await jwtFetch('/api/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    const data = await response.json();
    dispatch(emailCreateSuccess(data));
  } catch (error) {
    dispatch(emailCreateFailure(error.message));
  }
};


export const fetchSingleEmail = (id) => async (dispatch) => {
    console.log(typeof id)
    dispatch(emailFetchSingleRequest());
    try {
        const response = await jwtFetch(`/api/emails/${id}`);
        const data = await response.json();
        dispatch(emailFetchSingleSuccess(data));
    } catch (error) {
        dispatch(emailFetchSingleFailure(error.message));
    }
};

// Read
export const readEmails = () => async (dispatch) => {
  dispatch(emailReadRequest());
  try {
    const response = await jwtFetch('/api/emails');
    const data = await response.json();
    dispatch(emailReadSuccess(data));
  } catch (error) {
    dispatch(emailReadFailure(error.message));
  }
};

// Update
export const updateEmail = (email) => async (dispatch) => {
  dispatch(emailUpdateRequest());
  try {
    const response = await jwtFetch(`/api/emails/${email.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    const data = await response.json();
    dispatch(emailUpdateSuccess(data));
  } catch (error) {
    dispatch(emailUpdateFailure(error.message));
  }
};

// Delete
export const deleteEmail = (id) => async (dispatch) => {
  dispatch(emailDeleteRequest());
  try {
    await jwtFetch(`/api/emails/${id}`, {
      method: 'DELETE',
    });
    dispatch(emailDeleteSuccess(id));
  } catch (error) {
    dispatch(emailDeleteFailure(error.message));
  }
};


// Initial State
const initialState = {
  emails: [],
  isLoading: false,
  error: null,
};

// Reducer
const emailsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create
    case EMAIL_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case EMAIL_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emails: [...state.emails, action.payload],
        error: null,
      };
    case EMAIL_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // Fetch Single Email
    case EMAIL_FETCH_SINGLE_REQUEST:
        return {
        ...state,
        isLoading: true,
        error: null,
        };
    case EMAIL_FETCH_SINGLE_SUCCESS:
        return {
        ...state,
        isLoading: false,
        emails: state.emails.map(email => 
            email.id === action.payload.id ? action.payload : email
        ),
        error: null,
        };
    case EMAIL_FETCH_SINGLE_FAILURE:
        return {
        ...state,
        isLoading: false,
        error: action.payload,
        };

    // Read
    case EMAIL_READ_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case EMAIL_READ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emails: action.payload,
        error: null,
      };
    case EMAIL_READ_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // Update
    case EMAIL_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case EMAIL_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emails: state.emails.map(email => 
          email.id === action.payload.id ? action.payload : email
        ),
        error: null,
      };
    case EMAIL_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // Delete
    case EMAIL_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case EMAIL_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emails: state.emails.filter(email => email.id !== action.payload.id),
        error: null,
      };
    case EMAIL_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default emailsReducer;
