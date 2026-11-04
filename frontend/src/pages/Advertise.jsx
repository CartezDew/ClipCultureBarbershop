import React, { useState } from 'react';
import '../styles/advertise.css';
import JoinUs from '../components/JoinUs.jsx';
import Shop1Image from '../assets/gallery/image-14.webp';
import Shop2Image from '../assets/gallery/image-4.webp';
import HatsImage from '../assets/About_Home/Products-hats.webp';
import AdvertisePurchaseModal from '../components/AdvertisePurchaseModal.jsx';
import AdvertiseRequestInfoModal from '../components/AdvertiseRequestInfoModal.jsx';

const Advertise = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);

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
                Put your message in front of clients during their visit to our Sandy Springs barbershop. Your brand appears on in-shop screens, with email and social placements available in select packages.
              </p>
              <p className="advertise-intro-text-2">
                Clip Culture has served <strong>155,000+ clients</strong>. Explore the packages below to see the placement, duration, and channels included.
              </p>
            </div>
          </div>
          
        </div>
        <div className="advertise-content">
          <div className="advertise-bento-grid">
            <div className="advertise-bento-left">
              <div className="advertise-bento-image-box">
                <img loading="lazy" decoding="async" 
                  src={Shop2Image} 
                  alt="Advertise Opportunity" 
                  className="advertise-bento-image"
                />
              </div>
              <div className="advertise-bento-join">
                <div className="advertise-program-card">
                  <div className="advertise-program-header">
                    <h2 className="advertise-program-subtitle">A place for your brand to be seen</h2>
                  </div>
                  <div className="advertise-program-content">
                    <p className="advertise-program-description">
                      In-shop advertising reaches clients while they spend time with us. Add email and social placements with a package that fits your campaign.
                    </p>
                     <div className="advertise-bento-image-hats">
                  <img loading="lazy" decoding="async" 
                  src={HatsImage} 
                  alt="Advertise Opportunity" 
                  className="advertise-bento-image-hats"
                /> 
                </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="advertise-bento-right">
              <div className="advertise-program-card">
                <div className="advertise-program-header">
                  <h2 className="advertise-program-subtitle">How your message reaches clients</h2>
                </div>
                <div className="advertise-program-content">
                  <div className="advertise-benefits-list">
                    <div className="advertise-benefit-item">
                      <span className="advertise-checkmark">✓</span>
                      <div className="advertise-benefit-content">
                        <h3 className="advertise-benefit-title">In-shop screens</h3>
                        <p className="advertise-benefit-description">
                          Your logo appears on barbershop monitors for the duration of your package.
                        </p>
                      </div>
                    </div>
                    
                    <div className="advertise-benefit-item">
                      <span className="advertise-checkmark">✓</span>
                      <div className="advertise-benefit-content">
                        <h3 className="advertise-benefit-title">Email and social</h3>
                        <p className="advertise-benefit-description">
                          Every package includes email and social placements. See the counts in each package below.
                        </p>
                      </div>
                    </div>
                    
                    <div className="advertise-benefit-item">
                      <span className="advertise-checkmark">✓</span>
                      <div className="advertise-benefit-content">
                        <h3 className="advertise-benefit-title">A local audience</h3>
                        <p className="advertise-benefit-description">
                          Connect with people who visit Clip Culture in Sandy Springs and follow our community online.
                        </p>
                      </div>
                    </div>
                    
                  </div>
                  <img loading="lazy" decoding="async"
                    src={HatsImage}
                    alt="Advertise Opportunity"
                    className="advertise-bento-image-hats-2"
                  />
                </div>
              </div>
              
              <div className="advertise-bento-cta">
                <p className="advertise-cta-text">
                  Compare the packages below, then choose a plan or ask us about placement.
                </p>
              </div>
            </div>

          </div>
        </div>
        
        {/* Advertising Packages Section */}
        <div className="advertise-packages-section">
          <h2 className="advertise-packages-title">Advertising Packages</h2>
          <div className="advertise-packages-grid">
            <div className="advertise-packages-left">
              <div className="advertise-package-card">
                <h3 className="advertise-package-title">
                  <span className="advertise-package-badge">Founding Member</span> Package — $2,000
                </h3>
                <ul className="advertise-package-benefits">
                  <li>Logo displayed on monitors for <strong>one full year</strong> with <strong>priority placement</strong></li>
                  <li><strong>4 dedicated email blasts</strong> to our clients throughout the year</li>
                  <li>Quarterly social media shoutouts and <strong>3 sponsored posts</strong></li>
                  <li>Exclusive logo placement on all <strong>promotional materials</strong> (flyers, posters, brochures)</li>
                  <li>Invitation to an <strong>exclusive networking event</strong> for Founding Members</li>
                  <li>Opportunity to <strong>share promotional materials or samples</strong> with barbershop clients</li>
                  <li>Featured <strong>spotlight article or interview</strong> on our website or social media</li>
                </ul>
              </div>
            </div>
            
            <div className="advertise-packages-right">
              <div className="advertise-package-card">
                <h3 className="advertise-package-title">6-Month Package — $1,250</h3>
                <ul className="advertise-package-benefits">
                  <li>Logo displayed on monitors for <strong>6 months</strong></li>
                  <li><strong>2 dedicated email blasts</strong> to our client base</li>
                  <li><strong>2 social media shoutouts</strong> during the campaign</li>
                  <li><strong>1 sponsored post</strong> on our barbershop's social media</li>
                </ul>
              </div>
              
              <div className="advertise-package-card">
                <h3 className="advertise-package-title">3-Month Package — $750</h3>
                <ul className="advertise-package-benefits">
                  <li>Logo displayed on barbershop monitors for <strong>3 months</strong></li>
                  <li><strong>1 dedicated email blast</strong> to our client list</li>
                  <li><strong>1 social media shoutout</strong> across our platforms</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="advertise-packages-actions">
            <button 
              className="advertise-purchase-btn"
              onClick={() => setShowPurchaseModal(true)}
            >
              Purchase Package
            </button>
            <button 
              className="advertise-request-info-btn"
              onClick={() => setShowRequestInfoModal(true)}
            >
              Request Information
            </button>
          </div>
        </div>
        
        </div>

        <AdvertisePurchaseModal 
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
        />

        <AdvertiseRequestInfoModal 
          isOpen={showRequestInfoModal}
          onClose={() => setShowRequestInfoModal(false)}
        />

      <div className="advertise-joinus-wrapper">
        <JoinUs />
      </div>
    </div>
  );
};

export default Advertise;
