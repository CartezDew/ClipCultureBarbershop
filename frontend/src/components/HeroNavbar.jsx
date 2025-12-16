import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Scissors, Users, Camera, Phone, ShoppingCart, ChevronDown, Info, 
  User, Users2, Baby, MapPin, Building, BookOpen, GraduationCap, 
  Megaphone, Store, FileText, HelpCircle, Mail, LogIn, UserPlus, Building2, Mic2, Shirt
} from 'lucide-react';
import Comb from './icons/Comb';
import logoWebP from '../assets/images/CC-Logo.webp';
import logoWebP2x from '../assets/images/CC-Logo-2x.webp';
import logoPNG from '../assets/images/CC-Logo-blank.webp';
import NavbarMobile from './NavbarMobile.jsx';
import '../styles/hero-navbar.css';

const HeroNavbar = ({ showTaglineAnim = false, isMobile600 = false }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 650 : false);
  const navRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 650px)');
    const handleChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    if (mql.addEventListener) mql.addEventListener('change', handleChange);
    else mql.addListener(handleChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handleChange);
      else mql.removeListener(handleChange);
    };
  }, []);

  const getIconForMenuItem = (itemName) => {
    switch (itemName) {
      case 'Services':
        return <Scissors className="hero-menu-icon" size={18} />
      case 'About':
        return <Info className="hero-menu-icon" size={18} />
      case 'Shop':
        return <ShoppingCart className="hero-menu-icon" size={18} />
      default:
        return null
    }
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const dropdownMenus = {
    services: [
      { name: 'All Services', link: '/services', icon: <Scissors size={16} /> },
      { name: 'Men', link: '/services', icon: <User size={16} /> },
      { name: 'Women', link: '/services#specialty-services', icon: <Users2 size={16} /> },
      { name: 'Kids', link: '/services#specialty-services', icon: <Baby size={16} /> }
    ],
    shop: [
      { name: 'All Products', link: '/shop', icon: <Store size={16} /> },
      { name: 'Apparel', link: '/shop#apparel', icon: <Shirt size={16} /> },
      { name: 'Books', link: '/shop#books', icon: <BookOpen size={16} /> },
      { name: 'Mentorship', link: '/mentorship', icon: <GraduationCap size={16} /> },
      { name: 'Advertise', link: '/shop?category=advertise', icon: <Megaphone size={16} /> }
    ],
    about: [
      { name: 'Our Story', link: '/about', icon: <FileText size={16} /> },
      { name: 'FAQ', link: '/#faq', icon: <HelpCircle size={16} /> },
      { name: 'Join Team', link: '/apply', icon: <UserPlus size={16} /> },
      { name: 'Contact Us', link: '/#contact', icon: <Mail size={16} /> },
      { name: 'Franchise', link: '/franchise', icon: <Building2 size={16} /> },
      { name: 'Speaking Engagements', link: '/speaking-engagements', icon: <Mic2 size={16} /> },
      { name: 'Log In', link: '/login', icon: <LogIn size={16} /> }
    ]
  };

  if (isMobile) {
    return (
      <div className="hero-navbar hero-navbar--mobile" ref={navRef}>
        <NavbarMobile showTaglineAnim={showTaglineAnim} isMobile600={isMobile600} />
      </div>
    );
  }

  return (
    <nav className="hero-navbar" ref={navRef}>
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
          {/* Services Dropdown */}
          <div className="hero-dropdown-container">
            <button 
              className="hero-nav-link hero-dropdown-trigger"
              onClick={() => toggleDropdown('services')}
            >
              {getIconForMenuItem('Services')}
              <span>Services</span>
              <ChevronDown className={`hero-dropdown-arrow ${activeDropdown === 'services' ? 'active' : ''}`} size={14} />
            </button>
            {activeDropdown === 'services' && (
              <div className="hero-dropdown-menu">
                {dropdownMenus.services.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.link} 
                    className="hero-dropdown-item"
                    onClick={closeDropdown}
                  >
                    <span className="hero-dropdown-icon">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div className="hero-dropdown-container">
            <button 
              className="hero-nav-link hero-dropdown-trigger"
              onClick={() => toggleDropdown('about')}
            >
              {getIconForMenuItem('About')}
              <span>About</span>
              <ChevronDown className={`hero-dropdown-arrow ${activeDropdown === 'about' ? 'active' : ''}`} size={14} />
            </button>
            {activeDropdown === 'about' && (
              <div className="hero-dropdown-menu">
                {dropdownMenus.about.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.link} 
                    className="hero-dropdown-item"
                    onClick={closeDropdown}
                  >
                    <span className="hero-dropdown-icon">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Shop Dropdown */}
          <div className="hero-dropdown-container">
            <button 
              className="hero-nav-link hero-dropdown-trigger hero-shop-link"
              onClick={() => toggleDropdown('shop')}
            >
              <div className="hero-shop-icon-container">
                {getIconForMenuItem('Shop')}
                <span className="hero-cart-count">0</span>
              </div>
              <span>Shop</span>
              <ChevronDown className={`hero-dropdown-arrow ${activeDropdown === 'shop' ? 'active' : ''}`} size={14} />
            </button>
            {activeDropdown === 'shop' && (
              <div className="hero-dropdown-menu">
                {dropdownMenus.shop.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.link} 
                    className="hero-dropdown-item"
                    onClick={closeDropdown}
                  >
                    <span className="hero-dropdown-icon">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="hero-nav-actions">
          <Link 
            to="/booking"
            className="hero-book-btn" 
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HeroNavbar;
