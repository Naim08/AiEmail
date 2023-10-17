import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css"; // Assuming you've updated this CSS file based on previous suggestions
import { logout } from "../../store/session";
import GoogleLoginButton from "../GmailAuth/GoogleLoginButton";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import InstructionModal from "../InstructionModal/InstructionModal";

function NavBar() {
    const loggedIn = useSelector((state) => !!state.session.user);
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.session.user.email);
    const history = useHistory();
    const [instructionModal, setInstructionModal] = useState(false);

    const logoutUser = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleLogOut = (e) => {
        logoutUser(e);
        history.push("/");
    };

    const handleTrash = (e) => {
        history.push("/email/trash");
    };
    const handleOpenModal = (e) => {
        setInstructionModal(true);
    };
    const handleCloseModal = (e) => {
        setInstructionModal(false);
    };

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="nav-links-container">
                    <div className="top-links">
                        <div className="nav-link">
                            <a href="/" className={`nav-dashboard-link`}>
                                <i className="fa-sharp fa-solid fa-house"></i>
                                Dashboard
                            </a>
                        </div>

                        <div className="nav-link">
                            <button onClick={handleTrash}>
                                <i className="fa-solid fa-trash"></i> Trash
                            </button>
                        </div>

                        <div className="nav-link">
                            <a href="/profile" className={`nav-profile-link`}>
                                <i className="fa-solid fa-user"></i> Account
                            </a>
                        </div>
                    </div>

                    <div className="spacer"></div>
                    <div className="bottom-links">
                        <div className="nav-google-login-btn">
                            <GoogleLoginButton />
                        </div>
                        <div className="nav-link help">
                            <button onClick={handleOpenModal}>
                                <i className="fa-sharp fa-solid fa-circle-question"></i>
                                Help
                            </button>
                            <InstructionModal
                                isActive={instructionModal}
                                onClose={handleCloseModal}
                                header="Welcome to MailTo!"
                            />
                        </div>
                        <div className="nav-logout nav-link logout-container">
                            <button onClick={handleLogOut}>
                                <i className="fa-sharp fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>{" "}
                                Logout
                            </button>
                            <small className="user-email">{userEmail}</small>
                        </div>
                        <div className="nav-aboutus nav-link">
                            <a href="/aboutus">
                                <i class="fa-sharp fa-light fa-circle-info"></i>
                                About Us
                            </a>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="nav-container">
            <div className="nav-header">
                <h1>
                    <i className="fa-sharp fa-solid fa-envelope"></i> MailTo
                </h1>
            </div>
            {getLinks()}
        </div>
    );
}

export default NavBar;
