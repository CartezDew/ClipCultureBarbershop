import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/form-modal.css';

const BookingInquiryModal = ({ isOpen, onClose, title, subtitle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    organizationName: '',
    email: '',
    phone: '',
    eventDetails: '',
    budget: '',
    lengthOfTime: '',
    sponsors: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    
    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    }
    
    if (!formData.eventDetails.trim()) {
      newErrors.eventDetails = 'Event Details are required';
    }

    if (!formData.lengthOfTime.trim()) {
        newErrors.lengthOfTime = 'Length of Time is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form data here (e.g., to an API)
    console.log('Booking Inquiry Form submitted:', formData);
    
    setSubmitted(true);
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setFormData({
        fullName: '',
        organizationName: '',
        email: '',
        phone: '',
        eventDetails: '',
        budget: '',
        lengthOfTime: '',
        sponsors: ''
    });
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="form0modal-overlay" onClick={handleClose}>
      <div className="form0modal-container" onClick={(e) => e.stopPropagation()}>
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

        {!submitted ? (
          <>
            <div className="form0modal-header">
              <h2 className="form0modal-title">{title}</h2>
              {subtitle && <p className="form0modal-subtitle">{subtitle}</p>}
            </div>

            <form className="form0modal-form" onSubmit={handleSubmit}>
              
              <div className="form0field-group">
                <label className="form0field-label">
                  Full Name <span className="form0required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form0field-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Enter full name"
                />
                {errors.fullName && <span className="form0field-error">{errors.fullName}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  Name of Organization <span className="form0required">*</span>
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className={`form0field-input ${errors.organizationName ? 'error' : ''}`}
                  placeholder="Enter organization name"
                />
                {errors.organizationName && <span className="form0field-error">{errors.organizationName}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  Email Address <span className="form0required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form0field-input ${errors.email ? 'error' : ''}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <span className="form0field-error">{errors.email}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  Phone Number <span className="form0required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form0field-input ${errors.phone ? 'error' : ''}`}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && <span className="form0field-error">{errors.phone}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  Event Details <span className="form0required">*</span>
                </label>
                <textarea
                  name="eventDetails"
                  value={formData.eventDetails}
                  onChange={handleChange}
                  className={`form0field-input ${errors.eventDetails ? 'error' : ''}`}
                  placeholder="Please describe the event, dates, and what is expected."
                  rows="4"
                />
                {errors.eventDetails && <span className="form0field-error">{errors.eventDetails}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  Budget
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="form0field-input"
                  placeholder="Enter budget"
                />
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  Length of Time <span className="form0required">*</span>
                </label>
                <input
                  type="text"
                  name="lengthOfTime"
                  value={formData.lengthOfTime}
                  onChange={handleChange}
                  className={`form0field-input ${errors.lengthOfTime ? 'error' : ''}`}
                  placeholder="e.g., 2 hours"
                />
                {errors.lengthOfTime && <span className="form0field-error">{errors.lengthOfTime}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  Sponsors & Other Affiliated Parties (if any)
                </label>
                <textarea
                  name="sponsors"
                  value={formData.sponsors}
                  onChange={handleChange}
                  className="form0field-input"
                  placeholder="List any sponsors or partners"
                  rows="3"
                />
              </div>

              <button type="submit" className="form0submit-btn">
                Submit Inquiry
              </button>
            </form>
          </>
        ) : (
          <div className="form0success-message">
            <div className="form0success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="form0success-title">Thank You!</h3>
            <p className="form0success-text">
              We've received your booking inquiry and will be in touch soon.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default BookingInquiryModal;

