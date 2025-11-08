import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../styles/joinus.css';
import '../styles/form-modal.css';

const JoinUs = () => {
  const [email, setEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const timeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return;
    }
    
    // Submit email (you can add API call here)
    console.log('Email submitted:', email);
    
    // Show success modal
    setShowSuccessModal(true);
    setIsFading(false);
    
    // Clear email input
    setEmail('');
    
    // Auto-close after 5 seconds with fade
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        setIsFading(false);
      }, 300); // Fade duration
    }, 5000);
  };

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsFading(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setIsFading(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="join-email-section">
        <div className="join-email-container">
          <h2 className="join-email-title">Join the Culture.</h2>
          <p className="join-email-subtitle">
            Be first to know about drops, events, and insider updates—delivered straight to your inbox.
          </p>
          
          <form className="join-email-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="join-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="join-email-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {showSuccessModal && ReactDOM.createPortal(
        <div className={`form0modal-overlay ${isFading ? 'fade-out' : ''}`} onClick={handleClose}>
          <div className="form0modal-container join-success-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="form0modal-close"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Confetti Container */}
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}></div>
              ))}
            </div>

            <div className="form0success-message">
              <div className="form0success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="form0success-title">Thank you. Your email is added.</h3>
              <p className="form0success-text">Welcome to the culture!</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default JoinUs;
