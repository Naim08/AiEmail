import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import errors from "./errors";
import sessionReducer from "./session";
import chatgptReducer from "./chatgpt";
import uiReducer from "./ui";
import emailsReducer from "./email";
import search from "./search";
import userPreferenceReducer from "./userPreference";


const rootReducer = combineReducers({
  session: sessionReducer,
  errors,
  chatgpt: chatgptReducer,
  ui: uiReducer,
  emailsReducer,
  search,
  userPreferenceReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
