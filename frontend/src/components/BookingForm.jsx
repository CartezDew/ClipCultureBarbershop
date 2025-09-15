import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/booking.css';

const BookingForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [popupStep, setPopupStep] = useState(2);
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    date: '',
    time: ''
  });

  const services = [
    { id: 'haircut', name: 'Haircut', price: '$35', duration: '45 mins' },
    { id: 'beard-trim', name: 'Beard Trim', price: '$25', duration: '30 mins' },
    { id: 'haircut-beard', name: 'Haircut + Beard', price: '$55', duration: '60 mins' },
    { id: 'shave', name: 'Classic Shave', price: '$30', duration: '30 mins' },
    { id: 'styling', name: 'Hair Styling', price: '$20', duration: '20 mins' }
  ];

  const locations = [
    { id: 'downtown', name: 'Downtown Location', address: '123 Main St, Downtown' },
    { id: 'uptown', name: 'Uptown Location', address: '456 Oak Ave, Uptown' },
    { id: 'westside', name: 'Westside Location', address: '789 Pine St, Westside' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      service: serviceId
    }));
  };

  const handleLocationSelect = (locationId) => {
    setFormData(prev => ({
      ...prev,
      location: locationId
    }));
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({
      ...prev,
      time: time
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextPopupStep = () => {
    if (popupStep < 5) {
      setPopupStep(popupStep + 1);
    }
  };

  const prevPopupStep = () => {
    if (popupStep > 2) {
      setPopupStep(popupStep - 1);
    }
  };

  const openPopupForm = () => {
    setPopupStep(2); // Start from step 2 (Service selection)
    setShowPopupForm(true);
  };

  const closePopupForm = () => {
    setShowPopupForm(false);
    setPopupStep(2); // Reset to step 2 for next time
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Booking submitted:', formData);
    alert('Appointment booked successfully!');
    navigate('/');
  };

  const isStepValid = (step = currentStep) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.service;
      case 3:
        return formData.location;
      case 4:
        return formData.date && formData.time;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderPopupStep = () => {
    switch (popupStep) {
      case 2:
        return (
          <div className="booking-step">
            <h3>Select Service</h3>
            <div className="services-grid">
              {services.map(service => (
                <div
                  key={service.id}
                  className={`service-card ${formData.service === service.id ? 'selected' : ''}`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <h4>{service.name}</h4>
                  <p className="service-price">{service.price}</p>
                  <p className="service-duration">{service.duration}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="booking-step">
            <h3>Choose Location</h3>
            <div className="locations-grid">
              {locations.map(location => (
                <div
                  key={location.id}
                  className={`location-card ${formData.location === location.id ? 'selected' : ''}`}
                  onClick={() => handleLocationSelect(location.id)}
                >
                  <h4>{location.name}</h4>
                  <p>{location.address}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="booking-step">
            <h3>Select Date & Time</h3>
            <div className="date-time-section">
              <div className="date-picker">
                <label htmlFor="date">Select Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="time-slots">
                <h4>Available Times</h4>
                <div className="time-grid">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        const selectedService = services.find(s => s.id === formData.service);
        const selectedLocation = locations.find(l => l.id === formData.location);
        
        return (
          <div className="booking-step">
            <h3>Confirm Appointment</h3>
            <div className="confirmation-details">
              <div className="detail-row">
                <span className="label">Name:</span>
                <span className="value">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{formData.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">{formData.phone}</span>
              </div>
              <div className="detail-row">
                <span className="label">Service:</span>
                <span className="value">{selectedService?.name} - {selectedService?.price}</span>
              </div>
              <div className="detail-row">
                <span className="label">Location:</span>
                <span className="value">{selectedLocation?.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date & Time:</span>
                <span className="value">{formData.date} at {formData.time}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="booking-step">
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group half">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group phone-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <motion.button 
                className="btn-book-now" 
                onClick={openPopupForm}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: "linear-gradient(135deg,rgb(5, 61, 90) 0%,rgb(77, 172, 161) 50%, #085078 100%)",
                  
                  backgroundSize: "200% 200%"
                }}
              >
                Book Now
              </motion.button>
            </div>
            
            {/* Social Media Links */}
            <div className="booking-social-links">
              <a 
                href="https://www.instagram.com/clipculturebarbershop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              
              <a 
                href="https://www.facebook.com/clipculturebarbershop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="booking-step">
            <h3>Select Service</h3>
            <div className="services-grid">
              {services.map(service => (
                <div
                  key={service.id}
                  className={`service-card ${formData.service === service.id ? 'selected' : ''}`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <h4>{service.name}</h4>
                  <p className="price">{service.price}</p>
                  <p className="duration">{service.duration}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="booking-step">
            <h3>Select Location</h3>
            <div className="locations-list">
              {locations.map(location => (
                <div
                  key={location.id}
                  className={`location-card ${formData.location === location.id ? 'selected' : ''}`}
                  onClick={() => handleLocationSelect(location.id)}
                >
                  <h4>{location.name}</h4>
                  <p>{location.address}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="booking-step">
            <h3>Select Date & Time</h3>
            <div className="form-group">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="time-slots">
              <h4>Available Times</h4>
              <div className="time-grid">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        const selectedService = services.find(s => s.id === formData.service);
        const selectedLocation = locations.find(l => l.id === formData.location);
        
        return (
          <div className="booking-step">
            <h3>Confirm Appointment</h3>
            <div className="confirmation-details">
              <div className="detail-row">
                <span className="label">Name:</span>
                <span className="value">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{formData.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">{formData.phone}</span>
              </div>
              <div className="detail-row">
                <span className="label">Service:</span>
                <span className="value">{selectedService?.name} - {selectedService?.price}</span>
              </div>
              <div className="detail-row">
                <span className="label">Location:</span>
                <span className="value">{selectedLocation?.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date & Time:</span>
                <span className="value">{formData.date} at {formData.time}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="booking-form-container">
        <div className="booking-form">
          <div className="booking-header">
            <h2>Book Your Appointment</h2>
            <p className="booking-subtitle">Walk-ins are welcome!</p>
            <div className="step-indicator">
              <span>Step {currentStep} of 5</span>
            </div>
          </div>

          {renderStep()}

          <div className="booking-actions">
            {currentStep > 1 && (
              <button className="btn-back" onClick={prevStep}>
                ← Back
              </button>
            )}
            
            {currentStep > 1 && currentStep < 5 ? (
              <button 
                className="btn-next" 
                onClick={nextStep}
                disabled={!isStepValid()}
              >
                Next →
              </button>
            ) : currentStep === 5 ? (
              <button 
                className="btn-confirm" 
                onClick={handleSubmit}
                disabled={!isStepValid()}
              >
                Confirm Appointment
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Popup Form Modal */}
      {showPopupForm && (
        <div className="popup-overlay" onClick={closePopupForm}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Complete Your Booking</h2>
              <button 
                className="popup-close" 
                onClick={closePopupForm}
              >
                ×
              </button>
            </div>
            
            <div className="popup-content">
              <div className="popup-form-container">
                <div className="popup-form">
                  <div className="popup-step-indicator">
                    <span>Step {popupStep} of 5</span>
                  </div>

                  {renderPopupStep()}

                  <div className="popup-actions">
                    {popupStep > 2 && (
                      <button className="btn-back" onClick={prevPopupStep}>
                        ← Back
                      </button>
                    )}
                    
                    {popupStep < 5 ? (
                      <button 
                        className="btn-next" 
                        onClick={nextPopupStep}
                        disabled={!isStepValid(popupStep)}
                      >
                        Next →
                      </button>
                    ) : (
                      <button 
                        className="btn-confirm" 
                        onClick={handleSubmit}
                        disabled={!isStepValid(popupStep)}
                      >
                        Confirm Appointment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
