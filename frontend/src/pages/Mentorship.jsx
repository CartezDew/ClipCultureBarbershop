import React from 'react';
import '../styles/mentorship.css';
import MentorshipImage from '../assets/Mentorship/Mentorship-1.webp';
import CoachingCallImage from '../assets/Mentorship/Coaching Call.webp';
import InPersonMentorshipImage from '../assets/Mentorship/Mentorship-3.webp';
import JoinUs from '../components/JoinUs.jsx';

const Mentorship = () => {
  return (
    <div className="mentorship-page">
      <div className="mentorship-container">
        <div className="mentorship-header">
          <div className="mentorship-header-content">
            <h1 className="mentorship-title">Elevate Your Barber Career</h1>
            <h2 className="mentorship-subtitle">with <em><strong>EXPERT</strong></em> Guidance.</h2>
            <div className="mentorship-intro">
              <p className="mentorship-intro-text">
                Step into your purpose with mentorship from <strong>David Brown</strong>, founder and owner of Clip Culture Barbershop. 
                With over <strong>11 years of hands-on experience</strong> and more than <strong>7 years</strong> of business ownership, David has mastered the art of blending craftsmanship, entrepreneurship, and culture.
              </p>
              <br/>
              <p className="mentorship-intro-text-2">
                Having provided over <strong>134,000 services</strong>, he now shares the same proven principles that built one of Atlanta's most respected barber brands—helping others rise through <strong>skill, discipline, and purpose</strong>.  
              </p>
              <br/>
              <p className="mentorship-intro-text-3">
                Whether you're just starting out or looking to elevate your existing practice, David's mentorship will guide you toward building a thriving career that goes beyond just cutting hair—it's about building a legacy.
              </p>
            </div>
          </div>
          <div className="mentorship-header-image">
            <img 
              src={MentorshipImage} 
              alt="Mentorship Program" 
              className="mentorship-image"
            />
            <div className="mentorship-features">
              <ul className="mentorship-features-list">
                <li className="mentorship-feature-item">
                  <span className="mentorship-checkmark">✓</span>
                  1 on 1 shadow sessions
                </li>
                <li className="mentorship-feature-item">
                  <span className="mentorship-checkmark">✓</span>
                  Facetime shadow calls
                </li>
                <li className="mentorship-feature-item">
                  <span className="mentorship-checkmark">✓</span>
                  Live work shops
                </li>
                <li className="mentorship-feature-item">
                  <span className="mentorship-checkmark">✓</span>
                  Coach calls
                </li>
                <li className="mentorship-feature-item">
                  <span className="mentorship-checkmark">✓</span>
                  Access to upcoming projects
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mentorship-content">
          
          <div className="mentorship-program">
            <h2 className="mentorship-program-title">
            <strong>Take the first step</strong> towards a fulfilling career by enrolling <br/>
             in one of our barber programs today:</h2>
           
          </div>
        <div className="mentorship-programs">
          <div className="mentorship-program-card">
            <div className="mentorship-program-header">
              <h3 className="mentorship-program-subtitle">Coaching Call:</h3>
            </div>
            <div className="mentorship-program-image">
              <img 
                src={CoachingCallImage} 
                alt="Coaching Call Program" 
                className="program-image"
              />
            </div>
            <div className="mentorship-program-content">
              <p className="mentorship-program-description">
              Ready to launch your career as a <strong>licensed barber?</strong> We’ve been where you are—starting from the ground up with a vision to build something greater.
              </p>
              <p className="mentorship-program-description">
              If you’re seeking guidance on <strong>entrepreneurship, mastering the craft, developing the right mindset, or building a thriving, profitable business</strong> for yourself and your family, this program was designed for you.
              </p>
              <button className="btn btn--coaching">
                Book Coaching
              </button>
            </div>
          </div>
          
          <div className="mentorship-program-card">
            <div className="mentorship-program-header">
              <h3 className="mentorship-program-subtitle">In-Person Mentorship:</h3>
            </div>
            <div className="mentorship-program-image">
              <img 
                src={InPersonMentorshipImage} 
                alt="Mentorship Program" 
                className="program-image"
              />
            </div>
            <div className="mentorship-program-content">
              <p className="mentorship-program-description">
              This <strong>exclusive, one-on-one mentorship</strong> is designed for those new to the industry who want a front-row view of what real success looks like.
              </p>
              <p className="mentorship-program-description">
              Working directly with <strong>David Brown</strong> gives you insider access to the strategies, mindset, and systems behind building and growing a thriving barbershop brand.
              </p>
              <button className="btn btn--mentorship">
                Enroll in Mentorship
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mentorship-joinus-wrapper">
        <JoinUs />
      </div>
    </div>
    </div>
  );
};

export default Mentorship;
