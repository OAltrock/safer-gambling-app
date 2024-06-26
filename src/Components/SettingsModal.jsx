import React from "react";
import "../Styles/Modals.css";

const SettingModal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Settings</h2>
        <p>This pop-up is a work in progress.</p>
      </div>
    </div>
  );
};

export default SettingModal;
