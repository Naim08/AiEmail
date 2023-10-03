import "./DashPage.css";
import React from "react";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import EmailList from "../Email/EmailList";

const DashPage = () => {

    return (
        <div className="app-container">

            <div className="left-sideBar">
                <NavBar />
            </div>

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
