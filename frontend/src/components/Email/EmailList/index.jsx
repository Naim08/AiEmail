import "./EmailList.css";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from "react-router-dom";
import { readEmails, deleteEmail } from '../../../store/email';

const EmailList = () => {
  const dispatch = useDispatch();
  const emails = useSelector(state => state.emailsReducer.emails);
  const isLoading = useSelector(state => state.emailsReducer.isLoading);

  const history = useHistory();

  const handleToNew = () =>{
      history.push('/email/form')
  }

  const handleEmailClick = (email) =>{
    history.push(`/email/${email._id}`)
  }

  useEffect(() => {
    dispatch(readEmails());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (

        <div className="email-list-container">
          <div className="new-email-item" onClick={handleToNew}>
            <div className="new-item-img">
            <i class="fa-sharp fa-light fa-plus fa-2xl"></i>
            </div>
          </div>

            {emails.map(email => (
              <div key={email.id} className='pre-email-item' onClick={() => handleEmailClick(email)}>
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
