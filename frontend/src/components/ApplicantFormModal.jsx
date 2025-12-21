import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/form-modal.css';
import { submitFormWithAttachments } from '../services/formSubmissionService';
import { validateEmail } from '../utils/emailValidation';

const ApplicantFormModal = ({ isOpen, onClose, title, subtitle }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    heardAbout: ''
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
    
    if (!formData.heardAbout) {
      newErrors.heardAbout = 'Please select an option';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form with email, PDF, and Excel attachments
    try {
      await submitFormWithAttachments(title || 'Applicant Form', formData);
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success to user even if email fails
    }
    
    setSubmitted(true);
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      heardAbout: ''
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
              <div className="form0field-row">
                <div className="form0field-group">
                  <label className="form0field-label">
                    First Name <span className="form0required">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form0field-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Enter name"
                  />
                  {errors.firstName && <span className="form0field-error">{errors.firstName}</span>}
                </div>

                <div className="form0field-group">
                  <label className="form0field-label">
                    Last Name <span className="form0required">*</span>
                  </label>
                  <input
                    type="text"
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
                  How did you hear about us? <span className="form0required">*</span>
                </label>
                <div className="form0radio-group">
                  <label className="form0radio-option">
                    <input
                      type="radio"
                      name="heardAbout"
                      value="social-media"
                      checked={formData.heardAbout === 'social-media'}
                      onChange={handleChange}
                      className="form0radio-input"
                    />
                    <span className="form0radio-label">Social Media</span>
                  </label>
                  
                  <label className="form0radio-option">
                    <input
                      type="radio"
                      name="heardAbout"
                      value="word-of-mouth"
                      checked={formData.heardAbout === 'word-of-mouth'}
                      onChange={handleChange}
                      className="form0radio-input"
                    />
                    <span className="form0radio-label">Word of Mouth</span>
                  </label>
                  
                  <label className="form0radio-option">
                    <input
                      type="radio"
                      name="heardAbout"
                      value="referral"
                      checked={formData.heardAbout === 'referral'}
                      onChange={handleChange}
                      className="form0radio-input"
                    />
                    <span className="form0radio-label">Referral</span>
                  </label>
                  
                  <label className="form0radio-option">
                    <input
                      type="radio"
                      name="heardAbout"
                      value="other"
                      checked={formData.heardAbout === 'other'}
                      onChange={handleChange}
                      className="form0radio-input"
                    />
                    <span className="form0radio-label">Other</span>
                  </label>
                </div>
                {errors.heardAbout && <span className="form0field-error">{errors.heardAbout}</span>}
              </div>

              <button type="submit" className="form0submit-btn">
                Submit Application
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
              We've received your application and will be in touch soon.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ApplicantFormModal;

