import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { readEmails, deleteEmail } from "../../../store/email";
import EmailDeleteModal from "../EmailList/EmailDeleteModal";
import { moveToTrash } from "../../../store/email";
import { restoreFromTrash,emptyEmailTrash} from '../../../store/email';


const TrashItemList = () => {
  const dispatch = useDispatch();

    // Assuming you connect this component to a Redux store
  const trashedEmails = useSelector((state) => state.emailsReducer.emails.filter(email => email.isTrashed));
  const isLoading = useSelector(state => state.emailsReducer.isLoading);

  const [isModalActive, setIsModalActive] = useState(false);
  const [emailId, setEmailId] = useState("");

  const handleOpenModal = () => {
      setIsModalActive(true);
  };

  const handleCloseModal = () => {
      setIsModalActive(false);
  };

  const history = useHistory();

 

  const handleEmailClick = (email) => {
    history.push(`/email/${email._id}`);
  };

  const handleConfirmModal = () => {
    setIsModalActive(false);
    dispatch(moveToTrash(emailId));
    dispatch(readEmails());
  };

  useEffect(() => {
    dispatch(readEmails());
  }, [dispatch]);

  const hanleEmptyTrash = () =>{
    dispatch(emptyEmailTrash());
    dispatch(readEmails());
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p >
      ) : (
        <div className="email-list-container">
          <p>Trash</p>
          <button className="emptyEmailTrash" onClick={hanleEmptyTrash}>
            Empty Trash
          </button>

          {trashedEmails.map(email => (
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
                        dispatch(deleteEmail(email._id));
                        dispatch(readEmails());
                    }}
                >
                    <i className="fa-light fa-trash icon-light"></i>
                    <i className="fa-solid fa-trash icon-solid"></i>
                </button>
                
                 <button
                    className="restore-button"
                    onClick={async (e) => {
                        e.stopPropagation(); // Stop event propagation
                        dispatch(restoreFromTrash(email._id));
                        dispatch(readEmails());
                    }}
                > restore
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

export default TrashItemList;