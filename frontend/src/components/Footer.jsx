import { CONTACT_INFO } from '../lib/constants.js';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3>ClipCulture</h3>
            <p>Modern cuts and premium grooming for the discerning gentleman.</p>
          </div>
          
          <div className="footer__section">
            <h3>Contact</h3>
            <p>{CONTACT_INFO.address}</p>
            <p>{CONTACT_INFO.phone}</p>
            <p>{CONTACT_INFO.email}</p>
          </div>
          
          <div className="footer__section">
            <h3>Hours</h3>
            <p>{CONTACT_INFO.hours}</p>
            <p>Closed Sunday & Monday</p>
          </div>
          
          <div className="footer__section">
            <h3>Follow Us</h3>
            <p>
              <a href={CONTACT_INFO.social.instagram} target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none' }}>
                Instagram
              </a>
            </p>
            <p>
              <a href={CONTACT_INFO.social.facebook} target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none' }}>
                Facebook
              </a>
            </p>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} ClipCulture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
