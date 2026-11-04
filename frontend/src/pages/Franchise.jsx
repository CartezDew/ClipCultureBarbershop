import React, { useState, useEffect, useRef } from 'react';
import '../styles/franchise.css';
import '../styles/facts.css';
import JoinUs from '../components/JoinUs.jsx';
import Shop1Image from '../assets/Contact/Shop_1.webp';
import OwnerImage from '../assets/Contact/Owner.webp';
import Gallery from '../components/Gallery.jsx';
import FranchiseRequestInfoModal from '../components/FranchiseRequestInfoModal.jsx';
import FranchiseApplyModal from '../components/FranchiseApplyModal.jsx';
import BarbershopGallery from '../components/Barbershop_Gallery.jsx';
// FAQ data moved inline to avoid import issues
const franchiseFaqs = [
  {
    id: 1,
    q: "What does it cost to open a Clip Culture Barbershop?",
    a: (
      <>
        <p>
          We provide a detailed investment breakdown in our <strong>Franchise Disclosure
          Document (FDD)</strong> once you qualify. Total costs vary by market, footprint,
          build-out, and equipment. Your recruiter will walk you through every line item.
        </p>
      </>
    ),
  },
  {
    id: 2,
    q: "How much does a Clip Culture Barbershop make in sales?",
    a: (
      <>
        <p>
          Performance depends on many factors—location, operating discipline, team quality,
          marketing, and your leadership. We don't make earnings claims outside the FDD, but
          we do provide <strong>training, playbooks, and ongoing support</strong> to help you
          execute the Clip Culture system with excellence.
        </p>
      </>
    ),
  },
  {
    id: 3,
    q: "What franchise markets are available?",
    a: (
      <>
        <p>
          Our company barbershop is in <strong>Sandy Springs, GA</strong>. We're actively evaluating additional territories. Ask us about
          availability in your city and we'll confirm whether it's open or reserved.
        </p>
      </>
    ),
  },
  {
    id: 4,
    q: "Do you offer single-shop franchises?",
    a: (
      <>
        <p>
          Yes. We award <strong>single-unit franchises</strong> and develop qualified operators
          toward <strong>multi-unit ownership</strong> over time (often within ~3 years) based on
          performance and territory availability.
        </p>
      </>
    ),
  },
  {
    id: 5,
    q: "Do I have to be a barber to operate a Clip Culture Barbershop?",
    a: (
      <>
        <p>
          <strong>No barber experience required.</strong> We partner with owners who lead people,
          build culture, and run operations. You'll hire licensed professionals while we provide
          <strong> training, systems, and ongoing mentorship</strong> to help you succeed.
        </p>
      </>
    ),
  },
];

