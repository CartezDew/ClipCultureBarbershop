import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FloatingActionButtons = ({ showOnHome }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [hideAtFooter, setHideAtFooter] = useState(false);
  
  // Pages where floating buttons should NOT be shown
  const excludedPages = ['/login', '/mentorship', '/advertise', '/franchise', '/apply'];
  const isExcludedPage = excludedPages.includes(location.pathname);

  // Check if floating buttons are reaching the footer
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Hide buttons when footer enters viewport (with 80px offset for button height)
        const shouldHide = footerRect.top < windowHeight - 80;
        setHideAtFooter(shouldHide);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show on excluded pages
  if (isExcludedPage) {
    return null;
  }

  // On home page, only show when prop is true (hero buttons out of view)
  // On other pages, always show
  const shouldShow = isHomePage ? showOnHome : true;

  if (!shouldShow) {
    return null;
  }

  const handleBookNowClick = (e) => {
    e.preventDefault();
    
    if (isHomePage) {
      // On home page, just trigger the booking form
      window.dispatchEvent(new CustomEvent('openBookingForm'));
    } else {
      // On other pages, navigate to home and trigger booking form
      navigate('/');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openBookingForm'));
      }, 100);
    }
  };

  const handleShopNowClick = (e) => {
    e.preventDefault();
    
    // Navigate to shop page
    navigate('/shop');
    
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className={`floating-action-buttons ${hideAtFooter ? 'hidden' : ''}`}>
      <button
        className="floating-btn floating-btn--book"
        onClick={handleBookNowClick}
      >
        Book Now
      </button>
      <button
        className="floating-btn floating-btn--shop"
        onClick={handleShopNowClick}
      >
        Shop Now
      </button>
    </div>
  );
};

export default FloatingActionButtons;

