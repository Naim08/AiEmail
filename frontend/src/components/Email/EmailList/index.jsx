import "./EmailList.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { readEmails, deleteEmail } from "../../../store/email";
import { fetchEmails } from "../../../store/chatgpt";
import EmailDeleteModal from "./EmailDeleteModal";

const EmailList = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emailsReducer.emails);
  const isLoading = useSelector((state) => state.emailsReducer.isLoading);

  const [isModalActive, setIsModalActive] = useState(false);
  const [emailId, setEmailId] = useState("");

  const handleOpenModal = () => {
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  const history = useHistory();

  const handleToNew = () => {
    history.push("/email/form");
  };

  const handleEmailClick = (email) => {
    history.push(`/email/${email._id}`);
  };

  const handleConfirmModal = () => {
    setIsModalActive(false);
    dispatch(deleteEmail(emailId));
    dispatch(readEmails());
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

          {emails.map((email) => (
            <div
              key={email.id}
              className="pre-email-item"
              onClick={() => handleEmailClick(email)}
            >
              <div className="email-content">
                <span className="email-subject">{email.subject}</span>
                <span className="email-body">
                  {email.snippet || email.message}
                </span>
              </div>
              <button
                className="delete-button"
                onClick={async (e) => {
                  e.stopPropagation(); // Stop event propagation
                  setEmailId(email._id);
                  handleOpenModal();
                }}
              >
                <i className="fa-light fa-trash icon-light"></i>
                <i className="fa-solid fa-trash icon-solid"></i>
              </button>
            </div>
          ))}
        </div>
      )}
      <EmailDeleteModal
        isActive={isModalActive}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        header="Delete Comfirmation"
      >
        <p>Delete your email permanently?</p>
      </EmailDeleteModal>
    </>
  );
};

export default EmailList;
