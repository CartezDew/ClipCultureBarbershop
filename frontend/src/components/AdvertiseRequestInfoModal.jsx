import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/form-modal.css';
import { submitFormWithAttachments } from '../services/formSubmissionService';
import ClipCultureFormResponse from './ClipCultureFormResponse.jsx';
import { validateEmail } from '../utils/emailValidation';
import { useModal } from '../hooks/useModal.js';

const AdvertiseRequestInfoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.error;
      }
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
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
      await submitFormWithAttachments('Advertise Request Info', formData);
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
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
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
              <h2 className="form0modal-title">Request Advertising Information</h2>
              <p className="form0modal-subtitle">Fill out the form below and we'll send you detailed information about our advertising opportunities.</p>
            </div>

            <form className="form0modal-form" onSubmit={handleSubmit}>
              <div className="form0field-row">
                <div className="form0field-group">
                  <label className="form0field-label" htmlFor="advertise-request-info-firstName">
                    First Name <span className="form0required">*</span>
                  </label>
                  <input
                    type="text"
                    id="advertise-request-info-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form0field-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Enter name"
                  />
                  {errors.firstName && <span className="form0field-error">{errors.firstName}</span>}
                </div>

                <div className="form0field-group">
                  <label className="form0field-label" htmlFor="advertise-request-info-lastName">
                    Last Name <span className="form0required">*</span>
                  </label>
                  <input
                    type="text"
                    id="advertise-request-info-lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`form0field-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Enter name"
                  />
                  {errors.lastName && <span className="form0field-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form0field-group">
                <label className="form0field-label" htmlFor="advertise-request-info-email">
                  Email Address <span className="form0required">*</span>
                </label>
                <input
                  type="email"
                  id="advertise-request-info-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form0field-input ${errors.email ? 'error' : ''}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <span className="form0field-error">{errors.email}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label" htmlFor="advertise-request-info-phone">
                  Phone Number <span className="form0required">*</span>
                </label>
                <input
                  type="tel"
                  id="advertise-request-info-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form0field-input ${errors.phone ? 'error' : ''}`}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && <span className="form0field-error">{errors.phone}</span>}
              </div>

              {errors.submit && <p role="alert" className="form0field-error">{errors.submit}</p>}
              <button type="submit" className="form0submit-btn" disabled={submitting}>
                {submitting ? 'Sending…' : 'Request Information'}
              </button>
            </form>
          </>
        ) : (
          <ClipCultureFormResponse formName="Advertise Request Info" name={formData.firstName} />
        )}
      </div>
    </div>,
    document.body
  );
};

export default AdvertiseRequestInfoModal;

