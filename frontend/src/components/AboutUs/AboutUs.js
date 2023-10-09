import "./AboutUs.css";
import { useHistory } from "react-router-dom";
import Sanjid from './pics/SANJID.png';
import Fanyi from './pics/Fanyi.png';
import Naim from './pics/Naim.jpeg';
import Yinyin from './pics/Yinyin.png';

const AboutUs = ()=>{
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
                    <p>Fanyi Tang</p>
                    <p>Team Lead</p>
                </div>

                <div className="member-box">
                    <img src={Sanjid} className="member-pic" />
                    <p>Sanjid Dewan</p>
                    <p>Frontend Lead</p>
                </div>

                <div className="member-box">
                <img src={Naim} className="member-pic" />
                    <p>Naim Miah</p>
                    <p>Backend Lead</p>
                </div>

                <div className="member-box">
                <img src={Yinyin} className="member-pic" />
                    <p>Yinyin Huang</p>
                    <p>Flex Lead</p>
                </div>
            </div>
        </div>
    )
}


export default AboutUs;
