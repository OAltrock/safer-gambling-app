import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import HelpModal from './HelpModal';
import SettingsModal from './SettingsModal';


function Navbar() {
  const navigate = useNavigate();

  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const handleHelpClick = () => {
    setShowHelpPopup(true);
  };

  const handleSettingsClick = () => {
    setShowSettingsPopup(true);
  };

  const handleGuidanceClick = () => {
    navigate("/Guidance");
  };

  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <button className="navbar-button" onClick={handleGuidanceClick} >Advice & Guidance</button>
        <button className="navbar-button" onClick={handleHelpClick}>Help</button>
        <button className="navbar-button" onClick={handleSettingsClick}>Settings</button>
      </div>
      {showHelpPopup && <HelpModal onClose={() =>
        setShowHelpPopup(false)} />}
      {showSettingsPopup && <SettingsModal onClose={() =>
        setShowSettingsPopup(false)} />}
    </nav>
  );
};

export default Navbar;