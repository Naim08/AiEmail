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
        <div className="links-nav">
          <Link to={"/profile"}>Profile</Link>
          <button onClick={logoutUser}>Logout</button>
          <GoogleLoginButton />
        </div>
      );
    } else {
      return null; // Removed Signup and Login links
    }
  };

  return (
    <>
      <h1>MailTo</h1>
      {getLinks()}
    </>
  );
}


export default NavBar;
