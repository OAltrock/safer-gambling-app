import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from "./Footer";
import '../Styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token')!==null && localStorage.getItem('token')!=='';    
    const user = localStorage.getItem('user');

    let [hello, intro, login, paragraphHeader, textContainers] = useSelector(state => state.languages[state.languages.current].landingPage)

    return (
        <div>
            <div className="header-container-landingPage">
                {isAuthenticated && <h2>{hello} {user},</h2>}
                <h1>{intro[0]},</h1>
                <h1>{intro[1]}</h1>
                <div>
                    {!isAuthenticated && <button style={{ marginRight: "30px", width: 'fit-content' }} onClick={()=> navigate('/Register')}>{login[0]}</button>}
                    {!isAuthenticated && <button style={{width: 'fit-content'}} onClick={() => navigate('/Login')}>{login[1]}</button>}
                    {isAuthenticated && <button style={{width: 'fit-content'}} onClick={() => navigate('/Home')}>{login[2]}</button>}
                </div>
            </div>
            <h3 style={{ textAlign: "center", color: "#3FE03F" }} >{paragraphHeader}</h3>
            <div id='landing-page-body'>
                <div className="landing-page-text-container">
                    <FontAwesomeIcon style={{color: "var(--fdm-font-color)"}} className="fa-icon" icon="fa-regular fa-pen-to-square" size="3x" />
                    <p>
                        {textContainers[0]}
                    </p>
                </div>

                <div className="landing-page-text-container">
                    <FontAwesomeIcon style={{color: "var(--fdm-font-color)"}} className="fa-icon" icon="fa-regular fa-message" size="3x" />
                    <p>
                        {textContainers[1]}
                    </p>
                </div>

                <div className="landing-page-text-container">
                    <FontAwesomeIcon style={{color: "var(--fdm-font-color)"}} className="fa-icon" icon="fa-solid fa-bars-staggered" size="3x" />
                    <p>
                        {textContainers[2]}
                    </p>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default LandingPage