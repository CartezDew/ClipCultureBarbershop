import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServicesGallery from '../components/ServicesGallery.jsx';
import '../styles/services.css';

const Services = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const location = useLocation();

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
      if (!el) {
        console.log('Element not found:', targetId);
        return;
      }

      // Get the element's position
      const elementPosition = el.getBoundingClientRect().top;
      const offset = 55;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      console.log('Scrolling to:', targetId, 'offset:', offsetPosition, 'elementTop:', elementPosition);

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

  const regularServices = [
    { name: 'Basic Haircut', price: 20, duration: '30 min <strong>*</strong>' },
    { name: 'Basic Haircut + Beard', price: 28, duration: '35 min <strong>*</strong>' },
    { name: 'Basic Haircut + Eyebrows', price: 35, duration: '35 min <strong>*</strong>' },
    { name: 'Basic Haircut + Eyebrows + Beard', price: 38, duration: '45 min <strong>*</strong>' },
    { name: 'Basic Lineup', price: 20, duration: '20 min <strong>*</strong>' },
    { name: 'Basic Lineup + Beard', price: 25, duration: '30 min <strong>*</strong>' },
    { name: 'Bald Fade', price: 35, duration: '25 min <strong>*</strong>' },
    { name: 'Bald Fade + Beard', price: 35, duration: '30 min <strong>*</strong>' },
    { name: 'Bald Fade + Beard + Enhancements', price: 40, duration: '40 min <strong>*</strong>' },
    { name: 'Taper Fade + Beard', price: 35, duration: '35 min <strong>*</strong>' },
    { name: 'Taper Fade + Twist Sponge', price: 38, duration: '30 min <strong>*</strong>' },
    { name: 'Drop Fade', price: 35, duration: '25 min <strong>*</strong>' },
    { name: 'Dark Caesar/Low Caesar', price: 35, duration: '25 min <strong>*</strong>' },
    { name: 'Beard Trim', price: 20, duration: '20 min <strong>*</strong>' },
    { name: 'Hot Towel Shave', price: 20, duration: '20 min <strong>*</strong>' },
    { name: 'Blow-Out', price: 35, duration: '40 min <strong>*</strong>' }
  ];

  const addOnServices = [
    { name: 'Eyebrows', price: 12, duration: '15 min <strong>*</strong>' },
    { name: 'Designs', price: 10, duration: '15 min <strong>*</strong>' },
    { name: 'Shampoo Service', price: 8, duration: '10 min <strong>*</strong>' }
  ];

  const specialtyServices = [
    { name: 'Child Haircut (10 and under)', price: 25, duration: '25 min <strong>*</strong>', category: 'Children' },
    { name: 'Child Haircut + Designs', price: 30, duration: '30 min <strong>*</strong>', category: 'Children' },
    { name: 'Women\'s Haircut + Designs', price: 35, duration: '30 min <strong>*</strong>', category: 'Women' },
    { name: 'Women\'s Undercut (only)', price: 25, duration: '25 min <strong>*</strong>', category: 'Women' },
    { name: 'Senior Citizen Haircut (62+)', price: 30, duration: '30 min <strong>*</strong>', category: 'Seniors' }
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
        <ServicesGallery />

        <div className="services-container-main">
          {/* Regular Services */}
          <h2 className="services__section-title-main">* Service times are approximate and may vary by complexity *.</h2>
          <div className="services__section">
            <div className={`services__grid ${isAnimated ? 'animate' : ''}`}>
              {regularServices.map((service, index) => (
                <div 
                  key={index} 
                  className={`services__card ${isAnimated ? 'card-animate-in' : ''}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateX(0)' : 'translateX(-50px)'
                  }}
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
                  key={index} 
                  className={`services__card services__card--specialty ${isAnimated ? 'card-animate-in' : ''}`}
                  style={{
                    animationDelay: `${(index + 19) * 0.1}s`,
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateX(0)' : 'translateX(-50px)'
                  }}
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
                  key={index} 
                  className={`services__card services__card--addon ${isAnimated ? 'card-animate-in' : ''}`}
                  style={{
                    animationDelay: `${(index + 16) * 0.1}s`,
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateX(0)' : 'translateX(-50px)'
                  }}
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
              onClick={() => window.location.href = '/contact'}
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
    </div>
  );
};

export default Services;
