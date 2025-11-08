import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/form-modal.css';

const FranchiseApplyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    package: '',
    businessName: '',
    yearsInBusiness: '',
    readyToStart: ''
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.package) {
      newErrors.package = 'Please select a package';
    }
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.yearsInBusiness.trim()) {
      newErrors.yearsInBusiness = 'Please enter years in business';
    }
    
    if (!formData.readyToStart) {
      newErrors.readyToStart = 'Please select when you\'re ready to start';
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
    console.log('Franchise application submitted:', formData);
    
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
      package: '',
      businessName: '',
      yearsInBusiness: '',
      readyToStart: ''
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
              <h2 className="form0modal-title">Apply for Franchise</h2>
              <p className="form0modal-subtitle">Take the first step toward owning your Clip Culture Barbershop franchise.</p>
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
                  Select Package <span className="form0required">*</span>
                </label>
                <div className="form0select-wrapper">
                  <select
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className={`form0field-select ${errors.package ? 'error' : ''}`}
                  >
                    <option value="">Choose a franchise package</option>
                    <option value="single-unit">Single-Unit Franchise</option>
                    <option value="multi-unit">Multi-Unit Franchise</option>
                    <option value="area-development">Area Development</option>
                  </select>
                  <svg className="form0select-arrow" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 9L1.5 4.5h9L6 9z"/>
                  </svg>
                </div>
                {errors.package && <span className="form0field-error">{errors.package}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  Business Name <span className="form0required">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`form0field-input ${errors.businessName ? 'error' : ''}`}
                  placeholder="Enter your business name"
                />
                {errors.businessName && <span className="form0field-error">{errors.businessName}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  How long have you been in business? <span className="form0required">*</span>
                </label>
                <input
                  type="text"
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleChange}
                  className={`form0field-input ${errors.yearsInBusiness ? 'error' : ''}`}
                  placeholder="e.g., 5 years, Just starting, etc."
                />
                {errors.yearsInBusiness && <span className="form0field-error">{errors.yearsInBusiness}</span>}
              </div>

              <div className="form0field-group">
                <label className="form0field-label">
                  How soon are you ready to start? <span className="form0required">*</span>
                </label>
                <div className="form0radio-group">
                  <label className="form0radio-option">
                    <input
                      type="radio"
                      name="readyToStart"
                      value="asap"
                      checked={formData.readyToStart === 'asap'}
                      onChange={handleChange}
                      className="form0radio-input"
                    />
                    <span className="form0radio-label">As soon as possible</span>
                  </label>
                  
                  <label className="form0radio-option">
                    <input
                      type="radio"
                      name="readyToStart"
                      value="less-than-2-weeks"
                      checked={formData.readyToStart === 'less-than-2-weeks'}
                      onChange={handleChange}
                      className="form0radio-input"
                    />
                    <span className="form0radio-label">Less than 2 weeks</span>
                  </label>
                  
                  <label className="form0radio-option">
                    <input
                      type="radio"
                      name="readyToStart"
                      value="within-a-month"
                      checked={formData.readyToStart === 'within-a-month'}
                      onChange={handleChange}
                      className="form0radio-input"
                    />
                    <span className="form0radio-label">Within a month</span>
                  </label>
                  
                  <label className="form0radio-option">
                    <input
                      type="radio"
                      name="readyToStart"
                      value="other"
                      checked={formData.readyToStart === 'other'}
                      onChange={handleChange}
                      className="form0radio-input"
                    />
                    <span className="form0radio-label">Other</span>
                  </label>
                </div>
                {errors.readyToStart && <span className="form0field-error">{errors.readyToStart}</span>}
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
            <h3 className="form0success-title">Application Submitted!</h3>
            <p className="form0success-text">
              Thank you for your interest in a Clip Culture franchise. Our team will review your application and contact you within 48 hours.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default FranchiseApplyModal;

