import React from 'react';
import '../styles/products-banner.css';
import ProductsClientsImage from '../assets/About_Home/Products_Clients.webp';
import Logo from '../assets/images/New_Logo.webp';

const ProductsBanner = () => {
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
        <div className="products-banner__slogan-wrapper">
          <div className="products-banner__slogan-container">
            <h2 className="products-banner__slogan">
              <span className="products-banner__slogan-line">Defining the Standard.</span>
              <span className="products-banner__slogan-separator">—</span>
              <span className="products-banner__slogan-line">Shaping the Culture.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsBanner;

