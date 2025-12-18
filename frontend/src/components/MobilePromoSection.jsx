import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/mobile-promo-section.css';
import DaveFullBody from '../assets/About_Home/Dave_Full_Body.webp';
import LogosWall from '../assets/About_Home/Logos_wall.webp';

const MobilePromoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="mobile-promo-section" ref={sectionRef}>
      <div className="mobile-promo-container">
        {/* Left Image - Logos Wall */}
        <div className="mobile-promo-image mobile-promo-image--left">
          <img src={LogosWall} alt="Brand logos and partnerships" loading="lazy" />
        </div>

        {/* Right Image - Dave Full Body */}
        <div className="mobile-promo-image mobile-promo-image--right">
          <img src={DaveFullBody} alt="David Brown - Clip Culture Owner" loading="lazy" />
        </div>

        {/* Center Content - Links */}
        <div className={`mobile-promo-content ${isVisible ? 'animate-in' : ''}`}>
          <div className="mobile-promo-links">
            <Link to="/shop" className="mobile-promo-link" style={{ animationDelay: '0s' }}>
              <span className="mobile-promo-link-text">Products</span>
              <span className="mobile-promo-link-accent">Shop the Collection</span>
            </Link>
            
            <div className="mobile-promo-divider" style={{ animationDelay: '0.15s' }}>
              <span className="mobile-promo-ampersand">&</span>
            </div>
            
            <Link to="/mentorship" className="mobile-promo-link" style={{ animationDelay: '0.3s' }}>
              <span className="mobile-promo-link-text">Mentorship</span>
              <span className="mobile-promo-link-accent">Elevate Your Craft</span>
            </Link>
            
            <div className="mobile-promo-divider" style={{ animationDelay: '0.45s' }}>
              <span className="mobile-promo-ampersand">&</span>
            </div>
            
            <Link to="/speaking-engagements" className="mobile-promo-link" style={{ animationDelay: '0.6s' }}>
              <span className="mobile-promo-link-text">Speaking</span>
              <span className="mobile-promo-link-accent">Book an Engagement</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobilePromoSection;
