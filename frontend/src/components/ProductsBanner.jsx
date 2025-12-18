import React, { useEffect, useRef, useState } from 'react';
import '../styles/products-banner.css';
import ProductsClientsImage from '../assets/About_Home/Products_Clients.webp';
import Logo from '../assets/images/New_Logo.webp';

const ProductsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sloganRef = useRef(null);

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
      { threshold: 0.3 } // Trigger when 30% visible
    );

    if (sloganRef.current) {
      observer.observe(sloganRef.current);
    }

    return () => {
      if (sloganRef.current) {
        observer.unobserve(sloganRef.current);
      }
    };
  }, []);

  return (
    <section className="products-banner">
      <div className="products-banner__container">
        {/* Background Image */}
        <div className="products-banner__background">
          <img 
            src={ProductsClientsImage} 
            alt="Clip Culture Products and Clients" 
            className="products-banner__bg-image"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <div className="products-banner__overlay" />
        </div>
        
        {/* Logo - Top Left */}
        <div className="products-banner__logo-wrapper">
          <img 
            src={Logo} 
            alt="Clip Culture" 
            className="products-banner__logo"
          />
        </div>
        
        {/* Slogan - Bottom */}
        <div className="products-banner__slogan-wrapper" ref={sloganRef}>
          <div className="products-banner__slogan-container">
            <h2 className={`products-banner__slogan ${isVisible ? 'animate-in' : ''}`}>
              <span className="products-banner__slogan-line" style={{ animationDelay: '0s' }}>Defining the Standard.</span>
              <span className="products-banner__slogan-separator" style={{ animationDelay: '0.2s' }}>—</span>
              <span className="products-banner__slogan-line" style={{ animationDelay: '0.4s' }}>Shaping the Culture.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsBanner;

