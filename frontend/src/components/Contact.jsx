import { useState } from 'react';
import { Phone } from 'lucide-react';
import AddressAction from './AddressAction.jsx';
import ClipCultureFormResponse from './ClipCultureFormResponse.jsx';
import { submitFormWithAttachments } from '../services/formSubmissionService.js';
import '../styles/contact.css';
import Shop1Image from '../assets/Contact/Shop_1.webp';
import Shop1ImageSmall from '../assets/Contact/Shop_1-720.webp';
import OwnerImage from '../assets/Contact/Owner.webp';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setSubmitting(true);
    setError('');
    try {
      await submitFormWithAttachments('Contact Us', data);
      form.reset();
      setSubmitted(true);
    } catch {
      setError('We could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
              <h3 className="contact__location-title">Sandy Springs</h3>
            </div>
            <div className="contact__location-info">
              <AddressAction className="contact__address" />
            </div>
          </div>

          {/* Shop Hours */}
          <div className="contact__column contact__column--hours">
            <div className="contact__location-header">
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

        <div className="contact__form-card">
          {submitted ? (
            <>
              <ClipCultureFormResponse formName="Contact Us" />
              <button className="contact__form-reset" type="button" onClick={() => setSubmitted(false)}>Send another message</button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Send us a message</h3>
              <p>Tell us what you need. Our team will be in touch within 48 hours.</p>
              <div className="contact__form-fields">
                <label>Full name<input name="fullName" type="text" autoComplete="name" required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
                <label className="contact__form-message">Message<textarea name="message" rows="4" required /></label>
              </div>
              {error && <p className="contact__form-error" role="alert">{error}</p>}
              <button className="contact__form-submit" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send message'}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
