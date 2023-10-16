import React from 'react';
import "./EmailList.css";




const EmailDeleteModal = ({ isActive, onClose, onConfirm, children, header }) => {
    const style = {
    color: "black",
  };
    return (
        <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {header && <div style={style} className="modal-header">{header}</div>}
                {header && <div className="modal-divider"></div>}
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default EmailDeleteModal;
