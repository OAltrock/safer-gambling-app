import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Home() {

  const navigate = useNavigate();

  const handleGetStartedClick = () =>
    navigate("/GetStarted")  

  return (
    <div id="home-page">
      <div className="header-container">
        <h1>Play smart,</h1>
        <h1>Stay safe</h1>
        <button onClick={handleGetStartedClick}>Let's get started</button>
      </div>
      <h3 style={{textAlign: "center", color: "#3FE03F"}} >Safer gambling app is for:</h3>
      <div className="container">        
        <div className="text-container">
          <FontAwesomeIcon className="fa-icon" icon="fa-regular fa-pen-to-square" size="3x" />
          <p>
            Early detection and intervention by identifying problematic gambling early.
          </p>          
        </div>

        <div className="text-container">
          <FontAwesomeIcon className="fa-icon" icon="fa-regular fa-message"  size="3x" />
          <p>
            Enhance self awareness and control with detailded insights into their gambling insights.
          </p>          
        </div>

        <div className="text-container">
          <FontAwesomeIcon className="fa-icon" icon="fa-solid fa-bars-staggered" size="3x"/>
          <p>
            Support and resources with educational content about the risk of gambling addiction.
          </p>          
        </div>
      </div>      
      <Footer />
    </div >
  );
}

export default Home;
