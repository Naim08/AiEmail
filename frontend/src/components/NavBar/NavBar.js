import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";

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
          <div className="nav-dashboard">
            <Link to={"/"}>Dashboard</Link>
          </div>
          <div>
            <Link to={"/profile"}>Account</Link>
          </div>
          <div>
            <button onClick={logoutUser}>Logout</button>
          </div>

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
    <div className="navi-container">
      <h1>MailTo</h1>

      {getLinks()}
    </div>
  );
}

export default NavBar;
