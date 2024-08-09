import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import HelpModal from './HelpModal';
import SettingsModal from './SettingsModal';
import logo from "../Assets/fdm_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {toggle} from '../slices/darkModeSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const darkMode = useSelector(state => state.toggleDarkMode)
  let [advice, help, settings] = useSelector(state => state.languages[state.languages.current].navBar)

  const handleHelpClick = () => {
    setShowHelpPopup(true);
    //navigate("/Help");
  };

  const handleSettingsClick = () => {
    setShowSettingsPopup(true);
  };

  const handleGuidanceClick = () => {
    navigate("/Guidance");
  };

  const changeTheme = () => {    
    console.log(darkMode);
    if (darkMode.darkMode) {
      document.documentElement.style.setProperty('--fdm-background', 'white');  
      document.documentElement.style.setProperty('--fdm-font-color', 'black');
      dispatch(toggle());
    }
    else {
      document.documentElement.style.setProperty('--fdm-background', 'var(--fdm-dark-background)');  
      document.documentElement.style.setProperty('--fdm-font-color', 'white');
      dispatch(toggle());
    }    
  }

  return (
    <nav className="navbar">
      <img className="logo" alt=" logo" onClick={() => navigate("/")} src={logo} width={150} height={75} />
      <div className="navbar-buttons">
        {darkMode.darkMode ? <FontAwesomeIcon onClick={changeTheme} icon="fa-regular fa-sun" />
        : <FontAwesomeIcon onClick={changeTheme} icon="fa-regular fa-moon" />}
        <button className="navbar-button" onClick={handleGuidanceClick} >{advice}</button>
        <button className="navbar-button" onClick={handleHelpClick}>{help}</button>
        <button className="navbar-button" onClick={handleSettingsClick}>{settings}</button>
        {localStorage.getItem('token')!=='' && <button className="navbar-button" onClick={()=>{
          localStorage.setItem('token', '');
          navigate('/');          
        }}>Log Out</button>}
      </div>      
      {showHelpPopup && <HelpModal showHelpPopup={showHelpPopup} setShowHelpPopup={setShowHelpPopup} />}
      {showSettingsPopup && <SettingsModal showSettingsPopup={showSettingsPopup} setShowSettingsPopup={setShowSettingsPopup} />}
    </nav>
  );
};

export default Navbar;