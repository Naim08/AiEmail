import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import GoogleAuthRedirect from "./components/GmailAuth/GmailAuth";
import EmailForm from "./components/Email/EmailForm";
import EmailList from "./components/Email/EmailList";
import EmailDetails from "./components/Email/EmailDetails";
import ChatGPTComponent from "./components/ChatGPT";

import Profile from "./components/Profile/Profile";

import { getCurrentUser } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <Route path="/auth/google" component={GoogleAuthRedirect} />
          <Route path="/email/list" component={EmailList} />
          <Route path="/email/form" component={EmailForm} />
          <Route path="/email/:emailId" component={EmailDetails} />
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute path="/chatgpt" component={ChatGPTComponent} />;
        </Switch>
      </>
    )
  );
}

export default App;
