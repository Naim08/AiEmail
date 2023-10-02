import "./DashPage.css";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../Routes/Routes";
import NavBar from "../NavBar/NavBar";
import Profile from "../Profile/Profile";
import MainPage from "../AuthPage/MainPage";
import LoginForm from "../SessionForms/LoginForm";
import SignupForm from "../SessionForms/SignupForm";


const DashPage = ()=>{

    return (
        <div className="app-container">
            <div className="left-sideBar">
                <NavBar />
            </div>
            <div className="email-container">
            <h1>Emails</h1>
            </div>
        </div>
    )


}

export default DashPage;
