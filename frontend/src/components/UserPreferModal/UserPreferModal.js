import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./UserPreferModal.css"
import { FormModal } from "../../context/modal";
import { setFormPage, setformSlide } from "../../store/ui";

const UserPreferModal = () =>{
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);


    const closeUserPreferModal = ()=>{
        dispatch(setShowModal(false));
        dispatch(setFormPage("start"));
        dispatch(setformSlide("expand"));

    }

    return (
        <FormModal onClose={closeUserPreferModal}>
            <div className="user-modal-content">
                <div className="user-modal-header">
                    <div className="user-modal-header-img">
                        <i className="fa-solid fa-bullseye-arrow fa-2xl"></i>
                    </div>
                    <div>
                        <h1>Set Your preference</h1>
                    </div>
                </div>
                <div className="user-modal-body">
                    <div className="user-modal-body-row">
                        <div>
                            <h3>Tone</h3>
                        </div>
                        <div>
                            <button>Formal</button>
                            <button>Casual</button>
                            <button>Friendly</button>
                            <button>Professional</button>
                        </div>
                    </div>

                    <div className="user-modal-body-row">
                        <div>
                            <h3>Length</h3>
                        </div>
                        <div>
                            <button>Concise</button>
                            <button>Medium</button>
                            <button>Detailed</button>
                            <button>Custom</button>
                        </div>
                    </div>

                    <div className="user-modal-body-row">
                        <div>
                            <h3>Response Promptness</h3>
                        </div>
                        <div>
                            <button>Immediate</button>
                            <button>Delayed</button>
                            <button>Business Hours</button>
                            <button>Scheduled Time</button>
                        </div>
                    </div>
                </div>
                <div className="user-modal-submit-btn">
                    <button>Done</button>
                </div>

            </div>
        </FormModal>
    )


}

export default UserPreferModal;
