import React from 'react';
import '../styles/mentorship.css';

const Mentorship = () => {
  return (
    <div className="mentorship-page">
      <div className="mentorship-container">
        <div className="mentorship-header">
          <h1 className="mentorship-title">Mentorship</h1>
          <p className="mentorship-subtitle">Elevate Your Barber Career with Expert Guidance</p>
        </div>
        
        <div className="mentorship-content">
          <div className="mentorship-intro">
            <p className="mentorship-intro-text">
              Unlock the secrets of success in the barbering industry with our owner's unparalleled expertise. 
              With over 7 years of experience and the imminent opening of our second location this spring, 
              he's ready to share invaluable insights garnered from over 134,000 services provided to our loyal clients.
            </p>
          </div>
          
          <div className="mentorship-program">
            <h2 className="mentorship-program-title">Are you ready to start on an exciting journey in the world of barbering?</h2>
            <p className="mentorship-program-text">
              Enroll in our in-person, hands-on barbering/hair design program and you could unlock endless opportunities 
              for success in this thriving industry!
            </p>
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
