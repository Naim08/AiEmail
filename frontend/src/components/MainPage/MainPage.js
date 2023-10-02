import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 100;  // Constant typing speed

  const phrases = ['your boss', 'Mom', 'the hiring manager', 'Greg', 'the design team'];

  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const delay = isDeleting ? 100 : typingSpeed;  // Different delay for deleting

    const handleType = () => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
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
        <div className="heading">MailTo <span className="typing">{text}</span><span className="cursor"></span></div>
        <div className="vertical-line"></div>
        <div className="center-container">
          <div className="neumorphic">
            <a href="/signup">Sign Up</a>
          </div>
          <div className="neumorphic">
            <a href="/login">Log In</a>
          </div>
        </div>
      </div>
      <footer>Copyright &copy; 2023</footer>
    </>
  );
}

export default MainPage;
