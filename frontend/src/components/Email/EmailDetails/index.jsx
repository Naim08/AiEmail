// EmailDetails.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleEmail } from '../../../store/email';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateEmail, deleteEmail } from '../../../store/email';
import EmailForm from '../EmailForm';


const EmailDetails = () => {
    const { emailId } = useParams();
    const dispatch = useDispatch();
    const email = useSelector(state => state.emailsReducer.emails.find(e => e._id === emailId));
    const isLoading = useSelector(state => state.emailsReducer.isLoading);
    const [emailToUpdate, setEmailToUpdate] = useState({ subject: email.subject, message: email.message, _id: emailId });


    useEffect(() => {
        if (!email) {
            dispatch(fetchSingleEmail(emailId));
        }
    }, [dispatch, email, emailId]);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : email ? ( // Check if email exists before rendering its properties
                <div>
                    <h2>{email.subject}</h2>
                    <p>{email.message}</p>
                    <EmailForm emailToUpdate={emailToUpdate} />
                </div>
            
            ) : (
                <p>Email not found</p>
            )}
        </div>
    );
};

export default EmailDetails;

