import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import beardProductsImage from '../assets/About_Home/Beard_Products-new-backdrop.webp';
import shampooImage from '../assets/About_Home/stand-products/therapeutic-shampoo.webp';
import beardOilImage from '../assets/About_Home/stand-products/premium-beard-oil.webp';
import beardBalmImage from '../assets/About_Home/stand-products/magic-beard-balm.webp';
import '../styles/sticky-advertisement.css';

const StickyAdvertisement = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Intersection Observer for fade-in animation (same pattern as ProductsBanner)
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
      { threshold: 0.2 }
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

  const handleClick = () => {
    navigate('/shop');
  };

  return (
    <section className={`promo-ad ${isVisible ? 'animate-in' : ''}`} ref={sectionRef}>
      <div 
        className="promo-ad__container" 
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        style={{ cursor: 'pointer' }}
        aria-label="Shop Therapeutic Shampoo, Premium Beard Oil, and Magic Beard Balm"
      >
        {/* Background Image - Optimized like ProductsBanner */}
        <div className="promo-ad__image-wrapper">
          <img
            src={beardProductsImage}
            alt=""
            className="promo-ad__image"
            loading="lazy"
            decoding="async"
          />
          <img src={shampooImage} alt="" className="promo-ad__product promo-ad__product--shampoo" loading="lazy" decoding="async" />
          <img src={beardOilImage} alt="" className="promo-ad__product promo-ad__product--oil" loading="lazy" decoding="async" />
          <img src={beardBalmImage} alt="" className="promo-ad__product promo-ad__product--balm" loading="lazy" decoding="async" />
          {/* Overlay for readability */}
          <div className="promo-ad__overlay" />
        </div>

        {/* Corner Accents */}
        <div className="promo-ad__corner promo-ad__corner--tl" />
        <div className="promo-ad__corner promo-ad__corner--tr" />
        <div className="promo-ad__corner promo-ad__corner--bl" />
        <div className="promo-ad__corner promo-ad__corner--br" />

        {/* Content */}
        <div className="promo-ad__content">
          <span className="promo-ad__eyebrow">Premium Grooming</span>
          <h2 className="promo-ad__headline">
            Elevate Your<br />
            <span className="promo-ad__highlight">Routine</span>
          </h2>
          <p className="promo-ad__tagline">Shop the Collection</p>
        </div>
      </div>
    </section>
  );
};

export default StickyAdvertisement;
