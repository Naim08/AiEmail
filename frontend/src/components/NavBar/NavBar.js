import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";
import GoogleLoginButton from "../GmailAuth/GoogleLoginButton";
function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="left-sideBar">
          <div className="links-nav">
            <div className="nav-dashboard">
              <a href="/" className="nav-dashboard-link">Dashboard</a>
            </div>
            <div className="nav-trash">
              <a href="/" className="nav-trash-link">Trash</a>
            </div>
            <div className="nav-profile">
              <a href="/profile" className="nav-profile-link">Account</a>
            </div>
          </div>

          <div className="nav-logout">
            <a onClick={logoutUser}>Logout</a>
          </div>

          <div className="nav-google-login-btn">
            <GoogleLoginButton />
          </div>
        </div>



      );
    } else {
      return null; // Removed Signup and Login links
    }
  };

  return (
    <div className="navi-container">
      <h1>MailTo</h1>

      {getLinks()}
    </div>
  );
}


export default NavBar;
