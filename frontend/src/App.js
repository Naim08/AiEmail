import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/AuthPage/MainPage.js";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import GoogleAuthRedirect from "./components/GmailAuth/GmailAuth";
import EmailForm from "./components/Email/EmailForm";
import EmailList from "./components/Email/EmailList";
import EmailDetails from "./components/Email/EmailDetails";
import ChatGPTComponent from "./components/ChatGPT";
import DashPage from "./components/DashPage/DashPage";
import Profile from "./components/Profile/Profile";

import { getCurrentUser } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        {/* {location.pathname !== "/" && <NavBar />}  */}
        {/* {location.pathname !== "/dashpage" && <DashPage />} */}

        <Switch>

          <Route path="/auth/google" component={GoogleAuthRedirect} />
          <Route path="/email/list" component={EmailList} />
          <Route path="/email/form" component={EmailForm} />
          <Route path="/email/:emailId" component={EmailDetails} />

        <Route path="/auth/google" component={GoogleAuthRedirect} />;
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
          <Route exact path="/dashpage" component={DashPage} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute path="/chatgpt" component={ChatGPTComponent} />;
        </Switch>
      </>
    )
  );
}

export default App;
