import React from 'react';
import "./EmailList.css";

const EmailDeleteModal = ({isActive, onClose, children }) => {
    return (
        <div className={`modal-overlay ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default EmailDeleteModal;
