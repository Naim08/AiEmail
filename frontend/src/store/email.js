import jwtFetch from "./jwt";

// Action Types
const EMAIL_CREATE_REQUEST = "EMAIL_CREATE_REQUEST";
const EMAIL_CREATE_SUCCESS = "EMAIL_CREATE_SUCCESS";
const EMAIL_CREATE_FAILURE = "EMAIL_CREATE_FAILURE";

const EMAIL_READ_REQUEST = "EMAIL_READ_REQUEST";
const EMAIL_READ_SUCCESS = "EMAIL_READ_SUCCESS";
const EMAIL_READ_FAILURE = "EMAIL_READ_FAILURE";

const EMAIL_UPDATE_REQUEST = "EMAIL_UPDATE_REQUEST";
const EMAIL_UPDATE_SUCCESS = "EMAIL_UPDATE_SUCCESS";
const EMAIL_UPDATE_FAILURE = "EMAIL_UPDATE_FAILURE";

const EMAIL_DELETE_REQUEST = "EMAIL_DELETE_REQUEST";
const EMAIL_DELETE_SUCCESS = "EMAIL_DELETE_SUCCESS";
const EMAIL_DELETE_FAILURE = "EMAIL_DELETE_FAILURE";

const EMAIL_FETCH_SINGLE_REQUEST = "EMAIL_FETCH_SINGLE_REQUEST";
const EMAIL_FETCH_SINGLE_SUCCESS = "EMAIL_FETCH_SINGLE_SUCCESS";
const EMAIL_FETCH_SINGLE_FAILURE = "EMAIL_FETCH_SINGLE_FAILURE";

//Email Trash
const EMAIL_TRASH = "EMAIL_TRASH";
const EMAIL_RESTORE = "EMAIL_RESTORE";
const EMAIL_EMPTY_TRASH = "EMAIL_EMPTY_TRASH";

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

// Trash an email
export const trashEmail = (id) => ({
  type: EMAIL_TRASH,
  payload: id,
});

// Restore an email from the trash
export const restoreEmail = (id) => ({
  type: EMAIL_RESTORE,
  payload: id,
});

// Empty the trash
export const emptyTrash = () => ({
  type: EMAIL_EMPTY_TRASH,
});

export const getEmail = (emailId) => (state) => {
  return state.emailsReducer.emails.find((email) => email._id === emailId);
};

// Thunk Actions for CRUD operations

// Create
export const createEmail = (email) => async (dispatch) => {
  dispatch(emailCreateRequest());
  try {
    const response = await jwtFetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const data = await response.json();
    dispatch(emailCreateSuccess(data));

    return data;
  } catch (error) {
    const res = await error.json();
    dispatch(emailCreateFailure(res.message));
  }
};

export const fetchSingleEmail = (id) => async (dispatch) => {
  console.log(typeof id);
  dispatch(emailFetchSingleRequest());
  try {
    const response = await jwtFetch(`/api/emails/${id}`);
    const data = await response.json();
    dispatch(emailFetchSingleSuccess(data));
  } catch (error) {
    const res = await error.json();
    dispatch(emailFetchSingleFailure(res.message));
  }
};

// Read
export const readEmails = () => async (dispatch) => {
  dispatch(emailReadRequest());
  try {
    const response = await jwtFetch("/api/emails");
    const data = await response.json();
    dispatch(emailReadSuccess(data));
  } catch (error) {
    const res = await error.json();
    dispatch(emailReadFailure(res.message));
  }
};

// Update
export const updateEmail = (email) => async (dispatch) => {
  dispatch(emailUpdateRequest());
  try {
    const response = await jwtFetch(`/api/emails/${email.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const data = await response.json();
    dispatch(emailUpdateSuccess(data));
  } catch (error) {
    const res = await error.json();
    dispatch(emailUpdateFailure(res.message));
  }
};

// Delete
export const deleteEmail = (id) => async (dispatch) => {
  dispatch(emailDeleteRequest());
  try {
    await jwtFetch(`/api/emails/${id}`, {
      method: "DELETE",
    });
    dispatch(emailDeleteSuccess(id));
  } catch (error) {
    const res = await error.json();
    dispatch(emailDeleteFailure(res.message));
  }
};

export const sendGmail = (email) => async (dispatch) => {
  try {
    const response = await jwtFetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });

    const data = await response.json();
    dispatch(emailCreateSuccess(data));
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//trash email thunk action
// Thunk action for moving an email to trash
export const moveToTrash = (emailId) => async (dispatch) => {
  try {
    const response = await jwtFetch(`/api/emails/trash/${emailId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      dispatch(trashEmail(emailId));
    } else {
      const data = await response.json();
      throw new Error(data.message || "Failed to move to trash");
    }
  } catch (error) {
    dispatch(emailDeleteFailure(error.message));
  }
};

// Thunk action for restoring an email from the trash
export const restoreFromTrash = (emailId) => async (dispatch) => {
  try {
    const response = await jwtFetch(`/api/emails/restore/${emailId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      dispatch(restoreEmail(emailId));
    } else {
      const data = await response.json();
      throw new Error(data.message || "Failed to restore from trash");
    }
  } catch (error) {
    dispatch(emailUpdateFailure(error.message));
  }
};

// Thunk action for emptying the trash
export const emptyEmailTrash = () => async (dispatch) => {
  try {
    const response = await jwtFetch("/api/emails//trash/emptytrash", {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(emptyTrash());
    } else {
      const data = await response.json();
      throw new Error(data.message || "Failed to empty trash");
    }
  } catch (error) {
    dispatch(emailDeleteFailure(error.message));
  }
};

// Initial State
const initialState = {
  emails: [],
  trash: [],
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
      const emailExists = state.emails.some(
        (email) => email._id === action.payload._id
      );
      if (emailExists) {
        return {
          ...state,
          isLoading: false,
          error: null,
        };
      } else {
        return {
          ...state,
          isLoading: false,
          emails: [...state.emails, action.payload],
          error: null,
        };
      }
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
        emails: state.emails.map((email) =>
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
        emails: state.emails.filter((email) => email.id !== action.payload.id),
        error: null,
      };
    case EMAIL_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    //trash reducer
    case EMAIL_TRASH:
      const trashedEmail = state.emails.find(
        (email) => email._id === action.payload
      );
      return {
        ...state,
        emails: state.emails.filter((email) => email._id !== action.payload),
        trash: [...state.trash, trashedEmail],
      };

    case EMAIL_RESTORE:
      const restoredEmail = state.trash.find(
        (email) => email._id === action.payload
      );
      return {
        ...state,
        emails: [...state.emails, restoredEmail],
        trash: state.trash.filter((email) => email._id !== action.payload),
      };

    case EMAIL_EMPTY_TRASH:
      return {
        ...state,
        trash: [],
      };

    default:
      return state;
  }
};

export default emailsReducer;
