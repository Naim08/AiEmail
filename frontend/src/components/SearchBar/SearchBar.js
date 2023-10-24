import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SearchBar.css";
import { fetchSearchResults, clearSearchResults } from "../../store/search";

const SearchBar = ({ setSearch, searchText, setSearchText }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.value;
        setSearchText(query);

        if (query.trim() !== "") {
            setSearch(true);
            dispatch(fetchSearchResults(query));
        } else {
            setSearch(false);
            dispatch(clearSearchResults());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (searchText.trim() !== "") {
            setSearch(true);
            history.push(`/dashpage`);
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-bar"
                placeholder="search emails.."
                value={searchText}
                onChange={handleSearch}
            />
            <i className="fa-sharp fa-regular fa-magnifying-glass search-icon"></i>
        </div>
    );
};

export default SearchBar;
