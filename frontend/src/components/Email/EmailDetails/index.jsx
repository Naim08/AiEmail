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
import { sendGmail } from "../../../store/email";
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
    const [showChatMessage, setShowChatMessage] = useState(false);

    const [copyCompleted, setCopyCompleted] = useState(false);
    const [updateCompleted, setUpdateCompleted] = useState(false);
    const [sendCompleted, setSendCompleted] = useState(false);

    // Add states for icon reset timers
    const [copyResetTimer, setCopyResetTimer] = useState(null);
    const [updateResetTimer, setUpdateResetTimer] = useState(null);
    const [sendResetTimer, setSendResetTimer] = useState(null);

    const error = useSelector((state) => state.emailsReducer.error);
    const userPreferences = useSelector((state) => state.userPreferenceReducer);

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

            const options = { ...userPreferences };
            dispatch(sendMessage({ prompt, options }));

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
        setUpdateCompleted(true); // Set updateCompleted to true

        // Start a timer to reset the icon state after 2000 milliseconds (2 seconds)
        const timer = setTimeout(() => {
            setUpdateCompleted(false); // Reset updateCompleted to false
        }, 2000);

        // Store the timer reference
        setUpdateResetTimer(timer);
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

    const copyToClipboard = async () => {
        const emailResponseId = Object.keys(emailResponse)[0];
        const textToCopy = emailResponse[emailResponseId].response;

        try {
            await navigator.clipboard.writeText(textToCopy);

            setCopyCompleted(true); // Set copyCompleted to true

            // Start a timer to reset the icon state after 2000 milliseconds (2 seconds)
            const timer = setTimeout(() => {
                setCopyCompleted(false); // Reset copyCompleted to false
            }, 2000);

            // Store the timer reference
            setCopyResetTimer(timer);
        } catch (err) {}
    };

    useEffect(() => {
        // This will log the value of showChatMessage whenever it changes
    }, [showChatMessage]);

    const sendEmailHandler = async (e) => {
        e.preventDefault();
        dispatch(sendGmail({ ...localEmail, id: emailId }));
        setSendCompleted(true); // Set sendCompleted to true

        // Start a timer to reset the icon state after 2000 milliseconds (2 seconds)
        const timer = setTimeout(() => {
            setSendCompleted(false); // Reset sendCompleted to false
        }, 2000);

        // Store the timer reference
        setSendResetTimer(timer);
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
                        <UserPreferModal setShowModal={setShowModal} />
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
                                className="form-input"
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
                                className="form-input"
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
                            <button
                                type="submit"
                                onClick={() => setShowChatMessage(true)}
                            >
                                {updateCompleted ? (
                                    <i className="fa-solid fa-check"></i> // Checkmark icon
                                ) : (
                                    "update"
                                )}
                            </button>
                            <button type="submit" onClick={sendEmailHandler}>
                                {sendCompleted ? (
                                    <i className="fa-solid fa-check"></i> // Checkmark icon
                                ) : (
                                    "send"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="chat-message">
                    {/* Debug line */}
                    {emailResponse ? (
                        Object.values(emailResponse).map((message, idx) => (
                            <MessageComponent key={idx} message={message} />
                        ))
                    ) : (
                        <div className="loading-dots">
                            <span>Loading</span>
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                    )}
                    <button className="copy-button" onClick={copyToClipboard}>
                        {copyCompleted ? (
                            <i className="fa-solid fa-check"></i> // Checkmark icon
                        ) : (
                            <i className="fa-solid fa-copy"></i> // Original copy icon
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default EmailDetails;
