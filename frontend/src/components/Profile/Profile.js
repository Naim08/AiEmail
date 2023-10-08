import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import banana from "./banana.png";

function Profile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);

    const handleExit = () => {
        history.push(`/dashpage`);
    };

    return (
        <div className="profile-container">
            <div className="exit-page-btn-div">
                <div className="exit-wrapper" onClick={handleExit}>
                    <i className="fa-regular fa-arrow-left exit-icon"></i>
                    <p className="exit-text">Return to Dashboard</p>
                </div>
            </div>

            <div className="profile-content">
                <h1 className="profile-content-header">Account Details</h1>
                <div className="profile-content-name-div">
                    <h1 className="profile-content-name">Username</h1>
                    <div className="profile-content-name-container">
                        <h3>{currentUser.username}</h3>
                        {/* <a className="profile-content-update-link">Update</a> */}
                    </div>
                </div>

                <div className="profile-content-email-div">
                    <h1 className="profile-content-email">Email</h1>
                    <div className="profile-content-email-container">
                        <h3>{currentUser.email}</h3>
                        {/* <a className="profile-content-update-link">Update</a> */}
                    </div>
                </div>
            </div>
            <img src={banana} alt="Banana" />
        </div>
    );
}

export default Profile;
