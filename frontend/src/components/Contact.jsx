import { Phone } from 'lucide-react';
import AddressAction from './AddressAction.jsx';
import '../styles/contact.css';
import Shop1Image from '../assets/Contact/Shop_1.webp';
import Shop1ImageSmall from '../assets/Contact/Shop_1-720.webp';
import OwnerImage from '../assets/Contact/Owner.webp';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <h2 className="contact__title">Visit Our Shop</h2>
          <p className="contact__subtitle">Sandy Springs. One Standard of Excellence.</p>
          <p className="contact__walk-ins">Walk-ins are welcomed</p>
        </div>

        <div className="contact__images">
          <div className="contact__image-container">
            <img src={Shop1Image} srcSet={`${Shop1ImageSmall} 720w, ${Shop1Image} 1500w`} sizes="(max-width: 800px) 100vw, 50vw" alt="Sandy Springs Location" className="contact__image" loading="lazy" decoding="async" />
          </div>
          <div className="contact__image-container">
            <img src={OwnerImage} alt="Owner" className="contact__image" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="contact__grid">
          {/* Sandy Springs Location */}
          <div className="contact__column contact__column--sandy-springs">
            <div className="contact__location-header">
              <svg className="contact__title-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path className="contact__icon-accent" d="M19 52c-10 2-10 6 1 8 9 2 23 0 27-3 3-3-1-5-7-5" />
                <path d="M32 5C21 4 13 12 13 24c0 11 13 25 19 32 6-7 19-21 19-32C51 13 44 5 32 5Z" />
                <path d="M39 23c0 4-3 8-7 8s-8-3-8-7 3-8 7-8 8 3 8 7Z" />
                <path className="contact__icon-detail" d="M18 23c0-7 4-12 9-13M43 37l-8 11" />
              </svg>
              <h3 className="contact__location-title">Drop In</h3>
            </div>
            <div className="contact__location-info">
              <AddressAction className="contact__address">
                <span>6309 Roswell Road NE</span>
                <span className="contact__suite">Suite 2D</span>
                <span>Sandy Springs, GA 30328</span>
              </AddressAction>
            </div>
          </div>

          {/* Shop Hours */}
          <div className="contact__column contact__column--hours">
            <div className="contact__location-header">
              <svg className="contact__title-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M27 10V8a5 5 0 0 1 10 0v2M27 55v1a5 5 0 0 0 10 0v-1M23 16v33m18-33v33" />
                <path d="M22 10h20a3 3 0 0 1 0 6H22a3 3 0 0 1 0-6ZM22 49h20a3 3 0 0 1 0 6H22a3 3 0 0 1 0-6Z" />
                <path className="contact__icon-accent" d="m23 25 18-9m-18 27 18-9" />
                <path d="m23 32 18-9m-16 26 16-8" />
                <path className="contact__icon-detail" d="M26 19v3m0 13v4m18-21v29" />
              </svg>
              <h3 className="contact__location-title">Shop Hours</h3>
            </div>
            <div className="contact__hours">
              <div className="contact__hours-row">
                <span className="contact__day">
                  <span className="contact__day-short">Mon - Sat</span>
                  <span className="contact__day-full">Monday-Saturday</span>
                </span>
                <span className="contact__time">9 AM - 7 PM</span>
              </div>
              <div className="contact__hours-row">
                <span className="contact__day">Sunday</span>
                <span className="contact__time">12 PM - 4 PM</span>
              </div>
            </div>
            <div className="contact__phone-section">
              <a className="contact__phone" href="tel:+14044582993">
                <Phone size={16} className="contact__phone-icon" />
                (404)-458-2993
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Phone Section - Visible only at 600px */}
        <div className="contact__mobile-phone">
          <Phone size={20} className="contact__mobile-phone-icon" />
          <a className="contact__mobile-phone-number" href="tel:+14044582993">(404)-458-2993</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
