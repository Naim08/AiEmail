import jwtFetch from "./jwt";

export const RECEIVE_MODAL_TOGGLE = "ui/RECEIVE_MODAL_TOGGLE";
export const RESET_UI = "ui/reset";
export const SET_UNAUTHORIZED = "ui/setUnauthorized";
export const SET_HOME_REDIRECT = "ui/setHomeRedirect";
export const SET_PROMPT_RESPONSE = "ui/setPromptResponse";
export const SET_FORM_PAGE = "ui/setFormPage";
export const SET_FORM_SLIDE = "ui/setFormSlide";
export const SET_SCROLL = "ui/setScroll";

export const receiveModalToggle = (boolean) => ({
  type: RECEIVE_MODAL_TOGGLE,
  boolean,
});

export const resetUI = () => ({
  type: RESET_UI,
});

export const setUnauthorized = () => ({
  type: SET_UNAUTHORIZED,
});

export const setHomeRedirect = (homeRedirect) => ({
  type: SET_HOME_REDIRECT,
  homeRedirect,
});

export const setPromptResponse = (promptResponse) => ({
  type: SET_PROMPT_RESPONSE,
  promptResponse,
});

export const setFormPage = (formType) => ({
  type: SET_FORM_PAGE,
  formType,
});

export const setFormSlide = (direction) => ({
  type: SET_FORM_SLIDE,
  direction,
});
export const setScroll = (toggle) => ({
  type: SET_SCROLL,
  toggle,
});

export const setModalStatus = (boolean) => async (dispatch) => {
  return dispatch(receiveModalToggle(boolean));
};

export const getModalStatus = (state) => {
  return state.ui.modalStatus;
};

export const getHomeRedirect = (state) => {
  return state.ui.homeRedirect;
};

export const getPromptResponse = (state) => {
  return state.ui.promptResponse;
};

export const getUnauthorized = (state) => {
  return state.ui.unauthorized;
};

export const getSetScroll = (state) => {
  return state.ui.setScroll;
};

export const getFormType = (state) => {
  return state.ui.formType;
};

export const getFormSlide = (state) => {
  return state.ui.formSlide;
};
export const setUnauthorizedStatus = (boolean) => async (dispatch) => {
  return dispatch(setUnauthorized(boolean));
};

export const setHomeRedirectStatus = (homeRedirect) => async (dispatch) => {
  return dispatch(setHomeRedirect(homeRedirect));
};

export const setPromptResponseStatus = (promptResponse) => async (dispatch) => {
  return dispatch(setPromptResponse(promptResponse));
};

export const resetUIStatus = () => async (dispatch) => {
  return dispatch(resetUI());
};

const initialState = {
  modalStatus: false,
  unauthorized: false,
  homeRedirect: false,
  promptResponse: null,
  setScroll: true,
  formType: "start",
  formSlide: "expand",
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MODAL_TOGGLE:
      return { ...state, modalStatus: action.boolean };
    case RESET_UI:
      return initialState;
    case SET_UNAUTHORIZED:
      return { ...state, unauthorized: action.boolean };
    case SET_HOME_REDIRECT:
      return { ...state, homeRedirect: action.homeRedirect };
    case SET_PROMPT_RESPONSE:
      return { ...state, promptResponse: action.promptResponse };
    case SET_FORM_PAGE:
      return { ...state, formType: action.formType };
    case SET_FORM_SLIDE:
      return { ...state, formSlide: action.direction };
    case SET_SCROLL:
      return { ...state, setScroll: action.toggle };

    default:
      return state;
  }
};

export default uiReducer;
