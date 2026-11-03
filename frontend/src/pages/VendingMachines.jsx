import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Handshake, MapPin } from 'lucide-react';
import { FaRegThumbsUp } from 'react-icons/fa6';
import BicepIcon from '../components/icons/BicepIcon.jsx';
import JoinUs from '../components/JoinUs.jsx';
import { submitFormWithAttachments } from '../services/formSubmissionService';
import ShopImage from '../assets/Contact/Shop_1.webp';
import '../styles/vending-machines.css';

const VendingMachines = () => {
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
      await submitFormWithAttachments('Vending Machine Space Inquiry', data);
      form.reset();
      setSubmitted(true);
    } catch (submissionError) {
      console.error('Vending machine inquiry failed:', submissionError);
      setError('We could not send your inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="vending-page">
      <section className="vending-hero" id="hero" aria-labelledby="vending-title">
        <div className="vending-hero-copy" data-scroll-reveal="vending-copy">
          <span className="vending-eyebrow">Vending partnerships <span aria-hidden="true">/</span> Sandy Springs</span>
          <h1 id="vending-title">Put your brand<br /><em>in the room.</em></h1>
          <div className="vending-hero-stat" aria-label="Over 1,600 clients visit each month">
            <strong>1,600<span>+</span></strong>
            <span>clients visit<br />each month</span>
          </div>
          <p>Make your products part of the Clip Culture experience. We are exploring space for vending machines inside our Sandy Springs barbershop, where clients spend time before, during, and after appointments.</p>
          <div className="vending-hero-actions">
            <a className="vending-primary-link" href="#vending-inquiry">Ask about a space <ArrowUpRight size={19} aria-hidden="true" /></a>
            <span className="vending-location"><MapPin size={16} aria-hidden="true" /> Sandy Springs, Georgia</span>
          </div>
        </div>
        <div className="vending-hero-media" data-scroll-reveal="vending-photo">
          <img src={ShopImage} alt="Inside Clip Culture Barbershop, with a vending machine beside the barber stations" />
          <span className="vending-image-caption">THE SPACE · CLIP CULTURE BARBERSHOP</span>
        </div>
      </section>

      {/* Monthly visits are cited on Advertise; the other figures match Home and About. */}
      <section className="vending-proof" aria-label="Clip Culture customer figures">
        <div className="vending-proof-inner">
          <div className="vending-proof-intro" data-scroll-reveal="vending-copy"><span className="vending-eyebrow">The audience</span><p>A local shop with a history of bringing people through its doors.</p></div>
          <div className="vending-proof-item" data-scroll-reveal="vending-count"><span className="vending-proof-icon"><Handshake size={30} aria-hidden="true" /></span><span className="vending-proof-content"><strong>155K+</strong><span>clients served</span></span></div>
          <div className="vending-proof-item" data-scroll-reveal="vending-count"><span className="vending-proof-icon"><FaRegThumbsUp size={30} aria-hidden="true" /></span><span className="vending-proof-content"><strong>94%</strong><span>client satisfaction</span></span></div>
          <div className="vending-proof-item" data-scroll-reveal="vending-count"><span className="vending-proof-icon"><BicepIcon size={30} /></span><span className="vending-proof-content"><strong>9+</strong><span>years strong</span></span></div>
        </div>
      </section>

      <section className="vending-opportunity" aria-labelledby="vending-opportunity-title">
        <div className="vending-section-heading" data-scroll-reveal="vending-copy">
          <span className="vending-eyebrow">Why this space</span>
          <h2 id="vending-opportunity-title">A familiar place.<br /><em>A new way to shop.</em></h2>
          <p>Clients already come to Clip Culture for their grooming. A well-placed machine could make your products easy to discover during a visit. Placement and product fit are discussed with each owner.</p>
        </div>
        <div className="vending-benefits">
          <article data-scroll-reveal="vending-card">
            <span>01 / THE VISIT</span>
            <h3>Be where customers spend time.</h3>
            <p>Give clients and guests a chance to see your products while they are in the shop.</p>
          </article>
          <article data-scroll-reveal="vending-card">
            <span>02 / THE FIT</span>
            <h3>Bring your own point of view.</h3>
            <p>Tell us what your machine sells and how it fits a space built around style, self-care, and community.</p>
          </article>
          <article data-scroll-reveal="vending-card">
            <span>03 / THE DETAILS</span>
            <h3>Find the right place together.</h3>
            <p>Share your machine's footprint and power needs so we can talk through placement.</p>
          </article>
        </div>
      </section>

      <section className="vending-inquiry" id="vending-inquiry" aria-labelledby="vending-inquiry-title">
        <div className="vending-inquiry-copy" data-scroll-reveal="vending-copy">
          <span className="vending-eyebrow">Your next step</span>
          <h2 id="vending-inquiry-title">Let's make room<br />for your brand.</h2>
          <p>Tell us what you sell and what your machine needs. We will follow up to discuss the space and whether it is a good fit.</p>
          <ArrowDownRight className="vending-inquiry-arrow" size={70} strokeWidth={1} aria-hidden="true" />
        </div>
        <div className="vending-form-panel" data-scroll-reveal="vending-photo">
          {submitted ? (
            <div className="vending-form-success" role="status">
              <span>Inquiry received</span>
              <h3>Thanks for reaching out.</h3>
              <p>We have your details and will be in touch about the vending space.</p>
              <button type="button" onClick={() => setSubmitted(false)}>Send another inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Tell us about your machine</h3>
              <p className="vending-form-intro">Fields marked * are required.</p>
              <div className="vending-form-grid">
                <label>Full name *<input name="fullName" type="text" autoComplete="name" required /></label>
                <label>Email address *<input name="email" type="email" autoComplete="email" required /></label>
                <label>Phone number *<input name="phone" type="tel" autoComplete="tel" required /></label>
                <label>Business name *<input name="businessName" type="text" autoComplete="organization" required /></label>
                <label className="vending-form-wide">What products would the machine sell? *<input name="products" type="text" required /></label>
                <label className="vending-form-wide">Machine size or other details<textarea name="machineDetails" rows="4" placeholder="Approximate width, depth, power needs, or anything else we should know" /></label>
              </div>
              {error && <p className="vending-form-error" role="alert">{error}</p>}
              <button className="vending-submit" type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send inquiry'} <ArrowUpRight size={18} aria-hidden="true" /></button>
            </form>
          )}
        </div>
      </section>
      <JoinUs />
    </div>
  );
};

export default VendingMachines;
