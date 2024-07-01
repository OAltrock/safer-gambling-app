import React from "react";
import "../Styles/Modals.css";

const HelpModal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Help</h2>
        <p>
          This page is designed to help users understand their risk appetite
        </p>
        <p>
          Click on either the 'Questionnaire' or 'Deep Diver' buttons to get
          started on understanding your risk appetite
        </p>
        <p>
          Risk is assessed based on how strongly you agree with question
          statements as well as how well you do in the risk based game
        </p>
      </div>
    </div>
  );
};

export default HelpModal;
