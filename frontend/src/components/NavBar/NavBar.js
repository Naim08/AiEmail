import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css"; // Assuming you've updated this CSS file based on previous suggestions
import { logout } from "../../store/session";
import GoogleLoginButton from "../GmailAuth/GoogleLoginButton";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TrashEmailsPage from "../Email/EmailTrash";
import InstructionModal from "../InstructionModal/InstructionModal";

function NavBar() {
    const loggedIn = useSelector((state) => !!state.session.user);
    const dispatch = useDispatch();
    const [selectedLink, setSelectedLink] = useState(null);
    const userEmail = useSelector((state) => state.session.user.email);
    const history = useHistory();
    const [instructionModal, setInstructionModal] = useState(false);

    const logoutUser = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleLogOut = (e) => {
        logoutUser(e);
        setSelectedLink("logout");
        history.push("/");
    };

    const handleTrash = (e) => {
        setSelectedLink("trash");
        history.push("/email/trash");
    };
    const handleOpenModal = e =>{
        setInstructionModal(true);
    }
    const handleCloseModal = e =>{
        setInstructionModal(false);
    }

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="left-sideBar">
                    <div className="links-nav">
                        <div className="nav-dashboard nav-link">
                            <a
                                href="/"
                                className={`nav-dashboard-link ${
                                    selectedLink === "dashboard"
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => {
                                    setSelectedLink("dashboard");
                                }}
                            >
                                <i className="fa-sharp fa-solid fa-house"></i>
                                Dashboard
                            </a>
                        </div>

                        <div className="nav-trash nav-link">
                            <button
                                className={`nav-trash-link ${
                                    selectedLink === "trash" ? "selected" : ""
                                }`}
                                onClick={handleTrash}
                            >
                                <i className="fa-solid fa-trash"></i> Trash
                            </button>
                        </div>

                        <div className="nav-profile nav-link">
                            <a
                                href="/profile"
                                className={`nav-profile-link ${
                                    selectedLink === "account" ? "selected" : ""
                                }`}
                                onClick={() => setSelectedLink("account")}
                            >
                                <i className="fa-solid fa-user"></i> Account
                            </a>
                        </div>

                        <div className="nav-link">
                            <button
                                className={`nav-trash-link ${
                                    selectedLink === "trash" ? "selected" : ""
                                }`}
                                onClick={handleOpenModal}
                            >
                                <i className="fa-sharp fa-solid fa-circle-question"></i> Instruction
                            </button>
                        </div>

                        <InstructionModal
                            isActive={instructionModal}
                            onClose={handleCloseModal}
                            header="Welcome to MailTo!"
                            />



                    </div>{" "}
                    {/*end links-nav*/}
                    <div className="spacer"></div>
                    <div className="bottom-links">
                        {" "}
                        {/* New wrapper div for bottom links */}
                        <div className="nav-google-login-btn">
                            <GoogleLoginButton />
                        </div>
                        <div className="nav-logout nav-link logout-container">
                            <a
                                className={`${
                                    selectedLink === "logout" ? "selected" : ""
                                }`}
                                onClick={handleLogOut}
                            >
                                <i className="fa-sharp fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>{" "}
                                Logout
                            </a>
                            <small className="user-email">{userEmail}</small>
                        </div>
                        <div className="nav-aboutus nav-link">
                            <a
                                href="/aboutus"
                                onClick={() => setSelectedLink("aboutus")}
                            >
                                <i class="fa-sharp fa-light fa-circle-info"></i>
                                About Us
                            </a>
                        </div>
                    </div>
                    {/*end bottom-links*/}
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div>
            <div className="navi-container">
                <div className="navi-header">
                    <h1>
                        <i className="fa-sharp fa-solid fa-envelope"></i> MailTo
                    </h1>

                </div>
                {getLinks()}

            </div>

            {/* <InstructionModal onClose={handleCloseModal}/> */}
        </div>

    );
}

export default NavBar;
