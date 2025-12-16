import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getServices } from '../lib/mockApi.js';
import HeroNavbar from '../components/HeroNavbar.jsx';
import Navbar from '../components/Navbar.jsx';
import BookingForm from '../components/BookingForm.jsx';
import TopProducts from '../components/TopProducts.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Home_Welcome from '../components/Home_Welcome.jsx';
import Professional_Team from '../components/Professional_Team.jsx';
import Contact from '../components/Contact.jsx';
import Facts from '../components/facts.jsx';
import Footer from '../components/Footer.jsx';
import { Handshake, MapPin, Building2 } from 'lucide-react';
import { FaRegThumbsUp } from "react-icons/fa6";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";
import HomeGallery from '../components/Home_Gallery.jsx';
import BarbershopGallery from '../components/Barbershop_Gallery.jsx';
import ShopByCategory from '../components/ShopByCategory.jsx';
import ServiceDetailModal from '../components/ServiceDetailModal.jsx';

// Flexed Bicep Icon
const BicepIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    color="currentColor"
    fill="none"
  >
    <path
      d="M2.01792 20.3051C3.14656 21.9196 8.05942 23.1871 10.3797 20.1645C12.8894 21.3649 17.0289 20.9928 20.3991 19.1134C20.8678 18.8521 21.3112 18.5222 21.5827 18.0593C22.1957 17.0143 22.2102 15.5644 21.0919 13.4251C19.2274 8.77072 15.874 4.68513 14.5201 3.04212C14.2421 2.78865 12.4687 2.42868 11.3872 2.08279C10.9095 1.93477 10.02 1.83664 8.95612 3.23862C8.45176 3.90329 6.16059 5.5357 9.06767 6.63346C9.51805 6.74806 9.84912 6.95939 11.9038 6.58404C12.1714 6.53761 12.8395 6.58404 13.3103 7.41041L14.2936 8.81662C14.3851 8.94752 14.4445 9.09813 14.4627 9.25682C14.635 10.7557 14.6294 12.6323 15.4651 13.5826C14.1743 12.6492 10.8011 11.5406 8.2595 14.6951M2.00189 12.94C3.21009 11.791 6.71197 9.97592 10.4179 12.5216"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
import '../styles/home.css';
import heroImageWebP from '../assets/images/ClipCultureHero.webp';
import heroImagePNG from '../assets/images/ClipCultureHero.png';
import heroImageSplit from '../assets/images/clipculturehero2.webp';
import shopImage1 from '../assets/Contact/Shop_1.webp';
import shopImage2 from '../assets/Contact/Shop_2.webp';
import clipCultureLogo from '../assets/images/Clip Culture Logo.webp';

