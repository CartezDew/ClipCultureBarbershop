import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mobile-promo-section.css';
import DaveFullBody from '../assets/About_Home/Dave_Full_Body.png';
import LogosWall from '../assets/About_Home/Logos_wall.png';

const MobilePromoSection = () => {
  return (
    <section className="mobile-promo-section">
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
        <div className="mobile-promo-content">
          <div className="mobile-promo-links">
            <Link to="/shop" className="mobile-promo-link">
              <span className="mobile-promo-link-text">Products</span>
              <span className="mobile-promo-link-accent">Shop the Collection</span>
            </Link>
            
            <div className="mobile-promo-divider">
              <span className="mobile-promo-ampersand">&</span>
            </div>
            
            <Link to="/mentorship" className="mobile-promo-link">
              <span className="mobile-promo-link-text">Mentorship</span>
              <span className="mobile-promo-link-accent">Elevate Your Craft</span>
            </Link>
            
            <div className="mobile-promo-divider">
              <span className="mobile-promo-ampersand">&</span>
            </div>
            
            <Link to="/speaking-engagements" className="mobile-promo-link">
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
