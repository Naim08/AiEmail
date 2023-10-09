import "./DashPage.css";
import React, { useState }  from 'react';
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import EmailList from "../Email/EmailList";
import { useDispatch } from 'react-redux';
import SearchResult from "../SearchResult/SearchResult";
import TrashEmailsPage from "../Email/EmailTrash";


const DashPage = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState(false);
    const [searchText, setSearchText] = useState("");

    return (
        <div className="app-container">
                <NavBar />
            <div className="email-container">

                <div className="search-bar-container">
                    <SearchBar setSearch={setSearch} searchText={searchText} setSearchText={setSearchText}/>
                </div>

                {search? <SearchResult query={searchText} /> : <EmailList />}

            </div>

        </div>
    );

};

export default DashPage;
