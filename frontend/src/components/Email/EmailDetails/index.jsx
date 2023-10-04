// EmailDetails.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleEmail } from '../../../store/email';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateEmail, deleteEmail } from '../../../store/email';
import { useHistory } from "react-router-dom";


const EmailDetails = () => {
    const { emailId } = useParams();
    const isLoading = useSelector(state => state.emailsReducer.isLoading);
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState(useSelector(state => state.emailsReducer.emails.find(e => e._id === emailId)))

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail({ ...email, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateEmail({ ...email, id: emailId }));
    };

    const handleExit = (e) => {
        e.preventDefault();
        history.push(`/dashpage`);
    }


    

    return (
        // <div className='new-email-form-page'>
        <>
        <div className='exit-page-btn-div'>
        <div className="exit-wrapper" onClick={handleExit}>
            <i className="fa-regular fa-arrow-left exit-icon"></i>
            <p className="exit-text">Return to Dashboard</p>
        </div>
        </div>

        <div className='new-email-form-container'>
            
            <form onSubmit={handleSubmit} className='new-email-form'>
            {/* <label>To:</label> */}
            <div className='new-email-to'>
                <input
                type="text"
                name="to"
                placeholder="To"
                />
            </div>
            <div className="dotted-line"></div>
            {/* <label>Subject:</label> */}
            <div className='new-email-subject'>
                <input
                type="text"
                name="subject"
                value={email.subject}
                onChange={handleChange}
                placeholder="Subject"
                />
            </div>
            <div className="dotted-line"></div>
            {/* <label>Body:</label> */}
            <div className='new-email-body' style={{ flexGrow: 1 }}>
                <textarea
                name="message"
                value={email.message}
                onChange={handleChange}
                placeholder="Message"
                style={{ height: '100%' }}
                />
            </div>
            <div className='new-email-form-btn'>
                <button type="submit">update</button>
            </div>
            </form>
        </div>
        <div className="vertical-line"></div>

        </>
  );
};

export default EmailDetails;

