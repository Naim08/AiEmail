import "./EmailDeleteModal.css";
import React, { useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

const EmailDeleteModal = ({showDeleteModal, setShowDeleteModal})=>{
    const dispatch = useDispatch();
    const history = useHistory();
    // const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCancel = ()=>{
        setShowDeleteModal(false);

    }
    const handleDeleteEmail = ()=>{

    }

    return (
        <div>
            <h1>Delete Email</h1>
            <p>Delete your email permanently?</p>
            <button onClick={handleCancel} >Cancel</button>
            <button onClick={handleDeleteEmail} >Delete</button>
        </div>
    )

}

export default EmailDeleteModal;
