import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
              <button 
                className="btn-book-now" 
                onClick={openPopupForm}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
              >
                Book Now
              </button>
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
