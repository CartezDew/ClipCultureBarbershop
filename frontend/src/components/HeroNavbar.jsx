import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Scissors, Users, Camera, Phone, ShoppingCart } from 'lucide-react';
import logoWebP from '../assets/images/CC-Logo.webp';
import logoWebP2x from '../assets/images/CC-Logo-2x.webp';
import logoPNG from '../assets/images/CC-Logo-blank.webp';
import '../styles/hero-navbar.css';

const HeroNavbar = () => {
  const getIconForMenuItem = (itemName) => {
    switch (itemName) {
      case 'Services':
        return <Scissors className="hero-menu-icon" size={18} />
      case 'Barbers':
        return <Users className="hero-menu-icon" size={18} />
      case 'Gallery':
        return <Camera className="hero-menu-icon" size={18} />
      case 'Shop':
        return <ShoppingCart className="hero-menu-icon" size={18} />
      default:
        return null
    }
  };

  return (
    <nav className="hero-navbar">
      <div className="hero-navbar-container">
        <div className="hero-logo">
          <Link to="/" className="hero-logo-link">
            <picture>
              <source srcSet={`${logoWebP2x} 2x, ${logoWebP} 1x`} type="image/webp" />
              <img 
                src={logoPNG} 
                srcSet={`${logoPNG} 1x`}
                alt="ClipCulture Logo" 
                className="hero-logo-image"
              />
            </picture>
          </Link>
        </div>
        
        <div className="hero-nav-links">
          <Link to="/services" className="hero-nav-link">
            {getIconForMenuItem('Services')}
            <span>Services</span>
          </Link>
          <Link to="/team" className="hero-nav-link">
            {getIconForMenuItem('Barbers')}
            <span>Barbers</span>
          </Link>
          <Link to="/gallery" className="hero-nav-link">
            {getIconForMenuItem('Gallery')}
            <span>Gallery</span>
          </Link>
          <Link to="/shop" className="hero-nav-link">
            {getIconForMenuItem('Shop')}
            <span>Shop</span>
          </Link>
        </div>
        
        <div className="hero-nav-actions">
          <Link to="/contact" className="hero-contact-btn">Book Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default HeroNavbar;
