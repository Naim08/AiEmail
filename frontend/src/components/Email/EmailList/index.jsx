// EmailList.js
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
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {emails.map(email => (
            <li key={email.id}>
              {email.subject}
              <button onClick={() => dispatch(deleteEmail(email._id))}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailList;
