import './SearchResult.css'
import React, { useEffect, useState } from "react";
import { useDispatch,  useSelector  } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import EmailList from '../Email/EmailList';
import { Link, useHistory, useParams } from "react-router-dom";
import { readEmails, deleteEmail } from '../../store/email';
import { getCurrentUser } from '../../store/session';
import EmailDeleteModal from '../Email/EmailList/EmailDeleteModal';
import { fetchSearchResults } from '../../store/search';


const SearchResult = ({query}) =>{
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const emails = useSelector(state => state.emailsReducer.emails);
    const isLoading = useSelector(state => state.emailsReducer.isLoading);
    const currentUser = useSelector(state => state.session.user);
    const searchResults = useSelector((state) => Object.values(state.search));
    const searchParams = new URLSearchParams(location.search);
    // const query = searchParams.get("query");
    const noResults = Object.keys(searchResults).length === 0;
    // console.log("emails", emails);
    console.log("currentUser", currentUser);
    console.log("searchResults", searchResults);
    const handleEmailClick = (email) =>{
        history.push(`/email/${email._id}`)
      }

      const [isModalActive, setIsModalActive] = useState(false);
      const [emailId, setEmailId] = useState("");

      const handleOpenModal = () => {
          setIsModalActive(true);
      };

      const handleCloseModal = () => {
          setIsModalActive(false);
      };

      const handleConfirmModal = (query) => {
        setIsModalActive(false);
        dispatch(deleteEmail(emailId))
        .then(() => {
            debugger
            dispatch(fetchSearchResults(query));

        })
        .catch((error) => {
            console.error("Failed to delete email:", error);
        });

      };

    return (
        <div >
            {noResults &&
                <div>No results containing "{query}"</div>
            }
            <div className="email-list-container">
            {searchResults.map( result => (
                (currentUser._id === result.user) && (
                <div key={result.id} className='pre-email-item' onClick={() => handleEmailClick(result)}>
                    <div className="email-content">
                        <span className="email-subject">{result.subject}</span>
                        <span className="email-body">{result.message}</span>
                    </div>
                    <button
                    className="delete-button"
                    onClick={async (e) => {
                        e.stopPropagation(); // Stop event propagation
                        setEmailId(result._id)
                        handleOpenModal();
                    }}
                    >
                        <i className="fa-light fa-trash icon-light"></i>
                        <i className="fa-solid fa-trash icon-solid"></i>
                    </button>

                </div>)
            ))}
            </div>

            <EmailDeleteModal
                isActive={isModalActive}
                onClose={handleCloseModal}
                onConfirm={handleConfirmModal}
                header="Delete Comfirmation"
            >
                <p>Delete your email permanently?</p>
            </EmailDeleteModal>

        </div>



    )
}


export default SearchResult;
