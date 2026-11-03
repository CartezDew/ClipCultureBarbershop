import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/products-banner.css';
import Logo from '../assets/images/New_Logo.webp';
import StandScene from '../assets/About_Home/Products_Clients-new-stand.webp';
import BeardBalm from '../assets/About_Home/stand-products/magic-beard-balm.webp';
import BeardOil from '../assets/About_Home/stand-products/premium-beard-oil.webp';
import Shampoo from '../assets/About_Home/stand-products/therapeutic-shampoo.webp';
import SheaButter from '../assets/About_Home/stand-products/rich-shea-butter.webp';
import ShowerGel from '../assets/About_Home/stand-products/bath-shower-gel.webp';
import Revive from '../assets/About_Home/stand-products/revive.webp';

const featuredProducts = [
  { name: 'Magic Beard Balm', slug: 'magic-beard-balm', image: BeardBalm },
  { name: 'Premium Beard Oil', slug: 'premium-beard-oil', image: BeardOil },
  { name: 'Therapeutic Shampoo', slug: 'therapeutic-shampoo', image: Shampoo },
  { name: 'Rich Shea Butter', slug: 'rich-shea-butter', image: SheaButter },
  { name: 'Bath & Shower Gel', slug: 'bath-shower-gel', image: ShowerGel },
  { name: 'Revive Beard & Line Up Enhancement', slug: 'beard-line-up-enhancement', image: Revive },
];

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
        <div className="products-banner__logo-wrapper">
          <img 
            src={Logo} 
            alt="Clip Culture" 
            className="products-banner__logo"
          />
        </div>

        <div className="products-banner__scene">
          <img className="products-banner__backdrop" src={StandScene} alt="" loading="lazy" decoding="async" />
          <div className="products-banner__products" aria-label="Shop Clip Culture grooming products">
            {featuredProducts.map(({ name, slug, image }) => (
              <Link className={`products-banner__product products-banner__product--${slug}`} to={`/products/${slug}`} aria-label={name} key={slug}>
                <img src={image} alt="" loading="lazy" decoding="async" />
              </Link>
            ))}
          </div>
          <img className="products-banner__stand-front" src={StandScene} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        </div>

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

