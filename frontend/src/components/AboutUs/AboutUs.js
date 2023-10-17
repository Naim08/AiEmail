import "./AboutUs.css";
import { useHistory } from "react-router-dom";
import Sanjid from "./pics/sanjidBW.jpg";
import Fanyi from "./pics/Fanyi.png";
import Naim from "./pics/Naim.jpeg";
import Yinyin from "./pics/Yinyin.png";

const AboutUs = () => {
    const history = useHistory();

    const handleExit = () => {
        history.push(`/dashpage`);
    };

    return (
        <div>
            <div className="exit-page-btn-div">
                <div className="exit-wrapper" onClick={handleExit}>
                    <i className="fa-regular fa-arrow-left exit-icon"></i>
                    <p className="exit-text">Return to Dashboard</p>
                </div>
            </div>
            <div className="team-members-container">
                <div className="member-box">
                    <img src={Fanyi} className="member-pic" />
                    <p>Fanyi Tang - Team Lead</p>
                    <div className="links-container">
                        <a
                            href="https://www.github.com/Foris8"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                        <a
                            href="https://www.linkedin.com/in/fanyitang"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className="bio-container">
                        {/* <p>Fanyi likes to go to the gym and eat salmon.</p> */}
                    </div>
                </div>

                <div className="member-box">
                    <img src={Sanjid} className="member-pic" />
                    <p>Sanjid Dewan - Frontend Lead</p>
                    <div className="links-container">
                        <a
                            href="https://www.github.com/dizzysky"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sanjiddewan"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className="bio-container">
                        {/* <p>Sanjid loves playing pool and listening to music.</p> */}
                    </div>
                </div>

                <div className="member-box">
                    <img src={Naim} className="member-pic" />
                    <p>Naim Miah - Backend Lead</p>
                    <div className="links-container">
                        <a
                            href="https://www.github.com/Naim08"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                        <a
                            href="https://www.linkedin.com/in/naimmiah/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className="bio-container">
                        {/* <p>Naim bhai</p> */}
                    </div>
                </div>

                <div className="member-box">
                    <img src={Yinyin} className="member-pic" />
                    <p>Yinyin Huang - Flex Lead</p>
                    <div className="links-container">
                        <a
                            href="https://www.github.com/elevenstand7"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                        <a
                            href="https://www.linkedin.com/in/yinyin-huang/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className="bio-container">
                        {/* <p>Yinyin loves trying new foods, and coding!</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