const Franchise = () => {
  const [openFact, setOpenFact] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const accordionRef = useRef(null);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const toggleFact = (id) => {
    setOpenFact(openFact === id ? null : id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (accordionRef.current) {
      observer.observe(accordionRef.current);
    }

    return () => {
      if (accordionRef.current) {
        observer.unobserve(accordionRef.current);
      }
    };
  }, []);

  return (
    <div className="franchise-page">
      <div className="franchise-container">
        <div className="franchise-header">
          <div className="franchise-header-content">
            <div className="franchise-header-image">
              <img loading="lazy" decoding="async" 
                src={Shop1Image} 
                alt="Franchise Opportunity" 
                className="franchise-image"
              />
              <img loading="lazy" decoding="async" 
                src={OwnerImage}
                alt="Franchise Opportunity" 
                className="franchise-image"
              />
            </div>
            <div className="franchise-header-copy">
              <span className="franchise-eyebrow">Franchise opportunity</span>
              <h1 className="franchise-title">Own a Clip Culture barbershop.</h1>
              <p className="franchise-subtitle">Build a neighborhood destination with a brand rooted in craft, service, and community.</p>
              <div className="franchise-intro">
                <p className="franchise-intro-text">
                  Founded by <strong>David Brown</strong> in Sandy Springs, Clip Culture brings a distinct approach to barbering: skilled cuts, thoughtful service, and a welcoming place for clients.
                </p>
                <p className="franchise-intro-text-2">
                  The franchise opportunity pairs that brand experience with training, operational guidance, and support as you build your own shop.
                </p>
              </div>
            </div>
          </div>
          <div className="franchise-features">
            <p className="franchise-features-title">Support at a glance</p>
            <ul className="franchise-features-list">
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Launch support
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Hands-on training
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Marketing guidance
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Operations support
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Ongoing mentorship
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Growth planning
              </li>
            </ul>
          </div>
        </div>
        <div className="franchise-content">
          <div className="franchise-program">
            <span className="franchise-eyebrow">Explore the opportunity</span>
            <h2 className="franchise-program-title">What ownership looks like</h2>
            <p>Start with the support available, then review the qualifications and next steps.</p>
          </div>
          
          <div className="franchise-programs">
            <div className="franchise-program-card">
              <div className="franchise-program-header">
                <span className="franchise-card-kicker">01 / The support</span>
                <h3 className="franchise-program-subtitle">Build with Clip Culture</h3>
              </div>
              <div className="franchise-program-content">
                <p className="franchise-program-description">
                  Open a barbershop with guidance on setup, training, marketing, and daily operations.
                </p>
                <p className="franchise-program-description">
                  Talk with the team about your market, the space you envision, and what it takes to launch. You own the business; Clip Culture helps you prepare to run it.
                </p>
              </div>
            </div>
            
            <div className="franchise-program-card">
              <div className="franchise-program-header">
                <span className="franchise-card-kicker">02 / The qualifications</span>
                <h3 className="franchise-program-subtitle">See if it fits</h3>
              </div>
              <div className="franchise-program-content">
                <div className="franchise-requirements-section">
                  <h4 className="franchise-requirements-title">Who we're looking for</h4>
                  <ul className="franchise-requirements-list">
                    <li>Resides in or near the market they plan to develop</li>
                    <li>Demonstrates strong leadership and team-building skills</li>
                    <li>Has experience managing operations, marketing, or HR in a service-based business</li>
                    <li>Can uphold Clip Culture's brand standards and operational excellence</li>
                  </ul>
                </div>
                
                <div className="franchise-requirements-section">
                  <h4 className="franchise-requirements-title">Financial overview</h4>
                  <ul className="franchise-requirements-list">
                    <li>Net worth: <strong>$200,000+</strong> (excluding primary residence)</li>
                    <li>Liquid capital: <strong>$50,000+</strong> (cash or securities)</li>
                    <li>Estimated total investment: <strong>$132,320 – $277,850</strong> (including franchise fee)</li>
                  </ul>
                </div>
                
                <div className="franchise-requirements-section">
                  <h4 className="franchise-requirements-title">Good to know</h4>
                  <ul className="franchise-requirements-list">
                    <li>Must be financially able to support personal expenses during ramp-up</li>
                    <li><strong>No barbering experience required</strong> — training and support provided</li>
                  </ul>
                </div>
                
              </div>
            </div>
          </div>
          <div className="franchise-program-actions">
            <button className="btn btn--franchise" onClick={() => setShowRequestInfoModal(true)}>Request Information</button>
            <button className="btn btn--franchise" onClick={() => setShowApplyModal(true)}>Apply Now</button>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="franchise-faq-section">
          <div className="w-full">
            <h2 id="facts-heading" className="facts-animated">Frequently Asked Questions</h2>
            <p className="facts-subtitle">
              Get answers to the most common questions about our franchise opportunity.
            </p>
            
            <ul 
              className={`facts-accordion ${isVisible ? 'facts-accordion-animated' : ''}`}
              ref={accordionRef}
            >
              {franchiseFaqs.map((faq, index) => (
                <li 
                  key={faq.id} 
                  className={`fact ${isVisible ? 'fact-visible' : ''} ${openFact === faq.id ? 'open' : ''}`}
                >
                  <button 
                    className="fact-trigger" 
                    onClick={() => toggleFact(faq.id)}
                    aria-expanded={openFact === faq.id}
                    aria-controls={`faq-${faq.id}`}
                  >
                    <span>{faq.q}</span>
                    <span className="chev" aria-hidden="true"></span>
                  </button>
                  <div 
                    className="fact-panel" 
                    id={`faq-${faq.id}`}
                    style={{ 
                      maxHeight: openFact === faq.id ? '500px' : '0px',
                      opacity: openFact === faq.id ? 1 : 0
                    }}
                  >
                    <div>{faq.a}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>

        <FranchiseRequestInfoModal 
          isOpen={showRequestInfoModal}
          onClose={() => setShowRequestInfoModal(false)}
        />

        <FranchiseApplyModal 
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
        />

      <div className="franchise-gallery-wrapper">
          <BarbershopGallery />
      </div>
      <div className="franchise-joinus-wrapper">
        <JoinUs />
      </div>
    </div>
  );
};

export default Franchise;
