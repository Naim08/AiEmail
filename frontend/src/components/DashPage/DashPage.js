import "./DashPage.css";
import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthRoute, ProtectedRoute } from "../Routes/Routes";
import NavBar from "../NavBar/NavBar";
import Profile from "../Profile/Profile";
import SearchBar from "../SearchBar/SearchBar";




const DashPage = ()=>{
    const dispatch = useDispatch();


    return (
        <div className="app-container">
            <div className="left-sideBar">
                <NavBar />
            </div>
            <div className="email-container">
            <h1>Emails</h1>
            <div className="search-bar-container">
                <SearchBar />
            </div>
            <div className="email-list-container">
                <div className="new-email-item">
                    <div className="new-item-img">
                        <i className="fa-light fa-file"></i>
                    </div>
                    <div className="new-item-text"><span>New</span></div>
                </div>

                </div>
                </div>
        </div>
    )


}

export default DashPage;
