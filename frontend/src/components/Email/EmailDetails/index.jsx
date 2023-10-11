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
    const [showChatMessage, setShowChatMessage] = useState(false);

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

        const options = {...userPreferences}

        console.log(options)
        dispatch(sendMessage({ prompt, options }));

        setLocalEmail(email);
      }
    }, [emailPrompt]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalEmail({ ...localEmail, [name]: value });
    };

    const handleSubmit = (e) => {
        console.log("SubMITTING FORM");
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

    const copyToClipboard = async () => {
        const emailResponseId = Object.keys(emailResponse)[0];
        const textToCopy = emailResponse[emailResponseId].response;

        try {
            await navigator.clipboard.writeText(textToCopy);
            console.log("Text successfully copied to clipboard");
        } catch (err) {
            console.log("Failed to copy text: ", err);
        }
    };

    useEffect(() => {
        // This will log the value of showChatMessage whenever it changes
        console.log("showChatMessage is now: ", showChatMessage);
    }, [showChatMessage]);

    return (
        <>
            {console.log("showChatMessage:", showChatMessage)}
            {console.log("emailResponse:", emailResponse)}
            {console.log("CONSOLE LOG")}
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
                        <UserPreferModal setShowModal={setShowModal}/>
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
                            <button
                                type="submit"
                                onClick={() => setShowChatMessage(true)}
                            >
                                update
                            </button>
                        </div>
                    </form>
                </div>
                {/* <div
                    className={`chat-message ${
                        showChatMessage ? "fade-in" : ""
                    }`}
                >
                    {emailResponse ? (
                        Object.values(emailResponse).map((message, idx) => (
                            <MessageComponent key={idx} message={message} />
                        ))
                    ) : (
                        <div className="loading-dots">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                    )}
                    <button className="copy-button" onClick={copyToClipboard}>
                        <i className="fa-solid fa-copy"></i>
                    </button>
                </div> */}
                <div className="chat-message">
                    {console.log("emailResponse:", emailResponse)}{" "}
                    {/* Debug line */}
                    {emailResponse ? (
                        Object.values(emailResponse).map((message, idx) => (
                            <MessageComponent key={idx} message={message} />
                        ))
                    ) : (
                        <div className="loading-dots">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                    )}
                    <button className="copy-button" onClick={copyToClipboard}>
                        <i className="fa-solid fa-copy"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default EmailDetails;
