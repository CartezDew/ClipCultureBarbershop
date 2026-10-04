import { Link, useNavigate } from 'react-router-dom';
import '../styles/professional-team.css';
import Image1 from '../assets/Barbers/Image_1.webp';
import Image2 from '../assets/Barbers/Image_2.webp';    
import Image3 from '../assets/Barbers/Image_3.webp';
import Image4 from '../assets/Barbers/Image_4.webp';
import Image5 from '../assets/Barbers/Image_5.webp';
import Image6 from '../assets/Barbers/Image_6.webp';
const Professional_Team = () => {
  const navigate = useNavigate();

  const sandySpringsBarbers = [
    {
      id: 1,
      bookingId: 'david-brown',
      name: "David Brown",
      title: "Owner/Master Barber",
      location: "Sandy Springs",
      image: Image1
    },
    {
      id: 2,
      bookingId: 'daniel-l',
      name: "Daniel L.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image2
    },
    {
      id: 3,
      bookingId: 'leelee-s',
      name: "LeeLee S.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image3
    },
    {
      id: 4,
      bookingId: 'justin-h',
      name: "Justin H.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image4
    },
    {
      id: 5,
      bookingId: 'tyrel-y',
      name: "Tyrel Y",
      title: "Barber",
      location: "Sandy Springs",
      image: Image5
    },
    {
      id: 6,
      bookingId: 'doug-l',
      name: "Doug L.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image6
    }
  ];

  const filteredBarbers = sandySpringsBarbers;

  const handleBarberClick = (barber) => {
    if (!barber?.bookingId) {
      return;
    }

    navigate(`/barber/${barber.bookingId}`);
  };

  return (
    <section className="professional-team">
      <div className="professional-team__container">
        <div className="professional-team__header">
          <h2 id="team" className="professional-team__header-title">Meet Our Team</h2>
          <p className="professional-team__subtitle">Masters of the Craft. Shapers of the Culture.</p>
          
        </div>

        {/* Barbers Grid */}
        <div className="professional-team__grid">
          {filteredBarbers.map((barber) => (
            <div
              key={barber.id}
              className="professional-team__card"
              role="button"
              tabIndex={0}
              onClick={() => handleBarberClick(barber)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleBarberClick(barber);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
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
