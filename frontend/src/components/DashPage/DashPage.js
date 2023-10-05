import "./DashPage.css";
import React, { useState }  from 'react';
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import EmailList from "../Email/EmailList";
import { useDispatch } from 'react-redux';

const DashPage = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState();

    return (
        <div className="app-container">
                <NavBar />
            <div className="email-container">

                <div className="search-bar-container">
                    <SearchBar />
                </div>

                <EmailList />
            </div>

        </div>
    );

};

export default DashPage;
