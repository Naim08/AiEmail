import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    trashEmail,
    restoreFromTrash,
    emptyEmailTrash,
} from "../../../store/email";
import NavBar from "../../NavBar/NavBar";
import SearchBar from "../../SearchBar/SearchBar";
import SearchResult from "../../SearchResult/SearchResult";
import TrashItemList from "./TrashItem";

const TrashEmailsPage = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState(false);
    const [searchText, setSearchText] = useState("");

    return (
        <div className="app-container">
            <NavBar />
            <div className="email-container">
                <SearchBar
                    setSearch={setSearch}
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                {search ? (
                    <SearchResult query={searchText} />
                ) : (
                    <TrashItemList />
                )}
            </div>
        </div>
    );
};

export default TrashEmailsPage;
