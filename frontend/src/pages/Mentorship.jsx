import React from 'react';
import '../styles/mentorship.css';
import MentorshipImage from '../assets/Mentorship/Mentorship-1.webp';

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
            <strong>Take the first step</strong> towards a fulfilling career by enrolling in one of our barber programs today:</h2>
           
          </div>
          
          <div className="mentorship-curriculum">
            <p className="mentorship-curriculum-text">
              At Clip Culture Barbershop, we offer a curriculum designed to equip you with the knowledge and skills 
              necessary to excel as a professional barber and pass the State Board Exam.
            </p>
          </div>
          
          <div className="mentorship-instructor">
            <p className="mentorship-instructor-text">
              Your instructor, Clip Culture Barbershop owner, David Brown, has over 11 years of experience in his field 
              and over 7 years of business ownership to guide you through whichever avenue you choose to learn from.
            </p>
            <div className="mentorship-instructor-signature">
              <p className="mentorship-signature-text">David Brown, Clip Culture Owner</p>
            </div>
          </div>
          
          <div className="mentorship-opportunities">
            <p className="mentorship-opportunities-text">
              Whether you dream of owning your own barbershop or want to start your career as a barber or stylist 
              in a high-end salon, our programs have the ability to empower you to achieve your goals if you choose to do so.
            </p>
          </div>
          
          <div className="mentorship-cta">
            <p className="mentorship-cta-text">
              Take the first step towards a fulfilling career by enrolling in one of our barber programs today:
            </p>
            <div className="mentorship-cta-buttons">
              <button className="btn btn--primary btn--large">
                Enroll Now
              </button>
              <button className="btn btn--secondary btn--large">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
