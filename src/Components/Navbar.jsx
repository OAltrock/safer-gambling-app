import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import HelpModal from './HelpModal';
import SettingsModal from './SettingsModal';
import logo from "../Assets/fdm_logo.png";
import Help from './Help';

function Navbar() {
  const navigate = useNavigate();

  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const handleHelpClick = () => {
    //setShowHelpPopup(true);
    navigate("/Help");
  };

  const handleSettingsClick = () => {
    setShowSettingsPopup(true);
  };

  const handleGuidanceClick = () => {
    navigate("/Guidance");
  };

  return (
    <nav className="navbar">
      <img className="logo" alt=" logo" onClick={() => navigate("/")} src={logo} width={150} height={75} />
      <div className="navbar-buttons">
        <button className="navbar-button" onClick={handleGuidanceClick} >Advice & Guidance</button>
        <button className="navbar-button" onClick={handleHelpClick}>Help</button>
        <button className="navbar-button" onClick={handleSettingsClick}>Settings</button>
      </div>
      {showHelpPopup && < Help onClose={() =>
        setShowHelpPopup(false)} />}
      {showSettingsPopup && <SettingsModal onClose={() =>
        setShowSettingsPopup(false)} />}
    </nav>
  );
};

export default Navbar;