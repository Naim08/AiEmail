import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import DashPage from "./components/DashPage/DashPage";
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
      <div className="app-container">
        <div className="left-sideBar">
            <NavBar />
            <Switch>
              <AuthRoute exact path="/" component={MainPage} />
              <AuthRoute exact path="/login" component={LoginForm} />
              <AuthRoute exact path="/signup" component={SignupForm} />
              <AuthRoute exact path="/dashpage" component={DashPage} />
              <ProtectedRoute exact path="/profile" component={Profile} />
            </Switch>
        </div>
        <div className="email-container">
          <h1>Emails</h1>
        </div>
      </div>

    )
  );
}

export default App;
