import "./EmailList.css";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readEmails, deleteEmail } from '../../../store/email';

const EmailList = () => {
  const dispatch = useDispatch();
  const emails = useSelector(state => state.emailsReducer.emails);
  const isLoading = useSelector(state => state.emailsReducer.isLoading);

  useEffect(() => {
    dispatch(readEmails());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='pre-email-list-container'>
          {emails.map(email => (
            <div key={email.id} className='pre-email-item'>
              {email.subject}
              <button onClick={() => dispatch(deleteEmail(email._id))}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EmailList;
