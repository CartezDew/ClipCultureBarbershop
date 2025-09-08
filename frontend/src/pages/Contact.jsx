import { CONTACT_INFO } from '../lib/constants.js';
import '../styles/contact.css';

const Contact = () => {
  return (
    <div>
      <section className="section section--light">
        <div className="container">
          <h1 className="text-center mb-4">Contact Us</h1>
          
          <div className="grid grid--2">
            <div>
              <h2>Visit Our Shop</h2>
              <div className="card">
                <p className="mb-2"><strong>Address:</strong></p>
                <p className="mb-3">{CONTACT_INFO.address}</p>
                
                <p className="mb-2"><strong>Phone:</strong></p>
                <p className="mb-3">{CONTACT_INFO.phone}</p>
                
                <p className="mb-2"><strong>Email:</strong></p>
                <p className="mb-3">{CONTACT_INFO.email}</p>
                
                <p className="mb-2"><strong>Hours:</strong></p>
                <p className="mb-3">{CONTACT_INFO.hours}</p>
                <p className="mb-3">Closed Sunday & Monday</p>
              </div>
            </div>
            
            <div>
              <h2>Book Your Appointment</h2>
              <div className="card">
                <p className="mb-3">
                  Walk-ins are welcome, but we recommend booking ahead to secure your preferred time slot.
                </p>
                
                <div className="mb-3">
                  <a 
                    href={`tel:${CONTACT_INFO.phone}`} 
                    className="btn btn--primary contact__call-button"
                  >
                    Call Now
                  </a>
                  <a 
                    href={`mailto:${CONTACT_INFO.email}`} 
                    className="btn btn--secondary"
                  >
                    Email Us
                  </a>
                </div>
                
                <div className="contact__map-placeholder">
                  Map Placeholder
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <h2>Follow Us</h2>
            <div className="contact__social-links">
              <a 
                href={CONTACT_INFO.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn--secondary"
              >
                Instagram
              </a>
              <a 
                href={CONTACT_INFO.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn--secondary"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
