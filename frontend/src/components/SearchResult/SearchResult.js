import './SearchResult.css'
import { useDispatch,  useSelector  } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import EmailList from '../Email/EmailList';

const SearchResult = () =>{
    const dispatch = useDispatch();
    const location = useLocation();
    const emails = useSelector(state => state.emailsReducer.emails);
    const isLoading = useSelector(state => state.emailsReducer.isLoading);
    const searchResults = useSelector((state) => state.search);
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    // const noResults = Object.keys(searchResults).length === 0;
    console.log("emails", emails);
    console.log("location", location);
    console.log("searchResults", searchResults);

    return (
        <div>
            {/* {noResults &&
                <div>No results containing "{query}"</div>
            } */}
            <h1>SearchResult</h1>

        </div>
    )
}


export default SearchResult;
