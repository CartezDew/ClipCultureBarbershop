import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../types/service';
import type { Barber } from '../types/barber';
import { getServices, getBarbers } from '../lib/mockApi';
import { CONTACT_INFO } from '../lib/constants';

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    getServices().then(setServices);
    getBarbers().then(setBarbers);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero__title">ClipCulture</h1>
          <p className="hero__subtitle">
            Modern cuts and premium grooming for the discerning gentleman
          </p>
          <Link to="/contact" className="btn btn--primary btn--large">
            Book Now
          </Link>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section section--light">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="grid grid--3">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="card">
                <h3>{service.name}</h3>
                <p className="mb-2">{service.description}</p>
                <p><strong>${service.price}</strong> • {service.durationMins} mins</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn--secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section section--dark">
        <div className="container">
          <h2 className="text-center mb-4">Meet Our Barbers</h2>
          <div className="grid grid--3">
            {barbers.slice(0, 3).map((barber) => (
              <div key={barber.id} className="card">
                <h3>{barber.name}</h3>
                <p className="mb-2"><strong>{barber.specialty}</strong></p>
                <p className="mb-2">{barber.experience}</p>
                <p>{barber.bio}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/team" className="btn btn--secondary">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section section--light">
        <div className="container">
          <div className="grid grid--2">
            <div>
              <h2>Visit Us</h2>
              <p className="mb-2">{CONTACT_INFO.address}</p>
              <p className="mb-2">{CONTACT_INFO.phone}</p>
              <p className="mb-4">{CONTACT_INFO.hours}</p>
              <Link to="/contact" className="btn btn--primary">
                Get Directions
              </Link>
            </div>
            <div>
              <h2>Book Your Cut</h2>
              <p className="mb-4">
                Walk-ins welcome, but we recommend booking ahead to secure your preferred time slot.
              </p>
              <Link to="/contact" className="btn btn--primary">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
