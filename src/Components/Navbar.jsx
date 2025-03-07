import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import HelpModal from './HelpModal';
import SettingsModal from './SettingsModal';
import logo from "../Assets/fdm_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../slices/darkModeSlice';
import { setCookie, getCookie } from '../hooks/getCookie';
import { setQuestionnaireDoneFalse } from '../slices/questionnaireDoneSlice';
import { setFalse } from '../slices/gameDoneSlice';
import { reset } from '../slices/questionnaireSlice';
import { useMutation } from 'react-query'; // Add this import

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  let darkModeCookie = getCookie('darkMode');

  const darkMode = useSelector(state => state.darkMode)

  let [advice, help, settings, logout, deleteAccount] = useSelector(state => state.languages[state.languages.current].navBar)



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
    if (darkMode.darkMode) {
      document.documentElement.style.setProperty('--fdm-background', 'white');
      document.documentElement.style.setProperty('--fdm-font-color', 'black');
      document.documentElement.style.setProperty('--fdm-background-bright-dark', 'rgba(224, 224, 224, 0.807)');
      dispatch(setDarkMode(false));
      setCookie('darkMode', false, 30)
    }
    else {
      document.documentElement.style.setProperty('--fdm-background', 'var(--fdm-dark-background)');
      document.documentElement.style.setProperty('--fdm-background-bright-dark', 'rgba(55, 55, 55, 0.181)');
      document.documentElement.style.setProperty('--fdm-font-color', 'white');
      dispatch(setDarkMode(true));
      setCookie('darkMode', true, 30)
    }
  }

  const handleDeleteAccount = () => {
    navigate('/confirmDelete');
  };

  useEffect(() => {
    if (typeof darkModeCookie !== 'undefined') {
      if (darkModeCookie === 'false') {
        document.documentElement.style.setProperty('--fdm-background', 'white');
        document.documentElement.style.setProperty('--fdm-font-color', 'black');
        dispatch(setDarkMode(false));
      }
      else {
        document.documentElement.style.setProperty('--fdm-background', 'var(--fdm-dark-background)');
        document.documentElement.style.setProperty('--fdm-font-color', 'white');
        dispatch(setDarkMode(true));
      }
    }
  }, [darkModeCookie, dispatch])

  return (
    <nav className="navbar">
      <img className="logo" alt=" logo" onClick={() => navigate("/")} src={logo} width={150} height={75} />
      <div className="navbar-buttons">
        {darkMode.darkMode ? <FontAwesomeIcon onClick={changeTheme} icon="fa-regular fa-sun" />
          : <FontAwesomeIcon onClick={changeTheme} icon="fa-regular fa-moon" />}
        <button className="navbar-button" onClick={handleGuidanceClick} >{advice}</button>
        <button className="navbar-button" onClick={handleHelpClick}>{help}</button>
        <button className="navbar-button" onClick={handleSettingsClick}>{settings}</button>
        {(localStorage.getItem('token') !== null
          && localStorage.getItem('token')
          !== '')
          && <button className="navbar-button"
            onClick={handleDeleteAccount}>{deleteAccount}</button>}
        {(localStorage.getItem('token') !== null
          && localStorage.getItem('token') !== '')
          && <button className="navbar-button"
            onClick={() => {
              localStorage.removeItem('token');
              dispatch(setQuestionnaireDoneFalse())
              dispatch(setFalse())
              dispatch(reset())
              navigate('/');
            }}>{logout}</button>}
      </div>
      {showHelpPopup && <HelpModal showHelpPopup={showHelpPopup} setShowHelpPopup={setShowHelpPopup} />}
      {showSettingsPopup && <SettingsModal showSettingsPopup={showSettingsPopup} setShowSettingsPopup={setShowSettingsPopup} />}
    </nav>
  );
};

export default Navbar;