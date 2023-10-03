import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";  // Assuming you've updated this CSS file based on previous suggestions
import { logout } from "../../store/session";
import GoogleLoginButton from "../GmailAuth/GoogleLoginButton";
import React, { useState } from 'react';

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const [selectedLink, setSelectedLink] = useState(null);

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="left-sideBar">
  
          <div className="links-nav">
            
            <div className="nav-dashboard nav-link">
              <a href="/" 
                 className={`nav-dashboard-link ${selectedLink === 'dashboard' ? 'selected' : ''}`} 
                 onClick={() => setSelectedLink('dashboard')}>
                  <i class="fa-sharp fa-solid fa-house"></i>Dashboard</a>
            </div>
  
            <div className="nav-trash nav-link">
              <a href="/" 
                 className={`nav-trash-link ${selectedLink === 'trash' ? 'selected' : ''}`} 
                 onClick={() => setSelectedLink('trash')}>
                  <i class="fa-solid fa-trash"></i> Trash</a>
            </div>
  
            <div className="nav-profile nav-link">
              <a href="/profile" 
                 className={`nav-profile-link ${selectedLink === 'account' ? 'selected' : ''}`} 
                 onClick={() => setSelectedLink('account')}>
                  <i class="fa-solid fa-user"></i> Account</a>
            </div>
  
          </div>
  
          <div className="bottom-links">  {/* New wrapper div for bottom links */}
            <div className="nav-google-login-btn">
            <i class="fab fa-google"></i> <GoogleLoginButton />
            </div>
            <div className="nav-logout nav-link">
              <a className={`${selectedLink === 'logout' ? 'selected' : ''}`} 
                 onClick={(e) => {logoutUser(e); setSelectedLink('logout'); }}>
                  <i class="fa-sharp fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i> Logout</a>
            </div>
          </div>
  
        </div>
      );
    } else {
      return null;
    }
  };
  
  

  return (
    <div className="navi-container">
      <div className="navi-header">
        <h1><i class="fa-sharp fa-solid fa-envelope"></i> MailTo</h1>
      </div>
      {getLinks()}
    </div>
  );
}

export default NavBar;
