import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/professional-team.css';
import Image1 from '../assets/Barbers/Image_1.webp';
import Image2 from '../assets/Barbers/Image_2.webp';    
import Image3 from '../assets/Barbers/Image_3.webp';
import Image4 from '../assets/Barbers/Image_4.webp';
import Image5 from '../assets/Barbers/Image_5.webp';
import Image6 from '../assets/Barbers/Image_6.webp';
import Image7 from '../assets/Barbers/Image_7.webp';
import Image8 from '../assets/Barbers/Image_8.webp';
import Image9 from '../assets/Barbers/Image_9.webp';
import Image10 from '../assets/Barbers/Image_10.webp';
import Image11 from '../assets/Barbers/Image_11.webp';
import Image12 from '../assets/Barbers/Image_12.webp';
import Image13 from '../assets/Barbers/Image_13.webp'


const Professional_Team = () => {
  const [selectedLocation, setSelectedLocation] = useState('all'); // 'all', 'sandy-springs', 'summerhill'
  
  const sandySpringsBarbers = [
    {
      id: 1,
      name: "David Brown",
      title: "Owner/Master Barber",
      location: "Sandy Springs",
      image: Image1
    },
    {
      id: 2,
      name: "Daniel L.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image2
    },
    {
      id: 3,
      name: "LeeLee S.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image3
    },
    {
      id: 4,
      name: "Justin H.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image4
    },
    {
      id: 5,
      name: "Tyrel Y",
      title: "Barber",
      location: "Sandy Springs",
      image: Image5
    },
    {
      id: 6,
      name: "Doug L.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image6
    }
  ];

  const summerhillBarbers = [
    {
      id: 7,
      name: "Aaron W.",
      title: "Barber",
      location: "Summerhill",
      image: Image7
    },
    {
      id: 8,
      name: "TJ S.",
      title: "Barber",
      location: "Summerhill",
      image: Image8
    },
    {
      id: 9,
      name: "Cass B.",
      title: "Barber",
      location: "Summerhill",
      image: Image9
    },
    {
      id: 10,
      name: "DeSean P.",
      title: "Barber",
      location: "Summerhill",
      image: Image10
    },
    {
      id: 11,
      name: "Tray W.",
      title: "Barber",
      location: "Summerhill",
      image: Image11
    },
    {
      id: 12,
      name: "Hugo D.",
      title: "Barber",
      location: "Summerhill",
      image: Image12
    },
    {
      id: 13,
      name: "Mula S.",
      title: "Barber",
      location: "Summerhill",
      image: Image13
    }
  ];

  // Filter barbers based on selected location
  const getFilteredBarbers = () => {
    if (selectedLocation === 'all') {
      return [...sandySpringsBarbers, ...summerhillBarbers];
    } else if (selectedLocation === 'sandy-springs') {
      return sandySpringsBarbers;
    } else if (selectedLocation === 'summerhill') {
      return summerhillBarbers;
    }
    return [];
  };

  const filteredBarbers = getFilteredBarbers();

  return (
    <section className="professional-team">
      <div className="professional-team__container">
        <div className="professional-team__header">
          <h2 className="professional-team__header-title">Meet Our Team</h2>
          <p className="professional-team__subtitle">Masters of the Craft. Shapers of the Culture.</p>
          
          {/* Location Toggle */}
          <div className="professional-team__toggle">
            <button 
              className={`professional-team__toggle-btn ${selectedLocation === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedLocation('all')}
            >
              All Locations
            </button>
            <div className="professional-team__divider"></div>
            <button 
              className={`professional-team__toggle-btn ${selectedLocation === 'sandy-springs' ? 'active' : ''}`}
              onClick={() => setSelectedLocation('sandy-springs')}
            >
              Sandy Springs
            </button>
            <div className="professional-team__divider"></div>
            <button 
              className={`professional-team__toggle-btn ${selectedLocation === 'summerhill' ? 'active' : ''}`}
              onClick={() => setSelectedLocation('summerhill')}
            >
              Summerhill
            </button>
          </div>
        </div>

        {/* Barbers Grid */}
        <div className="professional-team__grid">
          {filteredBarbers.map((barber) => (
            <div key={barber.id} className="professional-team__card">
              <div className="professional-team__image-placeholder">
                {barber.image ? (
                  <img 
                    src={barber.image} 
                    alt={`${barber.name} - ${barber.title}`}
                    className="professional-team__image"
                  />
                ) : (
                  <div className="professional-team__placeholder">
                    <span className="professional-team__placeholder-text">Photo Coming Soon</span>
                  </div>
                )}
              </div>
              <div className="professional-team__info">
                <h4 className="professional-team__name">{barber.name}</h4>
                <p className="professional-team__title">{barber.title}</p>
                <p className="professional-team__location">{barber.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team Section */}
        <div className="professional-team__join">
          <div className="professional-team__join-content">
            <h3 className="professional-team__join-title">Interested in joining our team?</h3>
            <Link to="/apply" className="professional-team__apply-btn">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Professional_Team;
