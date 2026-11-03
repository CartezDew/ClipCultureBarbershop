import { Link } from 'react-router-dom';
import Facts from '../components/facts.jsx';
import '../styles/faqs-page.css';

export default function FAQs() {
  return (
    <div className="faqs-page">
      <header className="faqs-page__header">
        <span>BEFORE YOUR VISIT</span>
        <h1>Questions? We’ve got you.</h1>
        <p>Find the answers to common questions about appointments at our Sandy Springs barbershop.</p>
      </header>
      <Facts />
      <div className="faqs-page__cta">
        <p>Ready to visit Clip Culture?</p>
        <Link to="/book-now">Book an appointment</Link>
      </div>
    </div>
  );
}
