import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServicesGallery from '../components/ServicesGallery.jsx';
import BarbershopGallery from '../components/Barbershop_Gallery.jsx';
import ServiceDetailModal from '../components/ServiceDetailModal.jsx';
import '../styles/services.css';

const Services = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to anchors when arriving on this page with a hash (e.g., /services#specialty-services)
  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');

    const scrollWithOffset = () => {
      const el = document.getElementById(targetId);
      if (!el) return;

      // Get the element's position
      const elementPosition = el.getBoundingClientRect().top;
      const offset = 55;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };

    // Wait for images and content to load before scrolling
    const handleLoad = () => {
      setTimeout(scrollWithOffset, 100);
    };

    if (document.readyState === 'complete') {
      setTimeout(scrollWithOffset, 300);
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    const timeoutId = setTimeout(scrollWithOffset, 1000);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, [location.hash]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleCloseServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };

  const regularServices = [
    { id: 'basic-haircut', name: 'Basic Haircut', price: 20, duration: '30 mins <strong>*</strong>', description: "A classic, precision haircut tailored to your style. Includes consultation and styling." },
    { id: 'basic-haircut-beard', name: 'Basic Haircut + Beard', price: 28, duration: '35 min <strong>*</strong>', description: "Full haircut service combined with professional beard grooming and shaping." },
    { id: 'basic-haircut-eyebrows', name: 'Basic Haircut + Eyebrows', price: 35, duration: '35 min <strong>*</strong>', description: "Complete look with a haircut and expert eyebrow shaping." },
    { id: 'basic-haircut-eyebrows-beard', name: 'Basic Haircut + Eyebrows + Beard', price: 38, duration: '45 min <strong>*</strong>', description: "The full package: haircut, beard grooming, and eyebrow shaping for a polished appearance." },
    { id: 'basic-lineup', name: 'Basic Lineup', price: 20, duration: '20 min <strong>*</strong>', description: "Crisp edging of the hairline to keep you looking sharp between full cuts." },
    { id: 'basic-lineup-beard', name: 'Basic Lineup + Beard', price: 25, duration: '30 min <strong>*</strong>', description: "Lineup service including detailed beard edging and maintenance." },
    { id: 'bald-fade', name: 'Bald Fade', price: 35, duration: '25 min <strong>*</strong>', description: "Smooth skin fade blending seamlessly into your desired length on top." },
    { id: 'bald-fade-beard', name: 'Bald Fade + Beard', price: 35, duration: '30 min <strong>*</strong>', description: "Bald fade combined with expert beard grooming." },
    { id: 'bald-fade-beard-enhancements', name: 'Bald Fade + Beard + Enhancements', price: 40, duration: '40 min <strong>*</strong>', description: "Bald fade and beard service with color enhancements for a sharper, fuller look." },
    { id: 'taper-fade-beard', name: 'Taper Fade + Beard', price: 35, duration: '35 min <strong>*</strong>', description: "Stylish taper fade on the sides/neck combined with beard grooming." },
    { id: 'taper-fade-twist-sponge', name: 'Taper Fade + Twist Sponge', price: 38, duration: '30 min <strong>*</strong>', description: "Taper fade with twist sponge styling for textured hair." },
    { id: 'drop-fade', name: 'Drop Fade', price: 35, duration: '25 min <strong>*</strong>', description: "A fade that arcs down behind the ear, following the shape of the head." },
    { id: 'dark-caesar', name: 'Dark Caesar/Low Caesar', price: 35, duration: '25 min <strong>*</strong>', description: "Classic Caesar cut, kept dark/low for a clean, traditional look." },
    { id: 'beard-trim', name: 'Beard Trim', price: 20, duration: '20 min <strong>*</strong>', description: "Professional trimming and shaping to maintain your beard's health and style." },
    { id: 'hot-towel-shave', name: 'Hot Towel Shave', price: 20, duration: '20 min <strong>*</strong>', description: "Luxurious straight razor shave with hot towel treatment." },
    { id: 'blow-out', name: 'Blow-Out', price: 35, duration: '40 min <strong>*</strong>', description: "Taper fade that keeps length on the sides and top, styled for volume." }
  ];

  const addOnServices = [
    { id: 'eyebrows', name: 'Eyebrows', price: 12, duration: '15 min <strong>*</strong>', description: "Professional eyebrow shaping and cleanup." },
    { id: 'designs', name: 'Designs', price: 10, duration: '15 min <strong>*</strong>', description: "Custom hair designs and graphics added to your cut." },
    { id: 'shampoo-service', name: 'Shampoo Service', price: 8, duration: '10 min <strong>*</strong>', description: "Relaxing hair wash and conditioning service." }
  ];

  const specialtyServices = [
    { id: 'child-haircut', name: 'Child Haircut (10 and under)', price: 25, duration: '25 min <strong>*</strong>', category: 'Children', description: "Patient and gentle haircut service for children 10 and under." },
    { id: 'child-haircut-designs', name: 'Child Haircut + Designs', price: 30, duration: '30 min <strong>*</strong>', category: 'Children', description: "Kids haircut with a cool custom design." },
    { id: 'womens-haircut-designs', name: "Women's Haircut + Designs", price: 35, duration: '30 min <strong>*</strong>', category: 'Women', description: "Stylish cuts and designs tailored for women." },
    { id: 'womens-undercut', name: "Women's Undercut (only)", price: 25, duration: '25 min <strong>*</strong>', category: 'Women', description: "Maintenance for shaved sides/back/undercut styles." },
    { id: 'senior-citizen-haircut', name: 'Senior Citizen Haircut (62+)', price: 30, duration: '30 min <strong>*</strong>', category: 'Seniors', description: "Discounted haircut service for seniors aged 62 and up." }
  ];

  return (
    <div>
      <section className="section section--light">
        <div className="services-container">
          <div className={`services__header ${isAnimated ? 'animate' : ''}`}>
            <h1 className="services__title">Our Services</h1>
            <p className="services__subtitle">Walk-ins are welcome!</p>
            <div className="services-divider"></div>
          </div>
        </div>

        {/* Services Gallery Component - Outside container for full width */}
        {/* <ServicesGallery /> */}
        <div className="services-gallery-wrapper"> 
          <BarbershopGallery />
        </div>

        <div className="services-container-main">
          {/* Regular Services */}
          <h2 className="services__section-title-main">* Service times are approximate and may vary by complexity *.</h2>
          <div className="services__section">
            <div className={`services__grid ${isAnimated ? 'animate' : ''}`}>
              {regularServices.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`services__card ${isAnimated ? 'card-animate-in' : ''}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateX(0)' : 'translateX(-50px)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleServiceClick(service)}
                >
                  <h3 className="services__card-title">{service.name}</h3>
                  <div className="services__card-details">
                    <div className="services__card-price">${service.price}</div>
                    <div className="services__card-divider">|</div>
                    <div className="services__card-duration-pill" dangerouslySetInnerHTML={{ __html: service.duration }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialty Services */}
          <div className="services__section">
            <h2 id="specialty-services" className="services__section-title">Specialty Services</h2>
            <div className="services-divider"></div>
            <div className={`services__grid ${isAnimated ? 'animate' : ''}`}>
              {specialtyServices.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`services__card services__card--specialty ${isAnimated ? 'card-animate-in' : ''}`}
                  style={{
                    animationDelay: `${(index + 19) * 0.1}s`,
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateX(0)' : 'translateX(-50px)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleServiceClick(service)}
                >
                  <h3 className="services__card-title">{service.name}</h3>
                  <div className="services__card-category">{service.category}</div>
                  <div className="services__card-details">
                    <div className="services__card-price">${service.price}</div>
                    <div className="services__card-divider">|</div>
                    <div className="services__card-duration-pill" dangerouslySetInnerHTML={{ __html: service.duration }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>  

          {/* Add-on Services */}
          <div className="services__section">
            <h2 className="services__section-title">Add-on Services</h2>
            <div className="services-divider"></div>
            <div className={`services__grid services__grid--addons ${isAnimated ? 'animate' : ''}`}>
              {addOnServices.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`services__card services__card--addon ${isAnimated ? 'card-animate-in' : ''}`}
                  style={{
                    animationDelay: `${(index + 16) * 0.1}s`,
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateX(0)' : 'translateX(-50px)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleServiceClick(service)}
                >
                  <h3 className="services__card-title">{service.name}</h3>
                  <div className="services__card-details">
                    <div className="services__card-price">${service.price}</div>
                    <div className="services__card-divider">|</div>
                    <div className="services__card-duration-pill" dangerouslySetInnerHTML={{ __html: service.duration }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="services__cta">
            <motion.button 
              className="btn-book-now" 
              onClick={() => navigate('/book-now')}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: "linear-gradient(135deg,rgb(5, 61, 90) 0%,rgb(77, 172, 161) 50%, #085078 100%)",
                backgroundSize: "200% 200%"
              }}
            >
              Book Your Service
            </motion.button>
          </div>
        </div>
      </section>

      <ServiceDetailModal 
        isOpen={showServiceModal}
        onClose={handleCloseServiceModal}
        service={selectedService}
      />
    </div>
  );
};

export default Services;
