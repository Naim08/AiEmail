import "./EmailList.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { readEmails, deleteEmail } from "../../../store/email";
import { fetchEmails } from "../../../store/chatgpt";

const EmailList = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emailsReducer.emails);
  const isLoading = useSelector((state) => state.emailsReducer.isLoading);

  const history = useHistory();

  const handleToNew = () => {
    history.push("/email/form");
  };

  const handleEmailClick = (email) => {
    history.push(`/email/${email._id}`);
  };

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
            <i className="fa-sharp fa-light fa-plus fa-2xl"></i>
            </div>
          </div>

          {emails.map(email => (
  <div key={email.id} className='pre-email-item' onClick={() => handleEmailClick(email)}>
    <div className="email-content">
      <span className="email-subject">{email.subject}</span>
      <span className="email-body">{email.message}</span>
    </div>
    <button
        className="delete-button"
        onClick={async (e) => {
            e.stopPropagation(); // Stop event propagation
            await dispatch(deleteEmail(email._id));
            dispatch(readEmails()); // Assuming you have a fetchEmail action
        }}
    >
    <i className="fa-light fa-trash icon-light"></i>
    <i className="fa-solid fa-trash icon-solid"></i>
</button>

  </div>
))}

          </div>
      )}
    </>
  );
};

export default EmailList;
