import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/form-modal.css';

const ServiceDetailModal = ({ isOpen, onClose, service }) => {
  const navigate = useNavigate();

  if (!isOpen || !service) return null;

  const handleBookNow = () => {
    navigate('/booking', {
      state: {
        serviceId: service.id,
        // If we want to skip straight to step 3 (services) or handle it in Booking.jsx logic
        // For now, passing serviceId is key.
      }
    });
    onClose();
  };

  // Replace asterisks with (approx.) for modal display only, with special styling
  const formatDuration = (duration) => {
    if (!duration) return '';
    const formatted = duration.replace(/<strong>\*<\/strong>/g, '(approx.)');
    // Split by (approx.) to wrap it in a styled span
    const parts = formatted.split('(approx.)');
    if (parts.length === 1) {
      return formatted;
    }
    return (
      <>
        {parts[0]}
        <span style={{ opacity: 0.6 }}>(estimated)</span>
      </>
    );
  };

  return ReactDOM.createPortal(
    <div className="form0modal-overlay" onClick={onClose}>
      <div className="form0modal-container" onClick={(e) => e.stopPropagation()}>
        <button 
          className="form0modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="form0modal-header">
          <h2 className="form0modal-title">{service.name}</h2>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            marginTop: '0.5rem',
            color: 'var(--primary-green)',
            fontWeight: '600'
          }}>
            <span>${service.price}</span>
            <span>|</span>
            <span>{formatDuration(service.duration)}</span>
          </div>
        </div>

        <div className="form0modal-body" style={{ marginBottom: '2rem' }}>
          <p style={{ 
            lineHeight: '1.6', 
            color: '#4a4a4a',
            fontSize: '1.05rem'
          }}>
            {service.description || "Experience our premium service tailored to your needs. Our expert barbers will ensure you leave looking and feeling your best."}
          </p>
          
          {service.category && (
            <div style={{ marginTop: '1rem' }}>
              <span style={{ 
                background: 'rgba(10, 151, 134, 0.1)', 
                color: 'var(--primary-green)',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                {service.category}
              </span>
            </div>
          )}
        </div>

        <button 
          onClick={handleBookNow}
          className="form0submit-btn"
        >
          Book Now
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ServiceDetailModal;

