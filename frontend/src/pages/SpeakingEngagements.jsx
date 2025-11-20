import React, { useState } from 'react';
import { Quote } from 'lucide-react';
import '../styles/speaking-engagements.css';
import headerImage from '../assets/gallery/image-40.webp';
import speakerImage from '../assets/gallery/image-70.webp';
import JoinUs from '../components/JoinUs.jsx';
import BookingInquiryModal from '../components/BookingInquiryModal.jsx';
import BarbershopGallery from '../components/Barbershop_Gallery.jsx';

const SpeakingEngagements = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="speaking-page">
      {/* Header Section */}
      <div className="speaking-header" style={{ backgroundImage: `url(${headerImage})` }}>
        <div className="speaking-header-overlay">
          <h1 className="speaking-title">Define. Shape. <br /> Elevate.</h1>
          <p className="speaking-subheader">A powerful voice on entrepreneurship, culture, leadership, and legacy.</p>
          <button className="speaking-request-button" onClick={() => setShowModal(true)}>Inquire Today</button>
        </div>
      </div>

      <BookingInquiryModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Book David Brown for Your Event"
        subtitle="Fill out the form below and we'll get back to you within 24-48 hours."
      />

      {/* Why Book David Brown Bento Grid */}
      <div className="speaking-bento-section">
        <div className="speaking-bento-grid">
          <div className="speaking-bento-card">
            <h3 className="speaking-card-title">Entrepreneurial Excellence</h3>
            <p className="speaking-card-text">
              David Brown brings real-world experience building successful businesses from the ground up. 
              Learn proven strategies for turning vision into reality and creating lasting impact in your community.
            </p>
          </div>
          
          <div className="speaking-bento-card">
            <h3 className="speaking-card-title">Authentic Leadership</h3>
            <p className="speaking-card-text">
              With a Master's degree in business and years of hands-on experience, David delivers powerful 
              insights on building teams, developing culture, and leading with purpose and integrity.
            </p>
          </div>
          
          <div className="speaking-bento-card">
            <h3 className="speaking-card-title">Community Impact</h3>
            <p className="speaking-card-text">
              As a published author and mentor, David shares actionable principles for creating positive 
              change, empowering others, and building businesses that serve beyond profit.
            </p>
          </div>
        </div>
      </div>

      {/* Speaker Image Section */}
      <div className="speaking-video-section">
        <div className="speaking-video-container">
          <div className="speaking-video-wrapper">
            <img 
              src={speakerImage} 
              alt="David Brown - Speaker and Entrepreneur" 
              className="speaking-speaker-image"
            />
          </div>
          
          <div className="speaking-video-content">
            <h3 className="speaking-video-title">Meet the Speaker</h3>
            <p className="speaking-video-subtitle">David Brown</p>
            
            <div className="speaking-founder-callouts">
              <div className="speaking-callout-item">
                <span className="speaking-callout-text">VISIONARY ENTREPRENEUR</span>
              </div>
              <div className="speaking-callout-item">
                <span className="speaking-callout-text">Published Author</span>
              </div>
              <div className="speaking-callout-item">
                <span className="speaking-callout-text">Mentor</span>
              </div>
              <div className="speaking-callout-item">
                <span className="speaking-callout-text">BUSINESS PROFESSIONAL (M.S.)</span>
              </div>
              <div className="speaking-callout-item">
                <span className="speaking-callout-text">Community Leader</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Narrative Section */}
      <div className="speaking-narrative-section">
        <div className="speaking-narrative-container">
          <h2 className="speaking-narrative-main-title">BOOK DAVID BROWN FOR YOUR EVENT OR PODCAST</h2>
          <h3 className="speaking-narrative-subtitle">A Voice Shaping the Culture of Grooming, Leadership & Community</h3>
          
          <div className="speaking-narrative-content">
            <p className="speaking-narrative-paragraph">
              From Charleston roots to building one of Atlanta's most respected barbershop brands, <strong>David Brown</strong> has 
              become a powerful voice in entrepreneurship, culture, and community leadership. As the founder of Clip 
              Culture Barbershop, David turned a simple dream into a movement—one built on craftsmanship, premium 
              service, authenticity, and impact.
            </p>

            <p className="speaking-narrative-paragraph">
              David's journey from the corporate world to launching a cultural brand resonates with audiences who 
              crave real stories, real leadership, and real inspiration. His talks blend his business education (B.S. in 
              Marketing + M.S. in Human Resource Development) with over a decade of hands-on experience behind 
              the chair and seven years of successful business ownership.
            </p>

            <p className="speaking-narrative-paragraph">
              Whether he's speaking to aspiring barbers, entrepreneurs, creatives, or organizational leaders, David 
              brings a message rooted in purpose:
            </p>

            <div className="speaking-narrative-quote">
              <Quote className="speaking-quote-icon" />
              <p className="speaking-quote-text">
                <strong>When you define your standard, you shape your environment—<br />
                and you elevate everyone around you.</strong>
              </p>
            </div>

            <h4 className="speaking-topics-title">David Speaks On:</h4>
            <ul className="speaking-topics-list">
              <li className="speaking-topic-item">Entrepreneurship & Brand Building</li>
              <li className="speaking-topic-item">Leadership, Culture & Community Impact</li>
              <li className="speaking-topic-item">Turning Passion into Purpose</li>
              <li className="speaking-topic-item">The Business of Barbering & Modern Grooming</li>
              <li className="speaking-topic-item">Mentorship, Mindset, and Personal Growth</li>
              <li className="speaking-topic-item">Building a Cultural Brand That Lasts</li>
            </ul>

            <h4 className="speaking-backed-title">Backed by:</h4>
            <ul className="speaking-stats-list">
              <li className="speaking-stat-item">✔ 135,000+ clients served</li>
              <li className="speaking-stat-item">✔ 94% client satisfaction</li>
              <li className="speaking-stat-item">✔ 7+ years of business success</li>
              <li className="speaking-stat-item">✔ 3 authored books, grooming products & mentorship programs</li>
            </ul>

            <p className="speaking-narrative-paragraph">
              David's presence is authentic, powerful, and relatable—energizing rooms and sparking meaningful 
              conversations that stick long after the event ends.
            </p>

            <h4 className="speaking-cta-title">Bring a Culture-Shaping Voice to Your Platform</h4>
            <p className="speaking-narrative-paragraph">
              If you're looking to inspire your audience with real-world experience, proven principles, and a message 
              rooted in community, excellence, and purpose—David Brown is the speaker your event needs.
            </p>

            <p className="speaking-final-cta">
              Fill out the inquiry form below, and a member of our team will connect with you to bring David to 
              your event or podcast.
            </p>

            <button className="speaking-cta-button" onClick={() => setShowModal(true)}>
              Book David Brown
            </button>
          </div>
        </div>
      </div>
      <div className="speaking-gallery-wrapper">
          <BarbershopGallery />
      </div>
      {/* Join Us Component */}
      <div className="speaking-joinus-wrapper">
        <JoinUs />
      </div>
    </div>
  );
};

export default SpeakingEngagements;

