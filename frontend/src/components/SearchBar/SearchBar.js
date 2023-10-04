import React, { useState }  from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SearchBar.css'



const  SearchBar = () => {

    return (
        <div className='search-bar'>
            <input
                type='text'
                className='search-box'
                // value={title}
                placeholder='find something..'
                // onChange={e => setTitle(e.target.value)}
            />
            <button className='search-btn' >
            <i class="fa-sharp fa-regular fa-magnifying-glass"></i>
            </button>
        </div>
    )

}


export default SearchBar;
