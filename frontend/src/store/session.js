import jwtFetch, { jwtAxiosFetch } from "./jwt";

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

export const currentUser = (state) => {
  return state.session.user;
};

export const signup = (user) => startSession(user, "api/users/register");
export const login = (user) => startSession(user, "api/users/login");

const startSession = (userInfo, route) => async (dispatch) => {
  try {
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo),
    });
    const { user, token } = await res.json();
    localStorage.setItem("jwtToken", token);
    //Redirect
    return dispatch(receiveCurrentUser(user));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => async (dispatch) => {
  const res = await jwtFetch("/api/users/logout", {
    method: "DELETE",
  });

  const { user } = await res.json();
  localStorage.removeItem("jwtToken");
  dispatch(logoutUser());
};

export const getCurrentUser = () => async (dispatch) => {
  const res = await jwtFetch("/api/users/current");
  const user = await res.json();
  return dispatch(receiveCurrentUser(user));
};

export const getAxiosCurrentUser = () => async (dispatch) => {
  const res = await jwtAxiosFetch("/api/users/current");
  const user = await res.data;
  return dispatch(receiveCurrentUser(user));
};

export const googleLogin = (accessToken) => async (dispatch) => {
  const res = await jwtAxiosFetch("/api/users/google-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      access_token: accessToken,
    },
  });
  const { user, token } = await res.data;
  localStorage.setItem("jwtToken", token);
  return dispatch(receiveCurrentUser(user));
};

const initialState = {
  user: undefined,
};

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
