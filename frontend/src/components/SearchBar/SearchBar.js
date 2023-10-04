import React, { useState }  from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SearchBar.css'



const  SearchBar = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`search-bar ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(true)}>
             <button className='search-btn' >
            Search   <i class="fa-sharp fa-regular fa-magnifying-glass"></i>
            </button>
            {isExpanded && (
            <input
                type='text'
                className='search-box'
                placeholder='find something..'
            />
            )}
           
        </div>
    )

}


export default SearchBar;
