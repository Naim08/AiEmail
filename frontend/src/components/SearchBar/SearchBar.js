import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SearchBar.css";
import { fetchSearchResults, clearSearchResults } from "../../store/search";

const SearchBar = ({ setSearch }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isExpanded, setIsExpanded] = useState(false);
    // const searchResults = useSelector(state => Object.values(state.search));
    const [searchText, setSearchText] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        // debugger

        const query = e.target.value;
        setSearchText(query);
        if (query.trim() !== "") {
            // debugger
            dispatch(fetchSearchResults(query));
        } else {
            dispatch(clearSearchResults());
        }
    };

    const handleSubmit = (e) => {
        // debugger
        console.log("isExpanded", isExpanded);
        e.preventDefault();
        e.stopPropagation();

        if (searchText.trim() !== "") {
            setSearchText("");
            setSearch(true);
            history.push(`/dashpage`);
        }
    };

    return (
        <div
            className={`search-bar ${isExpanded ? "expanded" : ""}`}
            onClick={() => setIsExpanded(true)}
        >
            <button
                className="search-btn"
                onClick={isExpanded ? handleSubmit : null}
            >
                {!isExpanded && <span className="search-text">Search</span>}
                <i
                    className={`fa-sharp fa-regular fa-magnifying-glass ${
                        isExpanded ? "icon-expanded" : ""
                    }`}
                ></i>
            </button>
            {isExpanded && (
                <input
                    type="text"
                    className="search-box"
                    placeholder="search emails.."
                    value={searchText}
                    onChange={handleSearch}
                />
            )}
        </div>
    );
};

export default SearchBar;
