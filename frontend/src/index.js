import React from "react";
import ReactDOM from "react-dom";
import './reset.css';
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/store";
import { getAxiosCurrentUser } from "./store/session";
import { ModalProvider } from "./context/modal";
import { createRoot } from 'react-dom';


let store = configureStore({});
window.getAxiosCurrentUser = getAxiosCurrentUser;
window.store = configureStore({});
function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
