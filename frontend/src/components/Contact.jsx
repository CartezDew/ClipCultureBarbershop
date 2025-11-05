import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import '../styles/contact.css';
import Shop1Image from '../assets/Contact/Shop_1.webp';
import Shop2Image from '../assets/Contact/Shop_2.webp';
import OwnerImage from '../assets/Contact/Owner.webp';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <h2 className="contact__title">Visit Our Locations</h2>
          <p className="contact__subtitle">Two Culture Hubs. One Standard of Excellence.</p>
          <p className="contact__walk-ins">Walk-ins welcomed</p>
        </div>

        <div className="contact__images">
          <div className="contact__image-container">
            <img src={Shop1Image} alt="Sandy Springs Location" className="contact__image" />
          </div>
          <div className="contact__image-container">
            <img src={Shop2Image} alt="Summerhill Location" className="contact__image" />
          </div>
          <div className="contact__image-container">
            <img src={OwnerImage} alt="Owner" className="contact__image" />
          </div>
        </div>

        <div className="contact__grid">
          {/* Sandy Springs Location */}
          <div className="contact__column contact__column--sandy-springs">
            <div className="contact__location-header">
              <h3 className="contact__location-title">Sandy Springs</h3>
            </div>
            <div className="contact__location-info">
              <p className="contact__address">6309 Roswell Road NE #2D</p>
              <p className="contact__city">Sandy Springs, GA 30328</p>
            </div>
            <Link to="/contact" className="contact__btn contact__btn--sandy-springs">
              Book Now
            </Link>
          </div>

          {/* Summerhill Location */}
          <div className="contact__column contact__column--summerhill">
            <div className="contact__location-header">
              <h3 className="contact__location-title">Summerhill</h3>
            </div>
            <div className="contact__location-info">
              <p className="contact__address">572 Hank Aaron Dr Suite 1120</p>
              <p className="contact__city">Atlanta, GA 30312</p>
            </div>
            <Link to="/contact" className="contact__btn contact__btn--summerhill">
              Book Now
            </Link>
          </div>

          {/* Shop Hours */}
          <div className="contact__column contact__column--hours">
            <div className="contact__location-header">
              <h3 className="contact__location-title">Shop Hours</h3>
            </div>
            <div className="contact__hours">
              <div className="contact__hours-row">
                <span className="contact__day">Mon - Sat</span>
                <span className="contact__time">9 AM - 7 PM</span>
              </div>
              <div className="contact__hours-row">
                <span className="contact__day">Sunday</span>
                <span className="contact__time">12 PM - 4 PM</span>
              </div>
            </div>
            <div className="contact__phone-section">
              <p className="contact__phone">
                <Phone size={16} className="contact__phone-icon" />
                (404)-458-2993
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
