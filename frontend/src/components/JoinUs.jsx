import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../styles/joinus.css';
import '../styles/form-modal.css';
import { submitFormWithAttachments } from '../services/formSubmissionService';
import { validateEmail } from '../utils/emailValidation';

const JoinUs = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setEmailError(validation.error);
      return;
    }
    
    // Clear any previous errors
    setEmailError('');
    setIsSubmitting(true);
    
    // Submit form - formName matches the form title "Join the Culture"
    try {
      await submitFormWithAttachments('Join the Culture', { email });
      
      // Show success modal only on actual success
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
        }, 300);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowErrorModal(true);
      
      // Auto-close error after 5 seconds
      setTimeout(() => {
        setShowErrorModal(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
    // Set custom validity for email input
    if (newEmail) {
      const emailValidation = validateEmail(newEmail);
      e.target.setCustomValidity(emailValidation.isValid ? '' : emailValidation.error);
    } else {
      e.target.setCustomValidity('');
    }
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
          
          <form className="join-email-form" onSubmit={handleSubmit} noValidate>
            <div className="join-email-input-wrapper">
              <input 
                type="email" 
                placeholder="Email Address" 
                className={`join-email-input ${emailError ? 'error' : ''}`}
                value={email}
                onChange={handleEmailChange}
                onBlur={(e) => {
                  if (e.target.value) {
                    const validation = validateEmail(e.target.value);
                    if (!validation.isValid) {
                      setEmailError(validation.error);
                    }
                  }
                }}
                required
              />
              {emailError && (
                <div className="join-email-error">{emailError}</div>
              )}
            </div>
            <button type="submit" className="join-email-button" disabled={isSubmitting}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>

      {showErrorModal && ReactDOM.createPortal(
        <div className="form0modal-overlay" onClick={() => setShowErrorModal(false)}>
          <div className="form0modal-container join-success-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="form0modal-close"
              onClick={() => setShowErrorModal(false)}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="form0success-message">
              <div className="form0success-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <h3 className="form0success-title">Oops! Something went wrong.</h3>
              <p className="form0success-text">Please try again or contact us directly.</p>
            </div>
          </div>
        </div>,
        document.body
      )}

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
