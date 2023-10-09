import "./AboutUs.css";

const AboutUs = ()=>{
    return (
        <div className="team-members-container">
            <div className="member-box">
                <div className="member-pic"></div>
                <p>Fanyi Tang</p>
                <p>Team Lead</p>
            </div>

            <div className="member-box">
                <div className="member-pic"></div>
                <p>Sanjid Dewan</p>
                <p>Frontend Lead</p>
            </div>

            <div className="member-box">
                <div className="member-pic"></div>
                <p>Naim Miah</p>
                <p>Backend Lead</p>
            </div>

            <div className="member-box">
                <div className="member-pic"></div>
                <p>Yinyin Huang</p>
                <p>Flex Lead</p>
            </div>
        </div>
    )
}


export default AboutUs;
