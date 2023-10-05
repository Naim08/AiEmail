import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleEmail } from "../../../store/email";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateEmail, deleteEmail, getEmail } from "../../../store/email";
import { useHistory } from "react-router-dom";
import MessageComponent from "../../ChatGPT/MessageComponent";
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
    useEffect(() => {
        dispatch(fetchSingleEmail(emailId));
    }, []);

    useEffect(() => {
        if (emailPrompt) {
            const prompt = {
                subject: email.subject,
                message: email.message,
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
    console.log(localEmail);

    return (
        <>
            <div className="exit-wrapper" onClick={handleExit}>
                <i className="fa-regular fa-arrow-left exit-icon"></i>
                <p className="exit-text">Return to Dashboard</p>
            </div>
            <div className="main-container">
                <div className="new-email-form-container">
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
                                id="form-input"
                                name="subject"
                                value={localEmail ? localEmail.subject : ""}
                                onChange={handleChange}
                                placeholder="Subject"
                            />
                        </div>
                        <div className="dotted-line"></div>
                        {/* <label>Body:</label> */}
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
                {/* <div className="vertical-line"></div> */}
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
