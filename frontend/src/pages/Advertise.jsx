import React, { useState, useEffect, useRef } from 'react';
import '../styles/advertise.css';
import '../styles/facts.css';
import JoinUs from '../components/JoinUs.jsx';
import Shop1Image from '../assets/gallery/image-14.webp';
import Gallery from '../components/Gallery.jsx';
// FAQ data moved inline to avoid import issues
const advertiseFaqs = [
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

const Advertise = () => {
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
    <div className="advertise-page">
      <div className="advertise-container">
        <div className="advertise-header">
          <div className="advertise-header-content">
            <img 
              src={Shop1Image} 
              alt="Advertise Opportunity" 
              className="advertise-image advertise-image--float"
            />
            <h1 className="advertise-title">Advertise with <br/><strong>Clip Culture Barbershop</strong></h1>
            <div className="advertise-intro">
              <p className="advertise-intro-text">
              At Clip Culture Barbershop, your brand gets more than visibility — it gets credibility.
              With <strong>134,000+ clients served</strong>, a <strong>94% customer satisfaction rate</strong>, and <strong>7+ years of trusted service</strong>, our audience represents a thriving, loyal, and diverse community across Atlanta.
              </p>
              <p className="advertise-intro-text-2">
              Advertising with Clip Culture means positioning your business in front of an engaged audience that values quality, authenticity, and culture. It’s more than exposure — it’s connection.
              </p>
            </div>
          </div>
          
        </div>
        <div className="advertise-features">
          <ul className="advertise-features-list">
            <li className="advertise-feature-item">
              <span className="advertise-checkmark">✓</span>
              High-Traffic Exposure
            </li>
            <li className="advertise-feature-item">
              <span className="advertise-checkmark">✓</span>
              Established Reputation
            </li>
            <li className="advertise-feature-item">
              <span className="advertise-checkmark">✓</span>
              Prime In-Shop Placement
            </li>
            <li className="advertise-feature-item">
              <span className="advertise-checkmark">✓</span>
              Targeted Reach
            </li>
            <li className="franchise-feature-item">
              <span className="advertise-checkmark">✓</span>
              Cost-Effective Impact
            </li>
            <li className="franchise-feature-item">
              <span className="advertise-checkmark">✓</span>
              Turn Wait Time Into Ad Time
            </li>
          </ul>
        </div>
        <div className="advertise-content">
          <div className="advertise-program">
            </div>{/* <h2 className="franchise-program-title">
              <strong>Ready to invest</strong> in your future? Learn more about our franchise opportunities:
            </h2>
          </div> */}
          
          <div className="advertise-programs">
            <div className="advertise-program-card">
              <div className="advertise-program-header">
                <h3 className="advertise-program-subtitle">Own Your Own Clip Culture</h3>
                <h4 className="advertise-program-subtitle"><strong>Barbershop Franchise</strong></h4>
              </div>
              <div className="advertise-program-content">
                <p className="advertise-program-description">
                The Clip Culture Barbershop Franchise Opportunity is reshaping the hair industry with a modern, proven approach to business ownership. 
                Our streamlined model keeps entry costs manageable while providing a <strong>strategic blueprint for long-term success</strong>.
                </p>
                <p className="advertise-program-description">
                We’re passionate about empowering ambitious entrepreneurs to take control of their future with the backing of a trusted brand and a network of experienced professionals. 
                With <strong>over 20 years of combined industry expertise</strong>, the Clip Culture team is committed to your growth every step of the way.
                </p>
                <p className="advertise-program-description">
                You’re in business <strong>for yourself, not by yourself</strong>.
                </p>
                <p className="advertise-program-description">
                CALL TODAY TO GET MORE INFO!<br/>
                <strong>1 (404) 458-2993</strong>
                </p>
                <button className="btn btn--advertise">
                  Request Information
                </button>
              </div>
            </div>
            
            <div className="advertise-program-card">
              <div className="advertise-program-header">
                <h3 className="advertise-program-subtitle">Why Advertise <strong>With Us</strong>:</h3>
              </div>
              <div className="advertise-program-content">
                <div className="advertise-benefits-list">
                  <div className="advertise-benefit-item">
                    <span className="advertise-checkmark">✓</span>
                    <div className="advertise-benefit-content">
                      <h4 className="advertise-benefit-title">High-Traffic Exposure</h4>
                      <p className="advertise-benefit-description">
                        Over <strong>1,600 clients</strong> visit our shops each month, giving your brand consistent visibility in an energetic, community-driven space.
                      </p>
                    </div>
                  </div>
                  
                  <div className="advertise-benefit-item">
                    <span className="advertise-checkmark">✓</span>
                    <div className="advertise-benefit-content">
                      <h4 className="advertise-benefit-title">Established Reputation</h4>
                      <p className="advertise-benefit-description">
                        Partner with one of Atlanta's most recognized barbershop brands — synonymous with excellence and authenticity.
                      </p>
                    </div>
                  </div>
                  
                  <div className="advertise-benefit-item">
                    <span className="advertise-checkmark">✓</span>
                    <div className="advertise-benefit-content">
                      <h4 className="advertise-benefit-title">Prime In-Shop Placement</h4>
                      <p className="advertise-benefit-description">
                        Your message plays on strategically positioned displays, capturing attention during peak engagement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="advertise-benefit-item">
                    <span className="advertise-checkmark">✓</span>
                    <div className="advertise-benefit-content">
                      <h4 className="advertise-benefit-title">Targeted Reach</h4>
                      <p className="advertise-benefit-description">
                        Our clientele spans professionals, families, and trendsetters, offering you access to a wide range of demographics and interests.
                      </p>
                    </div>
                  </div>
                  
                  <div className="advertise-benefit-item">
                    <span className="advertise-checkmark">✓</span>
                    <div className="advertise-benefit-content">
                      <h4 className="advertise-benefit-title">Cost-Effective Impact</h4>
                      <p className="advertise-benefit-description">
                        Competitive advertising packages designed to maximize your marketing investment and deliver measurable results.
                      </p>
                    </div>
                  </div>
                </div>
                
                <button className="btn btn--advertise">
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
          <div className="advertise-Benefits">
            <ul className="advertise-features-list">
              <li className="advertise-feature-item">
                <span className="advertise-checkmark">✓</span>
                Recession-Resistant Market
              </li>
              <li className="advertise-feature-item">
                <span className="advertise-checkmark">✓</span>
                Consistent Demand — Hair Always Grows
              </li>
              <li className="advertise-feature-item">
                <span className="advertise-checkmark">✓</span>
                Billion-Dollar Cash Flow Opportunity
              </li>
              <li className="advertise-feature-item">
                <span className="advertise-checkmark">✓</span>
                Zero Waste — Nothing Spoils
              </li>
              <li className="advertise-feature-item">
                <span className="advertise-checkmark">✓</span>
                Underserved, Ever-Growing Market
              </li>
              <li className="advertise-feature-item">
                <span className="advertise-checkmark">✓</span>
                Engaging and Rewarding Work
              </li>
            </ul>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="advertise-faq-section">
          <div className="w-full">
            <h2 id="facts-heading" className="facts-animated">Frequently Asked Questions</h2>
            <p className="facts-subtitle">
              Get answers to the most common questions about our franchise opportunity.
            </p>
            
            <ul 
              className={`facts-accordion ${isVisible ? 'facts-accordion-animated' : ''}`}
              ref={accordionRef}
            >
              {advertiseFaqs.map((faq, index) => (
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
      <div className="advertise-joinus-wrapper">
        <JoinUs />
      </div>
    </div>
  );
};

export default Advertise;
