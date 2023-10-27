import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../context/modal";
import { setformSlide } from "../../store/ui";
import "./MainPage.css";
import TutorialModal from "../TutorialModal/TutorialModal";
import Modal from 'react-bootstrap/Modal';

function MainPage() {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const typingSpeed = 100; // Constant typing speed
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleModal = () => setShow(!show);
    const closerModal = e => {
        e.preventDefault();
        setShow(false);
    }

    const phrases = [
        "your boss",
        "程表弟",
        "the hiring manager",
        "Kyle Ginzberg",
        "Craig",
        "the design team",
    ];

    useEffect(() => {
        const i = loopNum % phrases.length;
        const fullText = phrases[i];

        const delay = isDeleting ? 80 : typingSpeed; // Different delay for deleting

        const handleType = () => {
            setText(
                isDeleting
                    ? fullText.substring(0, text.length - 1)
                    : fullText.substring(0, text.length + 1)
            );

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 500);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setLoopNum((prevLoopNum) => prevLoopNum + 1);
            }
        };

        const timer = setTimeout(handleType, delay);
        return () => clearTimeout(timer);
    }, [loopNum, text, isDeleting]);

    return (
        <>
            <div className="container">
                <div className="heading-static">MailTo</div>
                <div className="heading-dynamic">
                    <span className="typing">{text}</span>
                    <span className="cursor"></span>
                </div>
                <div className="vertical-line"></div>
                <div className="center-container">
                    <div className="get-started">Get Started</div>
                    <div className="button-container">
                        <Link to="/signup" className="neumorphic">
                            Sign Up
                        </Link>
                        <Link to="/login" className="neumorphic">
                            Log In
                        </Link>
                        <button onClick={handleModal}>
                            Tutorial
                        </button>
                    </div>
                </div>
            </div>
            {show && (
                // <Modal centered show={show} onHide={handleModal} style={{height: "650px !important", width: "1000px !important"}} dialogClassName="custom-modal-content">
                <div className="tutorialModal">

                    <TutorialModal />
                    <div className="close-modal-btn">
                        <button

                            onClick={closerModal}
                        >
                            Close
                        </button>

                    </div>

                </div>


                //    </Modal>
            )}
            <footer>PRBC &copy; 2023</footer>
        </>
    );
}

export default MainPage;
