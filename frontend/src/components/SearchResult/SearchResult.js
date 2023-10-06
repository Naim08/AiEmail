import './SearchResult.css'
import { useDispatch,  useSelector  } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import EmailList from '../Email/EmailList';
import { Link, useHistory, useParams } from "react-router-dom";
import { readEmails, deleteEmail } from '../../store/email';

const SearchResult = () =>{
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const emails = useSelector(state => state.emailsReducer.emails);
    const isLoading = useSelector(state => state.emailsReducer.isLoading);
    const searchResults = useSelector((state) => Object.values(state.search));
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    const noResults = Object.keys(searchResults).length === 0;
    // console.log("emails", emails);
    // console.log("location", location);
    console.log("searchResults", searchResults);
    const handleEmailClick = (email) =>{
        history.push(`/email/${email._id}`)
      }

    return (
        <div>
            {noResults &&
                <div>No results containing "{query}"</div>
            }

          {searchResults.map( result => (
            <div key={result.id} className='pre-email-item' onClick={() => handleEmailClick(result)}>
                <div className="email-content">
                    <span className="email-subject">{result.subject}</span>
                    <span className="email-body">{result.message}</span>
                </div>
                <button
                  className="delete-button"
                  onClick={async (e) => {
                      e.stopPropagation(); // Stop event propagation
                      await dispatch(deleteEmail(result._id));
                      dispatch(readEmails()); // Assuming you have a fetchEmail action
                  }}
                >
                    <i className="fa-light fa-trash icon-light"></i>
                    <i className="fa-solid fa-trash icon-solid"></i>
                </button>

            </div>
          ))}

        </div>
    )
}


export default SearchResult;
