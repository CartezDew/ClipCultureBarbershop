import { useState, useEffect, useRef } from 'react';
import '../styles/joinus.css';

const JoinUs = () => {
  return (
  <div className="join-email-section">
            <div className="join-email-container">
              <h2 className="join-email-title">Join the Culture.</h2>
              <p className="join-email-subtitle">
                Be first to know about drops, events, and insider updates—delivered straight to your inbox.
              </p>
              
              <div className="join-email-form">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="join-email-input"
                />
                <button className="join-email-button">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
  );
};

export default JoinUs;
