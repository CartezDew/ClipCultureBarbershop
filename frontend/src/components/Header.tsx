import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="logo">
            ClipCulture
          </Link>
          <nav>
            <ul className="nav">
              <li>
                <Link to="/" className="nav__link">Home</Link>
              </li>
              <li>
                <Link to="/services" className="nav__link">Services</Link>
              </li>
              <li>
                <Link to="/team" className="nav__link">Team</Link>
              </li>
              <li>
                <Link to="/gallery" className="nav__link">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="nav__link">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
