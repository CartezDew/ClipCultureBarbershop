import { useEffect, useState } from 'react';
import type { Barber } from '../types/barber';
import { getBarbers } from '../lib/mockApi';

const Team = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    getBarbers().then(setBarbers);
  }, []);

  return (
    <div>
      <section className="section section--light">
        <div className="container">
          <h1 className="text-center mb-4">Meet Our Team</h1>
          <p className="text-center mb-4">
            Our skilled barbers bring years of experience and passion to every cut.
          </p>
          
          <div className="grid grid--2">
            {barbers.map((barber) => (
              <div key={barber.id} className="card">
                <h3>{barber.name}</h3>
                <p className="mb-2"><strong>Specialty:</strong> {barber.specialty}</p>
                <p className="mb-2"><strong>Experience:</strong> {barber.experience}</p>
                <p>{barber.bio}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <a href="#contact" className="btn btn--primary btn--large">
              Book with Your Preferred Barber
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
