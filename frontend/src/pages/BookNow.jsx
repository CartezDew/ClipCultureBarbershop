import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/book-now.css';
import Logo from '../assets/images/New_Logo.webp';
import ShopImage1 from '../assets/Contact/Shop_1.webp';
import ShopImage2 from '../assets/Contact/Shop_2.webp';
import OwnerImage from '../assets/Contact/Owner.webp';
// Product images
import BeardLineUp1 from '../assets/products/Beard-Line-Up-1.webp';
import Product1 from '../assets/products/Product-1.webp';
import Product2 from '../assets/products/Product-2.webp';
import Product3 from '../assets/products/Product-3.webp';
import Product5 from '../assets/products/Product-5 .webp';

const BookNow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [showFullPolicy, setShowFullPolicy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  
  // Refs for scroll targets
  const step1ContinueBtnRef = useRef(null);
  const step2ContinueBtnRef = useRef(null);

  // Add/remove class to body for styling
  useEffect(() => {
    document.body.classList.add('book-now-page-active');
    document.documentElement.classList.add('book-now-page-active');
    window.scrollTo(0, 0);
    
    return () => {
      document.body.classList.remove('book-now-page-active');
      document.documentElement.classList.remove('book-now-page-active');
    };
  }, []);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Auto-hide error after 4 seconds
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
        setErrorMessage('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  // Featured grooming products - New arrivals first
  const featuredProducts = [
    {
      id: 0,
      name: "Beard & Line Up Enhancement",
      priceFrom: 25,
      image: BeardLineUp1,
      slug: "beard-line-up-enhancement",
      size: "2 oz / 4 oz",
      isNewDrop: true,
      buyLink: "https://shopclipculture.com/products/revive-premium-beard-line-up-enhancement?variant=47472947200225"
    },
    {
      id: 1,
      name: "Curl Twist",
      price: 20,
      image: Product1,
      slug: "curl-twist",
      buyLink: "https://shopclipculture.com/products/curl-twist"
    },
    {
      id: 2,
      name: "Magic Beard Balm",
      price: 20,
      image: Product2,
      slug: "magic-beard-balm",
      buyLink: "https://shopclipculture.com/products/magic-beard-balm"
    },
    {
      id: 3,
      name: "Premium Beard Oil",
      price: 20,
      image: Product3,
      slug: "premium-beard-oil",
      buyLink: "https://shopclipculture.com/products/premium-beard-oil"
    },
    {
      id: 4,
      name: "Body Lotion",
      price: 20,
      image: Product5,
      slug: "body-lotion",
      buyLink: "https://shopclipculture.com/products/intensive-body-lotion"
    }
  ];
  
  // State and ref for product carousel
  const [productScrollIndex, setProductScrollIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const productsContainerRef = useRef(null);
  const carouselRef = useRef(null);
  const visibleCount = 3; // Show 3 items at a time on desktop
  const maxScrollIndex = featuredProducts.length - visibleCount; // Maximum scroll positions (5 - 3 = 2)
  
  // Calculate and update scroll offset when index changes or on resize
  useEffect(() => {
    const calculateOffset = () => {
      if (!carouselRef.current) return;
      const containerWidth = carouselRef.current.offsetWidth;
      const gap = 16; // 1rem = 16px
      // Each card width = (containerWidth - (visibleCount - 1) * gap) / visibleCount
      const cardWidth = (containerWidth - (visibleCount - 1) * gap) / visibleCount;
      // Scroll by one card width + gap per index
      setScrollOffset(productScrollIndex * (cardWidth + gap));
    };
    
    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    return () => window.removeEventListener('resize', calculateOffset);
  }, [productScrollIndex, visibleCount]);

  const bookingOptions = [
    { 
      id: 'sandy-springs', 
      type: 'location',
      name: 'Sandy Springs', 
      subtitle: 'Location',
      address: '6309 Roswell Road NE #2D, Sandy Springs, GA 30328',
      image: ShopImage1,
      bookingUrl: 'https://getsquire.com/booking/book/clip-culture-sandy-springs-sandy-springs',
    },
      { 
      id: 'summerhill', 
      type: 'location',
      name: 'Summerhill', 
      subtitle: 'Location',
      address: '572 Hank Aaron Dr Suite 1120, Atlanta, GA 30312',
      image: ShopImage2,
      bookingUrl: 'https://getsquire.com/booking/book/clip-culture-barbershop-atlanta'
    },
    { 
      id: 'david', 
      type: 'barber',
      name: 'David Brown', 
      subtitle: 'Owner / Master Barber',
      description: 'Over 15 years of experience. Specializes in precision cuts and classic styles with a modern twist.',
      locationNote: 'Sandy Springs Location Only',
      image: OwnerImage,
      bookingUrl: 'https://clipculturebarbershop.as.me/schedule/c75249a7'
    }
  ];

  const handleBackNavigation = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 2) {
        setPolicyAgreed(false);
        setShowFullPolicy(false);
      }
    } else {
      navigate(-1);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowError(false);
    // Scroll to continue button after selection
    setTimeout(() => {
      if (step1ContinueBtnRef.current) {
        step1ContinueBtnRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handlePolicyChange = (e) => {
    setPolicyAgreed(e.target.checked);
    setShowError(false);
    // Scroll to continue button after checking
    if (e.target.checked) {
      setTimeout(() => {
        if (step2ContinueBtnRef.current) {
          step2ContinueBtnRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (!selectedOption) {
        setErrorMessage('Please select a location or barber to continue.');
        setShowError(true);
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!policyAgreed) {
        setErrorMessage('Please agree to the appointment policy to continue.');
        setShowError(true);
        return;
      }
      // Redirect directly to booking URL for all options
      window.open(selectedOption.bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBookNow = () => {
    if (selectedOption && policyAgreed) {
      window.open(selectedOption.bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const dismissError = () => {
    setShowError(false);
    setErrorMessage('');
  };

  const steps = [
    { number: 1, label: 'Choose', description: 'Select location or barber' },
    { number: 2, label: 'Agree', description: 'Review booking policy' },
    { number: 3, label: 'Book', description: 'Complete your booking' }
  ];

  return (
    <>
      <div className="book-now-page">
        {/* Decorative Background Elements */}
        <div className="book-now-bg-pattern"></div>
        <div className="book-now-bg-gradient"></div>
        
        {/* Error Alert */}
        {showError && (
          <div className="book-now-error-alert">
            <div className="book-now-error-content">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{errorMessage}</span>
              <button className="book-now-error-close" onClick={dismissError} aria-label="Dismiss error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Back Button */}
        <button 
          className="book-now-back-btn" 
          onClick={handleBackNavigation}
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Header */}
        <header className="book-now-header">
          <img src={Logo} alt="Clip Culture Logo" className="book-now-logo" />
          <h1>Book Your Appointment</h1>
          <p className="book-now-tagline">Walk-ins are welcome!</p>
        </header>

        {/* Progress Steps */}
        <div className="book-now-progress">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className={`book-now-step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
                <div className="book-now-step-circle">
                  {currentStep > step.number ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <div className="book-now-step-info">
                  <span className="book-now-step-label">{step.label}</span>
                  <span className="book-now-step-desc">{step.description}</span>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`book-now-step-line ${currentStep > step.number ? 'completed' : ''}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="book-now-content">
          {/* STEP 1: Choose Location or David */}
          {currentStep === 1 && (
            <div className="book-now-step-content">
              <h2 className="book-now-section-title">Where would you like to visit?</h2>
              <p className="book-now-section-subtitle">Select a location or book directly with our owner</p>
              
              <div className="book-now-options-grid">
                {/* Locations */}
                <div className="book-now-options-row">
                  {bookingOptions.filter(opt => opt.type === 'location').map((option) => (
                    <div 
                      key={option.id} 
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${option.name} location`}
                      aria-pressed={selectedOption?.id === option.id}
                      className={`book-now-option-card ${selectedOption?.id === option.id ? 'selected' : ''}`}
                      onClick={() => handleOptionSelect(option)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOptionSelect(option); }}
                    >
                      <div className="book-now-option-image">
                        <img src={option.image} alt={option.name} loading="lazy" />
                        <div className="book-now-option-overlay">
                          <div className="book-now-option-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="book-now-option-info">
                        <span className="book-now-option-badge">{option.subtitle}</span>
                        <h3>{option.name}</h3>
                        <p className="book-now-option-address">{option.address}</p>
                      </div>
                      <div className="book-now-option-check">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* David/Owner Section */}
                <div className="book-now-owner-divider">
                  <span>or book with</span>
                </div>

                {bookingOptions.filter(opt => opt.type === 'barber').map((option) => (
                  <div 
                    key={option.id} 
                    role="button"
                    tabIndex={0}
                    aria-label={`Book with ${option.name}`}
                    aria-pressed={selectedOption?.id === option.id}
                    className={`book-now-option-card book-now-option-card--featured ${selectedOption?.id === option.id ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOptionSelect(option); }}
                  >
                    <div className="book-now-option-image">
                      <img src={option.image} alt={option.name} loading="lazy" />
                      <div className="book-now-option-overlay">
                        <div className="book-now-option-icon book-now-option-icon--featured">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="book-now-option-info">
                      <span className="book-now-option-badge book-now-option-badge--featured">{option.subtitle}</span>
                      <h3>{option.name}</h3>
                      <p className="book-now-option-description">{option.description}</p>
                      <p className="book-now-option-location-note">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {option.locationNote}
                      </p>
                    </div>
                    <div className="book-now-option-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className="book-now-step1-btn-container" ref={step1ContinueBtnRef}>
                <button 
                  className={`book-now-action-btn book-now-action-btn--primary ${!selectedOption ? 'disabled' : ''}`}
                  onClick={handleContinue}
                >
                  Continue
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Policy Agreement */}
          {currentStep === 2 && (
            <div className="book-now-step-content">
              <h2 className="book-now-section-title">Booking Policy</h2>
              <p className="book-now-section-subtitle">Please review and agree to our appointment policy</p>

              {/* Selected Option Summary */}
              {selectedOption && (
                <div className="book-now-selected-summary">
                  <div className="book-now-selected-image">
                    <img src={selectedOption.image} alt={selectedOption.name} loading="lazy" />
                  </div>
                  <div className="book-now-selected-info">
                    <span className="book-now-selected-badge">{selectedOption.subtitle}</span>
                    <h3>{selectedOption.name}</h3>
                    {selectedOption.address && <p>{selectedOption.address}</p>}
                    {selectedOption.locationNote && <p className="location-note">{selectedOption.locationNote}</p>}
                  </div>
                </div>
              )}

              <div className="book-now-policy-card">
                <div className="book-now-policy-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                
                <div className="book-now-policy-summary">
                  <h3>Appointment Guidelines</h3>
                  <ul>
                    <li>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Arrive 10-15 minutes early for your consultation</span>
                    </li>
                    <li>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      <span>$15 no-show fee for missed appointments</span>
                    </li>
                    <li>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>24-hour notice required for cancellations</span>
                    </li>
                  </ul>
                </div>

                <button 
                  className="book-now-read-policy-btn"
                  onClick={() => setShowFullPolicy(!showFullPolicy)}
                >
                  {showFullPolicy ? 'Hide' : 'Read'} Full Policy
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: showFullPolicy ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {showFullPolicy && (
                  <div className="book-now-full-policy">
                    <h4>Cancellation Policy</h4>
                    <p>
                      <strong>No-Show Fee:</strong> Missed appointments without prior notice will incur a $15 fee, 
                      which will be applied to your next booking.
                    </p>
                    <p>
                      <strong>Cancellation Notice:</strong> Please provide at least 24 hours notice if you need to 
                      cancel or reschedule your appointment.
                    </p>
                    <p>
                      <strong>Late Arrivals:</strong> Arriving more than 15 minutes late may result in your appointment 
                      being rescheduled to accommodate other clients.
                    </p>
                    <p>
                      We understand that emergencies happen. Please contact us as soon as possible if you need to make 
                      changes to your appointment.
                    </p>
                  </div>
                )}
              </div>

              {/* Checkbox Agreement */}
              <div className="book-now-agreement">
                <label className="book-now-checkbox-label">
                  <input
                    type="checkbox"
                    checked={policyAgreed}
                    onChange={handlePolicyChange}
                    className="book-now-checkbox"
                  />
                  <span className="book-now-checkbox-custom"></span>
                  <span className="book-now-agreement-text">
                    <span className="required-asterisk">*</span> I have read and agree to the appointment policy. I understand the cancellation 
                    terms and will arrive early for my consultation.
                  </span>
                </label>
              </div>

              <div className="book-now-btn-group" ref={step2ContinueBtnRef}>
                <button 
                  className="book-now-action-btn book-now-action-btn--secondary"
                  onClick={() => setCurrentStep(1)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back
                </button>
                <button 
                  className={`book-now-action-btn book-now-action-btn--primary ${!policyAgreed ? 'disabled' : ''}`}
                  onClick={handleContinue}
                >
                  Complete
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmation & Book */}
          {currentStep === 3 && selectedOption && (
            <div className="book-now-step-content">
              <div className="book-now-confirmation-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              
              <h2 className="book-now-section-title">You're all set!</h2>
              <p className="book-now-section-subtitle">Click below to complete your booking</p>

              {/* Final Summary Card */}
              <div className="book-now-final-card">
                <div className="book-now-final-image">
                  <img src={selectedOption.image} alt={selectedOption.name} loading="lazy" />
                </div>
                <div className="book-now-final-info">
                  <span className="book-now-final-badge">{selectedOption.subtitle}</span>
                  <h3>{selectedOption.name}</h3>
                  {selectedOption.address && <p className="book-now-final-address">{selectedOption.address}</p>}
                  {selectedOption.locationNote && (
                    <p className="book-now-final-note">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {selectedOption.locationNote}
                    </p>
                  )}
                  <div className="book-now-final-policy-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Policy Agreed
                  </div>
                </div>
              </div>

              <div className="book-now-btn-group">
                <button 
                  className="book-now-action-btn book-now-action-btn--secondary"
                  onClick={() => setCurrentStep(2)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back
                </button>
                <button 
                  className="book-now-action-btn book-now-action-btn--primary"
                  onClick={handleBookNow}
                >
                  <span>Complete</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
              </div>

              <p className="book-now-redirect-note">
                You'll be redirected to our booking system to select your date and time
              </p>
            </div>
          )}
        </div>

        {/* Featured Products Section */}
        <div className="book-now-products-section">
          <h2 className="book-now-products-title">Shop Our Grooming Products</h2>
          <p className="book-now-products-subtitle">Complete your look with our premium products</p>
          
          {/* Desktop Carousel */}
          <div className="book-now-products-carousel">
            {/* Track wrapper for clipping - ref for width measurement */}
            <div className="book-now-products-track-wrapper" ref={carouselRef}>
              <div 
                className="book-now-products-track" 
                ref={productsContainerRef}
                style={{ transform: `translateX(-${scrollOffset}px)` }}
              >
                {featuredProducts.map((product) => (
                  <a 
                    key={product.id} 
                    href={product.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-now-product-card"
                  >
                    {product.isNewDrop && (
                      <span className="book-now-product-badge">New Arrival</span>
                    )}
                    <div className="book-now-product-image">
                      <img src={product.image} alt={product.name} loading="lazy" />
                    </div>
                    <div className="book-now-product-info">
                      <h5 className="book-now-product-name">{product.name}</h5>
                      {product.size && <p className="book-now-product-size">{product.size}</p>}
                      <p className="book-now-product-price">
                        {product.priceFrom ? `From $${product.priceFrom}` : `$${product.price}`}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Scroll Arrow - only show if there are more items */}
            {productScrollIndex < maxScrollIndex && (
              <button 
                className="book-now-products-arrow book-now-products-arrow--right"
                onClick={() => setProductScrollIndex(prev => Math.min(prev + 1, maxScrollIndex))}
                aria-label="View more products"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            )}
            
            {/* Left Arrow - show when scrolled */}
            {productScrollIndex > 0 && (
              <button 
                className="book-now-products-arrow book-now-products-arrow--left"
                onClick={() => setProductScrollIndex(prev => Math.max(prev - 1, 0))}
                aria-label="View previous products"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}
          </div>
          
          {/* Mobile Grid - shows 4 products */}
          <div className="book-now-products-grid-mobile">
            {featuredProducts.slice(0, 4).map((product) => (
              <a 
                key={product.id} 
                href={product.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="book-now-product-card"
              >
                {product.isNewDrop && (
                  <span className="book-now-product-badge">New</span>
                )}
                <div className="book-now-product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>
                <div className="book-now-product-info">
                  <h5 className="book-now-product-name">{product.name}</h5>
                  {product.size && <p className="book-now-product-size">{product.size}</p>}
                  <p className="book-now-product-price">
                    {product.priceFrom ? `From $${product.priceFrom}` : `$${product.price}`}
                  </p>
                </div>
              </a>
            ))}
          </div>
          
          <Link to="/shop" className="book-now-view-all-btn">
            View All Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookNow;
