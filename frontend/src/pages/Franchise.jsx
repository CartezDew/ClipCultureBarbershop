import React, { useState, useEffect, useRef } from 'react';
import '../styles/franchise.css';
import '../styles/facts.css';
import JoinUs from '../components/JoinUs.jsx';
import Shop1Image from '../assets/Contact/Shop_1.webp';
import Shop2Image from '../assets/Contact/Shop_2.webp';
import Gallery from '../components/Gallery.jsx';
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
          Our current company markets are <strong>Sandy Springs</strong> and <strong>Summerhill
          (Atlanta, GA)</strong>. We're actively evaluating additional territories. Ask us about
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
              <img 
                src={Shop1Image} 
                alt="Franchise Opportunity" 
                className="franchise-image"
              />
              <img 
                src={Shop2Image} 
                alt="Franchise Opportunity" 
                className="franchise-image"
              />
            </div>
            <h1 className="franchise-title">Why Clip Culture Barbershop?</h1>
            <h2 className="franchise-subtitle">Franchise <em><strong>OPPORTUNITY</strong></em> Awaits</h2>
            <div className="franchise-intro">
              <p className="franchise-intro-text">
               From humble beginnings to becoming one of <strong>Atlanta’s top-rated barbershops</strong>, Clip Culture has built a reputation for excellence, innovation, and community. 
               Founded by <strong>David Brown</strong>, the brand grew from a single chair to a thriving multi-location business—proving that with the right blueprint and mindset, success is within reach.
              </p>
              <p className="franchise-intro-text-2">
              Clip Culture was created to redefine the modern barbershop experience—blending <strong>exceptional craftsmanship, premium service, and a true sense of culture</strong>. 
              That same foundation now powers a proven <strong>franchise model</strong> built for passionate entrepreneurs ready to take ownership of their future.
              </p>
              <p className="franchise-intro-text-3">
              With a brand that’s expanded into <strong>grooming products, apparel, books, and mentorship</strong>, Clip Culture isn’t just a barbershop—it’s a movement. 
              </p>
              <p className="franchise-intro-text-4">
              Join a legacy that continues to <strong>define the standard and shape the culture</strong> .
              </p>
            </div>
          </div>
          <div className="franchise-features">
            <ul className="franchise-features-list">
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Complete Setup & Support
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Hands-On Training
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Marketing Made Easy
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Operational Guidance
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Mentorship from Experts
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Scalable Growth Potential
              </li>
            </ul>
          </div>
        </div>
        <div className="franchise-content">
          <div className="franchise-program">
            </div>{/* <h2 className="franchise-program-title">
              <strong>Ready to invest</strong> in your future? Learn more about our franchise opportunities:
            </h2> */}
          
          <div className="franchise-programs">
            <div className="franchise-program-card">
              <div className="franchise-program-header">
                <h3 className="franchise-program-subtitle">Own Your Own Clip Culture</h3>
                <h4 className="franchise-program-subtitle"><strong>Barbershop Franchise</strong></h4>
              </div>
              <div className="franchise-program-content">
                <p className="franchise-program-description">
                The Clip Culture Barbershop Franchise Opportunity is reshaping the hair industry with a modern, proven approach to business ownership. 
                Our streamlined model keeps entry costs manageable while providing a <strong>strategic blueprint for long-term success</strong>.
                </p>
                <p className="franchise-program-description">
                We’re passionate about empowering ambitious entrepreneurs to take control of their future with the backing of a trusted brand and a network of experienced professionals. 
                With <strong>over 20 years of combined industry expertise</strong>, the Clip Culture team is committed to your growth every step of the way.
                </p>
                <p className="franchise-program-description">
                You’re in business <strong>for yourself, not by yourself</strong>.
                </p>
                <p className="franchise-program-description">
                CALL TODAY TO GET MORE INFO!<br/>
                <strong>1 (404) 458-2993</strong>
                </p>
                <button className="btn btn--franchise">
                  Request Information
                </button>
              </div>
            </div>
            
            <div className="franchise-program-card">
              <div className="franchise-program-header">
                <h3 className="franchise-program-subtitle">Franchise <strong>Requirements</strong>:</h3>
              </div>
              <div className="franchise-program-content">
                <div className="franchise-requirements-section">
                  <h4 className="franchise-requirements-title">Ideal Candidate Profile:</h4>
                  <ul className="franchise-requirements-list">
                    <li>Resides in or near the market they plan to develop</li>
                    <li>Demonstrates strong leadership and team-building skills</li>
                    <li>Has experience managing operations, marketing, or HR in a service-based business</li>
                    <li>Can uphold Clip Culture's brand standards and operational excellence</li>
                  </ul>
                </div>
                
                <div className="franchise-requirements-section">
                  <h4 className="franchise-requirements-title">Financial Overview:</h4>
                  <ul className="franchise-requirements-list">
                    <li>Net worth: <strong>$200,000+</strong> (excluding primary residence)</li>
                    <li>Liquid capital: <strong>$50,000+</strong> (cash or securities)</li>
                    <li>Estimated total investment: <strong>$132,320 – $277,850</strong> (including franchise fee)</li>
                  </ul>
                </div>
                
                <div className="franchise-requirements-section">
                  <h4 className="franchise-requirements-title">Additional Details:</h4>
                  <ul className="franchise-requirements-list">
                    <li>Must be financially able to support personal expenses during ramp-up</li>
                    <li><strong>No barbering experience required</strong> — training and support provided</li>
                  </ul>
                </div>
                
                <button className="btn btn--franchise">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
          <div className="franchise-features">
            <ul className="franchise-features-list">
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Recession-Resistant Market
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Consistent Demand — Hair Always Grows
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Billion-Dollar Cash Flow Opportunity
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Zero Waste — Nothing Spoils
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Underserved, Ever-Growing Market
              </li>
              <li className="franchise-feature-item">
                <span className="franchise-checkmark">✓</span>
                Engaging and Rewarding Work
              </li>
            </ul>
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
        <Gallery />
      <div className="franchise-joinus-wrapper">
        <JoinUs />
      </div>
    </div>
  );
};

export default Franchise;
