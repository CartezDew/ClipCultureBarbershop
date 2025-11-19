import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/success-modal.css';

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  formatSuccessDate 
}) => {
  if (!isOpen) return null;

  const locationName = formData.location === 'sandy-springs' ? 'Sandy Springs' : 'Summerhill';
  const locationAddress = formData.location === 'sandy-springs' 
    ? '6309 Roswell Road NE #2D, Sandy Springs, GA 30328'
    : '572 Hank Aaron Dr Suite 1120, Atlanta, GA 30312';

  return ReactDOM.createPortal(
    <div className="success-message-overlay" onClick={onClose}>
      <div className="success-message-container" onClick={(e) => e.stopPropagation()}>
        <button 
          className="success-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" stroke="var(--primary-green)" fill="none" strokeWidth="2"/>
            <path d="M9 12l2 2 4-4" stroke="var(--primary-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="success-title">Appointment confirmed!</h2>
        <div className="success-details">
          <p className="success-message">
            We'll be ready for you, {formData.firstName}— sharp lines, fresh vibes!
          </p>
          <div className="success-appointment-info">
            <h3>Your Appointment Details:</h3>
            <div className="success-info-grid">
              <div className="success-info-item success-date-time-row">
                <div className="success-date-time-group">
                  <span className="success-label">Date:</span>
                  <span className="success-value">{formatSuccessDate(formData.date)}</span>
                </div>
                <div className="success-date-time-group">
                  <span className="success-label">Time:</span>
                  <span className="success-value">{formData.time}</span>
                </div>
              </div>
              <div className="success-info-item">
                <span className="success-label">Location:</span>
                <span className="success-value">
                  {locationName} - {locationAddress}
                </span>
              </div>
            </div>
          </div>
          <p className="success-reminder">
            Remember to arrive 10-15 minutes early for your appointment.
          </p>
          <button 
            className="success-btn-home"
            onClick={onClose}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SuccessModal;

