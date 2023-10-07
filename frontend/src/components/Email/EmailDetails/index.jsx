import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleEmail } from "../../../store/email";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateEmail, deleteEmail, getEmail } from "../../../store/email";
import { useHistory } from "react-router-dom";
import MessageComponent from "../../ChatGPT/MessageComponent";
import { setformSlide } from "../../../store/ui";
import UserPreferModal from "../../UserPreferModal/UserPreferModal";
import { FormModal } from "../../../context/modal";

import { sendMessage, getMessage } from "../../../store/chatgpt";

//EXISTING EMAIL PAGE

const EmailDetails = () => {
    const { emailId } = useParams();
    const isLoading = useSelector((state) => state.emailsReducer.isLoading);
    const dispatch = useDispatch();
    const history = useHistory();
    const email = useSelector(getEmail(emailId));
    const emailResponse = useSelector(getMessage);
    const emailPrompt = useSelector(getEmail(emailId));
    const [localEmail, setLocalEmail] = useState(email);
    const [showModal, setShowModal] = useState(false);

    const error = useSelector((state) => state.emailsReducer.error);

    useEffect(() => {
        dispatch(fetchSingleEmail(emailId));
    }, []);

    useEffect(() => {
        if (emailPrompt) {
            const prompt = {
                subject: email.subject,
                message: email.message,
                emailId: emailId,
            };
            dispatch(sendMessage({ prompt: prompt }));
            setLocalEmail(email);
        }
    }, [emailPrompt]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalEmail({ ...localEmail, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateEmail({ ...localEmail, id: emailId }));
    };

    const handleExit = (e) => {
        e.preventDefault();
        history.push(`/dashpage`);
    };

    const handleUserModalShow = (e) => {
        e.preventDefault();
        setShowModal(true);
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
            <div className="main-container">
                <div className="new-email-form-container">
                    <div style={{ color: "white" }}>{error ? error : ""}</div>
                    <form onSubmit={handleSubmit} className="new-email-form">
                        <div className="new-email-to">
                            <input
                                type="text"
                                id="form-input"
                                name="to"
                                placeholder="To"
                                value={localEmail ? localEmail.to : ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="dotted-line"></div>
                        <div className="new-email-subject">
                            <input
                                type="text"
                                id="form-input"
                                name="subject"
                                value={localEmail ? localEmail.subject : ""}
                                onChange={handleChange}
                                placeholder="Subject"
                            />
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
                                value={localEmail ? localEmail.message : ""}
                                onChange={handleChange}
                                placeholder="Message"
                                style={{ height: "100%" }}
                            />
                        </div>
                        <div className="new-email-form-btn">
                            <button type="submit">update</button>
                        </div>
                    </form>
                </div>
                <div className="chat-message">
                    {emailResponse &&
                        Object.values(emailResponse).map((message, idx) => (
                            <MessageComponent key={idx} message={message} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default EmailDetails;
