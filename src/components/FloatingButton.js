import React from 'react';
import { FaBook } from 'react-icons/fa';
import './styles/FloatingButton.css'; // Make sure to import the CSS file

const FloatingButton = () => {
  return (
    <div className="floating-button-container">
      <button className="floating-button">
        <FaBook className="icon" />
        <span className="button-text">View Rules and Regulations</span>
      </button>
    </div>
  );
};

export default FloatingButton;