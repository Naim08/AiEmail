import React, { useEffect, useRef } from "react";
import "./InstructionModal.css";

const InstructionModal = ({ isActive, onClose, header }) => {
    const modalRef = useRef();

    // Function to handle outside click
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    // Register the outside click event when the modal is active
    useEffect(() => {
        if (isActive) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isActive]);

    return (
        <dialog
            className={`instr-modal modal-overlay ${isActive ? "active" : ""}`}
        >
            <div
                className="modal-content"
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
            >
                {header && (
                    <div className="modal-header">
                        <h1>Welcome to MailTo!</h1>
                    </div>
                )}
                <div className="instr-modal-body">
                    <br />
                    <div>
                        Streamline your email communication with AI-powered
                        responses.
                    </div>
                    <br />
                    <div>
                        <div>
                            <h3>Connecting your Gmail</h3>
                            <li>
                                Select the 'Link Gmail' in the Navigation Bar to
                                can login with your Gmail.
                            </li>
                        </div>
                        <br />

                        <div>
                            <h3>Create a new email</h3>
                            <li>
                                Clicking the{" "}
                                <i className="fa-sharp fa-light fa-plus"></i>{" "}
                                icon can start crafting a new email.
                            </li>
                            <li>
                                Clicking the button at the bottom right to
                                submit your message to the AI API.
                            </li>
                            <li>
                                Clicking the{" "}
                                <i class="fa-sharp fa-light fa-sliders"></i>{" "}
                                will pop up an user preference modal for
                                personalizing AI responses.
                            </li>
                            <li>
                                Clicking the{" "}
                                <i className="fa-solid fa-copy"></i>can copy the
                                AI responses.
                            </li>
                        </div>
                        <br />

                        <div>
                            <h3>Edit and delete previous emails</h3>
                            <li>
                                Clicking the{" "}
                                <i className="fa-light fa-trash icon-light"></i>{" "}
                                can delete the email to trash.
                            </li>
                            <li>
                                Clicking the "update" button can get the new AI
                                responses.
                            </li>
                        </div>
                        <br />
                    </div>
                </div>
                <div modal-footer>
                    <button onClick={onClose}>Ok</button>
                </div>
            </div>
        </dialog>
    );
};

export default InstructionModal;
