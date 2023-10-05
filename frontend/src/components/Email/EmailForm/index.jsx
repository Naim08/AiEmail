import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEmail, updateEmail, readEmails } from "../../../store/email";
import "../EmailShow.css";

//NEW EMAIL PAGE
const EmailForm = ({ emailToUpdate }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState({
        subject: emailToUpdate ? emailToUpdate.subject : "",
        message: emailToUpdate ? emailToUpdate.message : "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail({ ...email, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (emailToUpdate) {
            dispatch(updateEmail({ ...email, id: emailToUpdate._id }));
        } else {
            dispatch(createEmail(email));
        }
    };

    const handleExit = (e) => {
        e.preventDefault();
        history.push(`/dashpage`);
    };

    return (
        // <div className='new-email-form-page'>
        <>
            <div className="exit-page-btn-div">
                <div className="exit-wrapper" onClick={handleExit}>
                    <i className="fa-regular fa-arrow-left exit-icon"></i>
                    <p className="exit-text">Return to Dashboard</p>
                </div>
            </div>

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
