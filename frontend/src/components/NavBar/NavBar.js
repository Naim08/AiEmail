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
      return (
        <div className="links-auth">
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      );
    }
  };

  return (
    <>
      <h1>AI Email</h1>
      {getLinks()}
    </>
  );
}

export default NavBar;
