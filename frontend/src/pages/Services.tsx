import { useEffect, useState } from 'react';
import { Service } from '../types';
import { getServices } from '../lib/mockApi';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <div>
      <section className="section section--light">
        <div className="container">
          <h1 className="text-center mb-4">Our Services</h1>
          <p className="text-center mb-4">
            Professional grooming services tailored to your style and preferences.
          </p>
          
          <div className="grid grid--2">
            {services.map((service) => (
              <div key={service.id} className="card">
                <h3>{service.name}</h3>
                <p className="mb-2">{service.description}</p>
                <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <span><strong>${service.price}</strong></span>
                  <span>{service.durationMins} minutes</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <a href="#contact" className="btn btn--primary btn--large">
              Book Your Service
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
