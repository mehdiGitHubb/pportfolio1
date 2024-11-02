import React from 'react';
import './Model.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Email Sent Successfully!</h2>
        <p>{message}</p>
        <p>I will respond to you soon.</p>
        <button onClick={onClose} className="close-modal-btn">Close</button>
      </div>
    </div>
  );
};

export default Modal;
