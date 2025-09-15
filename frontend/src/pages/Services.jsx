import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/services.css';

const Services = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const regularServices = [
    { name: 'Basic Haircut', price: 20, duration: '30 min (approx.)' },
    { name: 'Basic Haircut + Beard', price: 28, duration: '35 min (approx.)' },
    { name: 'Basic Haircut + Eyebrows', price: 35, duration: '35 min (approx.)' },
    { name: 'Basic Haircut + Eyebrows + Beard', price: 38, duration: '45 min (approx.)' },
    { name: 'Basic Lineup', price: 20, duration: '20 min (approx.)' },
    { name: 'Basic Lineup + Beard', price: 25, duration: '30 min (approx.)' },
    { name: 'Bald Fade', price: 35, duration: '25 min (approx.)' },
    { name: 'Bald Fade + Beard', price: 35, duration: '30 min (approx.)' },
    { name: 'Bald Fade + Beard + Enhancements', price: 40, duration: '40 min (approx.)' },
    { name: 'Taper Fade + Beard', price: 35, duration: '35 min (approx.)' },
    { name: 'Taper Fade + Twist Sponge', price: 38, duration: '30 min (approx.)' },
    { name: 'Drop Fade', price: 35, duration: '25 min (approx.)' },
    { name: 'Dark Caesar/Low Caesar', price: 35, duration: '25 min (approx.)' },
    { name: 'Beard Trim', price: 20, duration: '20 min (approx.)' },
    { name: 'Hot Towel Shave', price: 20, duration: '20 min (approx.)' },
    { name: 'Blow-Out', price: 35, duration: '40 min (approx.)' }
  ];

  const addOnServices = [
    { name: 'Eyebrows', price: 12, duration: '15 min (approx.)' },
    { name: 'Designs', price: 10, duration: '15 min (approx.)' },
    { name: 'Shampoo Service', price: 8, duration: '10 min (approx.)' }
  ];

  const specialtyServices = [
    { name: 'Child Haircut (10 and under)', price: 25, duration: '25 min (approx.)', category: 'Children' },
    { name: 'Child Haircut + Designs', price: 30, duration: '30 min (approx.)', category: 'Children' },
    { name: 'Women\'s Haircut + Designs', price: 35, duration: '30 min (approx.)', category: 'Women' },
    { name: 'Women\'s Undercut (only)', price: 25, duration: '25 min (approx.)', category: 'Women' },
    { name: 'Senior Citizen Haircut (62+)', price: 30, duration: '30 min (approx.)', category: 'Seniors' }
  ];

  return (
    <div>
      <section className="section section--light">
        <div className="container">
          <div className={`services__header ${isAnimated ? 'animate' : ''}`}>
            <h1 className="services__title">Our Services</h1>
            <p className="services__subtitle">Walk-ins are welcome!</p>
            <div className="services-divider"></div>
          </div>

          {/* Regular Services */}
          <div className="services__section">
            <h2 className="services__section-title">Haircuts & Styling</h2>
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
                    <div className="services__card-duration-pill">{service.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add-on Services */}
          <div className="services__section">
            <h2 className="services__section-title">Add-on Services</h2>
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
                    <div className="services__card-duration-pill">{service.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialty Services */}
          <div className="services__section">
            <h2 className="services__section-title">Specialty Services</h2>
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
                    <div className="services__card-duration-pill">{service.duration}</div>
                  </div>
                </div>
              ))}
              {/* Add empty cards to fill the 3x2 grid */}
              <div className="services__card services__card--empty"></div>
            </div>
          </div>

          <div className="services__cta">
            <Link to="/contact" className="btn btn--primary btn--large">
              Book Your Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