const Home = () => {
  const [services, setServices] = useState([]);
  const [showHeroNavbar, setShowHeroNavbar] = useState(true);
  const [isMobile600, setIsMobile600] = useState(typeof window !== 'undefined' ? window.innerWidth <= 600 : false);
  const [showTaglineAnim, setShowTaglineAnim] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleCloseServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };

  // Scroll to anchors when arriving on this page with a hash (e.g., /#contact, /#faq)
  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');

    const scrollWithOffset = () => {
      const el = document.getElementById(targetId);
      if (!el) {
        console.log('Element not found:', targetId);
        return;
      }

      // Get the element's position
      const elementPosition = el.getBoundingClientRect().top;
      // Use different offsets for different sections
      let offset = 80;
      if (targetId === 'faq') offset = 40;
      if (targetId === 'team') offset = 65;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      console.log('Scrolling to:', targetId, 'offset:', offsetPosition, 'elementTop:', elementPosition, 'using offset:', offset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };

    // Wait for images and content to load before scrolling
    // Use 'load' event to ensure all images are loaded
    const handleLoad = () => {
      setTimeout(scrollWithOffset, 100);
    };

    if (document.readyState === 'complete') {
      // Page already loaded
      setTimeout(scrollWithOffset, 300);
    } else {
      // Wait for page to load
      window.addEventListener('load', handleLoad);
    }
    
    // Also try after a delay as a fallback
    const timeoutId = setTimeout(scrollWithOffset, 1000);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Hide hero navbar when hero section is completely out of view
        setShowHeroNavbar(rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 600px)');
    const handleChange = (e) => setIsMobile600(e.matches);
    setIsMobile600(mql.matches);
    if (mql.addEventListener) mql.addEventListener('change', handleChange);
    else mql.addListener(handleChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handleChange);
      else mql.removeListener(handleChange);
    };
  }, []);

  const socialProofItems = [
    {
      key: 'clients-served',
      icon: <Handshake size={24} />,
      number: '135K+',
      label: 'Clients Served',
    },
    {
      key: 'satisfaction',
      icon: <FaRegThumbsUp size={24} />,
      number: '94%',
      label: 'Client Satisfaction',
    },
    {
      key: 'years-strong',
      icon: <BicepIcon size={24} />,
      number: '7+',
      label: 'Years Strong',
    },
    {
      key: 'culture-hubs',
      icon: <PiMapPinSimpleAreaBold size={24} />,
      number: '2',
      label: 'Culture Hubs',
    },
  ];

  return (
    <div>
      {/* Hero Navbar - Mounted above hero section */}
      {showHeroNavbar && <HeroNavbar showTaglineAnim={showTaglineAnim} isMobile600={isMobile600} />}
      {/* Hero Background Container */}
      <div className="hero-background-container">
        {/* Hero Section */}
        <section className="hero">
        <div className="hero__background">
          <picture>
            <source srcSet={heroImageWebP} type="image/webp" />
            <img 
              src={heroImagePNG} 
              alt="ClipCulture Barbershop Interior" 
              className="hero__background-image"
            />
          </picture>
          <div className="hero__overlay"></div>
        </div>
        
        {/* Left side - Desktop: Tagline & CTA, Mobile: Buttons only */}
        <div className="hero__left">
          {/* Desktop content - hidden at 600px and below */}
          <div className="hero__desktop-content">
            {/* Eyebrow/Pill text */}
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-dot"></span>
              Walk-ins are welcome!
            </div>
            
            {/* Tagline */}
            <h2 className="hero__headline">
              <span className="hero__headline-line">Defining the Standard.</span>
              <span className="hero__headline-line">Shaping the <em>Culture.</em></span>
            </h2>
            
            {/* Subtitle */}
            <p className="hero__subtitle">
            Precision cuts, premium products, and a culture built on craft — more than a barbershop, it’s a movement.
            </p>
            
            {/* CTA Buttons */}
            <div className="hero__cta-buttons">
              <button 
                className="hero__btn hero__btn--book"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/book-now');
                }}
              >
                Book Now 
              </button>
              <button 
                className="hero__btn hero__btn--shop"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/shop');
                }}
              >
                Shop Now
              </button>
            </div>
            
            {/* Social Links - Desktop */}
            <div className="hero__desktop-social-links">
              <a 
                href="https://www.instagram.com/clipculturebarbershop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Instagram"
              >
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                    repeatDelay: 2,
                  }}
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </motion.svg>
                Instagram
              </a>
              
              <a 
                href="https://www.facebook.com/clipculturebarbershop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Facebook"
              >
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                    delay: 2,
                    repeatDelay: 2,
                  }}
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </motion.svg>
                Facebook
              </a>
            </div>
          </div>
          
          {/* Mobile Book Now button - shown only at 600px */}
          <button 
            className="hero__btn hero__btn--book hero__mobile-book-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate('/book-now');
            }}
          >
            Book Now
          </button>
        </div>
        
        {/* Shop Now Section for 600px grid */}
        <div className="hero__shop-section">
          <button 
            className="hero__btn hero__btn--shop"
            onClick={(e) => {
              e.preventDefault();
              navigate('/shop');
            }}
          >
            Shop Now
          </button>
        </div>
        
        {/* Mobile Social Links Section - 600px */}
        <div className="hero__mobile-social-links">
          <a 
            href="https://www.instagram.com/clipculturebarbershop/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Follow us on Instagram"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              initial={{ y: 0 }}
              animate={isMobile600 ? { y: [0, -6, 0] } : { y: 0 }}
              transition={{
                duration: 1.3,
                repeat: isMobile600 ? Infinity : 0,
                repeatType: 'loop',
                ease: 'easeInOut',
                repeatDelay: isMobile600 ? 2 : 0,
              }}
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </motion.svg>
            Instagram
          </a>
          
          <a 
            href="https://www.facebook.com/clipculturebarbershop/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Follow us on Facebook"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              initial={{ y: 0 }}
              animate={isMobile600 ? { y: [0, -6, 0] } : { y: 0 }}
              transition={{
                duration: 1.3,
                repeat: isMobile600 ? Infinity : 0,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay: isMobile600 ? 2 : 0,
                repeatDelay: isMobile600 ? 2 : 0,
              }}
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </motion.svg>
            Facebook
          </a>
        </div>
        
        {/* Right side - Tagline, Social Proof */}
        <div
          className="hero__right"
          style={{ '--hero-right-bg': `url(${heroImageSplit})` }}
        >
          {/* Tagline */}
          <div className="hero__tagline">
            {/* Mobile splash overlay (<=600px) */}
            {isMobile600 && (
              <motion.div
                className="hero-logo-splash"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 3.7, ease: 'easeOut', delay: 0.5 }}
                onAnimationComplete={() => setShowTaglineAnim(true)}
              >
                <img
                  src={clipCultureLogo}
                  alt="Clip Culture Logo"
                  className="hero-logo-splash-image"
                />
              </motion.div>
            )}
            
            {isMobile600 ? (
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={showTaglineAnim ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
              >
                "Defining the Standard. <br/> 
                Shaping the Culture."
              </motion.h2>
            ) : (
              <h2>"Defining the Standard. <br/> 
              Shaping the Culture."</h2>
            )}
          </div>
          
          {/* Store Locations - visible only at 600px */}
          <div className="store_locations">
            <div 
              className="store-location-item"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const elementPosition = contactSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - 80;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                } else {
                  navigate('/#contact');
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={shopImage1} 
                alt="Sandy Springs Barbershop" 
                className="store-location-image"
              />
              <h3 className="store-location-name">
                <MapPin size={18} className="store-location-icon" />
                Sandy Springs
              </h3>
            </div>
            <div 
              className="store-location-item"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const elementPosition = contactSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - 80;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                } else {
                  navigate('/#contact');
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={shopImage2} 
                alt="Summerhill Barbershop" 
                className="store-location-image"
              />
              <h3 className="store-location-name">
                <MapPin size={18} className="store-location-icon" />
                Summerhill
              </h3>
            </div>
          </div>
          
          {/* Social Proof Section */}
          <div className="hero__social-proof">
            {socialProofItems.map(({ key, icon, number, label }) => (
              <div className="social-proof__item" key={key}>
                <div className="social-proof__icon">
                  {icon}
                </div>
                <div className="social-proof__content">
                  <div className="social-proof__number">{number}</div>
                  <div className="social-proof__label">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* Main Navbar - Shows when hero section is out of view */}
      {!showHeroNavbar && <Navbar />}

      {/* Shop by Category */}
      <ShopByCategory />

      {/* Top Products */}
      <TopProducts limit={6} />

      {/* Services Gallery */}
      {/* <HomeGallery/>  */}
      <div className="home-barbershop-gallery-wrapper">
        <BarbershopGallery />
      </div>
      {/* Barbershop Gallery */}
      {/* <BarbershopGallery /> */}

      {/* Testimonials */}
      <Testimonials />

      {/* Services Preview */}
      <section className="section section--light">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <p className="services-subtitle">Walk-ins are welcome!</p>
          <div className="services-divider"></div>
          <h2 className="services__section-title-main">* Service times are approximate and may vary by complexity *.</h2>
          <motion.div 
            className="services-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {services.slice(0, 6).map((service, index) => (
              <motion.div 
                key={service.id} 
                className="service-item"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + (index * 0.1),
                  ease: "easeOut"
                }}
                onClick={() => handleServiceClick(service)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{service.name}</h3>
                <div className="service-details">
                  <div className="service-price">${service.price}</div>
                  <div className="service-divider">|</div>
                  <div className="service-duration-pill">{service.durationMins} min <strong>*</strong></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn--secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <ServiceDetailModal 
        isOpen={showServiceModal}
        onClose={handleCloseServiceModal}
        service={selectedService}
      />

      {/* Home Welcome */}
      <Home_Welcome />

      {/* Professional Team */}
      <Professional_Team />

      {/* Facts */}
      <Facts />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;