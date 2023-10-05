import jwtFetch from "./jwt";
import { setChatGPTModels } from "./ui";

const SEND_MESSAGE = "chatgpt/SEND_MESSAGE";
export const RECEIVE_MESSAGE = "chatgpt/RECEIVE_MESSAGE";
const RECEIVE_MESSAGES = "chatgpt/RECEIVE_MESSAGES";
const RECEIVE_MESSAGE_ERRORS = "chatgpt/RECEIVE_MESSAGE_ERRORS";
const CLEAR_MESSAGE_ERRORS = "chatgpt/CLEAR_MESSAGE_ERRORS";

const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message,
});

const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_MESSAGE_ERRORS,
  errors,
});

export const clearMessageErrors = () => ({
  type: CLEAR_MESSAGE_ERRORS,
});

export const getMessages = (state) => {
  return state.chatgpt.messages;
};

export const getMessage = (state) => {
  return state.chatgpt.message;
};
export const sendMessage = (message) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const responseData = await res.json(); // Renamed the constant
    dispatch(receiveMessage(responseData));
  } catch (err) {
    if (err.response) {
      // Check if response exists in error (it might not for network errors)
      const statusCode = err.response.status;
      const resBody = err.response.data;

      if (statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      } else if (statusCode === 500) {
        dispatch(receiveErrors(resBody.errors));
      }
    } else {
      // If there is no response, it's a network error
      dispatch(receiveErrors(["A network error occurred."]));
      console.log(err);
    }
  }
};

export const fetchEmails = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/fetch-emails");
    const emails = await res.data;
    dispatch(receiveMessages(emails));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    } else if (resBody.statusCode === 500) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchMessages = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/chatgpt");
    const messages = await res.data;
    dispatch(receiveMessages(messages));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    } else if (resBody.statusCode === 500) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchChatGptModels = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/chatgpt/models");
    const models = await res.data;
    dispatch(setChatGPTModels(models));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    } else if (resBody.statusCode === 500) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

const initialState = {
  messages: [],
  errors: [],
};

const chatgptReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          ...action.message,
        },
        message: action.message,
      };
    case RECEIVE_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          ...action.message,
        },
      };
    case RECEIVE_MESSAGE_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case CLEAR_MESSAGE_ERRORS:
      return {
        ...state,
        errors: [],
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    default:
      return state;
  }
};

export default chatgptReducer;
