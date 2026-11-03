import { Link } from 'react-router-dom';
import { MapPin, Clock3, Phone, ArrowUpRight } from 'lucide-react';
import AddressAction from '../components/AddressAction.jsx';
import shopImage from '../assets/Contact/Shop_1.webp';
import shopImageSmall from '../assets/Contact/Shop_1-720.webp';
import '../styles/sandy-springs.css';

export default function SandySprings() {
  return (
    <div className="sandy-page">
      <section className="sandy-hero">
        <div className="sandy-hero__copy">
          <span className="sandy-eyebrow">THE SHOP / SANDY SPRINGS</span>
          <h1>Clip Culture Barbershop in <em>Sandy Springs.</em></h1>
          <p>Precision cuts, beard grooming, and a welcoming place to be part of the culture. Visit us on Roswell Road or book your next appointment.</p>
          <div className="sandy-hero__actions">
            <Link className="sandy-button sandy-button--primary" to="/book-now">Book Now <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link className="sandy-button sandy-button--secondary" to="/services">Explore Services</Link>
          </div>
          <span className="sandy-walkins">Walk-ins are welcome</span>
        </div>
        <img className="sandy-hero__image" src={shopImage} srcSet={`${shopImageSmall} 720w, ${shopImage} 1500w`} sizes="(max-width: 800px) 100vw, 50vw" alt="Interior of Clip Culture Barbershop in Sandy Springs" fetchPriority="high" />
      </section>

      <section className="sandy-details" aria-label="Visit Clip Culture">
        <div className="sandy-details__item">
          <MapPin size={26} aria-hidden="true" />
          <h2>Find us</h2>
          <AddressAction />
          <a href="https://www.google.com/maps/search/?api=1&query=6309+Roswell+Road+NE+%232D+Sandy+Springs+GA+30328" target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="sandy-details__item">
          <Clock3 size={26} aria-hidden="true" />
          <h2>Shop hours</h2>
          <p>Monday–Saturday: 9 AM–7 PM<br />Sunday: 12 PM–4 PM</p>
        </div>
        <div className="sandy-details__item">
          <Phone size={26} aria-hidden="true" />
          <h2>Call the shop</h2>
          <p><a href="tel:+14044582993">(404) 458-2993</a></p>
          <p>Questions before your visit? We’re happy to help.</p>
        </div>
      </section>

      <section className="sandy-next">
        <span className="sandy-eyebrow">BEYOND THE CHAIR</span>
        <h2>Find your next look.</h2>
        <p>Browse our haircuts, fades, beard services, and specialty grooming, then choose a time that works for you.</p>
        <Link className="sandy-button sandy-button--primary" to="/services">See Services <ArrowUpRight size={18} aria-hidden="true" /></Link>
        <Link className="sandy-next__faq" to="/faqs">Questions before your visit? Read our FAQs</Link>
      </section>
    </div>
  );
}
