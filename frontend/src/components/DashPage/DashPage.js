import "./DashPage.css";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../Routes/Routes";
import NavBar from "../NavBar/NavBar";
import Profile from "../Profile/Profile";
import MainPage from "../MainPage/MainPage";
import LoginForm from "../SessionForms/LoginForm";
import SignupForm from "../SessionForms/SignupForm";


const DashPage = ()=>{
    <div className="app-container">
        <div className="left-sideBar">
            <NavBar />
            <Switch>
              <AuthRoute exact path="/" component={MainPage} />
              <AuthRoute exact path="/login" component={LoginForm} />
              <AuthRoute exact path="/signup" component={SignupForm} />

              <ProtectedRoute exact path="/profile" component={Profile} />
            </Switch>
        </div>
        <div className="email-container">
          <h1>Emails</h1>
        </div>
    </div>

}

export default DashPage;
