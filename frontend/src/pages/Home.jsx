import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices, getBarbers } from '../lib/mockApi.js';
import { CONTACT_INFO } from '../lib/constants.js';
import HeroNavbar from '../components/HeroNavbar.jsx';
import Navbar from '../components/Navbar.jsx';
import BookingForm from '../components/BookingForm.jsx';
import TopProducts from '../components/TopProducts.jsx';
import { Handshake, MapPin, Building2 } from 'lucide-react';
import { FaRegThumbsUp } from "react-icons/fa6";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";
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

const Home = () => {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [showHeroNavbar, setShowHeroNavbar] = useState(true);

  useEffect(() => {
    getServices().then(setServices);
    getBarbers().then(setBarbers);
  }, []);

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

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        {/* Hero Navbar - Fixed at top of hero section */}
        {showHeroNavbar && <HeroNavbar />}
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
        
        {/* Left side - Booking form */}
        <div className="hero__left">
          <BookingForm />
        </div>
        
        {/* Right side - Tagline and Social Proof */}
        <div className="hero__right">
          {/* Tagline */}
          <div className="hero__tagline">
            <h2>"Defining the Standard. <br/> 
            Shaping the Culture."</h2>
            {/* <p>"Defining the Standard. Shaping the Culture."
            More than a barbershop, Clip Culture is a movement—leading the industry, elevating 
            the craft, and inspiring the future.
            </p> */}
          </div>
          
          {/* Social Proof Section */}
          <div className="hero__social-proof">
            <div className="social-proof__item">
              <div className="social-proof__icon">
                <Handshake size={24} />
              </div>
              <div className="social-proof__content">
                <div className="social-proof__number">135K+</div>
                <div className="social-proof__label">Clients Served</div>
              </div>
            </div>
        <div className="social-proof__item">
          <div className="social-proof__icon">
            <FaRegThumbsUp size={24} />
          </div>
          <div className="social-proof__content">
            <div className="social-proof__number">94%</div>
            <div className="social-proof__label">Client Satisfaction</div>
          </div>
        </div>
            <div className="social-proof__item">
              <div className="social-proof__icon">
                <BicepIcon size={24} />
              </div>
              <div className="social-proof__content">
                <div className="social-proof__number">7+</div>
                <div className="social-proof__label">Years Strong</div>
              </div>
            </div>
            <div className="social-proof__item">
              <div className="social-proof__icon">
                <PiMapPinSimpleAreaBold size={24} />
              </div>
              <div className="social-proof__content">
                <div className="social-proof__number">2</div>
                <div className="social-proof__label">Culture Hubs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navbar - Shows when hero section is out of view */}
      {!showHeroNavbar && <Navbar />}

      {/* Top Products */}
      <TopProducts />

      {/* Services Preview */}
      <section className="section section--light">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="grid grid--3">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="card">
                <h3>{service.name}</h3>
                <p className="mb-2">{service.description}</p>
                <p><strong>${service.price}</strong> • {service.durationMins} mins</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn--secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section section--dark">
        <div className="container">
          <h2 className="text-center mb-4">Meet Our Barbers</h2>
          <div className="grid grid--3">
            {barbers.slice(0, 3).map((barber) => (
              <div key={barber.id} className="card">
                <h3>{barber.name}</h3>
                <p className="mb-2"><strong>{barber.specialty}</strong></p>
                <p className="mb-2">{barber.experience}</p>
                <p>{barber.bio}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/team" className="btn btn--secondary">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section section--light">
        <div className="container">
          <div className="grid grid--2">
            <div>
              <h2>Visit Us</h2>
              <p className="mb-2">{CONTACT_INFO.address}</p>
              <p className="mb-2">{CONTACT_INFO.phone}</p>
              <p className="mb-4">{CONTACT_INFO.hours}</p>
              <Link to="/contact" className="btn btn--primary">
                Get Directions
              </Link>
            </div>
            <div>
              <h2>Book Your Cut</h2>
              <p className="mb-4">
                Walk-ins welcome, but we recommend booking ahead to secure your preferred time slot.
              </p>
              <Link to="/contact" className="btn btn--primary">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
