import "./TutorialModal.css";
import homepage from "../../assets/homepage.gif";
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import banana from '../Profile/banana.png';
import sendAiReq from './Gif/sendAiReq.gif';
import updateReq from './Gif/updateReq.gif';
import sendEmail from './Gif/sendEmail.gif';
import linkGmail from './Gif/linkGmail.gif';
import 'bootstrap/dist/css/bootstrap.min.css';

const TutorialModal = ()=>{
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };

    const imgStyle = {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
  };

    return (
        <Carousel className="carousel-modal"activeIndex={index} onSelect={handleSelect} style={{ display: 'block', width: 850, height: 500, padding: 5}}>
                  <Carousel.Item  className="carousel-item">
                          <img
                            alt="send Ai Req"
                            src={ sendAiReq }
                            style={imgStyle}
                          />

                      <h4 className="carousel-modal-font">Create new email and Send AI response request</h4>
                  </Carousel.Item>

                  <Carousel.Item >
                          <img
                            alt="update Req"
                            src={ updateReq }
                            style={imgStyle}
                          />
                      <h4 className="carousel-modal-font">Update AI response request</h4>
                  </Carousel.Item>

                  <Carousel.Item >
                          <img
                            alt="send Email"
                            src={ sendEmail }
                            style={imgStyle}
                          />
                      <h4 className="carousel-modal-font">Sending email</h4>
                  </Carousel.Item>

                  <Carousel.Item >
                          <img
                            alt="link Gmail"
                            src={ linkGmail }
                            style={imgStyle}
                          />

                      <h4 className="carousel-modal-font">Link with Gmail(Our app is still under the verification process from Google)</h4>

                  </Carousel.Item>
        </Carousel>
    )
}


export default TutorialModal;
