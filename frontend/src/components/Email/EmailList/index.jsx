import "./EmailList.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { readEmails, deleteEmail } from "../../../store/email";
import { fetchEmails } from "../../../store/chatgpt";
import EmailDeleteModal from './EmailDeleteModal';


const EmailList = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emailsReducer.emails);
  const isLoading = useSelector((state) => state.emailsReducer.isLoading);

  const [isModalActive, setIsModalActive] = useState(false);
  const [emailId, setEmailId] = useState("");

  const handleOpenModal = () => {
      //alert(id);
      setIsModalActive(true);
      //setEmailId(id);
  };

  const handleCloseModal = () => {
    console.log("clickClose")
      setIsModalActive(false);
  };

  const history = useHistory();

  const handleToNew = () => {
    history.push("/email/form");
  };

  const handleEmailClick = (email) => {
    history.push(`/email/${email._id}`);
  };

  const deleteEmailById = () => {
    setIsModalActive(false);
    // alert(emailId);
    dispatch(deleteEmail(emailId));
    dispatch(readEmails()); // Assuming you have a fetchEmail action
};

  useEffect(() => {
    dispatch(readEmails());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p >
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
            setEmailId(email._id)
            handleOpenModal();
            // await dispatch(deleteEmail(email._id));
            // dispatch(readEmails()); // Assuming you have a fetchEmail action
        }}
    >

    <i className="fa-light fa-trash icon-light"></i>
    <i className="fa-solid fa-trash icon-solid"></i>
</button>

  </div>
))}

          </div>
      )}
      <div>
            <EmailDeleteModal isActive={isModalActive} onClose={handleCloseModal}>
                <h2>Delete Comfirmation</h2>
                <p>Are you sure to delete this email?</p>
                <button onClick={handleCloseModal}>Close</button>
                <button onClick={deleteEmailById}>Comfirm</button>
            </EmailDeleteModal>
        </div>
    </>
  );
};

export default EmailList;
