import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from "./Footer";
import '../Styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="header-container-landingPage">
                <h1>Play smart,</h1>
                <h1>Stay safe</h1>
                <div>
                    <button style={{ marginRight: "30px" }} onClick={()=> navigate('/Register')}>Sign Up</button>
                    <button onClick={() => navigate('/Login')}>Login</button>
                </div>
            </div>
            <h3 style={{ textAlign: "center", color: "#3FE03F" }} >Safer gambling app is for:</h3>
            <div id='landing-page-body'>
                <div className="landing-page-text-container">
                    <FontAwesomeIcon style={{color: "var(--fdm-font-color)"}} className="fa-icon" icon="fa-regular fa-pen-to-square" size="3x" />
                    <p>
                        Early detection and intervention by identifying problematic gambling early.
                    </p>
                </div>

                <div className="landing-page-text-container">
                    <FontAwesomeIcon style={{color: "var(--fdm-font-color)"}} className="fa-icon" icon="fa-regular fa-message" size="3x" />
                    <p>
                        Enhance self awareness and control with detailded insights into their gambling insights.
                    </p>
                </div>

                <div className="landing-page-text-container">
                    <FontAwesomeIcon style={{color: "var(--fdm-font-color)"}} className="fa-icon" icon="fa-solid fa-bars-staggered" size="3x" />
                    <p>
                        Support and resources with educational content about the risk of gambling addiction.
                    </p>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default LandingPage