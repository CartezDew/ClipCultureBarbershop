import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/form-modal.css';
import { validateEmail } from '../utils/emailValidation';
import { submitFormWithAttachments } from '../services/formSubmissionService';
import ClipCultureFormResponse from './ClipCultureFormResponse.jsx';
import { useModal } from '../hooks/useModal.js';

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
  const [submitting, setSubmitting] = useState(false);

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
    // Set custom validity for email inputs
    if (name === 'email' && value) {
      const emailValidation = validateEmail(value);
      e.target.setCustomValidity(emailValidation.isValid ? '' : emailValidation.error);
    } else if (name === 'email' && !value) {
      e.target.setCustomValidity('');
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
    } else {
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.error;
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setSubmitting(true);
    setErrors(prev => ({ ...prev, submit: '' }));
    try {
      await submitFormWithAttachments(title || 'Booking Inquiry', formData);
      setSubmitted(true);
      modal.closeLater(handleClose, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({ ...prev, submit: 'We could not send your request. Please try again.' }));
    } finally {
      setSubmitting(false);
    }
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

  const modal = useModal(isOpen, handleClose);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="form0modal-overlay" {...modal.overlayProps}>
      <div className="form0modal-container" {...modal.dialogProps}>
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
                <label className="form0field-label" htmlFor="booking-inquiry-fullName">
                  Full Name <span className="form0required">*</span>
                </label>
                <input
                  type="text"
                  id="booking-inquiry-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form0field-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Enter full name"
                />
                {errors.fullName && <span className="form0field-error">{errors.fullName}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label" htmlFor="booking-inquiry-organizationName">
                  Name of Organization <span className="form0required">*</span>
                </label>
                <input
                  type="text"
                  id="booking-inquiry-organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className={`form0field-input ${errors.organizationName ? 'error' : ''}`}
                  placeholder="Enter organization name"
                />
                {errors.organizationName && <span className="form0field-error">{errors.organizationName}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label" htmlFor="booking-inquiry-email">
                  Email Address <span className="form0required">*</span>
                </label>
                <input
                  type="email"
                  id="booking-inquiry-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form0field-input ${errors.email ? 'error' : ''}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <span className="form0field-error">{errors.email}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label" htmlFor="booking-inquiry-phone">
                  Phone Number <span className="form0required">*</span>
                </label>
                <input
                  type="tel"
                  id="booking-inquiry-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form0field-input ${errors.phone ? 'error' : ''}`}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && <span className="form0field-error">{errors.phone}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label" htmlFor="booking-inquiry-eventDetails">
                  Event Details <span className="form0required">*</span>
                </label>
                <textarea
                id="booking-inquiry-eventDetails"
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
                <label className="form0field-label" htmlFor="booking-inquiry-budget">
                  Budget
                </label>
                <input
                  type="text"
                  id="booking-inquiry-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="form0field-input"
                  placeholder="Enter budget"
                />
              </div>

              <div className="form0field-group">
                <label className="form0field-label" htmlFor="booking-inquiry-lengthOfTime">
                  Length of Time <span className="form0required">*</span>
                </label>
                <input
                  type="text"
                  id="booking-inquiry-lengthOfTime"
                  name="lengthOfTime"
                  value={formData.lengthOfTime}
                  onChange={handleChange}
                  className={`form0field-input ${errors.lengthOfTime ? 'error' : ''}`}
                  placeholder="e.g., 2 hours"
                />
                {errors.lengthOfTime && <span className="form0field-error">{errors.lengthOfTime}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label" htmlFor="booking-inquiry-sponsors">
                  Sponsors & Other Affiliated Parties (if any)
                </label>
                <textarea
                id="booking-inquiry-sponsors"
                name="sponsors"
                  value={formData.sponsors}
                  onChange={handleChange}
                  className="form0field-input"
                  placeholder="List any sponsors or partners"
                  rows="3"
                />
              </div>

              {errors.submit && <p role="alert" className="form0field-error">{errors.submit}</p>}
              <button type="submit" className="form0submit-btn" disabled={submitting}>
                {submitting ? 'Sending…' : 'Submit Inquiry'}
              </button>
            </form>
          </>
        ) : (
          <ClipCultureFormResponse formName={title || 'Booking Inquiry'} name={formData.fullName} />
        )}
      </div>
    </div>,
    document.body
  );
};

export default BookingInquiryModal;

