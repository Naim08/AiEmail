import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  const handleExit =()=>{
    history.push(`/dashpage`)
  }

  return (
    <div>
      <div className='exit-page-btn-div' onClick={handleExit}>
        <i className="fa-regular fa-arrow-left-to-line fa-lg exit-page-btn-img"></i>
        <p>Return to Dashboard</p>
      </div>

      <div className="profile-content">
        <h1 className="profile-content-header">User Account Setting</h1>
        <div className="profile-content-name-div">
          <h1 className="profile-content-name" >Name</h1>
          <div className="profile-content-name-container">
            <h3>{currentUser.username}</h3>
            <a className="profile-content-update-link">Update</a>
          </div>

        </div>


        <div className="profile-content-email-div">
          <h1 className="profile-content-email" >Email</h1>
          <div className="profile-content-email-container">
            <h3>{currentUser.email}</h3>
            <a className="profile-content-update-link">Update</a>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Profile;
