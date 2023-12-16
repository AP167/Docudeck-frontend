import React from 'react';
import { FaBook } from 'react-icons/fa';
import './styles/FloatingButton.css'; // Make sure to import the CSS file
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  let navigate = useNavigate();
  return (
    <div className="floating-button-container">
      <button onClick={() => {navigate('/')}} className="floating-button">
        <FaBook className="icon" />
        <span className="button-text">View Rules and Regulations</span>
      </button>
    </div>
  );
};

export default FloatingButton;