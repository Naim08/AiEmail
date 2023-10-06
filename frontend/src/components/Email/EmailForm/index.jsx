import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEmail, updateEmail, readEmails } from "../../../store/email";
import UserPreferModal from "../../UserPreferModal/UserPreferModal";
import { FormModal } from "../../../context/modal";
import { setFormPage, setformSlide } from "../../../store/ui";
import "../EmailShow.css";

//NEW EMAIL PAGE
const EmailForm = ({ emailToUpdate }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const error  = useSelector((state)=>(state.emailsReducer.error));

    const [email, setEmail] = useState({
        subject: emailToUpdate ? emailToUpdate.subject : "",
        message: emailToUpdate ? emailToUpdate.message : "",
        to: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail({ ...email, [name]: value });


    };

    const handleUserModalShow = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailWithUser = {
            ...email,
            user: sessionUser._id,
        };

        if (emailToUpdate) {
            dispatch(updateEmail({ ...email, id: emailToUpdate._id }));
        } else {
            dispatch(createEmail(emailWithUser));
        }
    };

    const handleExit = (e) => {
        e.preventDefault();
        history.push(`/dashpage`);
    };

    const closeUserPreferModal = () => {
        setShowModal(false);
        dispatch(setformSlide("expand"));
    };

    return (
        // <div className='new-email-form-page'>
        <>
            <div className="exit-page-btn-div">
                <div className="exit-wrapper" onClick={handleExit}>
                    <i className="fa-regular fa-arrow-left exit-icon"></i>
                    <p className="exit-text">Return to Dashboard</p>
                </div>

                <div>
                    <button
                        className="user-perfer-btn"
                        onClick={handleUserModalShow}
                    >
                        User Preference
                    </button>
                </div>
            </div>

            {showModal && (
                <FormModal onClose={closeUserPreferModal}>
                    <button
                        className="close-modal-btn"
                        onClick={closeUserPreferModal}
                    >
                        X
                    </button>
                    <UserPreferModal />
                </FormModal>
            )}
            <div className="new-email-form-container">
                <div style={{ color: 'white' }}>{error ? error : ""}</div>
                <form onSubmit={handleSubmit} className="new-email-form">
                    {/* <label>To:</label> */}
                    <div className="new-email-to">
                        <input
                            type="text"
                            id="form-input"
                            name="to"
                            placeholder="To"
                        />
                    </div>
                    <div className="dotted-line"></div>
                    {/* <label>Subject:</label> */}
                    <div className="new-email-subject">
                        <input
                            type="text"
                            name="subject"
                            id="form-input"
                            value={email.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                        />
                    </div>
                    <div className="dotted-line"></div>
                    {/* <label>Body:</label> */}
                    <div className="new-email-body" style={{ flexGrow: 1 }}>
                        <textarea
                            name="message"
                            value={email.message}
                            onChange={handleChange}
                            placeholder="Message"
                            style={{ height: "100%" }}
                        />
                    </div>
                    <div className="new-email-form-btn">
                        <button type="submit">
                            {emailToUpdate ? "update" : ">"}
                        </button>
                    </div>
                </form>
            </div>
            {/* <div className="vertical-line"></div> */}
        </>
    );
};

export default EmailForm;
