import './SearchResult.css'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import EmailList from '../Email/EmailList';

const SearchResult = () =>{
    const dispatch = useDispatch();
    const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    const noResults = Object.keys(searchResults).length === 0;


    return (
        <div>
            {noResults &&
                <div>No results containing "{query}"</div>
            }
            <EmailList />
        </div>
    )
}


export default SearchResult;
