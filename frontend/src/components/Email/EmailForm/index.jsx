import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEmail, updateEmail } from "../../../store/email";
import UserPreferModal from "../../UserPreferModal/UserPreferModal";
import { FormModal } from "../../../context/modal";
import { setformSlide } from "../../../store/ui";
import "../EmailShow.css";

//NEW EMAIL PAGE
const EmailForm = ({ emailToUpdate }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const error = useSelector((state) => state.emailsReducer.error);

    const [email, setEmail] = useState({
        subject: emailToUpdate ? emailToUpdate.subject : "",
        message: emailToUpdate ? emailToUpdate.message : "",
        to: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (errors[name]) {
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
        }
        setEmail({ ...email, [name]: value });
    };

    const handleUserModalShow = (e) => {
        e.preventDefault();
        setShowModal(true);
    };
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!email.to) newErrors.to = "field cannot be empty!";
        if (!email.subject) newErrors.subject = "field cannot be empty!";
        if (!email.message) newErrors.message = "field cannot be empty!";
        return newErrors;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const emailWithUser = {
            ...email,
            user: sessionUser._id,
        };

        const returnedEmail = await dispatch(createEmail(emailWithUser));

        if (returnedEmail && returnedEmail._id) {  // Check if the returnedEmail object has the _id property
        history.push(`/email/${returnedEmail._id}`);  
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
        <>
            <div className="exit-page-btn-div">
                <div className="exit-wrapper" onClick={handleExit}>
                    <i className="fa-regular fa-arrow-left exit-icon"></i>
                    <p className="exit-text">Return to Dashboard</p>
                </div>
            </div>

            {showModal && (
                <div className="form-modal-outer">
                    <FormModal onClose={closeUserPreferModal}>
                        <button
                            className="close-modal-btn"
                            onClick={closeUserPreferModal}
                        >
                            X
                        </button>
                        <UserPreferModal />
                    </FormModal>
                </div>
            )}
            <div className="new-email-form-container">
                <div style={{ color: "white" }}>{error ? error : ""}</div>
                <form onSubmit={handleSubmit} className="new-email-form">
                    {/* <label>To:</label> */}
                    <div className="new-email-to">
                        <input
                            type="text"
                            id="form-input"
                            name="to"
                            placeholder="To"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`error ${errors.to ? "show" : ""}`}>
                        {errors.to || ""}
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
                    <div className={`error ${errors.subject ? "show" : ""}`}>
                        {errors.subject || ""}
                    </div>
                    <div className="dotted-line"></div>
                    <div>
                        <button
                            className="user-prefer-btn"
                            onClick={handleUserModalShow}
                        >
                            <i class="fa-sharp fa-light fa-sliders"></i>
                        </button>
                    </div>
                    <div className="new-email-body" style={{ flexGrow: 1 }}>
                        <textarea
                            name="message"
                            value={email.message}
                            onChange={handleChange}
                            placeholder="Message"
                            style={{ height: "100%" }}
                        />
                    </div>
                    <div
                        className={`body-error ${errors.message ? "show" : ""}`}
                    >
                        {errors.message || ""}
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
