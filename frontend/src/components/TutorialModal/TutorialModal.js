import "./TutorialModal.css";
import homepage from "../../assets/homepage.gif";
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import banana from '../Profile/banana.png';
import sendReqAndEmail from './Gif/sendReqAndEmail.gif'
import 'bootstrap/dist/css/bootstrap.min.css';

const TutorialModal = ()=>{
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} style={{ display: 'block', width: 850, height: 500, padding: 5, border:'1px solid white'}}>
                  <Carousel.Item >
                      <div className="w1000">
                          <img
                            alt="bannerText1"
                            src={ sendReqAndEmail }
                            style={{ width: "100%", height: "100%", objectFit: 'contain' }}
                          />
                      </div>
                      <h1>banana 1 </h1>
                  </Carousel.Item>

                  <Carousel.Item >
                      <div className="w1000">
                          <img
                            alt="bannerText1"
                            src={ banana }
                          />
                      </div>
                      <h1>banana 2 </h1>
                  </Carousel.Item>

                  {/* <Carousel.Item interval={1000}>
                      <div className="w1000">
                          <img
                            alt="bannerText1"
                            src={ banana }
                          />
                      </div>
                      <h1>banana 3 </h1>
                  </Carousel.Item> */}
        </Carousel>
    )
}


export default TutorialModal;
