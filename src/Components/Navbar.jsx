import React, { useState } from 'react';
import "../Styles/Navbar.css";
import HelpModal from './HelpModal';
import SettingsModal from './SettingsModal';

const Navbar = () => {
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const handleHelpClick = () => {
    setShowHelpPopup(true);
  };

  const handleSettingsClick = () => {
    setShowSettingsPopup(true);
  };

  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <button className="navbar-button">Advice & Guidance</button>
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