// EmailDetails.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleEmail } from '../../../store/email';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const EmailDetails = () => {
    const { emailId } = useParams();
    const dispatch = useDispatch();
    const email = useSelector(state => state.emailsReducer.emails.find(e => e.id === emailId));
    const isLoading = useSelector(state => state.emailsReducer.isLoading);

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
                </div>
            ) : (
                <p>Email not found</p>
            )}
        </div>
    );
};

export default EmailDetails;

